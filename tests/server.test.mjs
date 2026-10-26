import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {makeServer} from '../src/server.mjs';

async function serve(fn){const server=makeServer({github:async repo=>({fullName:repo,stars:42})});server.listen(0,'127.0.0.1');await once(server,'listening');try{return await fn(`http://127.0.0.1:${server.address().port}`)}finally{await new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()))}}
test('health endpoint returns real seed counts',async()=>serve(async url=>{const r=await fetch(url+'/api/health');assert.equal(r.status,200);const b=await r.json();assert.equal(b.ok,true);assert.equal(b.seedValidated,true);assert.ok(b.software>0);assert.ok(b.projects>0)}));
test('catalog endpoint emits canonical software',async()=>serve(async url=>{const r=await fetch(url+'/api/catalog');const b=await r.json();assert.equal(r.status,200);assert.ok(b.software.some(s=>s.slug==='photoshop'));assert.ok(b.disclaimer.includes('not independent'))}));
test('known and unknown apps distinguish 200 and 404',async()=>serve(async url=>{assert.equal((await fetch(url+'/api/apps/photoshop')).status,200);assert.equal((await fetch(url+'/api/apps/unknown')).status,404)}));
test('only allowlisted GitHub repos are proxied',async()=>serve(async url=>{const yes=await fetch(url+'/api/github/storytold%2Fphotocraft');assert.equal(yes.status,200);assert.equal((await yes.json()).repository.stars,42);const no=await fetch(url+'/api/github/other%2Fsecret');assert.equal(no.status,404)}));
test('serve SPA and assets with restrictive CSP',async()=>serve(async url=>{const r=await fetch(url+'/');assert.equal(r.status,200);assert.match(await r.text(),/Rebuild Radar/);assert.match(r.headers.get('content-security-policy'),/default-src/);assert.equal((await fetch(url+'/styles.css')).status,200)}));
test('reject unsupported methods and routes',async()=>serve(async url=>{assert.equal((await fetch(url+'/api/catalog',{method:'POST'})).status,405);assert.equal((await fetch(url+'/foo')).status,404)}));
