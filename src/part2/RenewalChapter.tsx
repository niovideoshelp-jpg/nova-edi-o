import { useGsapTimeline } from "@remotion/gsap";
import { Sequence } from "remotion";
import { C, Cue, full, MediaShot, Stage, Stat } from "./Shared";
import { FrigateProfile } from "./FutureVectors";
import { cueAt, iconAt } from "./Timing";

const START = 3226;
const cues: Record<number, string> = {
  3233: "renewal-renewing",
  3347: "renewal-type26-eight",
  3437: "renewal-asw",
  3491: "renewal-type31-five",
  3576: "renewal-general-purpose",
  3688: "renewal-type23-replacement",
  3804: "renewal-transition-gap",
  3872: "renewal-retirements",
  3968: "renewal-trials",
  4066: "renewal-june-2025",
  4163: "renewal-acknowledgement",
  4329: "renewal-not-ready",
};
// Additional intra-beat words have fixed reviewed word frames, not text searches.
const at = (globalFrame: number) =>
  cues[globalFrame]
    ? cueAt(cues[globalFrame], START)
    : (globalFrame - START) / 30;
const early = (globalFrame: number) =>
  cues[globalFrame] ? iconAt(cues[globalFrame], START) : at(globalFrame - 4);

/**
 * 3226–4360, plus the outgoing 24-frame overlap.
 * A vessel being renewed becomes the same vessel in an explanatory replacement
 * diagram, then an unfinished hull passing through construction / test / readiness.
 */
