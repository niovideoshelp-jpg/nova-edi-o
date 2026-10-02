import { useMemo } from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import { gsap } from "gsap";
import styled from "@emotion/styled";
import words from "../../data/words.json";
import narration from "../../data/timeline.json";
import type { SceneData } from "../Scene";

const Title = styled.div({
  position: "absolute",
  left: 154,
  top: 110,
  maxWidth: 1570,
  color: "#F4F7FA",
  fontFamily: "Inter, sans-serif",
  fontSize: 82,
  fontWeight: 620,
  letterSpacing: "-.055em",
  lineHeight: 1.12,
  textShadow: "0 3px 30px #0B1A2E66",
});

function CueText({
  text,
  at,
  start,
  duration,
  value,
  carryIn,
  carryOut,
  carryNumberIn,
  carryNumberOut,
}: {
  text: string;
  at: number;
  start: number;
  duration: number;
  value?: number | null;
  carryIn: boolean;
  carryOut: boolean;
  carryNumberIn: boolean;
  carryNumberOut: boolean;
}) {
  const frame = useCurrentFrame();
  const parts = useMemo(() => text.split(" "), [text]);
  const times = useMemo(() => {
    let cursor = at / 30 - 0.2;
    return parts.map((token) => {
      const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const match = words.find(
        (w) =>
          w.startMs / 1000 >= cursor &&
          w.startMs / 1000 < at / 30 + 3 &&
          clean(w.text) === clean(token),
      );
      if (match) {
        cursor = match.startMs / 1000 + 0.01;
        return Math.round(match.startMs * 0.03);
      }
      return at;
    });
  }, [at, parts]);
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      parts.forEach((_, i) => {
        const early = carryIn || (i === 0 && carryNumberIn) || times[i] < start;
        timeline.fromTo(
          selector(`[data-cue-word="${i}"]`),
          { yPercent: early ? 0 : 110, opacity: early ? 1 : 0 },
          { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          Math.max(0, (times[i] - start) / 30),
        );
      });
      // Only labels leave; the documentary environment continues under the next cue.
      if (!carryOut && !carryNumberOut)
        timeline.to(
          selector("[data-cue-line]"),
          { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" },
          Math.max(0.1, duration / 30 - 0.2),
        );
    },
    {
      dependencies: [
        text,
        at,
        start,
        duration,
        carryIn,
        carryOut,
        carryNumberIn,
        carryNumberOut,
      ],
    },
  );
  const progress = gsap.parseEase("power3.out")(
    Math.min(1, Math.max(0, (frame + start - at) / 15)),
  );
  const number =
    value !== null && value !== undefined
      ? gsap.utils.snap(1, (carryNumberIn ? 1 : progress) * value)
      : null;
  if (!text) return null;
  return (
    <Title ref={scope}>
      <div
        data-cue-line
        style={{ display: "flex", gap: 23, alignItems: "baseline" }}
      >
        {parts.map((part, i) => (
          <span
            key={`${i}-${part}`}
            style={{
              overflow: "hidden",
              display: "inline-block",
              paddingBottom: 12,
            }}
          >
            <span
              data-cue-word={i}
              style={{
                display: "inline-block",
                color: i === 0 && number !== null ? "#D4A94A" : undefined,
                fontWeight: i === 0 && number !== null ? 750 : undefined,
              }}
            >
              {i === 0 && number !== null ? number : part}
            </span>
          </span>
        ))}
      </div>
    </Title>
  );
}

/** Each original narrative cue stays individually editable in a Remotion Sequence. */
export const NarrationCue = ({ scene }: { scene: SceneData }) => {
  const previous = narration.scenes[scene.index - 1];
  const previousText = previous?.variants.at(-1)?.text ?? previous?.text;
  const next = narration.scenes[scene.index + 1];
  const nextText =
    next?.text ||
    (next?.variants[0]?.frame - (next?.startFrame ?? 0) < 15
      ? next?.variants[0]?.text
      : "");
  const chunks = [
    {
      frame: scene.startFrame,
      text:
        scene.text ||
        (scene.variants[0]?.frame - scene.startFrame < 15 &&
        scene.variants[0]?.text === previousText
          ? previousText
          : ""),
      value: scene.value,
      at: scene.textFrame,
    },
    ...scene.variants.map((v) => ({ ...v, at: v.frame })),
  ];
  return (
    <>
      {chunks.map((v, i) => {
        const from = v.frame - scene.startFrame;
        const end =
          chunks[i + 1]?.frame ?? scene.startFrame + scene.durationInFrames;
        if (!v.text || end <= v.frame) return null;
        return (
          <Sequence
            key={`${v.frame}-${v.text}`}
            from={from}
            durationInFrames={end - v.frame}
            layout="none"
            name={v.text}
          >
            <CueText
              text={v.text}
              at={v.at}
              start={v.frame}
              duration={end - v.frame}
              value={v.value}
              carryIn={(i === 0 ? previousText : chunks[i - 1].text) === v.text}
              carryNumberIn={
                v.value !== null &&
                v.value !== undefined &&
                (i === 0 ? previousText : chunks[i - 1].text) ===
                  String(v.value)
              }
              carryNumberOut={
                v.value !== null &&
                v.value !== undefined &&
                v.text === String(v.value) &&
                (i === chunks.length - 1
                  ? nextText
                  : chunks[i + 1].text
                )?.startsWith(`${v.value} `) === true
              }
              carryOut={
                (i === chunks.length - 1 ? nextText : chunks[i + 1].text) ===
                v.text
              }
            />
          </Sequence>
        );
      })}
    </>
  );
};
