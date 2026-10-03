import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Official original media and published license metadata are frozen under ignored out/.
// This script does not synthesize events or identify deck work as maintenance.
const cache='out/part2-research';
const ua='RoyalNavyDocumentaryResearch/1.0 (educational documentary media archive)';
const run=(program,args,options={})=>execFileSync(program,args,{maxBuffer:32*1024*1024,...options});
const curl=(url)=>run('curl.exe',['-L','--fail','--silent','--show-error','--max-time','120','--retry','2','-A',ua,url]).toString();
const download=(url,file)=>{if(fs.existsSync(file)&&fs.statSync(file).size>1000)return;run('curl.exe',['-L','--fail','--silent','--show-error','--max-time','600','--retry','2','--retry-delay','8','-A',ua,'-o',file,url.split('?')[0]]);};
const plain=(v='')=>v.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const sha=(file)=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const probe=(file)=>JSON.parse(run('ffprobe',['-v','error','-show_format','-show_streams','-of','json',file]));
for(const dir of [cache,'public/images/part2','public/video/part2','data/part2'])fs.mkdirSync(dir,{recursive:true});

const photos=[
 {id:'anson-2022',title:'File:HMS Anson August 2022.jpg',role:'HMS Anson, Astute-class attack submarine. Commissioning at Barrow, not an SSBN or SSN-AUKUS.',date:'2022-08-31'},
 {id:'glasgow-construction-2021',title:'File:HMS Glasgow under construction in Govan.jpg',role:'Type 26 shipbuilding at Govan in 2021; not the 2025 build state.',date:'2021-06-29'},
 {id:'tiderace-ras-2021',title:'File:RFA Tiderace Dual RAS with HMS Lancaster and HMS Westminster.jpg',role:'Actual dual replenishment at sea: Tiderace between Lancaster and Westminster, Baltic region.',date:'2021-03-13'},
 {id:'proteus-2025',title:'File:K60 RFA Proteus Multi-Role Ocean Surveillance (MROS) ship.jpg',role:'RFA Proteus at Cammell Laird, not a recording of undersea cable patrol.',date:'2025-09-14'},
];
const videos=[
 {id:'richmond-2022',dvids:858020,page:'https://www.dvidshub.net/video/858020/british-royal-navy-visits-norfolk',date:'2022-09-20',author:'US Navy / Jonathan M. Wideman',license:'Public domain (US federal employee official duty)',role:'Type 23 HMS Richmond arrives at Norfolk. Port manoeuvres, not ASW engagement.'},
 {id:'merlin-2021',dvids:796773,page:'https://www.dvidshub.net/video/796773/hms-queen-elizabeth-participates-steadfast-defender-2021-off-coast-portugal',date:'2021-05-26',author:'NATO / Natochannel',license:'DVIDS item marked PUBLIC DOMAIN, no item-specific copyright restriction stated',role:'Royal Navy Merlin in Steadfast Defender 2021 off Portugal. Exercise context, not proof of combat or active sonar use.'},
 {id:'lyme-bay-2024',dvids:930677,page:'https://www.dvidshub.net/video/930677/b-roll-mrf-d-243-marines-conduct-mv-22b-osprey-carrier-qualifications-aboard-british-rfa-lyme-bay',date:'2024-07-11',author:'US Marine Corps / Sgt Cristian Bestul',license:'Public domain (US federal employee official duty)',role:'RFA Lyme Bay, MV-22B transport of Royal Marines and deck qualifications at Darwin. Neither tanker RAS nor engineering maintenance.'},
];
const extraVideo={id:'merlin-transport-2017',dvids:524702,page:'https://www.dvidshub.net/video/524702/jeanne-darc-mk3-merlin-helicopter-training',date:'2017-05-09',author:'US Marine Corps / Cpl David A. Diggs',license:'Public domain (US federal employee official duty)',role:'British Merlin Mk3 TRANSPORT familiarization training on French ship Mistral. NOT HM2, ASW, or a British ship deck.'};
const dvidsPhotos=[
 {id:'diamond-2024',dvids:8213201,page:'https://www.dvidshub.net/image/8213201/uss-mason-sails-alongside-hms-diamond-during-passenger-transfer-red-sea',date:'2024-01-13',author:'US Navy / Christopher J. Krucke',downloadUrl:'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2401/8213201/2000w_q95.jpg',role:'US Navy signal-lantern operator on USS Mason with HMS Diamond alongside. Passenger transfer in Red Sea; not a missile firing.'},
 {id:'merlin-hm2-2025',dvids:9185259,page:'https://www.dvidshub.net/image/9185259/george-washington-conducts-flight-operations',date:'2025-07-15',author:'US Navy / Ana Souza Young',downloadUrl:'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2507/9185259/2000w_q95.jpg',role:'Royal Navy Merlin HM2 approaches USS George Washington in Timor Sea, Talisman Sabre 2025. The image does not show an active ASW engagement.'},
];

