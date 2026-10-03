import { Composition, Folder, Sequence } from "remotion";
import { Film } from "./Film";
import timeline from "../data/timeline.json";
import "./style.css";
import { Part1Film } from "./part1/Part1Film";
import { OriginsChapter } from "./part1/OriginsChapter";
import { JutlandChapter } from "./part1/JutlandChapter";
import { WorldWarChapter } from "./part1/WorldWarChapter";
import { TransformationChapter } from "./part1/TransformationChapter";
import { Part2Film } from "./part2/Part2Film";
import { InventoryChapter } from "./part2/InventoryChapter";
import { ReadinessChapter } from "./part2/ReadinessChapter";
import { EscortChapter, CapacityChapter } from "./part2/OperationsChapter";
import { RenewalChapter } from "./part2/RenewalChapter";
import { IndustryChapter } from "./part2/IndustryChapter";
import { AtlanticChapter } from "./part2/AtlanticChapter";
import { AvailabilityChapter } from "./part2/AvailabilityChapter";
const ScenePreview = ({ index }: { index: number }) => (
  <Sequence from={-timeline.scenes[index].startFrame}>
    <Film />
  </Sequence>
);
export const RemotionRoot = () => (
  <>
    <Composition
      id="RoyalNavyPart2"
      component={Part2Film}
      durationInFrames={6593}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ reviewMuted: false }}
    />
    <Folder name="Part2-Chapters">
      <Composition
        id="P2-Inventory"
        component={InventoryChapter}
        durationInFrames={1050}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Readiness"
        component={ReadinessChapter}
        durationInFrames={769}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Escort"
        component={EscortChapter}
        durationInFrames={656}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Capacity"
        component={CapacityChapter}
        durationInFrames={847}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Renewal"
        component={RenewalChapter}
        durationInFrames={1158}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Industry"
        component={IndustryChapter}
        durationInFrames={1125}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Atlantic"
        component={AtlanticChapter}
        durationInFrames={466}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P2-Availability"
        component={AvailabilityChapter}
        durationInFrames={690}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
    <Composition
      id="RoyalNavyPart1"
      component={Part1Film}
      durationInFrames={5390}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ reviewMuted: false }}
    />
    <Folder name="Part1-Chapters">
      <Composition
        id="P1-Origins"
        component={OriginsChapter}
        durationInFrames={884}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P1-Jutland"
        component={JutlandChapter}
        durationInFrames={1344}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P1-WorldWar"
        component={WorldWarChapter}
        durationInFrames={1452}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="P1-Transformation"
        component={TransformationChapter}
        durationInFrames={1782}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
    <Composition
      id="RoyalNavy"
      component={Film}
      durationInFrames={6047}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Scenes">
      <Composition
        id="S01"
        component={ScenePreview}
        defaultProps={{ index: 0 }}
        durationInFrames={113}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S02"
        component={ScenePreview}
        defaultProps={{ index: 1 }}
        durationInFrames={73}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S03"
        component={ScenePreview}
        defaultProps={{ index: 2 }}
        durationInFrames={93}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S04"
        component={ScenePreview}
        defaultProps={{ index: 3 }}
        durationInFrames={91}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S05"
        component={ScenePreview}
        defaultProps={{ index: 4 }}
        durationInFrames={108}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S06"
        component={ScenePreview}
        defaultProps={{ index: 5 }}
        durationInFrames={100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S07"
        component={ScenePreview}
        defaultProps={{ index: 6 }}
        durationInFrames={101}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S08"
        component={ScenePreview}
        defaultProps={{ index: 7 }}
        durationInFrames={76}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S09"
        component={ScenePreview}
        defaultProps={{ index: 8 }}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S10"
        component={ScenePreview}
        defaultProps={{ index: 9 }}
        durationInFrames={88}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S11"
        component={ScenePreview}
        defaultProps={{ index: 10 }}
        durationInFrames={89}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S12"
        component={ScenePreview}
        defaultProps={{ index: 11 }}
        durationInFrames={107}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S13"
        component={ScenePreview}
        defaultProps={{ index: 12 }}
        durationInFrames={78}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S14"
        component={ScenePreview}
        defaultProps={{ index: 13 }}
        durationInFrames={107}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S15"
        component={ScenePreview}
        defaultProps={{ index: 14 }}
        durationInFrames={86}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S16"
        component={ScenePreview}
        defaultProps={{ index: 15 }}
        durationInFrames={106}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S17"
        component={ScenePreview}
        defaultProps={{ index: 16 }}
        durationInFrames={99}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S18"
        component={ScenePreview}
        defaultProps={{ index: 17 }}
        durationInFrames={100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S19"
        component={ScenePreview}
        defaultProps={{ index: 18 }}
        durationInFrames={114}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S20"
        component={ScenePreview}
        defaultProps={{ index: 19 }}
        durationInFrames={97}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S21"
        component={ScenePreview}
        defaultProps={{ index: 20 }}
        durationInFrames={100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S22"
        component={ScenePreview}
        defaultProps={{ index: 21 }}
        durationInFrames={113}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S23"
        component={ScenePreview}
        defaultProps={{ index: 22 }}
        durationInFrames={97}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S24"
        component={ScenePreview}
        defaultProps={{ index: 23 }}
        durationInFrames={83}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S25"
        component={ScenePreview}
        defaultProps={{ index: 24 }}
        durationInFrames={96}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S26"
        component={ScenePreview}
        defaultProps={{ index: 25 }}
        durationInFrames={82}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S27"
        component={ScenePreview}
        defaultProps={{ index: 26 }}
        durationInFrames={116}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S28"
        component={ScenePreview}
        defaultProps={{ index: 27 }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S29"
        component={ScenePreview}
        defaultProps={{ index: 28 }}
        durationInFrames={88}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S30"
        component={ScenePreview}
        defaultProps={{ index: 29 }}
        durationInFrames={69}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S31"
        component={ScenePreview}
        defaultProps={{ index: 30 }}
        durationInFrames={85}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S32"
        component={ScenePreview}
        defaultProps={{ index: 31 }}
        durationInFrames={75}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S33"
        component={ScenePreview}
        defaultProps={{ index: 32 }}
        durationInFrames={98}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S34"
        component={ScenePreview}
        defaultProps={{ index: 33 }}
        durationInFrames={85}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S35"
        component={ScenePreview}
        defaultProps={{ index: 34 }}
        durationInFrames={103}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S36"
        component={ScenePreview}
        defaultProps={{ index: 35 }}
        durationInFrames={111}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S37"
        component={ScenePreview}
        defaultProps={{ index: 36 }}
        durationInFrames={115}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S38"
        component={ScenePreview}
        defaultProps={{ index: 37 }}
        durationInFrames={106}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S39"
        component={ScenePreview}
        defaultProps={{ index: 38 }}
        durationInFrames={87}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S40"
        component={ScenePreview}
        defaultProps={{ index: 39 }}
        durationInFrames={97}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S41"
        component={ScenePreview}
        defaultProps={{ index: 40 }}
        durationInFrames={112}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S42"
        component={ScenePreview}
        defaultProps={{ index: 41 }}
        durationInFrames={111}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S43"
        component={ScenePreview}
        defaultProps={{ index: 42 }}
        durationInFrames={118}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S44"
        component={ScenePreview}
        defaultProps={{ index: 43 }}
        durationInFrames={112}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S45"
        component={ScenePreview}
        defaultProps={{ index: 44 }}
        durationInFrames={94}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S46"
        component={ScenePreview}
        defaultProps={{ index: 45 }}
        durationInFrames={105}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S47"
        component={ScenePreview}
        defaultProps={{ index: 46 }}
        durationInFrames={95}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S48"
        component={ScenePreview}
        defaultProps={{ index: 47 }}
        durationInFrames={98}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S49"
        component={ScenePreview}
        defaultProps={{ index: 48 }}
        durationInFrames={83}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S50"
        component={ScenePreview}
        defaultProps={{ index: 49 }}
        durationInFrames={87}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S51"
        component={ScenePreview}
        defaultProps={{ index: 50 }}
        durationInFrames={115}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S52"
        component={ScenePreview}
        defaultProps={{ index: 51 }}
        durationInFrames={100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S53"
        component={ScenePreview}
        defaultProps={{ index: 52 }}
        durationInFrames={85}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S54"
        component={ScenePreview}
        defaultProps={{ index: 53 }}
        durationInFrames={96}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S55"
        component={ScenePreview}
        defaultProps={{ index: 54 }}
        durationInFrames={87}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S56"
        component={ScenePreview}
        defaultProps={{ index: 55 }}
        durationInFrames={113}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S57"
        component={ScenePreview}
        defaultProps={{ index: 56 }}
        durationInFrames={94}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S58"
        component={ScenePreview}
        defaultProps={{ index: 57 }}
        durationInFrames={108}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S59"
        component={ScenePreview}
        defaultProps={{ index: 58 }}
        durationInFrames={93}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S60"
        component={ScenePreview}
        defaultProps={{ index: 59 }}
        durationInFrames={106}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S61"
        component={ScenePreview}
        defaultProps={{ index: 60 }}
        durationInFrames={107}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="S62"
        component={ScenePreview}
        defaultProps={{ index: 61 }}
        durationInFrames={86}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  </>
);
