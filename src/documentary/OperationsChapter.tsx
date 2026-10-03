import { useId } from "react";
import { Img, Sequence, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";
import { AircraftUnit, VesselPlan } from "./NavalDiagramsV5";
import { FootageShot } from "./FootageShot";

const gold = "#D4A94A";
const white = "#F4F7FA";
const world = atlas.views.distance;
const route = world.routes[0];
const sec = (globalFrame: number) => (globalFrame - 3326) / 30;
const fill = { position: "absolute" as const, inset: 0 };
const MapBase = () => (
  <Img
    src={staticFile(atlasLayerPath("distance"))}
    style={{ ...fill, width: 1920, height: 1216 }}
  />
);

/** Reach, an air-wing count, physical replenishment, then documentary evidence. */
export const OperationsChapter = () => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline: t, selector: s }) => {
      const q = (n: string) => s(`[data-ops="${n}"]`);
      // Explicit zero-time transforms avoid inheriting a future SVG origin on seek.
      t.set(
        q("theatre-camera"),
        { scale: 1.68, x: -770, y: -75, transformOrigin: "0 0" },
        0,
      );
      t.to(
        q("theatre-camera"),
        { scale: 1.55, x: -660, y: -40, duration: 3.7, ease: "none" },
        0,
      );
      t.to(
        q("theatre-camera"),
        { scale: 1.04, x: -45, y: 75, duration: 1.7, ease: "power3.inOut" },
        sec(3437),
      );
      t.to(
        q("theatre-camera"),
        { scale: 1.6, x: -1280, y: -165, duration: 2.3, ease: "power3.inOut" },
        sec(3552) - 0.55,
      );
      t.to(
        q("theatre-camera"),
        { scale: 2.16, x: -1250, y: -226, duration: 1.4, ease: "power3.inOut" },
        sec(3658) - 0.5,
      );
      t.fromTo(
        q("theatre-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.25, ease: "power3.out" },
        0.16,
      );
      t.fromTo(
        q("theatre-pulse"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -210, duration: 13, ease: "none" },
        0,
      );
      t.fromTo(
        q("months"),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        sec(3437),
      );
      t.fromTo(
        s("[data-month-unit]"),
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.45, stagger: 0.09, ease: "power3.out" },
        sec(3437),
      );
      t.to(
        q("months"),
        { opacity: 0, y: 35, duration: 0.35, ease: "power2.in" },
        sec(3552),
      );

      // A unit chart replaces 24 copies of an AI close-up. The marks are counting
      // glyphs, never dimensioned or technically annotated aircraft drawings.
      t.fromTo(
        q("airwing"),
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        sec(3713) - 0.12,
      );
      t.to(
        q("theatre"),
        { x: -120, opacity: 0, duration: 0.6, ease: "power3.inOut" },
        sec(3713),
      );
      t.set(
        q("count-camera"),
        { scale: 2.5, x: 890, y: 90, transformOrigin: "0 0" },
        0,
      );
      t.fromTo(
        s('[data-air-unit="0"]'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        sec(3713),
      );
      t.to(
        q("count-camera"),
        { scale: 1, x: 0, y: 0, duration: 1.8, ease: "power3.inOut" },
        sec(3745) + 0.7,
      );
      t.fromTo(
        s('[data-air-unit]:not([data-air-unit="0"])'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.045, ease: "power3.out" },
        sec(3745) + 1.05,
      );
      t.to(
        q("count-camera"),
        { scale: 1.035, x: -18, y: -8, duration: 3.1, ease: "none" },
        sec(3842),
      );
      t.fromTo(
        q("count-bracket"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.65, ease: "power3.out" },
        sec(3842),
      );
      t.to(
        q("airwing"),
        { y: -95, opacity: 0, duration: 0.8, ease: "power3.inOut" },
        sec(3954),
      );

      // The second geographic view starts at home and reveals operating reach.
      // A signal travels this geodesic; no ship is shown sailing over land.
      t.fromTo(
        q("reach"),
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: "power3.out" },
        sec(4183) - 0.35,
      );
      t.set(
        q("reach-camera"),
        { scale: 2.3, x: -1330, y: -135, transformOrigin: "0 0" },
        0,
      );
      t.to(
        q("reach-camera"),
        { scale: 1.04, x: -40, y: 42, duration: 3.5, ease: "power3.inOut" },
        sec(4183) - 0.3,
      );
      t.to(
        q("reach-camera"),
        { scale: 1.18, x: -240, y: -30, duration: 4.8, ease: "none" },
        sec(4295),
      );
      t.fromTo(
        q("reach-draw"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 2.35, ease: "power2.inOut" },
        sec(4295) - 0.5,
      );
      t.fromTo(
        q("reach-flow"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -400, duration: 7.5, ease: "none" },
        sec(4295),
      );
      t.fromTo(
        s("[data-reach-ring]"),
        { attr: { r: 2 }, opacity: 0.8 },
        {
          attr: { r: 40 },
          opacity: 0.12,
          duration: 3.2,
          stagger: 0.7,
          ease: "power2.out",
        },
        sec(4295),
      );
      t.to(
        q("reach"),
        { opacity: 0, x: -180, duration: 0.7, ease: "power3.inOut" },
        sec(4494) - 0.35,
      );

      // Aligned ship plans establish the physical geometry of transfer alongside.
      t.fromTo(
        q("replenishment-plan"),
        { opacity: 0, y: 100, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        sec(4494) - 0.2,
      );
      t.fromTo(
        s("[data-supply-plan] [data-vessel-outline]"),
        { strokeDasharray: 1400, strokeDashoffset: 1400, fillOpacity: 0.15 },
        {
          strokeDashoffset: 0,
          fillOpacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        sec(4494) - 0.15,
      );
      t.fromTo(
        q("service-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        sec(4543),
      );
      t.fromTo(
        q("fuel-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        sec(4569),
      );
      t.fromTo(
        q("cargo-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
        sec(4589),
      );
      t.fromTo(
        q("transfer-flow"),
        { opacity: 0, strokeDashoffset: 0 },
        { opacity: 1, strokeDashoffset: -180, duration: 5.8, ease: "none" },
        sec(4569),
      );
      t.fromTo(
        q("escort-plan"),
        { opacity: 0, y: 160 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        sec(4615),
      );
      t.fromTo(
        q("wake"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -130, duration: 9, ease: "none" },
        sec(4494),
      );
      t.to(
        q("plan-camera"),
        { scale: 1.045, x: -25, y: -10, duration: 7.8, ease: "none" },
        sec(4494) + 0.4,
      );
      t.to(
        q("replenishment-plan"),
        { scale: 1.14, opacity: 0, duration: 0.8, ease: "power3.inOut" },
        sec(4770),
      );
    },
    { dependencies: [uid] },
  );

  return (
    <div ref={scope} style={{ ...fill, overflow: "hidden" }}>
      <div data-ops="theatre" style={fill}>
        <div
          data-ops="theatre-camera"
          style={{ ...fill, transformOrigin: "0 0" }}
        >
          <MapBase />
          <svg viewBox="0 0 1200 675" width="1920" height="1080" style={fill}>
            <path d={world.uk} fill={gold} />
            <path
              data-ops="theatre-line"
              d="M598 217 Q620 242 650 271 Q778 352 924 390"
              fill="none"
              stroke={gold}
              strokeWidth="1.8"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-ops="theatre-pulse"
              d="M598 217 Q620 242 650 271 Q778 352 924 390"
              fill="none"
              stroke={white}
              strokeWidth="2.2"
              strokeDasharray="2 38"
            />
            {[
              [598, 217],
              [650, 271],
              [924, 390],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={gold}
                  stroke="#0B1A2E"
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  fill="none"
                  stroke={gold}
                  strokeWidth="1"
                  strokeOpacity=".45"
                />
              </g>
            ))}
          </svg>
        </div>
        <div
          data-ops="months"
          style={{
            position: "absolute",
            left: 154,
            top: 910,
            width: 1612,
            display: "flex",
            gap: 18,
            opacity: 0,
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              data-month-unit
              style={{
                flex: 1,
                height: 16,
                borderTop: `2px solid ${gold}`,
                background: "linear-gradient(#D4A94A50,transparent)",
                transform: "scaleX(0)",
              }}
            />
          ))}
        </div>
      </div>

      <div data-ops="airwing" style={{ ...fill, opacity: 0 }}>
        <div
          data-ops="count-camera"
          style={{
            position: "absolute",
            left: 224,
            top: 294,
            width: 1472,
            height: 660,
            transformOrigin: "0 0",
          }}
        >
          <svg viewBox="0 0 1472 660" width="1472" height="660">
            {Array.from({ length: 24 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${(i % 8) * 188} ${Math.floor(i / 8) * 202})`}
              >
                <g data-air-unit={i} opacity="0">
                  <path d="M13 171 H145" stroke="#6B88A2" strokeWidth="1.5" />
                  <g transform="translate(10 0) scale(1.12)">
                    <AircraftUnit />
                  </g>
                </g>
              </g>
            ))}
            <path
              data-ops="count-bracket"
              d="M10 621 V639 H1462 V621"
              fill="none"
              stroke={gold}
              strokeWidth="3"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
          </svg>
        </div>
      </div>

      <Sequence
        from={628}
        durationInFrames={229}
        name="Queen Elizabeth class — documentary footage"
      >
        <FootageShot asset="qe-bow" durationInFrames={229} direction="port" />
      </Sequence>

      <div data-ops="reach" style={{ ...fill, opacity: 0 }}>
        <div
          data-ops="reach-camera"
          style={{ ...fill, transformOrigin: "0 0" }}
        >
          <MapBase />
          <svg viewBox="0 0 1200 675" width="1920" height="1080" style={fill}>
            <defs>
              <mask
                id={`${uid}-reach`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1200"
                height="760"
              >
                <path
                  data-ops="reach-draw"
                  d={route.d}
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </mask>
            </defs>
            <path d={world.uk} fill={gold} />
            <path
              d={route.d}
              fill="none"
              stroke={gold}
              strokeWidth="2.3"
              strokeDasharray="1 6"
              strokeLinecap="round"
              mask={`url(#${uid}-reach)`}
            />
            <path
              data-ops="reach-flow"
              d={route.d}
              fill="none"
              stroke={white}
              strokeWidth="2.4"
              strokeDasharray="5 58"
              mask={`url(#${uid}-reach)`}
            />
            {[route.from, route.to].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={gold} />
                {[0, 1, 2].map((j) => (
                  <circle
                    key={j}
                    data-reach-ring
                    cx={x}
                    cy={y}
                    r="2"
                    fill="none"
                    stroke={gold}
                    strokeWidth="1"
                    opacity="0"
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div data-ops="replenishment-plan" style={{ ...fill, opacity: 0 }}>
        <div
          data-ops="plan-camera"
          style={{ ...fill, transformOrigin: "50% 55%" }}
        >
          <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={fill}>
            <g
              data-ops="wake"
              fill="none"
              stroke="#627F98"
              strokeWidth="2"
              strokeDasharray="25 16"
              opacity=".22"
            >
              <path d="M504 390 Q466 720 442 974 M716 390 Q754 720 778 974 M1104 390 Q1066 720 1042 974 M1316 390 Q1354 720 1378 974" />
            </g>
            <g data-supply-plan transform="translate(482 286) scale(1.26)">
              <VesselPlan kind="supply" />
            </g>
            <g data-supply-plan transform="translate(1082 286) scale(1.26)">
              <VesselPlan kind="carrier" />
            </g>
            <g data-ops="escort-plan" opacity="0">
              <g transform="translate(1535 464) scale(.72)">
                <VesselPlan kind="escort" tone="#2A506D" />
              </g>
            </g>
            <path
              data-ops="service-line"
              d="M691 526 C829 558 991 558 1125 526"
              stroke={white}
              strokeWidth="3"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-ops="fuel-line"
              d="M691 632 C829 686 991 686 1125 632"
              stroke={gold}
              strokeWidth="6"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-ops="cargo-line"
              d="M691 738 C829 770 991 770 1125 738"
              stroke="#8BB1D0"
              strokeWidth="3"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-ops="transfer-flow"
              d="M691 632 C829 686 991 686 1125 632"
              stroke={white}
              strokeWidth="3"
              fill="none"
              strokeDasharray="7 26"
              opacity="0"
            />
            {[
              [691, 526],
              [1125, 526],
              [691, 632],
              [1125, 632],
              [691, 738],
              [1125, 738],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill={gold} />
            ))}
          </svg>
        </div>
      </div>

      <Sequence
        from={1444}
        durationInFrames={226}
        name="Highmast 2025 — material handling"
      >
        <FootageShot
          asset="ordnance-lift"
          durationInFrames={226}
          direction="deck"
          holdExit
        />
      </Sequence>
      <div
        style={{
          ...fill,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg,#0B1A2E 0%,#0B1A2Edc 10%,#0B1A2E00 28%,#0B1A2E00 90%,#0B1A2E55 100%)",
        }}
      />
    </div>
  );
};
