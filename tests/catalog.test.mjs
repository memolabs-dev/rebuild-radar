import test from 'node:test';
import assert from 'node:assert/strict';
import {software,allProjects,projectCount,verifyCatalog,findSoftware} from '../src/catalog.mjs';
import {summarizeGitHub,getGitHubMetadata} from '../src/github.mjs';

test('curated catalog has a valid traceable source on every project',()=>{
 assert.deepEqual(verifyCatalog(),[]);
 assert.ok(software.length>=8);
 assert.equal(allProjects.length,projectCount);
 assert.ok(allProjects.every(p=>p.evidence.level==='source-declared'&&p.evidence.url.startsWith('https://github.com/')));
});
test('only known evidence states are present',()=>{
 assert.ok(allProjects.every(p=>(p.features||[]).every(([feature,status])=>feature&&['declared','documented','partial','verified','unknown'].includes(status))));
 assert.ok(allProjects.every(p=>p.features.every(([,status])=>status!=='verified')),'No independent tests have yet run');
});
test('single software lookup is stable',()=>{
 assert.equal(findSoftware('photoshop').name,'Adobe Photoshop');
 assert.equal(findSoftware('missing'),undefined);
});
test('repository metadata is evidence of activity, not compatibility',()=>{
 const summary=summarizeGitHub({full_name:'acme/proj',html_url:'https://github.com/acme/proj',stargazers_count:41,forks_count:4,open_issues_count:2,archived:false,pushed_at:'2026-10-01T00:00:00Z'});
 assert.equal(summary.stars,41);
 assert.ok(!('compatibility' in summary));
 assert.throws(()=>summarizeGitHub({hello:123}),/Invalid/);
});
test('GitHub API rejects non-repository input without fetching',async()=>{
 await assert.rejects(()=>getGitHubMetadata('../../etc/passwd',{fetchImpl:()=>{throw Error('called')}}),/Invalid repository/);
});

test('catalog integrity catches misleading or inconsistent evidence',()=>{
 const app=structuredClone(software.find(s=>s.slug==='photoshop'));
 app.projects[0].features.push(['Capacité imaginaire','verified']);
 app.projects[1].evidence.url='https://example.invalid/not-the-repo';
 const errors=verifyCatalog([app]);
 assert.ok(errors.some(e=>e.includes('Unlisted feature claim')));
 assert.ok(errors.some(e=>e.includes('Unsupported verified claim')));
 assert.ok(errors.some(e=>e.includes('mismatched source')));
});
test('catalog integrity catches duplicate project IDs and unknown categories',()=>{
 const entries=structuredClone([software[0],software[1]]);
 entries[1].category='invalid-category';
 entries[1].projects[0].id=entries[0].projects[0].id;
 const errors=verifyCatalog(entries);
 assert.ok(errors.some(e=>e.includes('Duplicate project ID')));
 assert.ok(errors.some(e=>e.includes('Invalid category')));
});
