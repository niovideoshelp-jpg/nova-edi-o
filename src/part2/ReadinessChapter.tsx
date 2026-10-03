import { useGsapTimeline } from "@remotion/gsap";
import { C, Cue, full, Passage, Stage, Stat } from "./Shared";
import { ShipPlan, ShipSide } from "./PresentVectors";
import { chapterFor, cueAt, cueFor } from "./Timing";

const chapter = chapterFor("readiness");
const at = (id: string) => cueAt(id, chapter.startFrame);
const ahead = (id: string) =>
  (cueFor(id).iconRevealFrame - chapter.startFrame) / 30;
const textAt = (id: string) =>
  (cueFor(id).textRevealFrame - chapter.startFrame) / 30;

/** Schematic maintenance berth: no historical footage is relabelled as repair. */
const MaintenanceBerth = () => (
  <svg
    viewBox="0 0 1920 1080"
    style={{ ...full, width: "100%", height: "100%" }}
  >
    <g
      data-r="berth-structure"
      fill="none"
      stroke={C.line}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        data-r-draw
        d="M280 815 H1590 M325 800 V735 H1565 V800 M360 734 L385 774 H1520 L1545 734"
      />
      {[480, 660, 840, 1020, 1200, 1380].map((x) => (
        <path
          key={x}
          data-r-draw
          d={`M${x - 23} 735 V710 H${x + 23} V735 M${x} 736 V780`}
          strokeOpacity=".7"
        />
      ))}
      <path
        data-r-draw
        d="M425 725 V346 H1440 V725 M441 725 V366 H1424 V725 M444 424 H1421"
      />
      <path
        d="M470 366 L520 422 L570 366 L620 422 L670 366 L720 422 L770 366 L820 422 L870 366 L920 422 L970 366 L1020 422 L1070 366 L1120 422 L1170 366 L1220 422 L1270 366 L1320 422 L1370 366"
        strokeOpacity=".33"
        strokeWidth="2"
      />
    </g>
    <g data-r="berth-ship">
      <g transform="translate(960 611) scale(1.7)">
        <ShipSide kind="destroyer" />
      </g>
    </g>
    <g
      data-r="gantry"
      stroke={C.gold}
      strokeWidth="3.2"
      fill="none"
      strokeLinecap="round"
    >
      <path d="M1110 372 H1190 V408 H1110Z M1137 408 V505 M1163 408 V505 M1137 505 Q1133 527 1150 529 Q1167 529 1163 517" />
      <path
        data-r="lift-line"
        d="M1104 574 L1149 538 L1196 574"
        strokeDasharray="6 6"
      />
    </g>
    <g
      data-r="exit-course"
      fill="none"
      stroke={C.gold}
      strokeWidth="3.5"
      strokeLinecap="round"
    >
      <path
        d="M1455 633 H1655 M1628 611 L1655 633 L1628 655"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset="100"
      />
    </g>
    <g
      data-r="berth-gate"
      fill="none"
      stroke={C.red}
      strokeWidth="5"
      strokeLinecap="round"
    >
      <path d="M1555 558 V707" />
      <path
        d="M1541 573 L1569 589 M1541 609 L1569 625 M1541 645 L1569 661 M1541 681 L1569 697"
        strokeWidth="3"
      />
    </g>
    <g
      data-r="maintenance-work"
      transform="translate(1196 606)"
      stroke={C.gold}
      strokeWidth="2.7"
      fill="none"
      strokeLinecap="round"
    >
      <circle r="33" strokeDasharray="13 8" />
      <path
        d="M-18 -22 Q-25 -6 -10 -2 L11 21 Q17 27 24 20 L1 -7 Q4 -19 -9 -25 L-9 -13 L-17 -8Z"
        fill={C.navy}
      />
    </g>
  </svg>
);

