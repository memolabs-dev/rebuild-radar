import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {validateObservation,previewJSONL} from '../public/evidence.js';
export {validateObservation,previewJSONL};
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const filename=process.argv[2];
 if(!filename){console.error('Usage: node scripts/preview-observations.mjs export.jsonl');process.exit(2)}
 try{const report=previewJSONL(readFileSync(filename,'utf8'));for(const row of report)console.log(JSON.stringify(row));console.log(JSON.stringify({total:report.length,valid:report.filter(x=>x.valid).length,publication:'disabled'}));if(report.some(x=>!x.valid))process.exitCode=1}catch(e){console.error(e.message);process.exitCode=2}
}