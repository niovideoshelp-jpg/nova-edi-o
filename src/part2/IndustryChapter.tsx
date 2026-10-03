import { useGsapTimeline } from "@remotion/gsap";
import { gsap } from "gsap";
import { Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import geography from "../../data/part2/geography.json";
import { C, Cue, full, MediaShot, Stage } from "./Shared";
import { AstuteProfile, PlannedBoat, YardRig } from "./FutureVectors";
import { cueAt, iconAt } from "./Timing";

const START = 4360;
const cues: Record<number, string> = {
  4368: "industry-preserved-capability",
  4473: "industry-industrial-value",
  4553: "industry-design-build",
  4660: "industry-aukus",
  4733: "industry-partners",
  4817: "industry-2025-announcement",
  4923: "industry-up-to-12",
  4997: "industry-attack-role",
  5084: "industry-astute-transition",
  5228: "industry-long-term-expansion",
  5322: "industry-sustained-investment",
  5392: "industry-build-rate",
};
const at = (globalFrame: number) =>
  cues[globalFrame]
    ? cueAt(cues[globalFrame], START)
    : (globalFrame - START) / 30;
const early = (globalFrame: number) =>
  cues[globalFrame] ? iconAt(cues[globalFrame], START) : at(globalFrame - 4);
const geo = geography.views.world;
const partnerIds = ["UK", "USA", "Australia"] as const;
const mapLabels = {
  UK: "United Kingdom",
  USA: "United States",
  Australia: "Australia",
};
const creditStyle = {
  position: "absolute",
  left: 154,
  bottom: 90,
  fontSize: 19,
  letterSpacing: 0.7,
  color: C.line,
} as const;

/**
 * 4360–5461 + 24 outgoing frames. Archival construction → industrial
 * reconstruction → geographic partnership → explicitly planned capacity.
 * Astute is identified as the predecessor; planned SSN-AUKUS boats stay abstract.
 */
export const IndustryChapter = () => {
  const time = useCurrentFrame() / 30;
  const count = Math.round(
    12 *
      gsap.parseEase("power3.out")(
        Math.min(1, Math.max(0, (time - at(4923)) / 0.65)),
      ),
  );
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (value: string) => selector(value);
      timeline.set(
        q("[data-glasgow]"),
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
        0,
      );
      timeline.set(
        q("[data-industry-image]"),
        { opacity: 0, x: 105, scale: 1.02 },
        0,
      );
      timeline.set(q("[data-industry-map]"), { opacity: 0 }, 0);
      timeline.set(
        q("[data-industry-map-camera]"),
        { scale: 1.35, x: -65, y: 75 },
        0,
      );
      timeline.set(q("[data-map-point], [data-map-label]"), { opacity: 0 }, 0);
      timeline.set(
        q("[data-aukus-route]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(
        q("[data-planned-fleet]"),
        { opacity: 0, y: 50, scale: 0.96 },
        0,
      );
      timeline.set(q("[data-planned-boat]"), { opacity: 0, y: 28 }, 0);
      timeline.set(
        q("[data-boat-draw]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(q("[data-plan-label]"), { opacity: 0, y: 15 }, 0);
      timeline.set(
        q("[data-anson]"),
        { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        0,
      );
      timeline.set(q("[data-astute-profile]"), { opacity: 0, x: 80, y: 0 }, 0);
      timeline.set(
        q("[data-yard]"),
        { opacity: 0, x: -65, y: 25, scale: 1.025 },
        0,
      );
      timeline.set(
        q("[data-yard-line]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(
        q("[data-yard-load]"),
        { attr: { transform: "translate(0 -75)" } },
        0,
      );
      timeline.set(
        q("[data-yard-cables]"),
        { attr: { d: "M717 231V310M895 231V310" } },
        0,
      );
      timeline.set(
        q("[data-industrial-axis]"),
        { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );

      // Preserve actual construction geometry before moving into the generated cutout.
      timeline.to(
        q("[data-industry-image]"),
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        early(4509),
      );
      timeline.to(
        q("[data-glasgow]"),
        {
          opacity: 0,
          clipPath: "inset(0% 0% 0% 100%)",
          duration: 0.9,
          ease: "power3.inOut",
        },
        early(4509),
      );
      timeline.to(
        q("[data-industry-image]"),
        { x: -40, y: -8, scale: 1.07, duration: 5.3, ease: "none" },
        early(4509) + 0.8,
      );
      timeline.to(
        q("[data-industrial-axis]"),
        {
          opacity: 0.45,
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        early(4531),
      );
      timeline.to(
        q("[data-industrial-axis]"),
        { opacity: 0, duration: 0.6 },
        early(4620),
      );

      const aukus = early(4660);
      timeline.to(
        q("[data-industry-image]"),
        {
          opacity: 0,
          x: -195,
          scale: 0.9,
          duration: 0.9,
          ease: "power3.inOut",
        },
        aukus - 0.5,
      );
      timeline.to(
        q("[data-industry-map]"),
        { opacity: 1, duration: 0.85, ease: "power3.out" },
        aukus - 0.4,
      );
      timeline.to(
        q("[data-industry-map-camera]"),
        { scale: 1, x: 0, y: 0, duration: 3.8, ease: "power3.inOut" },
        aukus,
      );
      timeline.to(
        q('[data-map-point="UK"], [data-map-label="UK"]'),
        { opacity: 1, duration: 0.4 },
        aukus,
      );
      timeline.to(
        q('[data-aukus-route="USA"]'),
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        early(4710),
      );
      timeline.to(
        q('[data-map-point="USA"], [data-map-label="USA"]'),
        { opacity: 1, duration: 0.4 },
        at(4710) + 0.3,
      );
      timeline.to(
        q('[data-aukus-route="Australia"]'),
        { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
        early(4733),
      );
      timeline.to(
        q('[data-map-point="Australia"], [data-map-label="Australia"]'),
        { opacity: 1, duration: 0.4 },
        at(4733) + 0.35,
      );
      timeline.to(
        q("[data-industry-map-camera]"),
        { scale: 1.035, x: -8, duration: 3.2, ease: "none" },
        at(4779),
      );
      timeline.to(
        q("[data-map-label]"),
        { opacity: 0.5, duration: 0.5 },
        early(4868),
      );
      timeline.to(
        q("[data-industry-map]"),
        { opacity: 0, duration: 1.1, ease: "power2.inOut" },
        early(4890),
      );
      timeline.to(
        q("[data-planned-fleet]"),
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" },
        early(4890),
      );
      timeline.to(
        q("[data-plan-label]"),
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        early(4934),
      );
      timeline.to(
        q("[data-planned-boat]"),
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.052, ease: "power3.out" },
        early(4923),
      );
      timeline.to(
        q("[data-boat-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.046,
          ease: "power3.out",
        },
        early(4923),
      );
      timeline.to(
        q("[data-planned-fleet]"),
        { x: -18, scale: 1.035, duration: 4.3, ease: "none" },
        at(4923) + 0.85,
      );

      // A real Astute photograph shows the class to be replaced, not a future design.
      timeline.to(
        q("[data-planned-fleet]"),
        { opacity: 0, y: -105, duration: 0.8, ease: "power3.inOut" },
        early(5066),
      );
      timeline.to(
        q("[data-anson]"),
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.inOut",
        },
        early(5066) - 0.2,
      );
      timeline.to(
        q("[data-astute-profile]"),
        { opacity: 0.95, x: 0, duration: 0.7, ease: "power3.out" },
        early(5120),
      );
      timeline.to(
        q("[data-anson]"),
        { opacity: 0, duration: 0.85, ease: "power2.inOut" },
        early(5120) + 0.35,
      );
      timeline.to(
        q("[data-astute-profile]"),
        { x: -28, scale: 1.035, duration: 3.3, ease: "none" },
        early(5120) + 0.7,
      );

      // Camera follows the industrial bottleneck: an actual crane/load linkage.
      timeline.to(
        q("[data-astute-profile]"),
        { opacity: 0, y: 120, duration: 0.8, ease: "power3.inOut" },
        early(5255) - 0.55,
      );
      timeline.to(
        q("[data-yard]"),
        { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" },
        early(5255) - 0.5,
      );
      timeline.to(
        q("[data-yard-line]"),
        { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" },
        early(5255) - 0.5,
      );
      timeline.to(
        q("[data-yard]"),
        { x: 22, y: -8, scale: 1.04, duration: 6.2, ease: "none" },
        early(5255) + 0.3,
      );
      timeline.to(
        q("[data-yard-load]"),
        {
          attr: { transform: "translate(0 45)" },
          duration: 2.75,
          ease: "power1.inOut",
        },
        early(5310),
      );
      timeline.to(
        q("[data-yard-cables]"),
        {
          attr: { d: "M717 231V430M895 231V430" },
          duration: 2.75,
          ease: "power1.inOut",
        },
        early(5310),
      );
      timeline.to(
        q("[data-yard-load]"),
        {
          attr: { transform: "translate(0 116)" },
          duration: 1.45,
          ease: "power2.out",
        },
        early(5392),
      );
      timeline.to(
        q("[data-yard-cables]"),
        {
          attr: { d: "M717 231V501M895 231V501" },
          duration: 1.45,
          ease: "power2.out",
        },
        early(5392),
      );
      for (let index = 0; index < 3; index++) {
        const x = 265 + index * 133;
        timeline.to(
          q('[data-yard-module="' + index + '"]'),
          {
            attr: { transform: "translate(" + (x + 39) + " 722)" },
            duration: 4.3,
            ease: "none",
          },
          early(5310) + index * 0.1,
        );
      }
      // Final industrial composition remains present through global5484.
    },
    { dependencies: [] },
  );

  return (
    <Stage ref={scope}>
      <div data-glasgow style={full}>
        <Sequence durationInFrames={184} layout="none">
          <MediaShot
            src="images/part2/glasgow-construction-2021.jpg"
            credit="HMS Glasgow · 2021"
            seconds={184 / 30}
            photo
            fromScale={1.025}
            toScale={1.12}
            pan={-56}
            position="50% 58%"
          />
        </Sequence>
      </div>
      <div
        data-industry-image
        style={{ ...full, opacity: 0, transformOrigin: "53% 57%" }}
      >
        <Img
          src={staticFile("images/part2/generated/naval-industry.png")}
          style={{
            position: "absolute",
            left: 260,
            top: 210,
            width: 1400,
            height: 830,
            objectFit: "contain",
          }}
        />
        <div style={creditStyle}>AI illustration</div>
      </div>
      <svg style={full} viewBox="0 0 1920 1080" width="1920" height="1080">
        <path
          data-industrial-axis
          pathLength="1"
          d="M520 874H1410M520 861V887M1410 861V887M1455 352V833M1442 352H1468M1442 833H1468"
          fill="none"
          stroke={C.gold}
          strokeWidth="2"
        />
      </svg>
      <div data-industry-map style={{ ...full, opacity: 0 }}>
        <div
          data-industry-map-camera
          style={{
            position: "absolute",
            left: 160,
            top: 180,
            width: 1600,
            height: 800,
            transformOrigin: "50% 42%",
          }}
        >
          <Img
            src={staticFile("maps/part2/world.svg")}
            style={{ ...full, width: "100%", height: "100%", opacity: 0.8 }}
          />
          <svg viewBox="0 0 1600 800" width="1600" height="800" style={full}>
            <path
              d={geo.uk}
              fill={C.gold}
              fillOpacity=".6"
              stroke={C.gold}
              strokeWidth="1"
            />
            {geo.routes
              .filter((route) => route.id === "USA" || route.id === "Australia")
              .map((route) => (
                <path
                  key={route.id}
                  data-aukus-route={route.id}
                  d={route.d}
                  pathLength="1"
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            {partnerIds.map((id) => {
              const [x, y] = geo.points[id];
              return (
                <g key={id}>
                  <g data-map-point={id} opacity="0">
                    <circle
                      cx={x}
                      cy={y}
                      r="13"
                      fill={C.navy}
                      stroke={C.gold}
                      strokeWidth="2"
                    />
                    <circle cx={x} cy={y} r="4.5" fill={C.gold} />
                  </g>
                  <text
                    data-map-label={id}
                    x={x}
                    y={y + (id === "UK" ? -35 : 48)}
                    textAnchor="middle"
                    fill={C.white}
                    fontFamily="Inter"
                    fontSize="28"
                    fontWeight="600"
                    opacity="0"
                  >
                    {mapLabels[id]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div
        data-planned-fleet
        style={{ ...full, opacity: 0, transformOrigin: "50% 60%" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            data-planned-boat
            style={{
              position: "absolute",
              left: 365 + (i % 3) * 390,
              top: 315 + Math.floor(i / 3) * 140,
              width: 390,
              height: 124,
              opacity: 0,
            }}
          >
            <PlannedBoat />
          </div>
        ))}
        <div
          data-plan-label
          style={{
            position: "absolute",
            left: 154,
            top: 916,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 1,
            color: C.line,
            opacity: 0,
          }}
        >
          SSN-AUKUS
        </div>
      </div>
      <div data-anson style={{ ...full, opacity: 0 }}>
        <Sequence
          from={Math.floor(early(5066) * 30) - 8}
          durationInFrames={111}
          layout="none"
        >
          <MediaShot
            src="images/part2/anson-2022.jpg"
            credit="HMS Anson · 2022"
            seconds={111 / 30}
            photo
            fromScale={1.03}
            toScale={1.09}
            pan={38}
            position="50% 53%"
          />
        </Sequence>
      </div>
      <div
        data-astute-profile
        style={{
          position: "absolute",
          left: 255,
          top: 342,
          width: 1410,
          height: 430,
          opacity: 0,
          transformOrigin: "50% 50%",
        }}
      >
        <AstuteProfile />
      </div>
      <div
        data-yard
        style={{
          position: "absolute",
          left: 160,
          top: 175,
          width: 1600,
          height: 800,
          opacity: 0,
          transformOrigin: "50% 60%",
        }}
      >
        <YardRig />
      </div>
      <Cue text="United Kingdom" at={at(4404)} duration={3.1} size={78} />
      <Cue text="AUKUS" at={at(4660)} duration={3.9} size={82} />
      <Cue text="2025" at={at(4817)} duration={2.55} size={86} />
      <Cue
        text={"Up to " + count}
        at={at(4915)}
        duration={4.35}
        size={94}
        color={C.gold}
      />
      <Cue text="Astute" at={at(5084)} duration={1.25} size={78} />
      <Cue text="Late 2030s" at={at(5120)} duration={3.7} size={84} />
    </Stage>
  );
};
