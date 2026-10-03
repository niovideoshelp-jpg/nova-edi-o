import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import timeline from "../../data/part2/timeline.json";
import { InventoryChapter } from "./InventoryChapter";
import { ReadinessChapter } from "./ReadinessChapter";
import { EscortChapter, CapacityChapter } from "./OperationsChapter";
import { RenewalChapter } from "./RenewalChapter";
import { IndustryChapter } from "./IndustryChapter";
import { AtlanticChapter } from "./AtlanticChapter";
import { AvailabilityChapter } from "./AvailabilityChapter";
import { Passage, C } from "./Shared";
import { chapterFor } from "./Timing";

const span = (id: string) => {
  const c = chapterFor(id);
  return {
    from: c.startFrame,
    durationInFrames: Math.min(
      timeline.durationInFrames - c.startFrame,
      c.endFrame - c.startFrame + 24,
    ),
  };
};

export const Part2Film = ({
  reviewMuted = false,
}: {
  reviewMuted?: boolean;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.navy,
        color: C.white,
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {!reviewMuted && <Audio src={staticFile("audio/part2/mix.mp3")} />}
      <Sequence name="Inventory · April 2025" {...span("inventory")}>
        <InventoryChapter />
      </Sequence>
      <Sequence name="Readiness · Behind the numbers" {...span("readiness")}>
        <Passage kind="focus">
          <ReadinessChapter />
        </Passage>
      </Sequence>
      <Sequence name="Escort · Layers of protection" {...span("escort")}>
        <Passage kind="rise">
          <EscortChapter />
        </Passage>
      </Sequence>
      <Sequence name="Capacity · Availability matters" {...span("capacity")}>
        <Passage kind="dissolve">
          <CapacityChapter />
        </Passage>
      </Sequence>
      <Sequence name="Renewal · The frigate transition" {...span("renewal")}>
        <Passage kind="east">
          <RenewalChapter />
        </Passage>
      </Sequence>
      <Sequence name="Industry · AUKUS" {...span("industry")}>
        <Passage kind="focus">
          <IndustryChapter />
        </Passage>
      </Sequence>
      <Sequence name="Atlantic · Undersea infrastructure" {...span("atlantic")}>
        <Passage kind="rise">
          <AtlanticChapter />
        </Passage>
      </Sequence>
      <Sequence name="Availability · Sources" {...span("availability")}>
        <Passage kind="dissolve">
          <AvailabilityChapter />
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
      <AbsoluteFill
        style={{
          background: C.navy,
          opacity: interpolate(frame, [6575, 6592], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
