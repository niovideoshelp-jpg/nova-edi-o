import fs from "node:fs";
const timeline = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const chapters = [
  {
    id: "history",
    name: "History and geography",
    component: "HistoryChapter",
    startFrame: 0,
    endFrame: 1916,
    motion:
      "UK liquid reveal, geographic pullback, sailship parallax, island comparison",
  },
  {
    id: "fleet",
    name: "Carrier strike capability",
    component: "FleetChapter",
    startFrame: 1916,
    endFrame: 3326,
    motion:
      "Carrier camera traversal, photo panorama, flight path, layered maritime defense",
  },
  {
    id: "operations",
    name: "Highmast and logistics",
    component: "OperationsChapter",
    startFrame: 3326,
    endFrame: 4972,
    motion:
      "Geographic route following, aircraft count, deck closeup, supply transfers",
  },
  {
    id: "endurance",
    name: "Allies and endurance",
    component: "EnduranceChapter",
    startFrame: 4972,
    endFrame: 6047,
    motion:
      "Atlantic connections, independent sailing, dock-to-sea split, time pressure",
  },
];
fs.writeFileSync(
  "data/documentary-timeline.json",
  JSON.stringify(
    {
      revision: 4,
      fps: 30,
      width: 1920,
      height: 1080,
      durationInFrames: 6047,
      transitionOverlapFrames: 12,
      chapters,
      cues: timeline.scenes.map((s) => ({
        id: s.id,
        startFrame: s.startFrame,
        endFrame: s.endFrame,
        trigger: s.trigger,
        wordId: s.wordId,
        triggerFrame: s.triggerFrame,
        visualAnticipationFrame: s.iconRevealFrame,
        text: s.text,
        textFrame: s.textFrame,
        variants: s.variants.map((v) => ({ frame: v.frame, text: v.text })),
      })),
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  "src/Film.tsx",
  `import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {useGsapTimeline} from '@remotion/gsap';
import type {ReactNode} from 'react';
import {Background} from './Background';
import {NarrationCue} from './documentary/NarrationCue';
import timeline from '../data/timeline.json';
${chapters.map((c) => `import {${c.component}} from './documentary/${c.component}';`).join("\n")}

const ChapterBlend=({children,enter=true}:{children:ReactNode;enter?:boolean})=>{
  const scope=useGsapTimeline<HTMLDivElement>(({timeline,selector})=>{
    if(enter) timeline.fromTo(selector('[data-chapter-plane]'),{opacity:0},{opacity:1,duration:.4,ease:'power1.inOut'},0);
  },{dependencies:[enter]});
  return <div ref={scope} style={{position:'absolute',inset:0}}><div data-chapter-plane style={{position:'absolute',inset:0}}>{children}</div></div>;
};

export const Film=({reviewMuted=false}:{reviewMuted?:boolean})=> <AbsoluteFill style={{backgroundColor:'#0B1A2E',fontFamily:'Inter, sans-serif',color:'#F4F7FA',overflow:'hidden'}}>
  <Background/>
  {!reviewMuted && <Audio src={staticFile('audio/mix.mp3')}/>}
${chapters.map((c, i) => `  <Sequence from={${c.startFrame}} durationInFrames={${c.endFrame - c.startFrame + (i < 3 ? 12 : 0)}} name="${c.name}"><ChapterBlend enter={${i > 0}}><${c.component}/></ChapterBlend></Sequence>`).join("\n")}
${timeline.scenes.map((s, i) => `  <Sequence from={${s.startFrame}} durationInFrames={${s.durationInFrames}} layout="none" name="${s.id} · ${s.trigger}"><NarrationCue scene={timeline.scenes[${i}]}/></Sequence>`).join("\n")}
</AbsoluteFill>;
`,
);
fs.writeFileSync(
  "src/Root.tsx",
  `import {Composition, Folder, Sequence} from 'remotion';
import {Film} from './Film';
import timeline from '../data/timeline.json';
import './style.css';
const ScenePreview=({index}:{index:number})=><Sequence from={-timeline.scenes[index].startFrame}><Film/></Sequence>;
export const RemotionRoot=()=> <>
  <Composition id="RoyalNavy" component={Film} durationInFrames={6047} fps={30} width={1920} height={1080}/>
  <Folder name="Scenes">
${timeline.scenes.map((s, i) => `    <Composition id="${s.id}" component={ScenePreview} defaultProps={{index:${i}}} durationInFrames={${s.durationInFrames}} fps={30} width={1920} height={1080}/>`).join("\n")}
  </Folder>
</>;
`,
);
timeline.visualRevision = 4;
timeline.visualArchitecture =
  "Four continuous documentary environments with 62 individually editable narrative cue Sequences; 12-frame chapter overlaps";
timeline.activeVisualPlan = "data/documentary-timeline.json";
fs.writeFileSync("data/timeline.json", JSON.stringify(timeline, null, 2));
console.log("Wrote documentary timeline, Film and 62 scene previews");
fs.writeFileSync(
  "src/Film.tsx",
  fs.readFileSync("src/Film.tsx", "utf8").replace(/from=\{0\} /g, ""),
);
