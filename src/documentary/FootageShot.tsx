import { Video } from "@remotion/media";
import { useGsapTimeline } from "@remotion/gsap";
import { staticFile } from "remotion";

export type FootageAsset =
  | "qe-arrival"
  | "pow-arrival"
  | "f35-landing"
  | "qe-bow"
  | "ordnance-lift"
  | "ordnance-deck";

const credits: Record<FootageAsset, string> = {
  "qe-arrival": "U.S. Navy · 2022",
  "pow-arrival": "U.S. Navy · 2023",
  "f35-landing": "F-35 ITF · 2023",
  "qe-bow": "U.S. Navy · 2022",
  "ordnance-lift": "U.S. Marines · 2025",
  "ordnance-deck": "U.S. Marines · 2025",
};

/** Local, silent archival footage. The parent Sequence supplies the shot clock. */
export const FootageShot = ({
  asset,
  durationInFrames,
  direction = "port",
  holdExit = false,
  objectPosition = "50% 50%",
}: {
  asset: FootageAsset;
  durationInFrames: number;
  direction?: "port" | "starboard" | "deck";
  holdExit?: boolean;
  objectPosition?: string;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const seconds = durationInFrames / 30;
      const opening =
        direction === "deck"
          ? "inset(68% 0% 32% 0%)"
          : direction === "port"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)";
      timeline.fromTo(
        selector("[data-footage-mask]"),
        { clipPath: opening, opacity: 0.15 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        0,
      );
      timeline.fromTo(
        selector("[data-footage-camera]"),
        { scale: 1.035, x: direction === "port" ? 20 : -20, y: 9 },
        {
          scale: 1.09,
          x: direction === "port" ? -20 : 20,
          y: -9,
          duration: seconds,
          ease: "none",
        },
        0,
      );
      timeline.fromTo(
        selector("[data-footage-credit]"),
        { opacity: 0, y: 8 },
        { opacity: 0.8, y: 0, duration: 0.4, ease: "power3.out" },
        0.55,
      );
      if (!holdExit) {
        timeline.to(
          selector("[data-footage-mask]"),
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          Math.max(0.7, seconds - 0.5),
        );
      }
    },
    { dependencies: [durationInFrames, direction, holdExit] },
  );
  return (
    <div
      ref={scope}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div data-footage-mask style={{ position: "absolute", inset: 0 }}>
        <div data-footage-camera style={{ position: "absolute", inset: 0 }}>
          <Video
            src={staticFile(`video/${asset}.mp4`)}
            muted
            objectFit="cover"
            style={{
              width: "100%",
              height: "100%",
              objectPosition,
              filter: "saturate(0.66) contrast(1.06) brightness(0.86)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(11,26,46,0.9) 0%,rgba(11,26,46,0.2) 31%,rgba(11,26,46,0.02) 65%,rgba(11,26,46,0.8) 100%)",
          }}
        />
        <div
          data-footage-credit
          style={{
            position: "absolute",
            left: 154,
            bottom: 92,
            color: "#F4F7FA",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          {credits[asset]}
        </div>
      </div>
    </div>
  );
};
