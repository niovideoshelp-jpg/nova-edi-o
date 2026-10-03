import { useGsapTimeline } from "@remotion/gsap";
import { Sequence } from "remotion";
import { C, Cue, full, MediaShot, Passage, Stage } from "./Shared";
import { ShipPlan } from "./PresentVectors";
import { cueFor, iconAt, textAt } from "./Timing";

const ORIGIN = 5903;
const timing = {
  navy: textAt("availability-military-value", ORIGIN),
  available: textAt("availability-sustain", ORIGIN),
  crews: textAt("availability-crews", ORIGIN),
  maintenance: textAt("availability-maintenance", ORIGIN),
  maintenanceImage: iconAt("availability-maintenance", ORIGIN),
  supplies: textAt("availability-supplies", ORIGIN),
  relief: textAt("availability-replacements", ORIGIN),
  sources: textAt("availability-sources", ORIGIN),
  sourcesImage: iconAt("availability-sources", ORIGIN),
};
const imageFrame = (id: string) => cueFor(id).iconRevealFrame - ORIGIN;

const DocumentaryWindow = ({
  src,
  credit,
  seconds,
  width,
  height,
  enter = "rise",
  reframeAt,
}: {
  src: string;
  credit: string;
  seconds: number;
  width: number;
  height: number;
  enter?: "rise" | "east";
  reframeAt?: number;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      if (reframeAt === undefined) return;
      timeline.fromTo(
        selector("[data-native-window]"),
        { scale: 1, x: 0 },
        {
          scale: 1.075,
          x: 24,
          duration: 0.85,
          ease: "power3.inOut",
          transformOrigin: "center",
        },
        reframeAt,
      );
      timeline.to(
        selector("[data-native-window]"),
        {
          scale: 1.09,
          x: 32,
          duration: Math.max(0.1, seconds - reframeAt - 0.85),
          ease: "none",
        },
        reframeAt + 0.85,
      );
    },
    { dependencies: [reframeAt, seconds] },
  );
  return (
    <div ref={scope} style={full}>
      <Passage kind={enter}>
        <div
          data-native-window
          style={{
            position: "absolute",
            width,
            height,
            left: (1920 - width) / 2,
            top: height === 720 ? 270 : 290,
            overflow: "hidden",
            border: `1px solid ${C.steel}`,
          }}
        >
          <MediaShot
            src={src}
            credit={credit}
            seconds={seconds}
            fromScale={1.015}
            toScale={1.035}
            pan={12}
          />
        </div>
      </Passage>
    </div>
  );
};

/** Mechanical explanatory vector: rotating shaft and five-bladed propeller. */
export const MaintenanceShaft = () => (
  <svg viewBox="0 0 1920 1080" style={full}>
    <g data-shaft-camera>
      <g
        data-machine-shell
        stroke={C.line}
        strokeWidth="3"
        fill="#16324B"
        strokeLinejoin="round"
      >
        <path
          data-machine-stroke
          pathLength="1"
          d="M306 583 H475 V483 H690 V583 H813 V532 H998 V680 H813 V628 H690 V705 H475 V628 H306Z"
        />
        <path
          data-machine-stroke
          pathLength="1"
          d="M500 507 H665 V682 H500Z M525 524 V666 M552 524 V666 M579 524 V666 M606 524 V666 M633 524 V666"
          fill="none"
        />
        <path
          data-machine-stroke
          pathLength="1"
          d="M490 720 H683 L712 767 H459Z M818 698 H994 L1021 767 H792Z"
        />
        <rect x="838" y="551" width="134" height="110" rx="16" />
        <path
          data-machine-stroke
          pathLength="1"
          d="M854 565 H957 M854 646 H957 M863 564 V647 M944 564 V647"
          fill="none"
        />
        <path
          data-machine-stroke
          pathLength="1"
          d="M999 591 H1426 V620 H999Z"
          fill={C.steel}
        />
        <path d="M314 607 H472" stroke={C.gold} />
      </g>
      <g transform="translate(1450 606)">
        <g data-propeller>
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              transform={`rotate(${angle})`}
              d="M-23-16 C-56-71-15-165 51-170 Q102-158 75-101 C52-49 45-18 15 10Z"
              stroke={C.gold}
              strokeWidth="3"
              fill="#9A793A"
            />
          ))}
          <circle r="38" fill={C.navy} stroke={C.white} strokeWidth="4" />
          <circle r="15" fill={C.steel} stroke={C.line} strokeWidth="3" />
        </g>
      </g>
      <g stroke={C.gold} strokeWidth="3" fill="none">
        <path
          data-shaft-flow
          pathLength="100"
          d="M331 606 H460 M705 606 H800 M1025 606 H1383"
          strokeDasharray="3 14"
        />
        <path d="M302 793 H1567" stroke={C.steel} />
      </g>
    </g>
  </svg>
);

