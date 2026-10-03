import { useId } from "react";
import { useGsapTimeline } from "@remotion/gsap";
import { Img, Sequence, staticFile } from "remotion";
import geo from "../../data/part1/geography.json";
import { Stage, Passage, Cue, MediaShot, C, full, mapEdge } from "./Shared";
import {
  BattlePlan,
  PatrolAircraft,
  EscortSide,
  Submarine,
} from "./WarfareVectors";

const START = 3608;
const at = (f: number) => (f - START) / 30;
const malaya = geo.views.malaya;
const atlantic = geo.views.atlantic;
const world = geo.views.world;
const seaPoint = malaya.points.ForceZ;
const west = atlantic.routes.find((r) => r.id === "NewYork")!;
const archiveWindow = {
  inset: "auto",
  left: 480,
  top: 238,
  width: 960,
  height: 720,
  border: "1px solid rgba(244,247,250,.2)",
};

export const TransformationChapter = () => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    const q = (v: string) => selector(`[data-change="${v}"]`);
    for (const [group, frame] of [
      ["battleship", 4220],
      ["escort", 4475],
    ] as const) {
      const outlines = selector(`[data-change="${group}"] [data-draw]`);
      timeline.set(
        outlines,
        {
          attr: { pathLength: 100 },
          strokeDasharray: 100,
          strokeDashoffset: 100,
          fillOpacity: 0,
        },
        0,
      );
      timeline.to(
        outlines,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        at(frame),
      );
      timeline.to(
        outlines,
        { fillOpacity: 1, duration: 0.35, ease: "power2.out" },
        at(frame) + 0.45,
      );
    }
    timeline.fromTo(
      q("malaya-camera"),
      { scale: 1.02, x: -20, y: 6 },
      { scale: 1.19, x: -35, y: 8, duration: 6.5, ease: "none" },
      0,
    );
    timeline.fromTo(
      q("force-route"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1.45, ease: "power3.inOut" },
      0.35,
    );
    timeline.fromTo(
      q("force-ring"),
      { scale: 0.3, opacity: 0.8, transformOrigin: "50% 50%" },
      { scale: 2.5, opacity: 0, duration: 1.6, repeat: 3, ease: "power2.out" },
      0.5,
    );
    timeline.fromTo(
      q("air-arrow"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "power2.in" },
      at(3765),
    );
    timeline.to(q("malaya"), { opacity: 0, duration: 0.7 }, at(3798));
    timeline.set(q("air-system"), { opacity: 0 }, 0);
    timeline.to(q("air-system"), { opacity: 1, duration: 0.65 }, at(4215));
    timeline.set(
      q("air-camera"),
      { scale: 0.91, y: 10, x: 0, transformOrigin: "50% 60%" },
      0,
    );
    timeline.to(
      q("air-camera"),
      { scale: 0.98, y: 0, duration: 2.5, ease: "power2.out" },
      at(4215),
    );
    timeline.to(
      q("air-camera"),
      { scale: 1.12, x: 0, y: 15, duration: 4.1, ease: "none" },
      at(4290),
    );
    timeline.fromTo(
      q("battleship"),
      { y: 75, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      at(4220),
    );
    timeline.fromTo(
      q("airplane"),
      { y: -170, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.15, stagger: 0.2, ease: "power2.out" },
      at(4260),
    );
    timeline.to(
      q("airplane"),
      { y: 155, x: 35, duration: 5.8, ease: "none" },
      at(4300),
    );
    timeline.fromTo(
      q("coverage"),
      { strokeDashoffset: 100, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.9, duration: 0.95, ease: "power3.out" },
      at(4290),
    );
    timeline.to(
      q("coverage"),
      { opacity: 0.13, duration: 0.75, ease: "power2.in" },
      at(4388),
    );
    timeline.fromTo(
      q("threat"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" },
      at(4385),
    );
    timeline.to(
      q("air-system"),
      { opacity: 0, scale: 1.035, duration: 0.75, ease: "power2.inOut" },
      at(4470),
    );
    timeline.set(q("systems"), { opacity: 0 }, 0);
    timeline.to(q("systems"), { opacity: 1, duration: 0.75 }, at(4470));
    timeline.fromTo(
      q("systems-camera"),
      { scale: 1.13, x: 50, y: 45 },
      { scale: 1, x: 0, y: 0, duration: 3.3, ease: "power3.out" },
      at(4470),
    );
    timeline.fromTo(
      q("escort"),
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
      at(4475),
    );
    timeline.fromTo(
      q("radar-grid"),
      { scale: 0.2, opacity: 0, transformOrigin: "50% 50%" },
      { scale: 1, opacity: 0.66, duration: 0.8, ease: "power3.out" },
      at(4596),
    );
    timeline.fromTo(
      q("radar-sweep"),
      { rotation: -95, opacity: 0, transformOrigin: "960px 490px" },
      { rotation: 590, opacity: 0.8, duration: 6.4, ease: "none" },
      at(4596),
    );
    timeline.fromTo(
      q("sonar"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.8, stagger: 0.23, ease: "power3.out" },
      at(4640),
    );
    timeline.fromTo(
      q("submarine"),
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
      at(4640),
    );
    timeline.to(
      q("submarine"),
      { x: 65, duration: 4.5, ease: "none" },
      at(4663),
    );
    timeline.fromTo(
      q("depth-charge"),
      { y: 0, opacity: 0 },
      { y: 185, opacity: 0.7, duration: 1.75, stagger: 0.4, ease: "power1.in" },
      at(4653),
    );
    timeline.to(
      q("systems-camera"),
      { scale: 0.92, x: 0, y: 0, duration: 3, ease: "power2.inOut" },
      at(4700),
    );
    timeline.to(q("systems"), { opacity: 0, duration: 0.7 }, at(4795));
    timeline.set(q("atlantic"), { opacity: 0 }, 0);
    timeline.to(q("atlantic"), { opacity: 1, duration: 0.7 }, at(4940));
    timeline.fromTo(
      q("atlantic-camera"),
      { scale: 1.23, x: -90, y: 0 },
      { scale: 1.04, x: 30, y: 10, duration: 5.9, ease: "power2.inOut" },
      at(4940),
    );
    timeline.fromTo(
      q("west-route"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
      at(4995),
    );
    timeline.fromTo(
      q("usa-ring"),
      { scale: 0.4, opacity: 0, transformOrigin: "50% 50%" },
      { scale: 1.5, opacity: 1, duration: 1.1, ease: "power3.out" },
      at(5060),
    );
    timeline.to(q("atlantic"), { opacity: 0, duration: 0.5 }, at(5125));
    timeline.set(q("closing"), { opacity: 0 }, 0);
    timeline.to(q("closing"), { opacity: 1, duration: 0.7 }, at(5230));
    timeline.fromTo(
      q("closing-camera"),
      { scale: 1.13, x: 10, y: 25 },
      { scale: 1, x: 0, y: 0, duration: 5.3, ease: "power2.out" },
      at(5230),
    );
    timeline.fromTo(
      q("ocean-route"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 1.35,
        stagger: 0.16,
        ease: "power2.inOut",
      },
      at(5238),
    );
    timeline.fromTo(
      q("ocean-marker"),
      { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.18,
        ease: "power3.out",
      },
      at(5292),
    );
    timeline.to(q("closing"), { opacity: 0.5, duration: 0.8 }, at(5366));
  });
  return (
    <Stage ref={scope}>
      <div data-change="malaya" style={full}>
        <div
          data-change="malaya-camera"
          style={{
            ...mapEdge,
            position: "absolute",
            left: 160,
            top: 210,
            width: 1600,
            height: 800,
          }}
        >
          <Img src={staticFile("maps/part1/malaya.svg")} style={full} />
          <svg viewBox="0 0 1600 800" style={full}>
            <path
              data-change="force-route"
              pathLength={100}
              d={`M${malaya.points.Singapore.join(" ")} Q845 520 ${seaPoint.join(" ")}`}
              fill="none"
              stroke={C.gold}
              strokeWidth={3}
              strokeDasharray={100}
            />
            <circle
              cx={malaya.points.Singapore[0]}
              cy={malaya.points.Singapore[1]}
              r={7}
              fill={C.white}
            />
            <circle
              data-change="force-ring"
              cx={seaPoint[0]}
              cy={seaPoint[1]}
              r={18}
              fill="none"
              stroke={C.gold}
              strokeWidth={2}
            />
            <circle cx={seaPoint[0]} cy={seaPoint[1]} r={6} fill={C.gold} />
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                data-change="air-arrow"
                pathLength={100}
                d={`M${1030 + i * 70} ${160 + i * 35} Q${1020 + i * 40} 350 ${seaPoint[0] + 12 + i * 13} ${seaPoint[1] - 18}`}
                fill="none"
                stroke={C.red}
                strokeWidth={2.5}
                strokeDasharray={100}
              />
            ))}
            <text
              x={malaya.points.Singapore[0] - 18}
              y={malaya.points.Singapore[1] + 43}
              textAnchor="end"
              fill={C.white}
              fontSize={27}
              fontWeight={550}
            >
              Singapore
            </text>
          </svg>
        </div>
      </div>
      <Sequence
        from={190}
        durationInFrames={85}
        name="Historic Prince of Wales"
      >
        <Passage kind="east">
          <MediaShot
            src="images/part1/prince-of-wales-1941.jpg"
            credit="Royal Navy / IWM A6784 · 4 Dec 1941"
            seconds={2.834}
            photo
            fromScale={1.02}
            toScale={1.08}
            position="50% 56%"
          />
        </Passage>
      </Sequence>
      <Sequence from={264} durationInFrames={94} name="Historic Repulse">
        <Passage kind="dissolve">
          <MediaShot
            src="images/part1/repulse-1941.jpg"
            credit="Royal Navy / IWM A29069 · 8 Dec 1941"
            seconds={3.134}
            photo
            fromScale={1.08}
            toScale={1.03}
            pan={-26}
            position="50% 58%"
          />
        </Passage>
      </Sequence>
      <Sequence from={340} durationInFrames={102} name="The historic name">
        <Passage kind="focus">
          <MediaShot
            src="images/part1/prince-of-wales-1941.jpg"
            credit="HMS Prince of Wales · 1941"
            seconds={3.4}
            photo
            fromScale={1.22}
            toScale={1.28}
            pan={-16}
            position="45% 54%"
          />
        </Passage>
      </Sequence>
      <Sequence from={421} durationInFrames={120} name="The modern namesake">
        <Passage kind="east">
          <MediaShot
            src="video/part1/pow-modern.mp4"
            credit="HMS Prince of Wales · U.S. Navy, 2023"
            seconds={4}
            fromScale={1.04}
            toScale={1.09}
          />
        </Passage>
      </Sequence>
      <Sequence
        from={510}
        durationInFrames={120}
        name="Air cover in the Atlantic"
      >
        <Passage kind="dissolve">
          <MediaShot
            src="video/part1/atlantic-air-cover.mp4"
            credit="Atlantic · NARA / OSS, 1941–1942"
            seconds={4}
            fromScale={1.025}
            toScale={1.06}
            pan={-14}
            style={archiveWindow}
          />
        </Passage>
      </Sequence>
      <div
        data-change="air-system"
        style={{
          ...full,
          opacity: 0,
          background: "radial-gradient(ellipse at 50% 60%,#21445D,#0B1A2E 72%)",
        }}
      >
        <svg data-change="air-camera" viewBox="0 0 1920 1080" style={full}>
          <defs>
            <linearGradient id={`${uid}-threat`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={C.red} stopOpacity="0" />
              <stop offset="1" stopColor={C.red} />
            </linearGradient>
          </defs>
          <g data-change="battleship">
            <g transform="translate(857 465) scale(1.02)">
              <BattlePlan />
            </g>
          </g>
          <path
            data-change="coverage"
            pathLength={100}
            d="M610 741 Q592 366 960 346 Q1328 366 1310 741"
            fill="none"
            stroke={C.steel}
            strokeWidth={5}
            strokeDasharray={100}
          />
          {[
            [-290, 0],
            [0, -80],
            [290, 0],
          ].map(([x, y], i) => (
            <g
              key={i}
              transform={`translate(${960 + x} ${275 + y}) scale(.72)`}
            >
              <g data-change="airplane">
                <PatrolAircraft />
              </g>
            </g>
          ))}
          {[680, 960, 1240].map((x) => (
            <path
              key={x}
              data-change="threat"
              pathLength={100}
              d={`M${x} 360 Q${x} 430 960 640`}
              fill="none"
              stroke={`url(#${uid}-threat)`}
              strokeWidth={3}
              strokeDasharray={100}
            />
          ))}
        </svg>
      </div>
      <div
        data-change="systems"
        style={{
          ...full,
          opacity: 0,
          background: "radial-gradient(ellipse at 50% 53%,#20465E,#0B1A2E 75%)",
        }}
      >
        <svg data-change="systems-camera" viewBox="0 0 1920 1080" style={full}>
          <defs>
            <linearGradient id={`${uid}-sweep`}>
              <stop stopColor={C.gold} stopOpacity="0" />
              <stop offset="1" stopColor={C.gold} stopOpacity=".22" />
            </linearGradient>
          </defs>
          <g data-change="radar-grid" opacity={0}>
            {[150, 225, 300].map((r) => (
              <circle
                key={r}
                cx={960}
                cy={490}
                r={r}
                fill="none"
                stroke={C.steel}
                strokeWidth={1.5}
                strokeDasharray="4 9"
              />
            ))}
          </g>
          <g data-change="radar-sweep" opacity={0}>
            <path
              d="M960 490 L1260 490 A300 300 0 0 0 1220 340Z"
              fill={`url(#${uid}-sweep)`}
            />
            <path
              d="M960 490 H1260"
              fill="none"
              stroke={C.gold}
              strokeWidth={2}
            />
          </g>
          <path
            d="M245 655 Q500 647 720 655 T1150 655 T1675 655"
            fill="none"
            stroke={C.line}
            strokeOpacity={0.32}
            strokeWidth={2}
          />
          <g data-change="escort">
            <g transform="translate(432 395) scale(1.8)">
              <EscortSide />
            </g>
          </g>
          <g data-change="submarine" opacity={0}>
            <g transform="translate(715 824) scale(1.1)">
              <Submarine />
            </g>
          </g>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              data-change="sonar"
              pathLength={100}
              d={`M${795 - i * 40} ${710 + i * 43} Q960 ${775 + i * 53} ${1125 + i * 40} ${710 + i * 43}`}
              fill="none"
              stroke={C.gold}
              strokeWidth={2}
              strokeDasharray={100}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} data-change="depth-charge" opacity={0}>
              <rect
                x={1420 + i * 28}
                y={660}
                width={12}
                height={19}
                rx={4}
                fill={C.line}
              />
            </g>
          ))}
        </svg>
      </div>
      <Sequence from={1187} durationInFrames={150} name="American shipbuilding">
        <Passage kind="rise">
          <MediaShot
            src="video/part1/us-shipyards.mp4"
            credit="U.S. Navy / NARA · 1943"
            seconds={5}
            fromScale={1.01}
            toScale={1.07}
            pan={20}
            style={{
              ...archiveWindow,
              left: 420,
              top: 302,
              width: 1080,
              height: 607.5,
            }}
          />
        </Passage>
      </Sequence>
      <div
        data-change="atlantic"
        style={{
          ...full,
          opacity: 0,
          background: "radial-gradient(ellipse at 50% 50%,#20445D,#0B1A2E 75%)",
        }}
      >
        <div
          data-change="atlantic-camera"
          style={{
            ...mapEdge,
            position: "absolute",
            left: 160,
            top: 150,
            width: 1600,
            height: 800,
          }}
        >
          <Img src={staticFile("maps/part1/atlantic.svg")} style={full} />
          <svg viewBox="0 0 1600 800" style={full}>
            <path
              data-change="west-route"
              d={west.d}
              pathLength={100}
              fill="none"
              stroke={C.gold}
              strokeWidth={4}
              strokeDasharray={100}
            />
            <circle cx={west.from[0]} cy={west.from[1]} r={7} fill={C.white} />
            <g data-change="usa-ring" opacity={0}>
              <circle cx={west.to[0]} cy={west.to[1]} r={11} fill={C.gold} />
              <circle
                cx={west.to[0]}
                cy={west.to[1]}
                r={25}
                fill="none"
                stroke={C.gold}
                strokeWidth={2}
              />
            </g>
          </svg>
        </div>
      </div>
      <Sequence
        from={1508}
        durationInFrames={120}
        name="Sustained Atlantic operations"
      >
        <Passage kind="dissolve">
          <MediaShot
            src="video/part1/atlantic-refueling.mp4"
            credit="Atlantic · NARA / OSS, 1941–1942"
            seconds={4}
            fromScale={1.03}
            toScale={1.08}
            pan={-20}
            style={archiveWindow}
          />
        </Passage>
      </Sequence>
      <div
        data-change="closing"
        style={{
          ...full,
          opacity: 0,
          background: "radial-gradient(ellipse at 50% 50%,#214962,#0B1A2E 76%)",
        }}
      >
        <div
          data-change="closing-camera"
          style={{
            ...mapEdge,
            position: "absolute",
            left: 160,
            top: 200,
            width: 1600,
            height: 800,
          }}
        >
          <Img src={staticFile("maps/part1/world.svg")} style={full} />
          <svg viewBox="0 0 1600 800" style={full}>
            {world.routes
              .filter((r) =>
                ["Halifax", "CapeTown", "Singapore", "Sydney"].includes(r.id),
              )
              .map((r) => (
                <g key={r.id}>
                  <path
                    data-change="ocean-route"
                    d={r.d}
                    pathLength={100}
                    fill="none"
                    stroke={C.gold}
                    strokeWidth={2.5}
                    strokeDasharray={100}
                  />
                  <g data-change="ocean-marker">
                    <circle cx={r.to[0]} cy={r.to[1]} r={8} fill={C.white} />
                    <circle
                      cx={r.to[0]}
                      cy={r.to[1]}
                      r={15}
                      fill="none"
                      stroke={C.gold}
                      strokeWidth={1.5}
                    />
                  </g>
                </g>
              ))}
          </svg>
        </div>
      </div>
      <Cue text="December 1941" at={at(3714)} duration={2.5} color={C.gold} />
      <Cue text="HMS Prince of Wales" at={at(3831)} duration={1.37} size={74} />
      <Cue text="HMS Repulse" at={at(3904)} duration={1.43} />
      <Cue text="Prince of Wales" at={at(3991)} duration={3.93} />
      <Cue text="United States" at={at(4846)} duration={3.25} />
      <Cue text="Atlantic" at={at(5082)} duration={1.4} />
    </Stage>
  );
};
