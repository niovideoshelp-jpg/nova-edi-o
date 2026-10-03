import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { useGsapTimeline } from "@remotion/gsap";
import type { ReactNode } from "react";
import { Background } from "./Background";
import { NarrationCue } from "./documentary/NarrationCue";
import timeline from "../data/timeline.json";
import { HistoryChapter } from "./documentary/HistoryChapter";
import { FleetChapter } from "./documentary/FleetChapter";
import { OperationsChapter } from "./documentary/OperationsChapter";
import { EnduranceChapter } from "./documentary/EnduranceChapter";

const ChapterBlend = ({
  children,
  enter = true,
  passage = "match",
}: {
  children: ReactNode;
  enter?: boolean;
  passage?: "match" | "east" | "rise";
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      if (enter) {
        timeline.fromTo(
          selector("[data-chapter-plane]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          0,
        );
        if (passage !== "match") {
          timeline.fromTo(
            selector("[data-chapter-plane]"),
            {
              clipPath:
                passage === "east"
                  ? "inset(0% 94% 0% 0%)"
                  : "inset(88% 0% 0% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "power3.inOut",
            },
            0,
          );
        }
      }
    },
    { dependencies: [enter, passage] },
  );
  return (
    <div ref={scope} style={{ position: "absolute", inset: 0 }}>
      <div
        data-chapter-plane
        style={{ position: "absolute", inset: 0, backgroundColor: "#0B1A2E" }}
      >
        <Background />
        {children}
      </div>
    </div>
  );
};

