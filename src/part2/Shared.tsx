import type { CSSProperties, ReactNode } from "react";
import styled from "@emotion/styled";
import { useGsapTimeline } from "@remotion/gsap";
import { Video } from "@remotion/media";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { gsap } from "gsap";

export const C = {
  navy: "#0B1A2E",
  steel: "#3A6EA5",
  white: "#F4F7FA",
  gold: "#D4A94A",
  red: "#C8102E",
  line: "#8FAFC7",
};
export const full = { position: "absolute", inset: 0 } as const;
export const mapEdge: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
  maskComposite: "intersect",
};
export const Stage = styled.div({
  ...full,
  overflow: "hidden",
  background: "radial-gradient(ellipse at 53% 60%, #173B55 0%, #0B1A2E 68%)",
  color: C.white,
  fontFamily: "Inter, sans-serif",
});

/** Frame-seeked editorial overlap. The outgoing environment remains underneath. */
export const Passage = ({
  children,
  kind = "dissolve",
  first = false,
}: {
  children: ReactNode;
  kind?: "dissolve" | "east" | "rise" | "focus";
  first?: boolean;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      if (first) return;
      timeline.fromTo(
        selector("[data-passage]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.inOut" },
        0,
      );
      if (kind === "east" || kind === "rise")
        timeline.fromTo(
          selector("[data-passage]"),
          {
            clipPath:
              kind === "east" ? "inset(0% 96% 0% 0%)" : "inset(92% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power3.inOut",
          },
          0,
        );
      if (kind === "focus")
        timeline.fromTo(
          selector("[data-passage]"),
          { scale: 1.055 },
          { scale: 1, duration: 0.9, ease: "power3.out" },
          0,
        );
    },
    { dependencies: [kind, first] },
  );
  return (
    <div ref={scope} style={{ ...full, overflow: "hidden" }}>
      <div
        data-passage
        style={{
          ...full,
          background:
            "radial-gradient(ellipse at 53% 60%, #173B55 0%, #0B1A2E 68%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Text timing is explicit, local to the scene, and never resolved by text search. */
export const Cue = ({
  text,
  at = 0,
  duration = 3,
  x = 154,
  y = 110,
  size = 78,
  color = C.white,
  align = "left",
  width = 1612,
}: {
  text: string;
  at?: number;
  duration?: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  align?: "left" | "center";
  width?: number;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      timeline.set(selector("[data-cue-ink]"), { yPercent: 108 }, 0);
      timeline.to(
        selector("[data-cue-ink]"),
        { yPercent: 0, duration: 0.48, ease: "power3.out" },
        at,
      );
      timeline.to(
        selector("[data-cue-ink]"),
        { yPercent: -108, duration: 0.3, ease: "power2.in" },
        at + Math.max(0.5, duration - 0.3),
      );
    },
    { dependencies: [at, duration, text] },
  );
  return (
    <div
      ref={scope}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        fontSize: size,
        fontWeight: 650,
        lineHeight: 1.15,
        letterSpacing: -2,
        textAlign: align,
        color,
        overflow: "hidden",
        paddingBottom: 8,
        pointerEvents: "none",
      }}
    >
      <div data-cue-ink>{text}</div>
    </div>
  );
};

/** Local archival media, cut to its usable duration. Never loops a take. */
export const MediaShot = ({
  src,
  credit,
  seconds,
  photo = false,
  fromScale = 1.025,
  toScale = 1.09,
  pan = 28,
  position = "50% 50%",
  style,
}: {
  src: string;
  credit: string;
  seconds: number;
  photo?: boolean;
  fromScale?: number;
  toScale?: number;
  pan?: number;
  position?: string;
  style?: CSSProperties;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      timeline.fromTo(
        selector("[data-media-camera]"),
        { scale: fromScale, x: pan / 2, y: 6 },
        { scale: toScale, x: -pan / 2, y: -6, duration: seconds, ease: "none" },
        0,
      );
      timeline.fromTo(
        selector("[data-media-credit]"),
        { opacity: 0 },
        { opacity: 0.8, duration: 0.4 },
        0.4,
      );
    },
    { dependencies: [seconds, fromScale, toScale, pan] },
  );
  const mediaStyle = {
    width: "100%",
    height: "100%",
    objectPosition: position,
    filter: "saturate(.82) contrast(1.04) brightness(.96)",
  };
  return (
    <div ref={scope} style={{ ...full, overflow: "hidden", ...style }}>
      <div data-media-camera style={full}>
        {photo ? (
          <Img
            src={staticFile(src)}
            style={{ ...mediaStyle, objectFit: "cover" }}
          />
        ) : (
          <Video
            src={staticFile(src)}
            muted
            objectFit="cover"
            style={mediaStyle}
          />
        )}
      </div>
      <div
        style={{
          ...full,
          background:
            "linear-gradient(180deg,rgba(11,26,46,.82),rgba(11,26,46,.05) 36%,rgba(11,26,46,0) 65%,rgba(11,26,46,.78))",
        }}
      />
      <div
        data-media-credit
        style={{
          position: "absolute",
          left: 154,
          bottom: 90,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 0.7,
          color: C.white,
        }}
      >
        {credit}
      </div>
    </div>
  );
};

export const SmallLabel = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      fontSize: 28,
      fontWeight: 550,
      color: C.line,
      letterSpacing: 1.5,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Quantized, seek-safe statistic; number and unit share a measured baseline. */
export const Stat = ({
  value,
  suffix = "",
  label,
  at = 0,
  duration = 3,
  x = 154,
  y = 700,
  width = 1612,
  size = 108,
  color = C.white,
}: {
  value: number;
  suffix?: string;
  label: string;
  at?: number;
  duration?: number;
  x?: number;
  y?: number;
  width?: number;
  size?: number;
  color?: string;
}) => {
  const t = useCurrentFrame() / 30;
  const p = Math.min(1, Math.max(0, (t - at) / 0.55));
  const number = Math.round(value * gsap.parseEase("power3.out")(p));
  return (
    <Cue
      text={`${number.toLocaleString("en-US")}${suffix} ${label}`}
      at={at}
      duration={duration}
      x={x}
      y={y}
      width={width}
      size={size}
      color={color}
    />
  );
};