export const ReadinessChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (name: string) => selector(`[data-r="${name}"]`);
      const reveal = (name: string, time: number, duration = 0.5) =>
        timeline.to(
          q(name),
          { opacity: 1, duration, ease: "power3.out" },
          time,
        );
      const fade = (name: string, time: number, duration = 0.3) =>
        timeline.to(q(name), { opacity: 0, duration, ease: "power2.in" }, time);
      const drawing = (target: Element[] | string, time: number) => {
        timeline.set(
          target,
          {
            attr: { pathLength: 100 },
            strokeDasharray: 100,
            strokeDashoffset: 100,
            fillOpacity: 0,
          },
          0,
        );
        timeline.to(
          target,
          { strokeDashoffset: 0, duration: 0.58, ease: "power3.out" },
          time,
        );
        timeline.to(
          target,
          { fillOpacity: 1, duration: 0.24, ease: "power2.out" },
          time + 0.39,
        );
      };
      timeline.set(
        [
          q("manifest"),
          q("berth"),
          q("berth-gate"),
          q("exit-course"),
          q("maintenance-work"),
        ],
        { opacity: 0 },
        0,
      );
      timeline.set([q("mine"), q("supply")], { opacity: 0.2 }, 0);
      timeline.set(q("remaining-fleet"), { opacity: 0.52 }, 0);
      timeline.set(q("gantry"), { y: -44, opacity: 0.3 }, 0);
      timeline.set(q("exit-course"), { x: -24 }, 0);
      timeline.set(q("maintenance-work"), { opacity: 0 }, 0);
      timeline.fromTo(
        q("profile-camera"),
        { x: 70, y: 20, scale: 0.94, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        0,
      );
      timeline.to(
        q("profile-camera"),
        { x: -25, y: -12, scale: 1.035, duration: 3.4, ease: "none" },
        0.85,
      );
      drawing(selector('[data-r="patrol"] path'), 0.08);
      drawing(
        selector('[data-r="mine"] path'),
        ahead("readiness-mine-countermeasures"),
      );
      drawing(
        selector('[data-r="supply"] path'),
        ahead("readiness-mine-countermeasures") + 1.4,
      );
      timeline.to(
        q("profile-camera"),
        { x: -174, y: -23, scale: 1.1, duration: 1.3, ease: "power3.inOut" },
        ahead("readiness-specialist-ships"),
      );
      timeline.to(
        q("mine"),
        { opacity: 1, duration: 0.45, ease: "power3.out" },
        ahead("readiness-mine-countermeasures"),
      );
      timeline.to(
        q("patrol"),
        { opacity: 0.35, duration: 0.6, ease: "sine.inOut" },
        ahead("readiness-mine-countermeasures"),
      );
      timeline.to(
        q("profile-camera"),
        { x: -535, y: 8, scale: 1.13, duration: 1.4, ease: "power3.inOut" },
        ahead("readiness-mine-countermeasures") + 1.05,
      );
      reveal("supply", ahead("readiness-mine-countermeasures") + 1.4);
      timeline.to(
        q("mine"),
        { opacity: 0.3, duration: 0.6, ease: "sine.inOut" },
        ahead("readiness-mine-countermeasures") + 1.4,
      );
      timeline.to(
        q("wake"),
        { strokeDashoffset: -95, duration: 8.7, ease: "none" },
        0,
      );
      timeline.to(
        q("profile-camera"),
        {
          y: -135,
          scale: 0.8,
          opacity: 0,
          duration: 0.72,
          ease: "power3.inOut",
        },
        ahead("readiness-out-of-service-5") - 0.3,
      );

      // The last five members leave a 57-vessel inventory strip. No "52 ready"
      // total is shown: administrative inventory is not operational availability.
      reveal("manifest", ahead("readiness-out-of-service-5") - 0.2, 0.7);
      timeline.fromTo(
        q("manifest-camera"),
        { y: 90, scale: 1.08 },
        { y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        ahead("readiness-out-of-service-5") - 0.2,
      );
      [0, 1, 2, 3, 4].forEach((i) => {
        timeline.set(
          q(`selected-${i}`),
          { attr: { transform: `translate(${1460 + i * 23} 376) scale(.15)` } },
          0,
        );
        timeline.to(
          q(`selected-${i}`),
          {
            attr: { transform: `translate(${585 + i * 187} 655) scale(.56)` },
            duration: 0.86,
            opacity: 1,
            ease: "power3.inOut",
          },
          ahead("readiness-out-of-service-5") + i * 0.065,
        );
      });
      timeline.to(
        q("remaining-fleet"),
        { opacity: 0.14, y: -36, duration: 0.8, ease: "power2.out" },
        ahead("readiness-out-of-service-5"),
      );
      timeline.to(
        q("manifest-camera"),
        { x: -24, y: -10, scale: 1.025, duration: 3.4, ease: "none" },
        at("readiness-out-of-service-5") + 0.7,
      );
      [0, 1, 2].forEach((i) =>
        timeline.to(
          q(`selected-${i}`),
          {
            attr: { transform: `translate(${650 + i * 300} 610) scale(.76)` },
            duration: 0.75,
            ease: "power3.inOut",
          },
          ahead("readiness-retiring-frigates-3"),
        ),
      );
      [3, 4].forEach((i) =>
        timeline.to(
          q(`selected-${i}`),
          {
            opacity: 0.17,
            attr: {
              transform: `translate(${1600 + (i - 3) * 105} 655) scale(.3)`,
            },
            duration: 0.65,
            ease: "power3.inOut",
          },
          ahead("readiness-retiring-frigates-3"),
        ),
      );
      timeline.to(
        q("subset-bracket"),
        { strokeDashoffset: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
        at("readiness-retiring-frigates-3") + 0.14,
      );
      timeline.to(
        q("manifest-camera"),
        { x: -42, y: 48, scale: 1.05, duration: 2.5, ease: "none" },
        at("readiness-retiring-frigates-3") + 0.8,
      );
      fade("manifest", ahead("readiness-in-service") - 1.0, 0.65);

      // An in-service label remains while a physical berth prevents departure.
      const berthStart = ahead("readiness-in-service") - 0.82;
      reveal("berth", berthStart, 0.7);
      timeline.fromTo(
        q("berth-camera"),
        { x: 40, y: 80, scale: 1.12 },
        { x: 0, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
        berthStart,
      );
      drawing(selector("[data-r-draw]"), berthStart + 0.2);
      timeline.to(
        q("berth-camera"),
        { x: -24, y: -8, scale: 1.025, duration: 3.0, ease: "none" },
        berthStart + 1.05,
      );
      reveal("exit-course", ahead("readiness-leave-port"), 0.35);
      timeline.to(
        selector('[data-r="exit-course"] path'),
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" },
        ahead("readiness-leave-port"),
      );
      timeline.to(
        q("exit-course"),
        { x: 0, duration: 0.6, ease: "power3.out" },
        ahead("readiness-leave-port"),
      );
      reveal("berth-gate", ahead("readiness-leave-port") + 0.3, 0.3);
      timeline.to(
        q("berth-ship"),
        { x: 18, duration: 0.48, ease: "power2.out" },
        ahead("readiness-leave-port"),
      );
      timeline.to(
        q("berth-ship"),
        { x: 0, duration: 0.45, ease: "power2.inOut" },
        ahead("readiness-leave-port") + 0.48,
      );
      timeline.to(
        q("gantry"),
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.inOut" },
        ahead("readiness-leave-port") + 1.0,
      );
      timeline.to(
        q("berth-camera"),
        { x: -100, y: -4, scale: 1.1, duration: 2.5, ease: "sine.inOut" },
        ahead("readiness-leave-port") + 1.1,
      );
      reveal("maintenance-work", ahead("readiness-maintenance"), 0.45);
      timeline.to(
        q("maintenance-work"),
        {
          rotation: 34,
          svgOrigin: "1196 606",
          duration: 1.2,
          ease: "sine.inOut",
        },
        ahead("readiness-maintenance"),
      );
      timeline.to(
        q("gantry"),
        { y: 10, duration: 1.0, ease: "sine.inOut" },
        ahead("readiness-maintenance"),
      );
    },
    { dependencies: [] },
  );

  return (
    <div ref={scope} style={full}>
      <Stage>
        <Passage kind="focus">
          <div
            data-r="profile-camera"
            style={{ ...full, transformOrigin: "50% 58%" }}
          >
            <svg
              viewBox="0 0 1920 1080"
              style={{
                ...full,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <g data-r="patrol">
                <g transform="translate(610 610) scale(1.02)">
                  <ShipSide kind="patrol" />
                </g>
              </g>
              <g data-r="mine">
                <g transform="translate(1210 610) scale(.86)">
                  <ShipSide kind="mine" />
                </g>
              </g>
              <g data-r="supply">
                <g transform="translate(1800 610) scale(.98)">
                  <ShipSide kind="supply" />
                </g>
              </g>
              <path
                data-r="wake"
                d="M240 718 Q435 697 650 718 T1090 718 T1500 718 T1970 718"
                fill="none"
                stroke={C.line}
                strokeWidth="2"
                strokeDasharray="40 26"
                opacity=".4"
              />
            </svg>
          </div>
          <div data-r="manifest" style={full}>
            <div
              data-r="manifest-camera"
              style={{ ...full, transformOrigin: "50% 55%" }}
            >
              <svg
                viewBox="0 0 1920 1080"
                style={{ ...full, width: "100%", height: "100%" }}
              >
                <g data-r="remaining-fleet" fill={C.line}>
                  {Array.from({ length: 52 }, (_, i) => (
                    <rect
                      key={i}
                      x={264 + i * 23}
                      y="350"
                      width="13"
                      height="52"
                      rx="5"
                    />
                  ))}
                </g>
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i} data-r={`selected-${i}`}>
                    {i < 3 ? (
                      <ShipPlan kind="frigate" color={C.white} />
                    ) : (
                      <g stroke={C.line} strokeWidth="2.3" fill={C.navy}>
                        <path d="M0-143 Q27-104 27-75 V120 L15 139 H-15 L-27 120 V-75 Q-27-104 0-143Z" />
                        <path d="M0-105 V109" opacity=".35" />
                      </g>
                    )}
                  </g>
                ))}
                <path
                  data-r="subset-bracket"
                  d="M560 820 V842 H1340 V820"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  fill="none"
                  stroke={C.gold}
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
          <div data-r="berth" style={full}>
            <div
              data-r="berth-camera"
              style={{ ...full, transformOrigin: "50% 60%" }}
            >
              <MaintenanceBerth />
            </div>
          </div>
          <Stat
            value={57}
            label=""
            at={at("readiness-surface-context")}
            duration={3.5}
            x={154}
            y={103}
            size={138}
            color={C.white}
          />
          <Stat
            value={5}
            label="out of service"
            at={at("readiness-out-of-service-5")}
            duration={3.35}
            x={154}
            y={110}
            size={87}
            color={C.white}
          />
          <Stat
            value={3}
            label="retiring frigates"
            at={at("readiness-retiring-frigates-3")}
            duration={3.4}
            x={154}
            y={110}
            size={87}
            color={C.gold}
          />
          <Cue
            text="In service"
            at={textAt("readiness-in-service")}
            duration={4.6}
            x={154}
            y={110}
            size={84}
          />
        </Passage>
      </Stage>
    </div>
  );
};