export const Film = ({ reviewMuted = false }: { reviewMuted?: boolean }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#0B1A2E",
      fontFamily: "Inter, sans-serif",
      color: "#F4F7FA",
      overflow: "hidden",
    }}
  >
    <Background />
    {!reviewMuted && <Audio src={staticFile("audio/mix.mp3")} />}
    <Sequence durationInFrames={1940} name="History and geography">
      <ChapterBlend enter={false}>
        <HistoryChapter />
      </ChapterBlend>
    </Sequence>
    <Sequence
      from={1916}
      durationInFrames={1434}
      name="Carrier strike capability"
    >
      <ChapterBlend enter={true}>
        <FleetChapter />
      </ChapterBlend>
    </Sequence>
    <Sequence from={3326} durationInFrames={1670} name="Highmast and logistics">
      <ChapterBlend enter={true} passage="east">
        <OperationsChapter />
      </ChapterBlend>
    </Sequence>
    <Sequence from={4972} durationInFrames={1075} name="Allies and endurance">
      <ChapterBlend enter={true} passage="rise">
        <EnduranceChapter />
      </ChapterBlend>
    </Sequence>
    <Sequence durationInFrames={113} layout="none" name="S01 · United">
      <NarrationCue scene={timeline.scenes[0]} />
    </Sequence>
    <Sequence
      from={113}
      durationInFrames={73}
      layout="none"
      name="S02 · history,"
    >
      <NarrationCue scene={timeline.scenes[1]} />
    </Sequence>
    <Sequence from={186} durationInFrames={93} layout="none" name="S03 · Royal">
      <NarrationCue scene={timeline.scenes[2]} />
    </Sequence>
    <Sequence
      from={279}
      durationInFrames={91}
      layout="none"
      name="S04 · centuries,"
    >
      <NarrationCue scene={timeline.scenes[3]} />
    </Sequence>
    <Sequence
      from={370}
      durationInFrames={108}
      layout="none"
      name="S05 · stretched"
    >
      <NarrationCue scene={timeline.scenes[4]} />
    </Sequence>
    <Sequence from={478} durationInFrames={100} layout="none" name="S06 · vast">
      <NarrationCue scene={timeline.scenes[5]} />
    </Sequence>
    <Sequence from={578} durationInFrames={101} layout="none" name="S07 · sun">
      <NarrationCue scene={timeline.scenes[6]} />
    </Sequence>
    <Sequence
      from={679}
      durationInFrames={76}
      layout="none"
      name="S08 · Tolkien's"
    >
      <NarrationCue scene={timeline.scenes[7]} />
    </Sequence>
    <Sequence
      from={755}
      durationInFrames={90}
      layout="none"
      name="S09 · island"
    >
      <NarrationCue scene={timeline.scenes[8]} />
    </Sequence>
    <Sequence
      from={845}
      durationInFrames={88}
      layout="none"
      name="S10 · Middle"
    >
      <NarrationCue scene={timeline.scenes[9]} />
    </Sequence>
    <Sequence
      from={933}
      durationInFrames={89}
      layout="none"
      name="S11 · civilizations"
    >
      <NarrationCue scene={timeline.scenes[10]} />
    </Sequence>
    <Sequence
      from={1022}
      durationInFrames={107}
      layout="none"
      name="S12 · island,"
    >
      <NarrationCue scene={timeline.scenes[11]} />
    </Sequence>
    <Sequence
      from={1129}
      durationInFrames={78}
      layout="none"
      name="S13 · naval"
    >
      <NarrationCue scene={timeline.scenes[12]} />
    </Sequence>
    <Sequence
      from={1207}
      durationInFrames={107}
      layout="none"
      name="S14 · Tolkien"
    >
      <NarrationCue scene={timeline.scenes[13]} />
    </Sequence>
    <Sequence
      from={1314}
      durationInFrames={86}
      layout="none"
      name="S15 · Well,"
    >
      <NarrationCue scene={timeline.scenes[14]} />
    </Sequence>
    <Sequence
      from={1400}
      durationInFrames={106}
      layout="none"
      name="S16 · comparison."
    >
      <NarrationCue scene={timeline.scenes[15]} />
    </Sequence>
    <Sequence
      from={1506}
      durationInFrames={99}
      layout="none"
      name="S17 · small"
    >
      <NarrationCue scene={timeline.scenes[16]} />
    </Sequence>
    <Sequence
      from={1605}
      durationInFrames={100}
      layout="none"
      name="S18 · powerful"
    >
      <NarrationCue scene={timeline.scenes[17]} />
    </Sequence>
    <Sequence
      from={1705}
      durationInFrames={114}
      layout="none"
      name="S19 · every"
    >
      <NarrationCue scene={timeline.scenes[18]} />
    </Sequence>
    <Sequence
      from={1819}
      durationInFrames={97}
      layout="none"
      name="S20 · world"
    >
      <NarrationCue scene={timeline.scenes[19]} />
    </Sequence>
    <Sequence
      from={1916}
      durationInFrames={100}
      layout="none"
      name="S21 · power"
    >
      <NarrationCue scene={timeline.scenes[20]} />
    </Sequence>
    <Sequence
      from={2016}
      durationInFrames={113}
      layout="none"
      name="S22 · Royal"
    >
      <NarrationCue scene={timeline.scenes[21]} />
    </Sequence>
    <Sequence
      from={2129}
      durationInFrames={97}
      layout="none"
      name="S23 · remains"
    >
      <NarrationCue scene={timeline.scenes[22]} />
    </Sequence>
    <Sequence
      from={2226}
      durationInFrames={83}
      layout="none"
      name="S24 · carrier"
    >
      <NarrationCue scene={timeline.scenes[23]} />
    </Sequence>
    <Sequence from={2309} durationInFrames={96} layout="none" name="S25 · away">
      <NarrationCue scene={timeline.scenes[24]} />
    </Sequence>
    <Sequence from={2405} durationInFrames={82} layout="none" name="S26 · HMS">
      <NarrationCue scene={timeline.scenes[25]} />
    </Sequence>
    <Sequence
      from={2487}
      durationInFrames={116}
      layout="none"
      name="S27 · Wales,"
    >
      <NarrationCue scene={timeline.scenes[26]} />
    </Sequence>
    <Sequence from={2603} durationInFrames={120} layout="none" name="S28 · And">
      <NarrationCue scene={timeline.scenes[27]} />
    </Sequence>
    <Sequence
      from={2723}
      durationInFrames={88}
      layout="none"
      name="S29 · alone."
    >
      <NarrationCue scene={timeline.scenes[28]} />
    </Sequence>
    <Sequence
      from={2811}
      durationInFrames={69}
      layout="none"
      name="S30 · Merlin"
    >
      <NarrationCue scene={timeline.scenes[29]} />
    </Sequence>
    <Sequence
      from={2880}
      durationInFrames={85}
      layout="none"
      name="S31 · support"
    >
      <NarrationCue scene={timeline.scenes[30]} />
    </Sequence>
    <Sequence
      from={2965}
      durationInFrames={75}
      layout="none"
      name="S32 · command"
    >
      <NarrationCue scene={timeline.scenes[31]} />
    </Sequence>
    <Sequence
      from={3040}
      durationInFrames={98}
      layout="none"
      name="S33 · -submarine"
    >
      <NarrationCue scene={timeline.scenes[32]} />
    </Sequence>
    <Sequence from={3138} durationInFrames={85} layout="none" name="S34 · very">
      <NarrationCue scene={timeline.scenes[33]} />
    </Sequence>
    <Sequence
      from={3223}
      durationInFrames={103}
      layout="none"
      name="S35 · 2025,"
    >
      <NarrationCue scene={timeline.scenes[34]} />
    </Sequence>
    <Sequence
      from={3326}
      durationInFrames={111}
      layout="none"
      name="S36 · Wales"
    >
      <NarrationCue scene={timeline.scenes[35]} />
    </Sequence>
    <Sequence
      from={3437}
      durationInFrames={115}
      layout="none"
      name="S37 · eight"
    >
      <NarrationCue scene={timeline.scenes[36]} />
    </Sequence>
    <Sequence
      from={3552}
      durationInFrames={106}
      layout="none"
      name="S38 · Indo"
    >
      <NarrationCue scene={timeline.scenes[37]} />
    </Sequence>
    <Sequence
      from={3658}
      durationInFrames={87}
      layout="none"
      name="S39 · Mediterranean,"
    >
      <NarrationCue scene={timeline.scenes[38]} />
    </Sequence>
    <Sequence from={3745} durationInFrames={97} layout="none" name="S40 · F">
      <NarrationCue scene={timeline.scenes[39]} />
    </Sequence>
    <Sequence
      from={3842}
      durationInFrames={112}
      layout="none"
      name="S41 · largest"
    >
      <NarrationCue scene={timeline.scenes[40]} />
    </Sequence>
    <Sequence
      from={3954}
      durationInFrames={111}
      layout="none"
      name="S42 · Britain's"
    >
      <NarrationCue scene={timeline.scenes[41]} />
    </Sequence>
    <Sequence
      from={4065}
      durationInFrames={118}
      layout="none"
      name="S43 · revealed"
    >
      <NarrationCue scene={timeline.scenes[42]} />
    </Sequence>
    <Sequence
      from={4183}
      durationInFrames={112}
      layout="none"
      name="S44 · First,"
    >
      <NarrationCue scene={timeline.scenes[43]} />
    </Sequence>
    <Sequence
      from={4295}
      durationInFrames={94}
      layout="none"
      name="S45 · leading"
    >
      <NarrationCue scene={timeline.scenes[44]} />
    </Sequence>
    <Sequence
      from={4389}
      durationInFrames={105}
      layout="none"
      name="S46 · world."
    >
      <NarrationCue scene={timeline.scenes[45]} />
    </Sequence>
    <Sequence from={4494} durationInFrames={95} layout="none" name="S47 · It">
      <NarrationCue scene={timeline.scenes[46]} />
    </Sequence>
    <Sequence
      from={4589}
      durationInFrames={98}
      layout="none"
      name="S48 · ammunition,"
    >
      <NarrationCue scene={timeline.scenes[47]} />
    </Sequence>
    <Sequence
      from={4687}
      durationInFrames={83}
      layout="none"
      name="S49 · operating"
    >
      <NarrationCue scene={timeline.scenes[48]} />
    </Sequence>
    <Sequence
      from={4770}
      durationInFrames={87}
      layout="none"
      name="S50 · miles"
    >
      <NarrationCue scene={timeline.scenes[49]} />
    </Sequence>
    <Sequence
      from={4857}
      durationInFrames={115}
      layout="none"
      name="S51 · important."
    >
      <NarrationCue scene={timeline.scenes[50]} />
    </Sequence>
    <Sequence
      from={4972}
      durationInFrames={100}
      layout="none"
      name="S52 · allies."
    >
      <NarrationCue scene={timeline.scenes[51]} />
    </Sequence>
    <Sequence
      from={5072}
      durationInFrames={85}
      layout="none"
      name="S53 · frigates"
    >
      <NarrationCue scene={timeline.scenes[52]} />
    </Sequence>
    <Sequence
      from={5157}
      durationInFrames={96}
      layout="none"
      name="S54 · support"
    >
      <NarrationCue scene={timeline.scenes[53]} />
    </Sequence>
    <Sequence
      from={5253}
      durationInFrames={87}
      layout="none"
      name="S55 · defenses,"
    >
      <NarrationCue scene={timeline.scenes[54]} />
    </Sequence>
    <Sequence
      from={5340}
      durationInFrames={113}
      layout="none"
      name="S56 · burden"
    >
      <NarrationCue scene={timeline.scenes[55]} />
    </Sequence>
    <Sequence
      from={5453}
      durationInFrames={94}
      layout="none"
      name="S57 · United"
    >
      <NarrationCue scene={timeline.scenes[56]} />
    </Sequence>
    <Sequence
      from={5547}
      durationInFrames={108}
      layout="none"
      name="S58 · own."
    >
      <NarrationCue scene={timeline.scenes[57]} />
    </Sequence>
    <Sequence from={5655} durationInFrames={93} layout="none" name="S59 · we">
      <NarrationCue scene={timeline.scenes[58]} />
    </Sequence>
    <Sequence
      from={5748}
      durationInFrames={106}
      layout="none"
      name="S60 · ships"
    >
      <NarrationCue scene={timeline.scenes[59]} />
    </Sequence>
    <Sequence
      from={5854}
      durationInFrames={107}
      layout="none"
      name="S61 · long"
    >
      <NarrationCue scene={timeline.scenes[60]} />
    </Sequence>
    <Sequence
      from={5961}
      durationInFrames={86}
      layout="none"
      name="S62 · starts"
    >
      <NarrationCue scene={timeline.scenes[61]} />
    </Sequence>
  </AbsoluteFill>
);
