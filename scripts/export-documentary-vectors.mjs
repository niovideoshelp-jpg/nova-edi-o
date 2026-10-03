import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {transform} from 'esbuild';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

// Export the same transparent geometry used in the animated documentary scenes.
const source=await transform(fs.readFileSync('src/documentary/NavalDiagramsV5.tsx','utf8'),{loader:'tsx',format:'esm',jsx:'automatic'});
fs.mkdirSync('out',{recursive:true});
fs.mkdirSync('public/svg-v5',{recursive:true});
fs.writeFileSync('out/documentary-vectors.mjs',source.code);
const {NavalProfile,VesselPlan}=await import(pathToFileURL(path.resolve('out/documentary-vectors.mjs')).href);
const exported=[];
for(const kind of ['carrier','escort','supply']){
 for(const [view,Component,viewBox]of [['profile',NavalProfile,'0 0 600 200'],['plan',VesselPlan,'0 0 200 550']]){
  const file=`public/svg-v5/${kind}-${view}.svg`;
  const svg=renderToStaticMarkup(React.createElement('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox,fill:'none'},React.createElement('title',null,`${kind} ${view}`),React.createElement(Component,{kind})));
  fs.writeFileSync(file,svg+'\n');
  exported.push({file,component:Component.name,kind,viewBox,background:'transparent',animation:'Authored in OperationsChapter and EnduranceChapter using useGsapTimeline'});
 }
}
fs.writeFileSync('data/svg-v5.json',JSON.stringify({source:'src/documentary/NavalDiagramsV5.tsx',assets:exported},null,2)+'\n');
console.log(`Exported ${exported.length} transparent SVGs from active geometry`);
