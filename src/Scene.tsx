import { useMemo } from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { useGsapTimeline } from "@remotion/gsap";
import words from "../data/words.json";
import plans from "../data/visual-plan.json";
import { MapAtlas, type MapMode } from "./MapAtlas";
import { NavalGraphic } from "./NavalGraphic";

type Variant = {
  frame: number;
  asset: string;
  text: string;
  value?: number;
  visualMedia?: Visual;
};
export type SceneData = {
  id: string;
  index: number;
  asset: string;
  text: string;
  startFrame: number;
  durationInFrames: number;
  iconRevealFrame: number;
  textFrame: number;
  entry: string;
  transition: string;
  value: number | null;
  alert: boolean;
  variants: Variant[];
};
type Visual = { kind: string; name: string; concept?: string };
const Frame = styled.div({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  fontFamily: "Inter, sans-serif",
  color: "#F4F7FA",
});
const Caption = styled.div({
  position: "absolute",
  left: 200,
  right: 200,
  top: 828,
  height: 166,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: 80,
  fontWeight: 600,
  letterSpacing: "-.04em",
  lineHeight: 1.1,
  whiteSpace: "nowrap",
});
const clamp = (n: number) => Math.max(0, Math.min(1, n));

function WordLabel({
  text,
  at,
  startFrame,
  value,
  large = false,
}: {
  text: string;
  at: number;
  startFrame: number;
  value: number | null | undefined;
  large?: boolean;
}) {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  const parts = useMemo(() => text.split(" "), [text]);
  const cues = useMemo(() => {
    let cursor = at / fps - 0.15;
    return parts.map((token) => {
      const clean = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "");
      const match = words.find(
        (w) =>
          w.startMs / 1000 >= cursor &&
          w.startMs / 1000 < at / fps + 3.5 &&
          clean(w.text) === clean(token),
      );
      if (match) {
        cursor = match.startMs / 1000 + 0.01;
        return (Math.round((match.startMs / 1000) * fps) - startFrame) / fps;
      }
      return Math.max(0, (at - startFrame) / fps);
    });
  }, [parts, at, fps, startFrame]);
  const scope = useGsapTimeline<HTMLSpanElement>(
    ({ timeline, selector }) => {
      if (value !== null && value !== undefined) {
        timeline.fromTo(
          selector("[data-number]"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          Math.max(0, (at - startFrame) / fps),
        );
      } else
        cues.forEach((t, i) =>
          timeline.fromTo(
            selector(`[data-word="${i}"]`),
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            Math.max(0, t),
          ),
        );
    },
    { dependencies: [text, at, startFrame, value] },
  );
  const q = gsap.parseEase("power3.out")(
    clamp((frame + startFrame - at) / (0.5 * fps)),
  );
  const number = gsap.utils.snap(1, q * (value ?? 0));
  return (
    <span
      ref={scope}
      style={{
        display: "inline-flex",
        gap: large ? 30 : 22,
        alignItems: "baseline",
      }}
    >
      {value !== null && value !== undefined ? (
        <span style={{ overflow: "hidden" }}>
          <span
            data-number
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 24,
              opacity: 0,
            }}
          >
            <span
              style={{
                fontSize: large ? 210 : 132,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: "#D4A94A",
              }}
            >
              {number}
            </span>
            {text.replace(/^\d+\s*/, "") && (
              <span style={{ fontSize: 70 }}>
                {text.replace(/^\d+\s*/, "")}
              </span>
            )}
          </span>
        </span>
      ) : (
        parts.map((word, i) => (
          <span
            key={`${i}-${word}`}
            style={{ overflow: "hidden", paddingBottom: 16 }}
          >
            <span
              data-word={i}
              style={{
                display: "block",
                opacity: 0,
                fontSize: large ? 124 : undefined,
              }}
            >
              {word}
            </span>
          </span>
        ))
      )}
    </span>
  );
}

