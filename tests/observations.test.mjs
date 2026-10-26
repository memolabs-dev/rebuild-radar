import test from 'node:test';
import assert from 'node:assert/strict';
import {previewJSONL,validateObservation} from '../scripts/preview-observations.mjs';
const item={schemaVersion:'0.1',subject:{name:'Demo',kind:'authorized-test-app'},capability:'Accueil',claimStatus:'unknown',collectedAt:'2026-10-26T10:00:00Z',source:{type:'manual-observation',reference:'local-observation-1'},limitations:['Private user note']};
test('accepts Mobile Explorer manual observation without exposing notes',()=>{
 assert.deepEqual(validateObservation(item),[]);
 const r=previewJSONL(JSON.stringify(item)+'\n');
 assert.equal(r[0].valid,true);
 assert.ok(!JSON.stringify(r).includes('Private user note'));
});
test('rejects unsubstantiated verified claim and unknown fields',()=>{
 assert.ok(validateObservation({...item,claimStatus:'verified'}).length);
 assert.ok(validateObservation({...item,secret:'do not share'}).length);
});
test('rejects invalid format and input limits',()=>{
 assert.equal(previewJSONL('{broken')[0].valid,false);
 assert.throws(()=>previewJSONL('a'.repeat(100),{maxBytes:50}),/too large/i);
 assert.throws(()=>previewJSONL('{}\n{}\n',{maxRows:1}),/Too many/);
});
