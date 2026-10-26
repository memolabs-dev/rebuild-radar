import {fileURLToPath} from 'node:url';
import {allProjects} from '../src/catalog.mjs';

const repositoryNames = [...new Set(allProjects.map(project => project.repository))].sort();
const isMirror = description => /read-only mirror|code repository:\s*https?:\/\/gitlab|read.only.*mirror/i.test(description || '');

export async function auditRepositories({
  fetchImpl = fetch,
  observedAt = new Date().toISOString(),
  repositories = repositoryNames
} = {}) {
  const results = [];
  // Sequential requests keep this manual audit well below GitHub's burst limits.
  for (const repository of repositories) {
    let item = {repository, observedAt, status: 'unavailable', source: 'github-api', license: null, mirrorHint: false};
    try {
      const response = await fetchImpl(`https://api.github.com/repos/${repository}`, {
        headers: {Accept: 'application/vnd.github+json', 'User-Agent': 'RebuildRadar-SourceAudit/0.2'},
        signal: AbortSignal.timeout(7000)
      });
      if (response.status === 404) item.status = 'not-found';
      else if (response.status === 403 || response.status === 429) item.status = 'rate-limited';
      else if (!response.ok) item.status = 'http-error';
      else {
        const data = await response.json();
        if (data.full_name?.toLowerCase() !== repository.toLowerCase()) {
          item.status = 'redirected'; item.resolvedTo = data.full_name ?? null;
        } else {
          item.status = data.private ? 'private' : data.archived ? 'archived' : 'accessible';
        }
        item.license = data.license?.spdx_id && data.license.spdx_id !== 'NOASSERTION'
          ? data.license.spdx_id : null;
        item.mirrorHint = isMirror(data.description);
        item.repoUpdatedAt = data.updated_at ?? null;
        item.url = data.html_url ?? null;
      }
    } catch {
      // Timeouts/network errors are NOT proof the repository does not exist.
      item.status = 'network-error';
    }
    results.push(item);
  }
  return {
    observedAt,
    referenceCount: allProjects.length,
    uniqueRepositoryCount: repositories.length,
    results,
    summary: {
      accessible: results.filter(item => item.status === 'accessible').length,
      unresolved: results.filter(item => item.status !== 'accessible').length,
      mirrorHints: results.filter(item => item.mirrorHint).length,
      licensesIdentified: results.filter(item => item.license).length
    },
    caveat: 'Repository reachability and GitHub license metadata do not verify capabilities, interoperability or product readiness.'
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(new URL(`file://${process.argv[1]}`))) {
  const audit = await auditRepositories();
  console.log(JSON.stringify(audit, null, 2));
  if (audit.summary.unresolved) process.exitCode = 1;
}
