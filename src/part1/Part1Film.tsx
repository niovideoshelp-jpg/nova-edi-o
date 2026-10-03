import { AbsoluteFill, Sequence, Img, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { OriginsChapter } from "./OriginsChapter";
import { JutlandChapter } from "./JutlandChapter";
import { WorldWarChapter } from "./WorldWarChapter";
import { TransformationChapter } from "./TransformationChapter";
import { Passage, C } from "./Shared";

export const Part1Film = ({
  reviewMuted = false,
}: {
  reviewMuted?: boolean;
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: C.navy,
      color: C.white,
      fontFamily: "Inter, sans-serif",
      overflow: "hidden",
    }}
  >
    {!reviewMuted && <Audio src={staticFile("audio/part1/mix.mp3")} />}
    <Sequence name="Origins · 1914–1918" durationInFrames={884}>
      <OriginsChapter />
    </Sequence>
    <Sequence name="Jutland · 1916" from={860} durationInFrames={1344}>
      <Passage kind="east">
        <JutlandChapter />
      </Passage>
    </Sequence>
    <Sequence
      name="World War II · Global commitments"
      from={2180}
      durationInFrames={1452}
    >
      <Passage kind="focus">
        <WorldWarChapter />
      </Passage>
    </Sequence>
    <Sequence name="Air power · Adaptation" from={3608} durationInFrames={1782}>
      <Passage kind="dissolve">
        <TransformationChapter />
      </Passage>
    </Sequence>
    <Img
      src={staticFile("grain.png")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.026,
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);