if(process.argv.includes('--extras')){
 for(const p of dvidsPhotos){const html=curl(p.page);if(!/PUBLIC DOMAIN/.test(html)||/Asset contains copyrighted material/i.test(html))throw Error('Rights: '+p.id);fs.writeFileSync(`${cache}/${p.id}.html`,html);download(p.downloadUrl,`public/images/part2/${p.id}.jpg`);console.log('photo-ready',p.id);}
 const html=curl(extraVideo.page);if(!/PUBLIC DOMAIN/.test(html)||/Asset contains copyrighted material/i.test(html))throw Error('Rights: '+extraVideo.id);fs.writeFileSync(`${cache}/${extraVideo.id}.html`,html);
 extraVideo.candidates=[...new Set([...html.matchAll(/https?:[^\s"'<>]+\.mp4(?:\?[^\s"'<>]*)?/g)].map(x=>x[0].replace(/&amp;/g,'&')))];
 const records=JSON.parse(fs.readFileSync(`${cache}/video-metadata.json`));records.splice(0,records.length,...records.filter(x=>x.id!==extraVideo.id));records.push(extraVideo);fs.writeFileSync(`${cache}/video-metadata.json`,JSON.stringify(records,null,2));
}

if(process.argv.includes('--metadata')){
 const records=[];
 for(const item of photos){
  const url='https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',titles:item.title,prop:'imageinfo',iiprop:'url|extmetadata|size|mime'});
  const response=JSON.parse(curl(url));const info=Object.values(response.query.pages)[0].imageinfo?.[0];if(!info)throw Error('No imageinfo: '+item.title);
  const ext=info.extmetadata;
  const record={...item,kind:'photo',file:`public/images/part2/${item.id}.jpg`,sourcePage:info.descriptionurl,downloadUrl:info.url,width:info.width,height:info.height,author:plain(ext.Artist?.value),license:plain(ext.LicenseShortName?.value),licenseUrl:plain(ext.LicenseUrl?.value),credit:plain(ext.Credit?.value),description:plain(ext.ImageDescription?.value),permission:plain(ext.Permission?.value),raw:info};
  records.push(record);console.log(item.id,record.license,record.width,record.height);
 }
 fs.writeFileSync(`${cache}/photo-metadata.json`,JSON.stringify(records,null,2));
 for(const v of videos){
  const html=curl(v.page);fs.writeFileSync(`${cache}/${v.id}.html`,html);
  if(/Asset contains copyrighted material|not licensed for distribution/i.test(html))throw Error('Copyright restriction: '+v.id);
  if(!/PUBLIC DOMAIN/.test(html))throw Error('No license marker: '+v.id);
  const mp4=[...new Set([...html.matchAll(/https?:[^\s"'<>]+\.mp4(?:\?[^\s"'<>]*)?/g)].map(x=>x[0].replace(/&amp;/g,'&')))];
  console.log(v.id,JSON.stringify(mp4));v.candidates=mp4;
 }
 fs.writeFileSync(`${cache}/video-metadata.json`,JSON.stringify(videos,null,2));
 const diamondPage='https://www.dvidshub.net/image/8213201/uss-mason-sails-alongside-hms-diamond-during-passenger-transfer-red-sea';
 const diamondHtml=curl(diamondPage);fs.writeFileSync(`${cache}/diamond-2024.html`,diamondHtml);
 console.log('diamond-jpgs',JSON.stringify([...new Set([...diamondHtml.matchAll(/https?:[^\s"'<>]+\.jpg/g)].map(x=>x[0]))]));
}

if(process.argv.includes('--download-photos')){
 const records=JSON.parse(fs.readFileSync(`${cache}/photo-metadata.json`));
 for(const p of records){
  if(!/OGL|CC BY 4\.0/i.test(p.license))throw Error('Review license: '+p.id+' '+p.license);
  const original=`${cache}/${p.id}-original.jpg`;download(p.downloadUrl,original);
  // Retain usable stills at <=3840px with original aspect. Metadata is preserved separately.
  run('ffmpeg',['-hide_banner','-loglevel','error','-y','-threads','2','-i',original,'-vf',"scale=w='min(3840,iw)':h=-2",'-frames:v','1','-q:v','2',p.file]);
  console.log('photo-ready',p.file);
 }
}

if(process.argv.includes('--download-videos')){
 const records=JSON.parse(fs.readFileSync(`${cache}/video-metadata.json`));
 for(const v of records.filter(x=>x.id!=='merlin-2021')){
  if(!v.candidates?.length)throw Error('No download candidate: '+v.id);
  const candidate=v.downloadUrl??v.candidates.find(x=>/1920x1080|1080p|hd\./i.test(x))??v.candidates[0];
  const original=`${cache}/${v.id}-original.mp4`;download(candidate,original);v.downloadUrl=candidate;v.original=original;v.probe=probe(original);v.originalSha256=sha(original);
  fs.writeFileSync(`${cache}/video-metadata.json`,JSON.stringify(records,null,2));
  console.log('video-ready',v.id,v.probe.format.duration,v.probe.streams[0].width,v.probe.streams[0].height);
 }
}

if(process.argv.includes('--sheets')){
 for(const v of JSON.parse(fs.readFileSync(`${cache}/video-metadata.json`)).filter(x=>x.id!=='merlin-2021')){
  const file=`${cache}/${v.id}-original.mp4`;const p=probe(file);const interval=Number(p.format.duration)/30;
  run('ffmpeg',['-hide_banner','-loglevel','error','-y','-threads','2','-i',file,'-vf',`fps=1/${interval},scale=320:-2,drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='%{pts\\:hms}':x=10:y=10:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.7,tile=5x6`,'-frames:v','1','-q:v','2',`${cache}/${v.id}-contact.jpg`]);
  console.log('sheet',v.id);
 }
}

// Boundaries selected after source contact sheets and dense one-second filmstrip review.
const takes=[
 {id:'richmond-broadside',sourceId:'richmond-2022',start:123,duration:8,activity:'Continuous camera pan across Type 23 superstructure and visible F239 hull marking.',shortCredit:'US Navy · HMS Richmond · 2022',suggestedUse:'Type 23 identity / frigate replacement, in documentary inset at native 1280×720.'},
 {id:'richmond-bow',sourceId:'richmond-2022',start:134,duration:8,activity:'Continuous distant bow view of HMS Richmond approaching with a tug at Norfolk.',shortCredit:'US Navy · Norfolk · 2022',suggestedUse:'Port transit / fleet identity. Small subject; avoid aggressive crop or claiming ocean ASW.'},
 {id:'lyme-bay-deck',sourceId:'lyme-bay-2024',start:86.2,duration:7.5,activity:'RFA deck personnel handle a hose beside a US MV-22B Osprey during deck servicing.',shortCredit:'USMC · RFA Lyme Bay · 2024',suggestedUse:'Logistics and deck servicing. Not engine maintenance or ship-to-ship tanker RAS.'},
 {id:'lyme-bay-transfer',sourceId:'lyme-bay-2024',start:172.4,duration:9,activity:'Deck crew and personnel move around the landed MV-22B on RFA Lyme Bay.',shortCredit:'USMC · RFA Lyme Bay · 2024',suggestedUse:'Personnel movement / teamwork / availability. US aircraft on British auxiliary ship.'},
 {id:'merlin-mk3-crew',sourceId:'merlin-transport-2017',start:83.3,duration:6.5,activity:'Personnel inside British Merlin Mk3 transport cabin; occupants begin to stand and prepare to move.',shortCredit:'USMC · Merlin Mk3 · 2017',suggestedUse:'Crew / transport / cooperation. Not HM2 or ASW, not engineering maintenance.'},
 {id:'merlin-mk3-flight',sourceId:'merlin-transport-2017',start:125,duration:8,activity:'British Merlin Mk3 lifts and flies away from French ship Mistral; camera follows its motion.',shortCredit:'USMC · Merlin Mk3 · 2017',suggestedUse:'Transport aviation / cooperation. Not an ASW helicopter sortie.'},
];

if(process.argv.includes('--build')){
 const only=process.argv.find(x=>x.startsWith('--only='))?.slice(7);
 for(const t of takes.filter(x=>!only||only.split(',').includes(x.id))){
  const source=`${cache}/${t.sourceId}-original.mp4`;const file=`public/video/part2/${t.id}.mp4`;
  run('ffmpeg',['-hide_banner','-loglevel','error','-y','-threads','2','-ss',String(t.start),'-i',source,'-t',String(t.duration+0.1),'-map','0:v:0','-an','-vf','fps=30,setsar=1','-frames:v',String(Math.round(t.duration*30)),'-c:v','libx264','-preset','fast','-crf','19','-maxrate','14M','-bufsize','28M','-pix_fmt','yuv420p','-g','30','-threads','2','-movflags','+faststart',file]);
  const p=probe(file);const v=p.streams[0];if(p.streams.some(s=>s.codec_type==='audio')||v.avg_frame_rate!=='30/1'||Number(v.nb_frames)!==Math.round(t.duration*30)||Math.abs(Number(p.format.duration)-t.duration)>0.005)throw Error('Clip validation: '+t.id);
  console.log('take-ready',t.id,v.width,v.height,p.format.duration,fs.statSync(file).size);
 }
}

if(process.argv.includes('--take-sheets')){
 for(const t of takes){
  const file=`public/video/part2/${t.id}.mp4`;
  run('ffmpeg',['-hide_banner','-loglevel','error','-y','-threads','2','-i',file,'-vf',`fps=3/${t.duration},scale=480:-2,tile=3x1`,'-frames:v','1','-q:v','2',`${cache}/${t.id}-take.jpg`]);
 }
}

if(process.argv.includes('--manifest')){
 const originals=JSON.parse(fs.readFileSync(`${cache}/video-metadata.json`));
 const photoRecords=JSON.parse(fs.readFileSync(`${cache}/photo-metadata.json`)).map(p=>{
  const {raw,...rest}=p;const original=`${cache}/${p.id}-original.jpg`;const data=fs.readFileSync(original).toString('utf8');
  const xmp=data.match(/<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/)?.[0]??null;
  return {...rest,downloadUrl:p.downloadUrl.split('?')[0],originalSha256:sha(original),originalMetadata:raw.extmetadata,embeddedXmp:xmp,licenseNote:p.license.startsWith('OGL')?'Commons license box: OGL v1.0. Original UK MOD metadata specifies OGL v3.0 and Crown copyright. Both records preserved; attribute MOD/Crown and photographer; do not suggest endorsement.':null};
 });
 for(const p of dvidsPhotos)photoRecords.push({...p,kind:'photo',file:`public/images/part2/${p.id}.jpg`,sourcePage:p.page,license:'Public domain (US federal employee official duty)',licenseUrl:'https://www.dvidshub.net/about/copyright',licenseNote:'DVIDS published 2000px derivative; not falsely described as original full-resolution photograph.'});
 for(const p of photoRecords){const stat=fs.statSync(p.file);const stream=probe(p.file).streams[0];p.bytes=stat.size;p.sha256=sha(p.file);p.width=stream.width;p.height=stream.height;p.inspected=true;}
 const clips=takes.map(t=>{
  const v=originals.find(x=>x.id===t.sourceId);const file=`public/video/part2/${t.id}.mp4`;const p=probe(file);const s=p.streams[0];
  return {...t,kind:'video',file,sourcePage:v.page,downloadUrl:v.downloadUrl,sourceDate:v.date,author:v.author,license:v.license,licenseUrl:'https://www.dvidshub.net/about/copyright',sourceRole:v.role,sourceStartSeconds:t.start,sourceEndSeconds:Number((t.start+t.duration).toFixed(3)),durationSeconds:Number(p.format.duration),frames:Number(s.nb_frames),fps:30,width:s.width,height:s.height,audio:false,loop:false,retimed:false,bytes:fs.statSync(file).size,sha256:sha(file),sourceSha256:v.originalSha256,inspected:true,inspection:'Source full contact sheet, dense interval filmstrip, and output early/middle/late contact sheet.'};
 });
 const manifest={version:1,retrieved:'2026-10-03',scope:'Royal Navy Part2 local media. Archival dates remain explicit; media do not document April2025 operational availability.',processing:'Photos retain original aspect and are reduced to <=3840px. Videos retain native dimensions/aspect, 30fps, silent H.264, no loops or retiming. No generative alteration. Original sources are in ignored out/part2-research.',photos:photoRecords,video:clips,excluded:[{id:'merlin-2021',dvids:796773,sourcePage:videos.find(x=>x.id==='merlin-2021').page,reason:'DVIDS PUBLIC DOMAIN label conflicts with NATO external-use terms restricting sale/advertising and reserving removal. Not downloaded as source, not cut, not included in public/.',termsUrl:'https://www.nato.int/cps/en/natohq/68162.htm'},{id:'ras-808640',sourcePage:'https://www.dvidshub.net/video/808640/vmfa-211-conducts-routine-operations-south-china-sea',reason:'DVIDS explicitly states copyrighted portions are not licensed for distribution.'}]};
 fs.writeFileSync('data/part2/media-sources.json',JSON.stringify(manifest,null,2)+'\n');
 const lines=['# Part2 — fontes de mídia','','Seis tomadas de três fontes oficiais US Navy/USMC; sete fotografias, incluindo o perfil adicional do HMS Daring. As datas de arquivo não são evidência da prontidão da frota em abril de 2025.','','## Fotografias','','| Arquivo | Fonte / data | Licença / uso correto |','|---|---|---|',...photoRecords.map(p=>`| \`${p.file}\` | [Fonte](${p.sourcePage}) · ${p.date} | ${p.license}. ${p.role} |`),'','As fotografias MOD têm caixa Commons OGL v1.0 e metadados originais OGL v3.0. O JSON preserva os dados originais e XMP quando presente, crédito Crown e a divergência; não converter silenciosamente uma licença na outra. A foto Proteus exige crédito Steve Knight / CC BY 4.0 e indicação do redimensionamento.','','## Tomadas contínuas','','| Arquivo | Intervalo na fonte | Duração / dimensão | Crédito / atividade |','|---|---|---|',...clips.map(t=>`| \`${t.file}\` | ${t.sourceStartSeconds.toFixed(2)}–${t.sourceEndSeconds.toFixed(2)}s | ${t.durationSeconds}s · ${t.width}×${t.height} | [Fonte](${t.sourcePage}) · ${t.sourceDate} · ${t.author}. ${t.activity} |`),'','Todos os clipes são 30fps, H.264, sem áudio, sem loop, sem câmera artificial incorporada, sem alteração da velocidade e com aspecto nativo preservado. Richmond 720p e Merlin Mk3 576p devem preferencialmente ocupar painéis documentais; não inventar resolução por upscale.','','## Limites editoriais','','- Merlin Mk3 é transporte. Nunca usar suas tomadas para afirmar HM2, sonar ou ASW.','- Merlin HM2 aparece somente na fotografia de aproximação, sem atividade ASW visível.','- O convés do Merlin Mk3 é do Mistral francês; o convés do MV-22 é do RFA Lyme Bay.','- Manuseio de mangueira e circulação de pessoal não devem ser descritos como manutenção de motores.','- Diamond aparece ao fundo; os operadores em primeiro plano são US Navy a bordo do USS Mason.','- Anson é Astute; não Vanguard, Dreadnought ou futuro SSN-AUKUS.','- Proteus está no estaleiro; nenhum registro de patrulha de cabos foi encontrado neste conjunto.','','## Exclusões de direitos','','- NATO/DVIDS 796773: excluído pelo conflito entre selo PD e [condições NATO](https://www.nato.int/cps/en/natohq/68162.htm).','- DVIDS 808640: excluído por aviso explícito de partes protegidas e não licenciadas para distribuição.','','## Reprodução e verificação','','Execute em sequência:','','```sh','node scripts/fetch-part2-media.mjs --metadata','node scripts/fetch-part2-media.mjs --extras','node scripts/fetch-part2-media.mjs --download-photos --download-videos --sheets','node scripts/fetch-part2-media.mjs --build --take-sheets --manifest','node scripts/fetch-part2-daring.mjs','```','','A etapa Daring deve ser executada após `--manifest`: o gerador principal recompõe o catálogo-base e a etapa complementar restaura a sétima fotografia e seu crédito. Repita essa etapa sempre que regenerar o manifesto principal.','','Originais e folhas de contato ficam somente em `out/part2-research`, ignorado pelo Git. SHA-256, dimensão, duração, intervalo, licença e autoria por arquivo constam do JSON. As folhas de contato dos originais, intervalos selecionados e tomadas finais foram inspecionadas visualmente. Nenhum Chrome/Remotion foi iniciado.',''];
 fs.writeFileSync('data/part2/media-sources.md',lines.join('\n'));
 console.log('manifest-ready',photoRecords.length,'photos',clips.length,'clips');
}
