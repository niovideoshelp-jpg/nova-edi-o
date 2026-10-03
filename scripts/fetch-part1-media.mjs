import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import crypto from 'node:crypto';

const ua='RoyalNavyDocumentaryResearch/1.0 (public educational media project)';
const curl=(url)=>execFileSync('curl.exe',['-L','--fail','--silent','--show-error','--max-time','90','--retry','3','--retry-delay','5','-A',ua,url],{maxBuffer:100*1024*1024});
const api=(params)=>JSON.parse(curl('https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',...params})));
const plain=(v='')=>v.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
fs.mkdirSync('out/part1-research',{recursive:true});

if(process.argv.includes('--scout')) {
 const queries=['convoy 1942 filetype:video','"Royal Navy" 1916 filetype:video','shipbuilding 1943 filetype:video','Atlantic 1943 filetype:video'];
 const results=[];
 for(const q of queries){const response=api({list:'search',srnamespace:'6',srlimit:'12',srsearch:q});results.push({q,response});console.log(q,JSON.stringify(response.query?.search?.map(x=>x.title)));}
 fs.writeFileSync('out/part1-research/search.json',JSON.stringify(results,null,2));
 process.exit(0);
}

const photos=[
 {id:'grand-fleet-highres',title:'File:The Royal Navy during the First World War Q18121.jpg'},
 {id:'jutland-lion',title:'File:The Battle of Jutland 31 May 1916 SP1704.jpg'},
 {id:'prince-of-wales-1941',title:'File:HMS PRINCE OF WALES arrives at Singapore, 4 December 1941. A6784.jpg'},
 {id:'repulse-1941',title:'File:HMS Repulse leaving Singapore.jpg'},
];
const all=[];
for(const item of photos){
 const response=api({titles:item.title,prop:'imageinfo',iiprop:'url|extmetadata|size|mime'});
 const page=Object.values(response.query.pages)[0];const info=page.imageinfo?.[0];if(!info)throw new Error(`Missing ${item.title}`);
 const ext=info.extmetadata??{};
 const record={...item,kind:'photo',file:`public/images/part1/${item.id}.jpg`,page:info.descriptionurl,url:info.url,width:info.width,height:info.height,license:plain(ext.LicenseShortName?.value),licenseUrl:ext.LicenseUrl?.value??null,credit:plain(ext.Credit?.value),author:plain(ext.Artist?.value),date:plain(ext.DateTimeOriginal?.value),description:plain(ext.ImageDescription?.value),permission:plain(ext.Permission?.value),raw:info};
 all.push(record);console.log(JSON.stringify({...record,raw:undefined}));
}
fs.writeFileSync('out/part1-research/photo-metadata.json',JSON.stringify(all,null,2));
if(process.argv.includes('--download-photos')){
 fs.mkdirSync('public/images/part1',{recursive:true});
 for(const item of all){if(!/public domain/i.test(item.license))throw new Error(`License needs review: ${item.id}: ${item.license}`);item.url=item.url.split('?')[0];const bytes=fs.existsSync(item.file)?fs.readFileSync(item.file):curl(item.url);fs.writeFileSync(item.file,bytes);item.bytes=bytes.length;item.sha256=crypto.createHash('sha256').update(bytes).digest('hex');delete item.raw;}
 fs.mkdirSync('data/part1',{recursive:true});
 const previous=fs.existsSync('data/part1/media-sources.json')?JSON.parse(fs.readFileSync('data/part1/media-sources.json','utf8')):{};
 fs.writeFileSync('data/part1/media-sources.json',JSON.stringify({...previous,retrieved:'2026-10-03',photos:all,video:previous.video??[]},null,2));
}