export const Scene = ({ scene }: { scene: SceneData }) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  const globalFrame = f + scene.startFrame;
  const active = scene.variants.filter((v) => v.frame <= globalFrame).at(-1);
  const base: Visual = plans[scene.id as keyof typeof plans];
  const visual = active?.visualMedia ?? base;
  const reveal =
    active && active.asset !== scene.asset
      ? active.frame
      : scene.iconRevealFrame;
  const delay = Math.max(0, (reveal - scene.startFrame) / fps);
  const duration = scene.durationInFrames / fps;
  const text = active?.text ?? scene.text;
  const labelFrame = active?.frame ?? scene.textFrame;
  const title = visual.kind === "title";
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const entrances: Record<string, Record<string, number>> = {
        lift: { y: 35 },
        rise: { y: 45 },
        sail: { x: -65 },
        expand: { scale: 0.88 },
        dive: { y: -38 },
        turn: { rotation: -4 },
        open: { scale: 0.94 },
        draw: { y: 14 },
      };
      const ease = scene.entry === "expand" ? "expo.out" : "power3.out";
      if (!title) {
        timeline.fromTo(
          selector("[data-visual]"),
          { opacity: 0, ...entrances[scene.entry] },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease,
          },
          delay,
        );
        timeline.fromTo(
          selector("[data-drift]"),
          { scale: 1, x: 0, y: 0 },
          {
            scale: scene.id === "S42" ? 1.09 : 1.045,
            x: scene.index % 2 === 0 ? 12 : -12,
            y: -8,
            duration: Math.max(0.5, duration - delay),
            ease: "none",
          },
          delay,
        );
      }
      const clips: Record<string, string> = {
        course: "inset(0 100% 0 0)",
        horizon: "inset(0 0 100% 0)",
        dive: "inset(48% 0 52% 0)",
        iris: "circle(0% at 50% 46%)",
        page: "inset(0 0 0 100%)",
        orbit: "inset(100% 0 0 0)",
      };
      const full =
        scene.transition === "iris"
          ? "circle(100% at 50% 46%)"
          : "inset(0% 0% 0% 0%)";
      timeline.fromTo(
        selector("[data-exit]"),
        { clipPath: full },
        { clipPath: clips[scene.transition], duration: 0.3, ease: "power2.in" },
        duration - 0.3,
      );
      const captions = selector("[data-caption]");
      if (captions.length)
        timeline.to(
          captions,
          { opacity: 0, duration: 0.28, ease: "power2.in" },
          duration - 0.28,
        );
    },
    { dependencies: [scene.id, visual.kind, visual.name, reveal, text] },
  );
  return (
    <Frame ref={scope} data-scene={scene.id} data-visual-name={visual.name}>
      <div data-exit style={{ position: "absolute", inset: 0 }}>
        {!title && (
          <div
            data-visual
            style={{
              position: "absolute",
              left: 360,
              top: text ? 74 : 140,
              width: 1200,
              height: 760,
              opacity: 0,
              transformOrigin: "50% 50%",
            }}
          >
            <div
              data-drift
              style={{ width: 1200, height: 760, transformOrigin: "50% 50%" }}
            >
              {visual.kind === "map" ? (
                <MapAtlas
                  key={visual.name}
                  mode={visual.name as MapMode}
                  duration={duration}
                  delay={delay}
                />
              ) : visual.kind === "graphic" ? (
                <NavalGraphic
                  key={visual.name}
                  mode={visual.name}
                  duration={duration}
                  delay={delay}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Img
                    src={staticFile(
                      `images/${visual.kind === "photo" ? "web" : "generated"}/${visual.name}.${visual.kind === "photo" ? "jpg" : "png"}`,
                    )}
                    alt={visual.concept ?? visual.name}
                    style={{
                      width:
                        visual.name === "anchor"
                          ? 610
                          : visual.name === "sailing-ship"
                            ? 830
                            : visual.name === "daring-dauntless"
                              ? 540
                              : 1100,
                      height: 700,
                      objectFit: "contain",
                      filter:
                        visual.kind === "photo"
                          ? "saturate(.65) contrast(1.04)"
                          : "none",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {text && (
          <Caption
            data-caption
            style={title ? { top: 395, height: 280 } : undefined}
          >
            <WordLabel
              key={`${labelFrame}-${text}`}
              text={text}
              at={labelFrame}
              startFrame={scene.startFrame}
              value={active?.value ?? scene.value}
              large={title}
            />
          </Caption>
        )}
      </div>
    </Frame>
  );
};
