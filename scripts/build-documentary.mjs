import fs from "node:fs";
const timeline = JSON.parse(fs.readFileSync("data/timeline.json", "utf8"));
const chapters = [
  {
    "id": "history",
    "name": "History and geography",
    "component": "HistoryChapter",
    "startFrame": 0,
    "endFrame": 1916,
    "motion": "UK liquid reveal, historical ship wake, geodesic signals, island influence and maritime corridors"
  },
  {
    "id": "fleet",
    "name": "Carrier strike capability",
    "component": "FleetChapter",
    "startFrame": 1916,
    "endFrame": 3326,
    "motion": "Carrier match, three archival shots, animated task group, rotor/sonar action and vector departure"
  },
  {
    "id": "operations",
    "name": "Highmast and logistics",
    "component": "OperationsChapter",
    "startFrame": 3326,
    "endFrame": 4972,
    "motion": "Geographic reach, 24-unit chart, archival carrier class footage, aligned supply transfer and material handling"
  },
  {
    "id": "endurance",
    "name": "Allies and endurance",
    "component": "EnduranceChapter",
    "startFrame": 4972,
    "endFrame": 6047,
    "motion": "Allied command network, independent operation, deck work, berth departure and operating/return cycle"
  }
];
fs.writeFileSync(
  "data/documentary-timeline.json",
  JSON.stringify(
    {
      revision: 5,
      fps: 30,
      width: 1920,
      height: 1080,
      durationInFrames: 6047,
      transitionOverlapFrames: 24,
      transitions: [{"frame":1916,"type":"matched-carrier","frames":24},{"frame":3326,"type":"eastward-map-reveal","frames":24},{"frame":4972,"type":"supply-to-allied-network","frames":24}],
      footageManifest: "data/video-sources.json",
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
// Film.tsx contains authored chapter transitions; preserve it when regenerating cue metadata.
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
timeline.visualRevision = 5;
timeline.visualArchitecture =
  "Four continuous documentary environments with 62 individually editable narrative cue Sequences; 24-frame chapter overlaps with local documentary footage";
timeline.activeVisualPlan = "data/documentary-timeline.json";
fs.writeFileSync("data/timeline.json", JSON.stringify(timeline, null, 2));
console.log(
  "Wrote documentary timeline and 62 scene previews; preserved authored Film",
);
