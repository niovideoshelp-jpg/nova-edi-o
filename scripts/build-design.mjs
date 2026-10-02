import fs from 'node:fs';
import crypto from 'node:crypto';
const put=(p,v)=>fs.writeFileSync(p,typeof v==='string'?v:JSON.stringify(v,null,2));
const raw=JSON.parse(fs.readFileSync('data/transcript.raw.json','utf8'));
const words=raw.segments.flatMap(s=>s.words).map((w,i)=>({id:i,text:w.word.trim().replace('Hymast','Highmast').replace('Numenor','Númenor'),startMs:Math.round(w.start*1000),endMs:Math.round(w.end*1000),timestampMs:Math.round(w.start*1000),confidence:null}));
put('data/words.json',words);
put('data/transcript.txt',raw.segments.map(s=>s.text.trim().replace('Hymast','Highmast').replace('Numenor','Númenor')).join('\n'));
// All path geometry is original, schematic and deliberately consistent: 4-unit strokes.
const p=(d,fill='steel',accent=false)=>({d,fill,accent});
const line=d=>p(d,'none');
const circle=(x,y,r)=>`M ${x-r} ${y} a ${r} ${r} 0 1 0 ${r*2} 0 a ${r} ${r} 0 1 0 ${-r*2} 0`;
const uk=[p('M310 52 L354 64 341 91 359 114 332 138 350 160 330 191 344 218 329 246 357 266 350 300 372 323 361 341 325 348 301 372 259 384 223 376 247 357 271 347 265 328 241 325 226 305 250 296 255 275 269 255 262 235 280 223 279 202 266 190 283 174 278 153 292 131 278 115 300 101 289 87 Z'),p('M227 226 L247 242 241 264 218 277 196 269 199 246 Z')];
const globe=[line(circle(300,220,166)),line('M134 220 H466 M157 140 Q300 190 443 140 M157 300 Q300 250 443 300 M300 54 C200 112 200 328 300 386 M300 54 C400 112 400 328 300 386 M300 54 V386'),p('M185 126 L238 104 274 123 257 160 277 185 250 223 221 213 206 177 177 166 Z'),p('M300 246 L331 232 355 254 345 294 313 346 294 310 Z'),p('M349 119 L415 146 439 184 406 207 371 190 339 208 319 178 Z')];
const carrier=[p('M63 274 L512 274 548 253 530 304 475 333 111 333 79 310 Z'),p('M88 254 L497 254 529 270 69 270 Z'),p('M217 210 L274 210 286 254 211 254 Z'),p('M354 199 L402 199 417 254 346 254 Z'),line('M239 210 V153 M218 170 H266 M374 199 V141 M350 158 H398 M104 295 H510 M141 313 H468'),p('M224 224 H270 V237 H224 Z','white'),p('M356 214 H401 V228 H356 Z','white'),line('M97 350 Q132 340 165 350 T233 350 T301 350 T369 350 T437 350 T505 350')];
const carrierTop=[p('M214 54 L336 54 386 98 394 338 341 388 214 388 Z'),line('M243 80 V361 M270 80 V361 M294 80 V361'),p('M341 139 H373 V190 H341 Z'),p('M341 223 H373 V274 H341 Z'),p('M278 297 L286 271 294 297 318 314 293 309 292 333 279 333 278 309 256 314 Z','gold',true)];
const sail=[p('M94 290 H510 L470 344 H159 Z'),line('M282 84 V289 M396 136 V289'),p('M269 100 Q218 152 192 217 H269 Z','white'),p('M296 102 Q332 148 337 217 H296 Z'),p('M384 147 Q350 180 345 235 H384 Z','white'),p('M409 147 Q445 183 452 235 H409 Z'),line('M161 270 L282 87 474 270 M127 365 Q168 350 209 365 T291 365 T373 365 T455 365')];
const jet=[p('M300 56 L316 143 343 188 445 251 454 285 345 260 330 313 367 348 370 367 315 350 300 376 285 350 230 367 233 348 270 313 255 260 146 285 155 251 257 188 284 143 Z'),p('M300 123 Q320 167 300 196 Q280 167 300 123 Z','gold',true),line('M287 212 L280 291 M313 212 L320 291 M172 263 L261 233 M428 263 L339 233 M288 339 H312')];
const escort=[p('M73 284 H518 L490 329 H126 Z'),p('M228 212 H342 L372 284 H199 Z'),p('M339 252 H435 V284 H339 Z'),line('M284 212 V132 M259 157 H314 M284 171 L327 207 M147 283 V260 H205 M183 260 L215 247 M98 345 Q139 333 180 345 T262 345 T344 345 T426 345 T508 345'),p('M241 230 H309 V244 H241 Z','white')];
const shield=[p('M300 62 L433 116 V230 Q423 330 300 386 Q177 330 167 230 V116 Z'),line('M300 98 L397 138 V229 Q387 298 300 346 Q213 298 203 229 V138 Z'),p('M287 152 H313 V211 H370 V237 H313 V297 H287 V237 H230 V211 H287 Z','gold',true)];
const ring= [line(circle(300,220,150)),line(circle(300,220,102)),line(circle(300,220,54)),line('M300 55 V385 M135 220 H465'),line('M300 220 L412 112'),p(circle(360,183,10),'gold',true),p(circle(230,280,8),'white')];
const route=[...globe.slice(0,2),p('M176 183 Q290 77 423 222','none',true),p(circle(176,183,9),'gold',true),p(circle(423,222,9),'gold',true),line('M401 208 L424 223 425 195')];
const box=[p('M190 151 L300 92 410 151 V297 L300 358 190 297 Z'),line('M190 151 L300 214 410 151 M300 214 V358 M248 120 L357 182 V238'),p('M222 247 L267 273 V303 L222 277 Z','gold',true)];
const anchor=[line(circle(300,112,34)),line('M300 146 V347 M228 195 H372 M161 260 Q166 339 300 366 Q434 339 439 260 M160 260 L145 296 M160 260 L196 272 M440 260 L455 296 M440 260 L404 272'),p('M285 181 H315 V341 H285 Z','gold',true)];
const book=[p('M300 143 Q216 92 129 128 V323 Q219 287 300 339 Q381 287 471 323 V128 Q384 92 300 143 Z'),line('M300 143 V339 M158 157 Q219 136 269 169 M158 193 Q219 172 269 205 M158 231 Q219 210 269 243 M331 169 Q381 136 442 157 M331 205 Q381 172 442 193 M331 243 Q381 210 442 231')];
const island=[p('M300 85 L345 169 432 181 365 244 383 338 300 293 217 338 235 244 168 181 255 169 Z'),line('M130 351 Q169 334 207 351 M390 351 Q429 334 468 351 M190 108 Q220 95 242 108 M372 100 Q412 85 446 100'),p('M282 217 L300 184 318 217 V261 H282 Z','gold',true)];
const icons={uk,globe,carrier,'carrier-top':carrierTop,sail,jet,escort,shield,radar:ring,route,box,anchor,book,island,
 crown:[p('M160 153 L221 201 300 109 379 201 440 153 411 306 H189 Z','gold',true),line('M190 306 H411 V332 H190 Z M221 252 H380'),...[[160,146],[300,99],[440,146]].map(([x,y])=>p(circle(x,y,11),'gold',true))],
 sun:[p(circle(300,211,86),'gold',true),...Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return line(`M${300+Math.cos(a)*117} ${211+Math.sin(a)*117} L${300+Math.cos(a)*141} ${211+Math.sin(a)*141}`)}),line('M138 374 H462')],
 quill:[p('M183 335 Q212 181 383 89 Q443 119 396 209 Q349 256 245 277 Z','white'),line('M183 335 L365 138 M256 255 L266 195 M300 214 L350 208 M149 365 H391')],
 balance:[line('M300 99 V348 M204 352 H396 M165 154 H435 M206 156 L154 261 H258 Z M394 156 L342 261 H446 Z'),p('M154 261 Q206 309 258 261 Z'),p('M342 261 Q394 309 446 261 Z'),p(circle(300,136,12),'gold',true)],
 hourglass:[line('M201 80 H399 M201 365 H399'),p('M221 80 V130 Q221 169 288 220 Q221 266 221 304 V365 H379 V304 Q379 266 312 220 Q379 169 379 130 V80 Z'),p('M244 312 L300 263 355 312 V343 H244 Z','gold',true),line('M300 223 V252')],
 question:[line('M240 145 C240 67 374 64 374 148 Q374 183 322 209 Q295 228 295 262'),p(circle(295,324,11),'gold',true)],
 medal:[p('M232 81 H282 L309 183 265 200 Z'),p('M318 81 H369 L331 200 287 183 Z'),p(circle(300,268,92),'gold',true),line(circle(300,268,65)),p('M300 219 L314 250 348 254 322 277 328 310 300 294 272 310 278 277 252 254 286 250 Z','white')],
 helicopter:[p('M228 213 Q253 175 333 180 Q387 185 408 237 L392 278 H217 L194 240 111 221 91 184 120 184 151 208 Z'),line('M300 178 V133 M174 132 H429 M100 163 V211 M259 279 L245 313 M361 279 L375 313 M209 314 H410 M294 193 V254'),p('M320 199 H355 Q378 210 386 238 H319 Z','white')],
 support:[...escort.slice(0,1),p('M138 214 H190 V284 H138 Z'),p('M207 235 H252 V284 H207 Z'),p('M273 235 H318 V284 H273 Z'),p('M339 235 H384 V284 H339 Z'),line('M428 281 V168 M405 184 H460 M430 169 L483 236 M151 222 H179 M100 350 H495')],
 submarine:[p('M149 229 Q110 229 104 267 Q110 303 149 303 H450 Q493 302 505 267 Q493 229 450 229 Z'),p('M255 193 H328 V229 H255 Z'),line('M285 193 V165 H322 M166 249 H421 M504 267 H535 M535 245 V288 M146 165 Q176 149 206 165 M375 155 Q405 140 435 155'),p(circle(169,266,8),'gold',true)],
 command:[p('M175 123 H426 V295 H175 Z'),line('M208 328 H393 M300 295 V328 M208 159 H393 M208 258 H393'),p(circle(300,214,24),'gold',true),line('M277 211 H232 V181 M323 214 H371 V246 M300 238 V270')],
 calendar:[p('M183 110 H417 V351 H183 Z'),line('M183 168 H417 M240 88 V134 M360 88 V134 M226 217 H252 M286 217 H312 M346 217 H372 M226 268 H252 M286 268 H312 M346 268 H372 M226 317 H252 M286 317 H312')],
 mission:[...carrierTop.slice(0,4),line('M155 352 V90 L126 116 M455 91 V352 L484 326')],
 mediterranean:[p('M107 153 L161 121 208 133 236 167 277 146 309 184 342 157 366 184 404 175 454 192 491 166','none'),p('M107 273 L172 250 230 263 290 249 347 272 417 256 491 269','none'),p('M146 206 Q272 181 453 224','none',true),p(circle(146,206,8),'gold',true),p(circle(453,224,8),'gold',true)],
 pacific:[...route,line('M300 115 V328 M199 130 Q300 179 402 130 M196 308 Q300 258 405 308')],
 flightdeck:[p('M176 84 H369 L423 139 V355 H176 Z'),line('M209 112 V328 M237 112 V328'),p('M350 147 H394 V197 H350 Z'),p('M294 191 L305 235 339 268 306 261 306 295 283 295 283 261 251 268 284 235 Z','gold',true)],
 binoculars:[p('M176 150 H249 L276 318 H120 Z'),p('M351 150 H424 L480 318 H324 Z'),line('M268 225 H332'),line(circle(196,303,70)),line(circle(404,303,70)),p(circle(196,303,41),'white'),p(circle(404,303,41),'white')],
 wrench:[p('M204 104 Q155 146 181 210 L222 237 351 366 395 322 266 193 Q291 131 242 92 L240 147 208 161 179 137 Z'),line(circle(364,330,11))],
 fuel:[p('M221 121 H367 L394 157 V358 H205 V157 Z'),line('M259 121 V90 H322 V121 M227 153 H372 M235 186 L364 325 M364 186 L235 325'),p('M300 209 Q275 245 275 261 A25 25 0 0 0 325 261 Q325 245 300 209 Z','gold',true)],
 ammunition:[p('M201 184 Q201 134 226 103 Q251 134 251 184 V339 H201 Z'),p('M283 161 Q283 111 308 80 Q333 111 333 161 V339 H283 Z'),p('M365 204 Q365 154 390 123 Q415 154 415 204 V339 H365 Z'),line('M201 201 H251 M283 178 H333 M365 221 H415 M193 354 H423')],
 clock:[line(circle(300,220,150)),line('M300 220 V114 M300 220 L378 264'),p(circle(300,220,9),'gold',true),...Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return line(`M${300+Math.cos(a)*129} ${220+Math.sin(a)*129} L${300+Math.cos(a)*139} ${220+Math.sin(a)*139}`)})],
 alliance:[p('M116 195 L196 132 247 177 201 272 170 278 Z'),p('M484 195 L404 132 353 177 399 272 430 278 Z'),p('M218 165 L264 141 294 147 319 140 381 181 370 256 330 302 294 295 230 248 Z'),line('M294 147 L256 184 Q244 201 261 213 Q275 221 299 198 L357 242 M322 254 L347 276 M302 274 L326 296')],
 norway:[p('M217 347 L244 306 253 257 279 227 281 181 304 165 316 124 349 93 381 103 354 139 337 173 324 215 296 246 281 296 252 337 Z'),p(circle(270,287,10),'gold',true)],
 canada:[p('M300 95 L320 151 344 135 337 207 387 178 382 210 435 221 385 268 398 295 318 285 318 351 282 351 282 285 202 295 215 268 165 221 218 210 213 178 263 207 256 135 280 151 Z')],
 network:[line('M300 220 L166 128 M300 220 L436 128 M300 220 L169 329 M300 220 L436 329'),p(circle(300,220,54),'gold',true),...[[166,128],[436,128],[169,329],[436,329]].map(([x,y])=>p(circle(x,y,30)))],
 pressure:[line('M161 310 A168 168 0 1 1 439 310'),line('M179 297 A142 142 0 1 1 421 297'),p('M397 106 A168 168 0 0 1 468 225','none',true),line('M300 226 L406 142'),p(circle(300,226,15),'gold',true),line('M264 318 H336')],
 dock:[...escort.slice(0,4),line('M110 357 H501 M145 357 V376 M220 357 V376 M295 357 V376 M370 357 V376 M445 357 V376 M131 105 V230 M131 105 H465 V151 M131 124 L200 105 M465 151 V200')],
 compass:[line(circle(300,220,151)),p('M300 93 L324 193 428 220 324 247 300 347 276 247 172 220 276 193 Z'),p('M300 93 L324 193 300 220 Z','gold',true),line(circle(300,220,15))],
 independence:[...anchor.slice(0,2),line('M149 92 L123 118 M451 92 L477 118')],
 fleet:[...carrier.map(x=>({...x,d:x.d}))]
};
put('data/assets.json',icons);
for(const [name,paths] of Object.entries(icons)){
const palette={steel:'#3A6EA5',white:'#F4F7FA',gold:'#D4A94A',none:'none'};
put(`public/svg/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" fill="none" stroke="#F4F7FA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><title>${name}</title>${paths.map(x=>`<path d="${x.d}" fill="${palette[x.fill]}" fill-opacity="${x.fill==='none'?0:0.42}" stroke="${x.accent?'#D4A94A':'#F4F7FA'}"/>`).join('')}</svg>`);
}
// trigger seconds refer to the original audio; starts are 4 frames ahead.
// Text is restricted to names, places, numbers and the closing key question.
const beats=[
[.94,'uk','United Kingdom','United','lift','course'],
[3.90,'book','','history','open','page'],
[6.32,'anchor','Royal Navy','Royal','draw','dive'],
[9.42,'sail','','centuries','sail','course'],
[12.48,'globe','','stretched','expand','orbit'],
[16.08,'crown','British Empire','vast','lift','horizon'],
[19.40,'sun','','sun','rise','iris'],
[22.76,'book',"J. R. R. Tolkien",'Tolkien','open','page'],
[25.30,'island','Númenor','island','draw','dive'],
[28.30,'compass','Middle-earth','Middle','turn','orbit'],
[31.24,'crown','','civilizations','lift','iris'],
[34.20,'island','','island','expand','course'],
[37.76,'sail','','naval','sail','horizon'],
[40.36,'quill','J. R. R. Tolkien','Tolkien','draw','page'],
[43.94,'question','','Well','rise','iris'],
[46.80,'balance','','comparison','open','course'],
[50.34,'uk','','small','lift','dive'],
[53.64,'sail','','powerful','sail','horizon'],
[56.98,'route','','every','draw','orbit'],
[60.78,'hourglass','','world','rise','iris'],
[64.00,'question','','power','expand','dive'],
[67.34,'anchor','Royal Navy','Royal','lift','horizon'],
[71.10,'medal','','remains','rise','iris'],
[74.32,'carrier-top','','carrier','draw','course'],
[77.10,'route','','away','sail','orbit'],
[80.30,'carrier','HMS Queen Elizabeth','HMS','lift','horizon'],
[83.04,'carrier-top','HMS Prince of Wales','Wales','draw','dive'],
[86.90,'flightdeck','','And','expand','course'],
[90.90,'network','','alone','open','iris'],
[93.84,'helicopter','Merlin','Merlin','rise','horizon'],
[96.14,'support','','support','sail','course'],
[98.96,'command','','command','draw','iris'],
[101.48,'submarine','','-submarine','dive','dive'],
[104.74,'shield','','very','lift','horizon'],
[107.58,'calendar','2025','2025','open','page',2025],
[111.00,'mission','Operation Highmast','Wales','draw','course'],
[114.70,'clock','8 months','eight','turn','orbit',8],
[118.54,'pacific','Indo-Pacific','Indo','expand','horizon'],
[122.08,'mediterranean','Mediterranean','Mediterranean','sail','course'],
[124.98,'jet','24 F-35Bs','F','rise','dive',24],
[128.20,'flightdeck','','largest','draw','horizon'],
[131.92,'carrier','Queen Elizabeth class',"Britain's",'lift','course'],
[135.64,'binoculars','','revealed','open','iris'],
[139.56,'uk','1','First','rise','dive',1],
[143.30,'command','','leading','draw','course'],
[146.42,'globe','','world','expand','orbit'],
[149.92,'box','','It','open','page'],
[153.10,'ammunition','','ammunition','lift','horizon'],
[156.36,'clock','','operating','turn','iris'],
[159.12,'route','','miles','sail','course'],
[162.04,'balance','2','important','rise','orbit',2],
[165.86,'alliance','','allies','open','horizon'],
[169.20,'escort','','frigates','sail','course'],
[172.04,'support','','support','lift','dive'],
[175.24,'shield','','defenses','draw','iris'],
[178.14,'network','','burden','expand','orbit'],
[181.90,'uk','United Kingdom','United','rise','horizon'],
[185.02,'independence','','own','lift','dive'],
[188.64,'question','','we','open','iris'],
[191.74,'dock','How many ships?','ships','draw','course'],
[195.26,'clock','','long','turn','orbit'],
[198.82,'pressure','','starts','rise','iris']
];
const totalFrames=6047;
const scenes=beats.map((b,i)=>{
const [at,asset,text,trigger,entry,transition,value]=b;
const word=words.reduce((best,w)=>Math.abs(w.startMs-at*1000)<Math.abs(best.startMs-at*1000)?w:best,words[0]);
const startFrame=i===0?0:Math.round(at*30)-4;
const endFrame=i===beats.length-1?totalFrames:Math.round(beats[i+1][0]*30)-4;
let textAt=at;
if(i===0)textAt=.94;
if(i===22)textAt=71.40;
if(i===26)textAt=81.98;
if(i===35)textAt=111.92;
if(i===39)textAt=123.78;
if(i===41)textAt=132.54;
if(i===50)textAt=160.62;
if(i===59)textAt=191.14;
return {id:`S${String(i+1).padStart(2,'0')}`,index:i,asset,text,trigger:word.text,wordId:word.id,triggerSeconds:at,triggerFrame:Math.round(at*30),startFrame,endFrame,durationInFrames:endFrame-startFrame,iconLeadFrames:4,iconRevealFrame:Math.round(at*30)-4,textFrame:Math.round(textAt*30),entry,transition,value:value??null,alert:i===61,
// Local subordinate transformations keep rapidly spoken lists inside a 2–4 sec shot.
variants:i===28?[{frame:Math.round(92.10*30)-4,asset:'jet',text:'F-35B'}]:i===29?[{frame:Math.round(95.16*30)-4,asset:'escort',text:''}]:i===30?[{frame:Math.round(97.82*30)-4,asset:'command',text:''}]:i===31?[{frame:Math.round(100.34*30)-4,asset:'shield',text:''}]:i===46?[{frame:Math.round(151.56*30)-4,asset:'wrench',text:''},{frame:Math.round(152.44*30)-4,asset:'fuel',text:''}]:i===47?[{frame:Math.round(153.96*30)-4,asset:'escort',text:''}]:i===52?[{frame:Math.round(169.80*30),asset:'escort',text:'Norway'},{frame:Math.round(170.44*30),asset:'escort',text:'Canada'},{frame:Math.round(171.74*30),asset:'escort',text:'Norway'}]:i===53?[{frame:Math.round(172.04*30),asset:'support',text:'Norway'}]:[]};
});
// The early carrier-name cue begins before the scene: retain it in the preceding shot.
scenes[25].variants=[{frame:Math.round(81.98*30),asset:'carrier',text:'HMS Prince of Wales'}];
// The spoken number precedes the aircraft name. Put the synchronized count in the route shot.
scenes[38].variants=[{frame:Math.round(123.78*30),asset:'mediterranean',text:'24',value:24}];
scenes[39].textFrame=scenes[39].startFrame+4;
scenes[50].text='';
scenes[49].variants=[{frame:Math.round(160.62*30),asset:'route',text:'2',value:2}];
// Final question reveal begins with its first spoken word.
scenes[58].variants=[{frame:Math.round(191.14*30),asset:'question',text:'How many ships?'}];
const timeline={fps:30,width:1920,height:1080,durationInFrames:totalFrames,durationSeconds:totalFrames/30,audioDurationSeconds:201.560813,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync('public/audio/Intro.mp3')).digest('hex'),transcription:{engine:'faster-whisper small, CPU int8, beam_size=5, word_timestamps=true',reusedMatchingAudio:true,manualCorrections:['Hymast → Highmast','Numenor → Númenor'],accuracyNote:'Word timestamps are ASR estimates. Cues are frame-exact to the supplied alignment; ±3-frame acoustic accuracy is not certified.'},scenes};
put('data/timeline.json',timeline);
put('data/timeline.csv','scene,start_seconds,end_seconds,trigger,trigger_seconds,asset,text,transition\n'+scenes.map(s=>[s.id,(s.startFrame/30).toFixed(3),(s.endFrame/30).toFixed(3),s.trigger,s.triggerSeconds,s.asset,s.text,s.transition].map(x=>JSON.stringify(x)).join(',')).join('\n'));
put('ASSETS.md','# SVG assets\n\nOriginal vector artwork generated for this composition; transparent backgrounds, 600×440 viewBox, uniform 4-unit strokes. Maps and equipment are illustrative, not technical diagrams.\n\n'+Object.keys(icons).map(k=>`- [${k}](public/svg/${k}.svg)`).join('\n'));
// Authored JSX nodes let each scene be edited independently in Studio.
for(const s of scenes)put(`src/scenes/${s.id}.tsx`,`import {Scene} from '../Scene';\nimport timeline from '../../data/timeline.json';\nexport const ${s.id} = () => <Scene scene={timeline.scenes[${s.index}]} />;\n`);
const imports=scenes.map(s=>`import {${s.id}} from './scenes/${s.id}';`).join('\n');
put('src/Film.tsx',`import {AbsoluteFill, Sequence, staticFile} from 'remotion';\nimport {Audio} from '@remotion/media';\nimport {Background} from './Background';\n${imports}\nexport const Film = () => <AbsoluteFill><Background/>\n${scenes.map(s=>`<Sequence name="${s.id} · ${s.asset}" from={${s.startFrame}} durationInFrames={${s.durationInFrames}}><${s.id}/></Sequence>`).join('\n')}\n<Audio src={staticFile('audio/mix.mp3')} />\n</AbsoluteFill>;\n`);
put('src/Root.tsx',`import {Composition, Folder} from 'remotion';\nimport {Film} from './Film';\nimport './style.css';\n${imports}\nexport const RemotionRoot = () => <>\n<Composition id="RoyalNavy" component={Film} durationInFrames={6047} fps={30} width={1920} height={1080}/>\n<Folder name="Scenes">${scenes.map(s=>`\n<Composition id="${s.id}" component={${s.id}} durationInFrames={${s.durationInFrames}} fps={30} width={1920} height={1080}/>`).join('')}\n</Folder></>;\n`);
put('src/Film.tsx',fs.readFileSync('src/Film.tsx','utf8').replace(' from={0}',''));
if(fs.existsSync('src/media.ts')) await import('./update-media-timeline.mjs');
console.log(`${scenes.length} scenes / ${words.length} words / ${Object.keys(icons).length} SVG assets`);
