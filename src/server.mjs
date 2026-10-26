import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {categories,software,findSoftware,allProjects,verifyCatalog,projectCount} from './catalog.mjs';
import {getGitHubMetadata} from './github.mjs';

const publicRoot=fileURLToPath(new URL('../public/',import.meta.url));
const assetTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const json=(res,status,obj)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(obj));};
const escapeRoute=route=>decodeURIComponent(route);

export function makeServer({github=getGitHubMetadata}={}) {
  return createServer(async (req,res)=>{
    try {
      const u=new URL(req.url,'http://localhost');
      if(req.method!=='GET') return json(res,405,{error:'method_not_allowed'});
      if(u.pathname==='/api/health') return json(res,200,{ok:true,software:software.length,projects:projectCount,seedValidated:verifyCatalog().length===0});
      if(u.pathname==='/api/catalog') return json(res,200,{categories,software,disclaimer:'Statuses are attributed, not independent benchmarks.',updatedAt:'2026-10-16'});
      if(u.pathname==='/api/projects') return json(res,200,{projects:allProjects});
      if(u.pathname.startsWith('/api/apps/')) {
        const slug=escapeRoute(u.pathname.slice('/api/apps/'.length));
        const found=findSoftware(slug);
        return found?json(res,200,{software:found}):json(res,404,{error:'not_found'});
      }
      if(u.pathname.startsWith('/api/github/')) {
        const repo=escapeRoute(u.pathname.slice('/api/github/'.length));
        if(!allProjects.some(p=>p.repository===repo)) return json(res,404,{error:'unknown_project'});
        try {return json(res,200,{repository:await github(repo)});}
        catch(error) {return json(res,503,{error:'github_unavailable',detail:String(error.message).slice(0,120)});}
      }
      const mapped=u.pathname==='/'?'/index.html':u.pathname;
      if(!['/index.html','/app.js','/styles.css','/favicon.svg'].includes(mapped)) return json(res,404,{error:'not_found'});
      const target=path.join(publicRoot,mapped.slice(1));
      const body=await readFile(target);
      const s=await stat(target);
      res.writeHead(200,{'content-type':assetTypes[path.extname(target)],'content-length':s.size,'cache-control':'public, max-age=600','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','content-security-policy':"default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'"});
      res.end(body);
    }catch(e){json(res,500,{error:'internal_error'});}
  });
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
 const port=Number(process.env.PORT)||3000;
 makeServer().listen(port,process.env.HOST || '127.0.0.1',()=>console.log(`Rebuild Radar: http://127.0.0.1:${port}`));
}
