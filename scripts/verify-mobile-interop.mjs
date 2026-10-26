import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {previewJSONL} from './preview-observations.mjs';

if(process.platform!=='darwin'){
 console.error('Interop test requires macOS and Swift/Xcode');
 process.exit(2);
}
const ref=process.env.MOBILE_EXPLORER_REF||'main';
if(!/^[A-Za-z0-9][A-Za-z0-9_./-]*$/.test(ref)||ref.includes('..')){
 console.error('Invalid Mobile Explorer ref');
 process.exit(2);
}
const temp=mkdtempSync(path.join(tmpdir(),'mobile-radar-interop-'));
const repo=path.join(temp,'mobile-explorer');
const file=path.join(temp,'actual-export.jsonl');
function run(command,args,options={}){
 const result=spawnSync(command,args,{encoding:'utf8',timeout:180000,...options});
 if(result.error||result.status!==0){
  console.error(command+' failed: '+(result.stderr||result.error?.message||'').slice(-1000));
  throw new Error(command+' exited with '+result.status);
 }
}
try{
 run('git',['clone','--quiet','--depth','1','--branch',ref,'https://github.com/memolabs-dev/mobile-explorer.git',repo]);
 run('swift',['test','--quiet','--filter','testExportFixtureForRadarInterop'],{cwd:repo,env:{...process.env,INTEROP_FIXTURE_FILE:file}});
 const report=previewJSONL(readFileSync(file,'utf8'));
 if(report.length!==1||!report[0].valid)throw new Error('Contract mismatch: '+JSON.stringify(report));
 console.log(JSON.stringify({result:'PASS',swiftExporter:'Mobile Explorer',radarValidator:'Rebuild Radar',rows:1,valid:1,publication:'disabled',deviceAccess:'not-required'}));
}finally{rmSync(temp,{recursive:true,force:true})}
