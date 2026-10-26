// Live repository metadata is separate from feature compatibility evidence.
const CACHE_TTL_MS = 15 * 60 * 1000;
const cache = new Map();
export function summarizeGitHub(payload) {
  if (!payload || typeof payload !== 'object' || !payload.full_name) throw new Error('Invalid GitHub response');
  return {
    fullName:payload.full_name, htmlUrl:payload.html_url, stars:payload.stargazers_count,
    forks:payload.forks_count, openIssues:payload.open_issues_count, archived:payload.archived,
    pushedAt:payload.pushed_at, updatedAt:payload.updated_at, defaultBranch:payload.default_branch,
    license:payload.license?.spdx_id || null,
    // Activity or popularity do NOT establish compatibility.
    source:'github-api', observedAt:new Date().toISOString()
  };
}
export async function getGitHubMetadata(repo, {fetchImpl=fetch, now=Date.now()}={}) {
  if(!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error('Invalid repository');
  const previous=cache.get(repo);
  if(previous && now-previous.at < CACHE_TTL_MS) return previous.data;
  const response=await fetchImpl(`https://api.github.com/repos/${repo}`, {
    headers:{'Accept':'application/vnd.github+json','User-Agent':'RebuildRadar/0.1'},
    signal:AbortSignal.timeout(5000)
  });
  if(!response.ok) throw new Error(`GitHub status ${response.status}`);
  const data=summarizeGitHub(await response.json());
  cache.set(repo,{at:now,data});
  return data;
}
