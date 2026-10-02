import {useMemo} from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import styled from '@emotion/styled';
import {gsap} from 'gsap';
import assets from '../data/assets.json';
import words from '../data/words.json';
import {photoByScene, rasterByAsset} from './media';

type Variant={frame:number;asset:string;text:string;value?:number};
export type SceneData={id:string;index:number;asset:string;text:string;startFrame:number;durationInFrames:number;iconRevealFrame:number;textFrame:number;entry:string;transition:string;value:number|null;alert:boolean;variants:Variant[]};
const Frame=styled.div({position:'absolute',inset:0,overflow:'hidden',fontFamily:'Inter, sans-serif',color:'#F4F7FA'});
const Figure=styled.div({position:'absolute',left:460,top:96,width:1000,height:734,transformOrigin:'50% 50%'});
const Caption=styled.div({position:'absolute',left:240,right:240,top:804,height:168,display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',fontSize:82,fontWeight:600,letterSpacing:'-.045em',lineHeight:1.12,whiteSpace:'nowrap'});
const colors:Record<string,string>={steel:'#3A6EA5',white:'#F4F7FA',gold:'#D4A94A',none:'none'};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

// Numeric GSAP timelines are paused and sought explicitly. No wall-clock ticker,
// no CSS animation, no DOM timing or random render state.
export const motionAt=(time:number,duration:number,entry:string,exit:string)=>{
 const s={enter:0,draw:.003,fill:0,leave:0};
 const tl=gsap.timeline({paused:true});
 tl.to(s,{enter:1,duration:.5,ease:entry==='expand'?'expo.out':'power3.out'},0);
 tl.to(s,{draw:1,duration:.5,ease:'power3.out'},0);
 tl.to(s,{fill:1,duration:.26,ease:'power3.out'},.40);
 tl.to(s,{leave:1,duration:.30,ease:'power2.in'},Math.max(.65,duration-.30));
 tl.seek(Math.max(0,time));
 tl.kill();
 return {...s,exit};
};

function WordLabel({text,at,globalFrame,value}:{text:string;at:number;globalFrame:number;value:number|null|undefined}){
 const parts=useMemo(()=>text.split(' '),[text]);
 const cues=useMemo(()=>{
  let cursor=at/30-.15;
  return parts.map(token=>{
   const clean=(x:string)=>x.toLowerCase().replace(/[^a-z0-9]/g,'');
   const match=words.find(w=>w.startMs/1000>=cursor&&w.startMs/1000<at/30+3.5&&clean(w.text)===clean(token));
   if(match){cursor=match.startMs/1000+.01;return Math.round(match.startMs/1000*30);}
   return at;
  });
 },[parts,at]);
 if(value!==null&&value!==undefined){
  const n={value:0};
  const tl=gsap.timeline({paused:true}).to(n,{value,duration:.5,ease:'power3.out',snap:{value:1}});
  tl.seek(Math.max(0,(globalFrame-at)/30));tl.kill();
  const suffix=text.replace(/^\d+\s*/, '');
  const q=gsap.parseEase('power3.out')(clamp((globalFrame-at)/15));
  return <span style={{overflow:'hidden',display:'inline-flex',gap:24,alignItems:'baseline',opacity:globalFrame<at?0:1}}><span style={{fontSize:140,fontWeight:700,fontVariantNumeric:'tabular-nums',color:'#D4A94A',transform:`translateY(${(1-q)*140}px)`}}>{Math.round(n.value)}</span>{suffix&&<span style={{fontSize:74}}>{suffix}</span>}</span>;
 }
 return <span style={{display:'inline-flex',gap:22}}>{parts.map((word,i)=>{
  const q=gsap.parseEase('power3.out')(clamp((globalFrame-cues[i])/15));
  return <span key={`${i}-${word}`} style={{overflow:'hidden',display:'inline-block',paddingBottom:10}}><span style={{display:'block',opacity:globalFrame<cues[i]?0:1,transform:`translateY(${(1-q)*118}%)`}}>{word}</span></span>;
 })}</span>;
}

export const Scene=({scene}:{scene:SceneData})=>{
 const f=useCurrentFrame(),globalFrame=f+scene.startFrame;
 const active=scene.variants.filter(v=>v.frame<=globalFrame).at(-1);
 const asset=(active?.asset??scene.asset) as keyof typeof assets;
 const text=active?.text??scene.text;
 const reveal=active&&active.asset!==scene.asset?active.frame:scene.iconRevealFrame;
 const t=(globalFrame-reveal)/30;
 const duration=(scene.startFrame+scene.durationInFrames-reveal)/30;
 const s=motionAt(t,duration,scene.entry,scene.transition);
 const micro=clamp(f/scene.durationInFrames);
 const entrance=1-s.enter,exit=s.leave;
 let x=0,y=0,scale=1,rotate=0;
 if(scene.entry==='lift'||scene.entry==='rise')y=entrance*46;
 if(scene.entry==='sail')x=-entrance*64;
 if(scene.entry==='expand')scale=1-entrance*.15;
 if(scene.entry==='dive')y=-entrance*52;
 if(scene.entry==='turn')rotate=-entrance*16;
 if(scene.entry==='open')scale=1-entrance*.08;
 let clip='none';
 if(scene.transition==='course'){x+=exit*65;clip=`inset(0 ${exit*100}% 0 0)`;}
 if(scene.transition==='horizon'){y-=exit*32;clip=`inset(0 0 ${exit*100}% 0)`;}
 if(scene.transition==='dive'){scale+=exit*.18;clip=`inset(${exit*50}% 0 ${exit*50}% 0)`;}
 if(scene.transition==='iris')clip=`circle(${75*(1-exit)}% at 50% 46%)`;
 if(scene.transition==='page')clip=`inset(0 0 0 ${exit*100}%)`;
 if(scene.transition==='orbit'){rotate+=exit*8;scale-=exit*.07;clip=`inset(0 0 ${exit*100}% 0)`;}
 const labelFrame=active?.frame??scene.textFrame;
 const alert=scene.alert;
 const media=(!active?photoByScene[scene.id]:undefined)??rasterByAsset[asset];
 const centerY=text?442:520;
 return <Frame data-scene={scene.id} style={{clipPath:clip}}>
 {media ? <div data-media-kind={media.kind} style={{position:'absolute',left:960-media.width/2,top:centerY-media.height/2,width:media.width,height:media.height,opacity:t<0?0:1,clipPath:media.kind==='photo'?`inset(0 ${entrance*100}% 0 0)`:`inset(${entrance*100}% 0 0 0)`,transform:`translate(${x+Math.sin(micro*Math.PI)*16}px,${y-micro*14}px) scale(${scale*(1+micro*.055)}) rotate(${rotate*.45}deg)`}}>
   <Img src={staticFile(media.src)} alt={media.alt} style={{width:'100%',height:'100%',objectFit:media.kind==='photo'?'cover':'contain',filter:media.kind==='photo'?'saturate(.65) contrast(1.05)':'none'}}/>
 </div> : <Figure style={{opacity:t<0?0:1,transform:`translate(${x+Math.sin(micro*Math.PI)*12}px,${y-micro*13}px) scale(${scale*(1+micro*.06)}) rotate(${rotate}deg)`}}>
 <svg width="1000" height="734" viewBox="0 0 600 440" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-label={asset}>
 {assets[asset].map((path,i)=><path key={`${asset}-${i}`} d={path.d} pathLength={100} strokeDasharray={100} strokeDashoffset={100*(1-s.draw)} stroke={path.accent?(alert?'#C8102E':'#D4A94A'):'#F4F7FA'} fill={path.fill==='none'?'none':colors[path.fill]} fillOpacity={path.fill==='gold'?s.fill*.82:s.fill*.30} style={{transformOrigin:'300px 220px'}}/>)}
 </svg>
 </Figure>}
 {text&&<Caption style={{opacity:1-exit}}><WordLabel key={`${labelFrame}-${text}`} text={text} at={labelFrame} globalFrame={globalFrame} value={active?.value??scene.value}/></Caption>}
 </Frame>;
};