export const RenewalChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (value: string) => selector(value);
      timeline.set(q("[data-renewal-film]"), { opacity: 1 }, 0);
      timeline.set(q("[data-old]"), { opacity: 0, x: 0, y: 0, scale: 1 }, 0);
      timeline.set(q("[data-26]"), { opacity: 0, x: 440, y: 0, scale: 1 }, 0);
      timeline.set(
        q("[data-31]"),
        { opacity: 0, x: 530, y: 70, scale: 0.8 },
        0,
      );
      timeline.set(
        q("[data-connector], [data-transition-gap], [data-tests]"),
        { opacity: 0 },
        0,
      );
      timeline.set(
        q("[data-progress], [data-gap-line]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(q("[data-program-unit]"), { opacity: 0, y: 18 }, 0);
      timeline.set(q("[data-scan]"), { opacity: 0, x: 0 }, 0);
      timeline.set(q("[data-sonar]"), { opacity: 0 }, 0);
      timeline.set(q("[data-renewal-camera]"), { x: -10, y: 5, scale: 1 }, 0);
      timeline.set(
        q(
          "[data-old] [data-draw], [data-26] [data-draw], [data-31] [data-draw]",
        ),
        { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 },
        0,
      );

      timeline.to(
        q("[data-renewal-camera]"),
        { x: 10, y: -5, scale: 1.025, duration: 38.6, ease: "none" },
        0,
      );
      timeline.to(
        q("[data-old]"),
        { opacity: 1, duration: 0.65, ease: "power3.out" },
        1.15,
      );
      timeline.to(
        q("[data-old] [data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
        },
        1.15,
      );
      timeline.to(
        q("[data-old] [data-draw]"),
        { fillOpacity: 1, duration: 0.5, ease: "power3.out" },
        1.8,
      );
      timeline.to(
        q("[data-renewal-film]"),
        { opacity: 0, duration: 0.9, ease: "power2.inOut" },
        1.8,
      );
      timeline.to(
        q("[data-old]"),
        {
          x: -370,
          y: 140,
          scale: 0.57,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        2.8,
      );

      const type26 = early(3347);
      timeline.to(
        q("[data-26]"),
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" },
        type26,
      );
      timeline.to(
        q("[data-26] [data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
        },
        type26,
      );
      timeline.to(
        q("[data-26] [data-draw]"),
        { fillOpacity: 1, duration: 0.45 },
        type26 + 0.45,
      );
      timeline.to(
        q("[data-units-26] [data-program-unit]"),
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.065,
          ease: "power3.out",
        },
        at(3347),
      );
      timeline.to(
        q("[data-sonar]"),
        { opacity: 0.7, duration: 0.45 },
        early(3437),
      );
      timeline.fromTo(
        q("[data-sonar] path"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        early(3437),
      );
      timeline.to(
        q("[data-sonar]"),
        { opacity: 0, duration: 0.4 },
        early(3491) - 0.4,
      );

      const type31 = early(3491);
      timeline.to(
        q("[data-26]"),
        { y: -142, scale: 0.8, duration: 0.9, ease: "power3.inOut" },
        type31 - 0.28,
      );
      timeline.to(
        q("[data-31]"),
        { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
        type31,
      );
      timeline.to(
        q("[data-31] [data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        type31,
      );
      timeline.to(
        q("[data-31] [data-draw]"),
        { fillOpacity: 1, duration: 0.45 },
        type31 + 0.45,
      );
      timeline.to(
        q("[data-units-31] [data-program-unit]"),
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.085,
          ease: "power3.out",
        },
        at(3491),
      );

      const together = early(3616);
      timeline.to(
        q("[data-26]"),
        { x: 370, y: -15, scale: 0.53, duration: 1.15, ease: "power3.inOut" },
        together,
      );
      timeline.to(
        q("[data-31]"),
        { x: 370, y: -80, scale: 0.53, duration: 1.15, ease: "power3.inOut" },
        together,
      );
      timeline.to(
        q("[data-old]"),
        {
          opacity: 1,
          x: -405,
          y: 142,
          scale: 0.57,
          duration: 0.8,
          ease: "power3.out",
        },
        together + 0.2,
      );
      timeline.to(
        q("[data-connector]"),
        { opacity: 0.75, duration: 0.5 },
        early(3662),
      );
      timeline.fromTo(
        q("[data-connector] path"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: "power3.out" },
        early(3662),
      );
      timeline.to(
        q("[data-program-units]"),
        { opacity: 0, duration: 0.35 },
        together,
      );

      const difficult = early(3792);
      timeline.to(
        q("[data-connector]"),
        { opacity: 0, duration: 0.3 },
        difficult - 0.2,
      );
      timeline.to(
        q("[data-old]"),
        { x: -405, duration: 1.1, ease: "power3.inOut" },
        difficult - 0.2,
      );
      timeline.to(
        q("[data-26], [data-31]"),
        { x: 470, duration: 1.1, ease: "power3.inOut" },
        difficult - 0.2,
      );
      timeline.to(
        q("[data-transition-gap]"),
        { opacity: 1, duration: 0.45 },
        difficult,
      );
      timeline.to(
        q("[data-gap-line]"),
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        difficult,
      );
      timeline.to(
        q("[data-old]"),
        { x: -1090, opacity: 0, duration: 1.55, ease: "power2.inOut" },
        early(3850),
      );
      timeline.to(
        q("[data-transition-gap]"),
        { opacity: 0, duration: 0.45 },
        early(3906),
      );
      timeline.to(
        q("[data-31]"),
        { opacity: 0, x: 730, duration: 0.65, ease: "power2.in" },
        early(3906),
      );
      timeline.to(
        q("[data-26]"),
        { x: 0, y: 0, scale: 1, duration: 1.15, ease: "power3.inOut" },
        early(3906),
      );
      timeline.to(
        q("[data-26] [data-draw]"),
        { fillOpacity: 0.12, duration: 0.5 },
        early(3906),
      );
      timeline.to(
        q("[data-tests]"),
        { opacity: 1, duration: 0.55, ease: "power3.out" },
        early(3906),
      );
      timeline.to(
        q("[data-26] [data-hull]"),
        { fillOpacity: 1, duration: 0.5, ease: "power3.out" },
        early(3942),
      );
      timeline.to(
        q("[data-26] [data-superstructure]"),
        { fillOpacity: 0.85, duration: 0.5, stagger: 0.1 },
        early(3968),
      );
      timeline.to(
        q("[data-step-one]"),
        { strokeDashoffset: 0, duration: 0.6 },
        early(3942),
      );
      timeline.to(
        q("[data-step-two]"),
        { strokeDashoffset: 0, duration: 0.6 },
        early(3968),
      );
      timeline.to(
        q("[data-step-three]"),
        { strokeDashoffset: 0, duration: 0.75 },
        early(4011),
      );
      timeline.to(
        q("[data-scan]"),
        { opacity: 0.75, duration: 0.2 },
        early(3968),
      );
      timeline.to(
        q("[data-scan]"),
        { x: 1130, duration: 1.55, ease: "power1.inOut" },
        early(3968),
      );
      timeline.to(
        q("[data-scan]"),
        { opacity: 0, duration: 0.35 },
        early(4011) + 0.1,
      );
      timeline.to(
        q("[data-tests]"),
        { y: 14, duration: 3, ease: "none" },
        early(4011),
      );

      timeline.to(
        q("[data-26]"),
        { y: 32, scale: 0.95, duration: 3, ease: "power2.inOut" },
        early(4066),
      );
      timeline.to(
        q("[data-26] [data-draw]"),
        { fillOpacity: 0.35, duration: 1.2 },
        early(4066),
      );
      timeline.to(
        q("[data-tests]"),
        { opacity: 0.3, duration: 0.7 },
        early(4119),
      );
      timeline.to(
        q("[data-tests]"),
        { y: 4, duration: 5, ease: "none" },
        early(4119),
      );
      timeline.to(
        q("[data-26]"),
        { x: -30, scale: 0.99, duration: 5.5, ease: "none" },
        early(4199),
      );
      timeline.to(
        q("[data-final-gate]"),
        { stroke: C.red, duration: 0.5 },
        early(4241),
      );
      // Keep the unfinished profile and gate visible through global4383.
      timeline.fromTo(
        q("[data-26] [data-radar]"),
        { attr: { transform: "translate(441 62) scale(1 1)" } },
        {
          attr: { transform: "translate(441 62) scale(-1 1)" },
          duration: 1.7,
          repeat: 22,
          yoyo: true,
          ease: "sine.inOut",
        },
        type26,
      );
      timeline.fromTo(
        q("[data-wake]"),
        { opacity: 0.22 },
        {
          opacity: 0.6,
          duration: 1.8,
          repeat: 21,
          yoyo: true,
          ease: "sine.inOut",
        },
        0,
      );
    },
    { dependencies: [] },
  );

  return (
    <Stage ref={scope}>
      <div data-renewal-film style={full}>
        <Sequence durationInFrames={86} layout="none">
          <MediaShot
            src="video/part2/richmond-bow.mp4"
            credit="Royal Navy · HMS Richmond"
            seconds={86 / 30}
            fromScale={1.04}
            toScale={1.1}
            pan={-38}
            position="50% 56%"
          />
        </Sequence>
      </div>
      <div data-renewal-camera style={{ ...full, transformOrigin: "50% 57%" }}>
        <div
          data-old
          style={{
            position: "absolute",
            left: 285,
            top: 315,
            width: 1350,
            height: 405,
            transformOrigin: "50% 50%",
            opacity: 0,
          }}
        >
          <FrigateProfile kind="type23" />
        </div>
        <div
          data-26
          style={{
            position: "absolute",
            left: 300,
            top: 330,
            width: 1320,
            height: 396,
            transformOrigin: "50% 50%",
            opacity: 0,
          }}
        >
          <FrigateProfile kind="type26" />
          <div
            data-program-units
            data-units-26
            style={{
              position: "absolute",
              left: 310,
              top: 385,
              display: "flex",
              gap: 17,
            }}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                data-program-unit
                style={{
                  width: 58,
                  height: 11,
                  background: C.gold,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
        <div
          data-31
          style={{
            position: "absolute",
            left: 300,
            top: 565,
            width: 1320,
            height: 396,
            transformOrigin: "50% 50%",
            opacity: 0,
          }}
        >
          <FrigateProfile kind="type31" />
          <div
            data-program-units
            data-units-31
            style={{
              position: "absolute",
              left: 440,
              top: 365,
              display: "flex",
              gap: 17,
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                data-program-unit
                style={{
                  width: 58,
                  height: 11,
                  background: C.gold,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1920 1080" style={full} width="1920" height="1080">
          <g
            data-sonar
            fill="none"
            stroke={C.steel}
            strokeWidth="3"
            opacity="0"
          >
            <path pathLength="1" d="M610 720Q780 811 950 720" />
            <path pathLength="1" d="M556 744Q780 866 1004 744" />
            <path pathLength="1" d="M506 768Q780 921 1054 768" />
          </g>
          <g
            data-connector
            fill="none"
            stroke={C.gold}
            strokeWidth="3.5"
            opacity="0"
          >
            <path pathLength="1" d="M921 732H962V578H998M962 732V743H998" />
            <path
              pathLength="1"
              d="M980 567 999 578 980 589M980 732 999 743 980 754"
            />
          </g>
          <g
            data-transition-gap
            fill="none"
            stroke={C.red}
            strokeWidth="4"
            opacity="0"
          >
            <path
              data-gap-line
              pathLength="1"
              d="M935 622V806M1060 622V806M935 714H1060"
            />
            <path d="M935 698 920 714 935 730M1060 698 1075 714 1060 730" />
          </g>
          <g data-tests fill="none" stroke={C.line} strokeWidth="3" opacity="0">
            <path opacity=".28" d="M508 842H1440" />
            {[540, 940, 1340].map((x, i) => (
              <circle
                key={i}
                data-final-gate={i === 2 ? "" : undefined}
                cx={x}
                cy={842}
                r={31}
                fill={C.navy}
              />
            ))}
            <path
              data-progress
              data-step-one
              pathLength="1"
              stroke={C.gold}
              d="M526 843 537 855 555 829M571 842H908"
            />
            <path
              data-progress
              data-step-two
              pathLength="1"
              stroke={C.gold}
              d="M922 842H958M940 824V860M971 842H1308"
            />
            <path
              data-progress
              data-step-three
              pathLength="1"
              stroke={C.gold}
              d="M1325 842H1355M1344 831 1355 842 1344 853"
            />
            <path data-final-gate d="M1443 801V883" strokeWidth="6" />
          </g>
          <g data-scan opacity="0">
            <rect
              x="312"
              y="390"
              width="42"
              height="300"
              fill={C.steel}
              opacity=".11"
            />
            <path
              d="M354 390V690"
              fill="none"
              stroke={C.gold}
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>
      <Stat
        value={8}
        label="Type 26"
        at={at(3347)}
        duration={4.6}
        y={110}
        size={88}
      />
      <Stat
        value={5}
        label="Type 31"
        at={at(3491)}
        duration={4.1}
        y={110}
        size={88}
      />
      <Cue text="Type 23" at={at(3688)} duration={2.7} size={78} />
      <Cue
        text="Difficult transition"
        at={at(3792)}
        duration={2.45}
        size={78}
      />
      <Cue text="June 2025" at={at(4066)} duration={3.6} size={78} />
      <Cue
        text="Difficult transition"
        at={at(4241)}
        duration={4.75}
        size={82}
      />
    </Stage>
  );
};
