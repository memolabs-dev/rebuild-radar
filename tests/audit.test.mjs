import test from 'node:test';
import assert from 'node:assert/strict';
import {auditRepositories} from '../scripts/audit-repositories.mjs';

test('source audit deduplicates repeated repositories and never infers compatibility', async () => {
  const seen = [];
  const audit = await auditRepositories({
    observedAt: '2026-10-26T00:00:00Z',
    fetchImpl: async url => {
      seen.push(url);
      return {ok: true, status: 200, json: async () => ({
        full_name: url.split('/repos/')[1],
        archived: false,
        private: false,
        license: {spdx_id: 'MIT'},
        description: 'Read-only mirror of upstream',
        updated_at: '2026-10-25T00:00:00Z'
      })};
    }
  });
  assert.equal(audit.referenceCount, 19);
  assert.equal(audit.uniqueRepositoryCount, 18);
  assert.equal(seen.length, 18);
  assert.equal(audit.summary.accessible, 18);
  assert.equal(audit.summary.mirrorHints, 18);
  assert.ok(!('compatibility' in audit.results[0]));
});
test('rate limits and failures are unresolved, not missing or verified', async () => {
  const audit = await auditRepositories({
    repositories: ['acme/rate-limited', 'acme/gone', 'acme/failed'],
    fetchImpl: async url => {
      if (url.includes('failed')) throw Error('offline');
      return {status: url.includes('rate-limited') ? 403 : 404, ok: false};
    }
  });
  assert.deepEqual(audit.results.map(x => x.status), ['rate-limited', 'not-found', 'network-error']);
  assert.equal(audit.summary.accessible, 0);
});
test('license NOASSERTION and renamed repository are not silently validated', async () => {
  const audit = await auditRepositories({
    repositories: ['org/old'],
    fetchImpl: async () => ({ok: true, status: 200, json: async () => ({
      full_name: 'org/new', private:false, archived:false,
      license:{spdx_id:'NOASSERTION'},description:'Project'
    })})
  });
  assert.equal(audit.results[0].status, 'redirected');
  assert.equal(audit.results[0].license, null);
});