const ReadinessDiagram = ({ relief = false }: { relief?: boolean }) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      timeline.set(
        selector("[data-return-path]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(selector("[data-standby]"), { opacity: 0.25 }, 0);
      timeline.fromTo(
        selector("[data-ready-camera]"),
        { scale: 0.94, x: 12, y: 16 },
        {
          scale: 1.02,
          x: -12,
          y: -8,
          duration: relief ? 4.5 : 4.8,
          ease: "none",
        },
        0,
      );
      timeline.to(
        selector("[data-return-path]"),
        { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
        0.3,
      );
      timeline.to(
        selector("[data-going]"),
        {
          x: relief ? 390 : 230,
          y: relief ? -220 : -65,
          opacity: relief ? 0.1 : 0.9,
          duration: relief ? 3.1 : 4.2,
          ease: "power2.inOut",
        },
        0.35,
      );
      timeline.to(
        selector("[data-standby]"),
        {
          opacity: 1,
          y: relief ? -300 : -28,
          x: relief ? -175 : -10,
          duration: relief ? 3.2 : 2.4,
          ease: "power3.inOut",
        },
        relief ? 0.5 : 1.5,
      );
      timeline.fromTo(
        selector("[data-dock-guide]"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -80, duration: 4.8, ease: "none" },
        0,
      );
    },
    { dependencies: [relief] },
  );
  return (
    <Stage ref={scope}>
      <div data-ready-camera style={{ ...full, transformOrigin: "50% 61%" }}>
        <svg viewBox="0 0 1920 1080" style={full}>
          <path
            data-return-path
            pathLength="1"
            d="M720 760 C460 713 493 350 822 344 H1212"
            stroke={C.line}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M1191 333 L1212 344 1191 355"
            stroke={C.line}
            strokeWidth="3"
            fill="none"
          />
          <g stroke={C.steel} strokeWidth="4" fill="none">
            <path d="M873 634 V891 H1153 V634 M902 698 V861 H1125 V698" />
            <path
              data-dock-guide
              d="M928 824 H1097"
              stroke={C.gold}
              strokeDasharray="5 12"
            />
          </g>
          <g data-going>
            <g transform="translate(740 504) rotate(23) scale(.95)">
              <ShipPlan kind="frigate" />
            </g>
          </g>
          <g data-standby>
            <g transform="translate(1014 731) scale(.72)">
              <ShipPlan kind="frigate" color={C.gold} />
            </g>
          </g>
        </svg>
      </div>
    </Stage>
  );
};

