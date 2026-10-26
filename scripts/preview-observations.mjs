import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const isObj=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const text=x=>typeof x==='string'&&x.trim().length>0;
const permitted=['schemaVersion','subject','capability','claimStatus','collectedAt','source','environment','limitations','artifacts'];
export function validateObservation(o){
 const e=[];
 if(!isObj(o))return ['Expected an object'];
 for(const key of Object.keys(o))if(!permitted.includes(key))e.push('Unexpected '+key);
 if(o.schemaVersion!=='0.1')e.push('schemaVersion');
 if(!text(o.capability))e.push('capability');
 if(!['unknown','declared','documented','partial','verified'].includes(o.claimStatus))e.push('claimStatus');
 if(!text(o.collectedAt)||Number.isNaN(Date.parse(o.collectedAt))||!/^\d{4}-\d\d-\d\dT/.test(o.collectedAt))e.push('collectedAt');
 if(!isObj(o.subject)||!text(o.subject.name)||!['proprietary-original','open-source-project','authorized-test-app'].includes(o.subject.kind))e.push('subject');
 else for(const k of Object.keys(o.subject))if(!['name','kind','repositoryUrl','bundleId','version'].includes(k))e.push('subject.'+k);
 if(!isObj(o.source)||!['repository','release-note','manual-observation','automated-test'].includes(o.source.type)||!text(o.source.reference))e.push('source');
 else for(const k of Object.keys(o.source))if(!['type','reference','reviewer','testRunId'].includes(k))e.push('source.'+k);
 if(o.claimStatus==='verified'&&(o.source?.type!=='automated-test'||!text(o.source?.testRunId)))e.push('Unsubstantiated verified claim');
 if(o.limitations!==undefined&&(!Array.isArray(o.limitations)||o.limitations.some(x=>typeof x!=='string')))e.push('limitations');
 if(o.environment!==undefined&&(!isObj(o.environment)||Object.values(o.environment).some(x=>typeof x!=='string')))e.push('environment');
 if(o.artifacts!==undefined&&(!Array.isArray(o.artifacts)||o.artifacts.some(x=>{try{return !['https:','http:'].includes(new URL(x).protocol)}catch{return true}})))e.push('artifacts');
 return e;
}
export function previewJSONL(content,{maxBytes=1048576,maxRows=500}={}){
 if(Buffer.byteLength(content)>maxBytes)throw Error('File too large');
 const lines=content.split(/\r?\n/).filter(Boolean);
 if(lines.length>maxRows)throw Error('Too many rows');
 return lines.map((line,i)=>{try{const x=JSON.parse(line),errors=validateObservation(x);return {line:i+1,valid:errors.length===0,errors}}catch{return {line:i+1,valid:false,errors:['Malformed JSON']}}});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const filename=process.argv[2];
 if(!filename){console.error('Usage: node scripts/preview-observations.mjs export.jsonl');process.exit(2)}
 try{const report=previewJSONL(readFileSync(filename,'utf8'));for(const row of report)console.log(JSON.stringify(row));console.log(JSON.stringify({total:report.length,valid:report.filter(x=>x.valid).length,publication:'disabled'}));if(report.some(x=>!x.valid))process.exitCode=1}catch(e){console.error(e.message);process.exitCode=2}
}