export const AvailabilityChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    timeline.set(selector("[data-maintenance]"), { opacity: 0 }, 0);
    timeline.set(
      selector("[data-machine-stroke]"),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      0,
    );
    timeline.set(selector("[data-sources]"), { opacity: 0 }, 0);
    timeline.set(selector("[data-machine-shell]"), { fillOpacity: 0 }, 0);
    timeline.to(
      selector("[data-maintenance]"),
      { opacity: 1, duration: 0.42, ease: "power3.out" },
      timing.maintenanceImage,
    );
    timeline.to(
      selector("[data-machine-stroke]"),
      {
        strokeDashoffset: 0,
        stagger: 0.035,
        duration: 0.65,
        ease: "power3.out",
      },
      timing.maintenanceImage,
    );
    timeline.to(
      selector("[data-machine-shell]"),
      { fillOpacity: 1, duration: 0.25, ease: "power2.out" },
      timing.maintenanceImage + 0.65,
    );
    timeline.fromTo(
      selector("[data-shaft-camera]"),
      { scale: 0.92, x: -25, y: 30 },
      {
        scale: 1.04,
        x: -20,
        y: -5,
        duration: 2.45,
        ease: "power2.out",
        transformOrigin: "50% 58%",
      },
      timing.maintenanceImage,
    );
    timeline.to(
      selector("[data-propeller]"),
      { rotation: 330, duration: 2.6, ease: "none", svgOrigin: "0 0" },
      timing.maintenanceImage,
    );
    timeline.fromTo(
      selector("[data-shaft-flow]"),
      { strokeDashoffset: 0 },
      { strokeDashoffset: -90, duration: 2.7, ease: "none" },
      timing.maintenanceImage,
    );
    timeline.to(
      selector("[data-maintenance]"),
      { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" },
      timing.supplies + 0.1,
    );
    timeline.to(
      selector("[data-sources]"),
      { opacity: 1, duration: 0.5, ease: "power3.out" },
      timing.sourcesImage,
    );
    timeline.fromTo(
      selector("[data-source-arrow]"),
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      timing.sources,
    );
    timeline.to(
      selector("[data-source-arrow]"),
      { y: 25, duration: 2.1, ease: "power1.inOut" },
      timing.sources + 0.6,
    );
  });

  return (
    <Stage ref={scope}>
      <div data-ending style={full}>
        <Sequence
          durationInFrames={201}
          name="Capabilities · Merlin Mk3 flight"
        >
          <DocumentaryWindow
            src="video/part2/merlin-mk3-flight.mp4"
            credit="USMC · Merlin Mk3 transport · 2017"
            seconds={201 / 30}
            width={1024}
            height={576}
            reframeAt={iconAt("availability-capabilities", ORIGIN)}
          />
        </Sequence>
        <Sequence
          from={imageFrame("availability-sustain")}
          durationInFrames={125}
          name="Availability · sortie and return"
        >
          <Passage kind="focus">
            <ReadinessDiagram />
          </Passage>
        </Sequence>
        <Sequence
          from={imageFrame("availability-crews")}
          durationInFrames={62}
          name="Crews · Merlin Mk3 cabin"
        >
          <DocumentaryWindow
            src="video/part2/merlin-mk3-crew.mp4"
            credit="USMC · Merlin Mk3 cabin · 2017"
            seconds={62 / 30}
            width={1024}
            height={576}
            enter="east"
          />
        </Sequence>
        <div data-maintenance style={{ ...full, background: C.navy }}>
          <MaintenanceShaft />
        </div>
        <Sequence
          from={imageFrame("availability-supplies")}
          durationInFrames={100}
          name="Supplies · RFA deck service"
        >
          <DocumentaryWindow
            src="video/part2/lyme-bay-deck.mp4"
            credit="USMC · RFA Lyme Bay · Deck service · 2024"
            seconds={100 / 30}
            width={1280}
            height={720}
          />
        </Sequence>
        <Sequence
          from={imageFrame("availability-replacements")}
          durationInFrames={121}
          name="Relief · replace returning vessel"
        >
          <Passage kind="east">
            <ReadinessDiagram relief />
          </Passage>
        </Sequence>
        <Cue text="Royal Navy" at={timing.navy} duration={4.1} />
        <Cue text="Availability" at={timing.available} duration={2.0} />
        <Cue text="Crews" at={timing.crews} duration={1.1} />
        <Cue text="Maintenance" at={timing.maintenance} duration={1.25} />
        <Cue text="Supplies" at={timing.supplies} duration={2.35} />
        <Cue text="Relief" at={timing.relief} duration={2.65} />
        <div data-sources style={{ ...full, background: C.navy }}>
          <Cue
            text="Sources below"
            at={timing.sources}
            duration={5}
            x={154}
            y={406}
            width={1612}
            size={104}
            align="center"
          />
          <svg viewBox="0 0 1920 1080" style={full}>
            <g
              data-source-arrow
              stroke={C.gold}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M960 613 V752 M914 709 L960 755 1006 709" />
            </g>
          </svg>
        </div>
      </div>
    </Stage>
  );
};
