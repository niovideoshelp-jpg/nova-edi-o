import { useGsapTimeline } from "@remotion/gsap";
import { C, Cue, full, Stage, Stat } from "./Shared";
import { iconAt, textAt } from "./Timing";
import { AstuteProfile, FrigateProfile } from "./FutureVectors";
import {
  InventoryHull,
  InventoryWater,
  VanguardProfile,
} from "./NuclearVectors";
import { ShipPlan } from "./PresentVectors";

const icon = (id: string) => iconAt("inventory-" + id, 0);
const text = (id: string) => textAt("inventory-" + id, 0);

/**
 * 0–1026 + 24 outgoing frames. One inventory unfolds from surface to support to
 * undersea; the submarine category then separates into two different missions.
 */
export const InventoryChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (value: string) => selector(value);
      timeline.set(q("[data-water-plane]"), { attr: { transform: "translate(0 0)" } }, 0);
      timeline.set(
        q("[data-intro-frigate]"),
        { opacity: 1, scale: 1, x: 0, y: 0 },
        0,
      );
      timeline.set(
        q("[data-intro-frigate] [data-draw]"),
        { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 },
        0,
      );
      timeline.set(
        q("[data-surface-fleet], [data-support-fleet], [data-sub-fleet]"),
        { opacity: 0 },
        0,
      );
      timeline.set(q("[data-inventory-unit]"), { opacity: 0, y: 26 }, 0);
      timeline.set(
        q("[data-unit-draw]"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(
        q("[data-vanguard]"),
        { opacity: 0, x: 170, y: 0, scale: 1 },
        0,
      );
      timeline.set(
        q("[data-vanguard] [data-nuclear-draw]"),
        { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 },
        0,
      );
      timeline.set(
        q("[data-attack-sub]"),
        { opacity: 0, x: 140, y: 85, scale: 1 },
        0,
      );
      timeline.set(
        q("[data-attack-sub] [data-draw]"),
        { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 },
        0,
      );
      timeline.set(
        q("[data-vanguard-units], [data-attack-units]"),
        { opacity: 0 },
        0,
      );
      timeline.set(
        q("[data-patrol-line]"),
        { opacity: 0, strokeDasharray: 12, strokeDashoffset: 0 },
        0,
      );
      timeline.set(q("[data-carrier-branch]"), { opacity: 0 }, 0);
      timeline.set(
        q("[data-role-line]"),
        { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 },
        0,
      );
      timeline.set(q("[data-inventory-camera]"), { scale: 1, x: -8, y: 0 }, 0);

      timeline.to(
        q("[data-inventory-camera]"),
        { x: 8, scale: 1.028, duration: 35, ease: "none" },
        0,
      );
      timeline.to(
        q("[data-water-plane]"),
        {
          attr: { transform: "translate(76 -12)" },
          duration: 10,
          ease: "none",
        },
        0,
      );
      timeline.fromTo(
        q("[data-depth-lines]"),
        { attr: { transform: "translate(0 0)" } },
        {
          attr: { transform: "translate(-140 -24)" },
          duration: 35,
          ease: "none",
        },
        0,
      );
      timeline.to(
        q("[data-intro-frigate] [data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.055,
          ease: "power3.out",
        },
        0,
      );
      timeline.to(
        q("[data-intro-frigate] [data-draw]"),
        { fillOpacity: 0.9, duration: 0.55 },
        0.45,
      );
      timeline.to(
        q("[data-intro-frigate]"),
        { x: -18, scale: 1.035, duration: 2.5, ease: "none" },
        0.2,
      );

      const surface = icon("surface-57");
      timeline.to(
        q("[data-intro-frigate]"),
        {
          opacity: 0,
          y: -150,
          scale: 0.78,
          duration: 0.65,
          ease: "power3.inOut",
        },
        surface - 0.28,
      );
      timeline.to(
        q("[data-surface-fleet]"),
        { opacity: 1, duration: 0.45 },
        surface,
      );
      timeline.to(
        q("[data-surface-fleet] [data-inventory-unit]"),
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.012,
          ease: "power3.out",
        },
        surface,
      );
      timeline.to(
        q("[data-surface-fleet] [data-unit-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.4,
          stagger: 0.012,
          ease: "power3.out",
        },
        surface,
      );
      timeline.to(
        q("[data-surface-fleet]"),
        { y: -14, scale: 1.035, duration: 2.7, ease: "none" },
        surface + 0.8,
      );

      const rfa = icon("rfa-13");
      timeline.to(
        q("[data-surface-fleet]"),
        {
          y: -335,
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          ease: "power3.inOut",
        },
        rfa - 0.3,
      );
      timeline.to(
        q("[data-support-fleet]"),
        { opacity: 1, duration: 0.5 },
        rfa,
      );
      timeline.to(
        q("[data-support-fleet] [data-inventory-unit]"),
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.035, ease: "power3.out" },
        rfa,
      );
      timeline.to(
        q("[data-support-fleet] [data-unit-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.035,
          ease: "power3.out",
        },
        rfa,
      );
      timeline.to(
        q("[data-support-fleet]"),
        { y: -8, scale: 1.035, duration: 2, ease: "none" },
        rfa + 0.75,
      );

      const submarine = icon("submarines-9");
      timeline.to(
        q("[data-support-fleet]"),
        { y: -510, opacity: 0, duration: 0.9, ease: "power3.inOut" },
        submarine - 0.25,
      );
      timeline.to(
        q("[data-water-plane]"),
        {
          attr: { transform: "translate(105 -345)" },
          duration: 1.4,
          ease: "power3.inOut",
        },
        submarine - 0.2,
      );
      timeline.to(
        q("[data-sub-fleet]"),
        { opacity: 1, duration: 0.5 },
        submarine,
      );
      timeline.to(
        q("[data-sub-fleet] [data-inventory-unit]"),
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" },
        submarine,
      );
      timeline.to(
        q("[data-sub-fleet] [data-unit-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
        submarine,
      );
      timeline.to(
        q("[data-sub-fleet]"),
        { x: -15, scale: 1.025, duration: 2.6, ease: "none" },
        submarine + 0.8,
      );

      const vanguard = icon("vanguard-4");
      timeline.to(
        q("[data-sub-fleet]"),
        {
          opacity: 0,
          y: 120,
          scale: 1.13,
          duration: 0.65,
          ease: "power3.inOut",
        },
        vanguard - 0.3,
      );
      timeline.to(
        q("[data-vanguard]"),
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        vanguard,
      );
      timeline.to(
        q("[data-vanguard] [data-nuclear-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.055,
          ease: "power3.out",
        },
        vanguard,
      );
      timeline.to(
        q("[data-vanguard] [data-nuclear-draw]"),
        { fillOpacity: 1, duration: 0.55 },
        vanguard + 0.45,
      );
      timeline.to(
        q("[data-vanguard-units]"),
        { opacity: 1, duration: 0.45 },
        text("vanguard-4") + 0.4,
      );
      timeline.to(
        q("[data-vanguard]"),
        { x: -20, scale: 1.045, duration: 3.4, ease: "none" },
        vanguard + 0.65,
      );
      timeline.to(
        q("[data-mission-highlight]"),
        { opacity: 1, duration: 0.5 },
        icon("nuclear-deterrent"),
      );
      timeline.to(
        q("[data-patrol-line]"),
        { opacity: 0.5, duration: 0.6 },
        icon("nuclear-deterrent"),
      );
      timeline.to(
        q("[data-patrol-line]"),
        { strokeDashoffset: -270, duration: 20, ease: "none" },
        icon("nuclear-deterrent"),
      );

      const attack = icon("attack-5");
      timeline.to(
        q("[data-vanguard]"),
        {
          scale: 0.79,
          x: 0,
          y: -150,
          opacity: 0.62,
          duration: 0.9,
          ease: "power3.inOut",
        },
        attack - 0.2,
      );
      timeline.to(
        q("[data-vanguard-units]"),
        { opacity: 0, duration: 0.3 },
        attack - 0.2,
      );
      timeline.to(
        q("[data-mission-highlight], [data-patrol-line]"),
        { opacity: 0, duration: 0.4 },
        attack - 0.2,
      );
      timeline.to(
        q("[data-attack-sub]"),
        { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
        attack,
      );
      timeline.to(
        q("[data-attack-sub] [data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.065,
          ease: "power3.out",
        },
        attack,
      );
      timeline.to(
        q("[data-attack-sub] [data-draw]"),
        { fillOpacity: 1, duration: 0.55 },
        attack + 0.5,
      );
      timeline.to(
        q("[data-attack-units]"),
        { opacity: 1, duration: 0.45 },
        text("attack-5") + 0.4,
      );
      timeline.to(
        q("[data-attack-sub]"),
        { x: -22, scale: 1.035, duration: 3, ease: "none" },
        attack + 0.75,
      );

      const roles = icon("different-roles");
      timeline.to(
        q("[data-vanguard]"),
        { opacity: 1, x: -10, y: -155, duration: 0.65, ease: "power3.out" },
        roles,
      );
      timeline.to(
        q("[data-attack-sub]"),
        { x: 10, y: -20, duration: 2.8, ease: "power2.inOut" },
        roles,
      );
      timeline.to(
        q("[data-attack-units]"),
        { opacity: 0, duration: 0.4 },
        roles,
      );
      timeline.to(
        q("[data-role-line]"),
        {
          opacity: 0.55,
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        roles,
      );

      const mission = icon("vanguard-mission");
      timeline.to(
        q("[data-attack-sub]"),
        { x: 260, y: 280, opacity: 0, duration: 0.85, ease: "power3.inOut" },
        mission - 0.2,
      );
      timeline.to(
        q("[data-role-line]"),
        { opacity: 0, duration: 0.35 },
        mission - 0.2,
      );
      timeline.to(
        q("[data-vanguard]"),
        { x: -25, y: 35, scale: 1.03, duration: 1.05, ease: "power3.inOut" },
        mission,
      );
      timeline.to(
        q("[data-mission-highlight]"),
        { opacity: 0.8, duration: 0.6 },
        mission + 0.65,
      );
      timeline.to(
        q("[data-vanguard]"),
        { x: -45, y: 25, scale: 1.06, duration: 3, ease: "none" },
        mission + 1.05,
      );

      // A blocked assignment line explicitly separates the SSBN from carrier escort.
      timeline.to(
        q("[data-carrier-branch]"),
        { opacity: 1, duration: 0.5, ease: "power3.out" },
        icon("carrier-exclusion"),
      );
      timeline.fromTo(
        q("[data-exclusion-dash]"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -75, duration: 2.5, ease: "none" },
        icon("carrier-exclusion"),
      );
      timeline.to(
        q("[data-carrier-branch]"),
        { opacity: 0, duration: 0.45 },
        icon("second-strike"),
      );
      timeline.to(
        q("[data-vanguard]"),
        { scale: 1.125, x: -110, y: 55, duration: 4.1, ease: "power2.inOut" },
        icon("second-strike"),
      );
      timeline.to(
        q("[data-patrol-line]"),
        { opacity: 0.6, duration: 0.55 },
        icon("second-strike"),
      );
      timeline.to(
        q("[data-mission-highlight]"),
        { opacity: 1, duration: 0.45 },
        icon("deterrent-capability"),
      );
      timeline.to(
        q("[data-water-plane]"),
        {
          attr: { transform: "translate(165 -365)" },
          duration: 20,
          ease: "none",
        },
        10,
      );
      timeline.fromTo(
        q("[data-sub-wake]"),
        { opacity: 0.2 },
        {
          opacity: 0.55,
          duration: 1.7,
          repeat: 12,
          yoyo: true,
          ease: "sine.inOut",
        },
        vanguard,
      );
      // No exit fade here: the camera and patrol remain active through global1049.
    },
    { dependencies: [] },
  );

  return (
    <Stage ref={scope}>
      <div style={full}>
        <InventoryWater />
      </div>
      <div
        data-inventory-camera
        style={{ ...full, transformOrigin: "50% 58%" }}
      >
        <div
          data-intro-frigate
          style={{
            position: "absolute",
            left: 285,
            top: 335,
            width: 1350,
            height: 405,
            transformOrigin: "50% 50%",
          }}
        >
          <FrigateProfile kind="type23" />
        </div>
        <div
          data-surface-fleet
          style={{ ...full, opacity: 0, transformOrigin: "50% 57%" }}
        >
          {Array.from({ length: 57 }, (_, i) => (
            <div
              key={i}
              data-inventory-unit
              style={{
                position: "absolute",
                left: 382 + (i % 19) * 61,
                top: 340 + Math.floor(i / 19) * 147,
                width: 54,
                height: 146,
                opacity: 0,
              }}
            >
              <InventoryHull />
            </div>
          ))}
        </div>
        <div
          data-support-fleet
          style={{ ...full, opacity: 0, transformOrigin: "50% 57%" }}
        >
          {Array.from({ length: 13 }, (_, i) => (
            <div
              key={i}
              data-inventory-unit
              style={{
                position: "absolute",
                left: (i < 7 ? 505 : 575) + (i < 7 ? i : i - 7) * 139,
                top: i < 7 ? 326 : 574,
                width: 82,
                height: 223,
                opacity: 0,
              }}
            >
              <InventoryHull kind="supply" />
            </div>
          ))}
        </div>
        <div
          data-sub-fleet
          style={{ ...full, opacity: 0, transformOrigin: "50% 57%" }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              data-inventory-unit
              style={{
                position: "absolute",
                left: 427 + (i % 3) * 374,
                top: 340 + Math.floor(i / 3) * 181,
                width: 320,
                height: 110,
                opacity: 0,
              }}
            >
              <InventoryHull kind="submarine" />
            </div>
          ))}
        </div>
        <div
          data-vanguard
          style={{
            position: "absolute",
            left: 230,
            top: 325,
            width: 1460,
            height: 390,
            opacity: 0,
            transformOrigin: "50% 50%",
          }}
        >
          <VanguardProfile />
          <div
            data-vanguard-units
            style={{
              position: "absolute",
              left: 505,
              top: 388,
              display: "flex",
              gap: 20,
              opacity: 0,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{ width: 85, height: 9, background: C.gold }}
              />
            ))}
          </div>
        </div>
        <div
          data-attack-sub
          style={{
            position: "absolute",
            left: 475,
            top: 553,
            width: 970,
            height: 291,
            opacity: 0,
            transformOrigin: "50% 50%",
          }}
        >
          <AstuteProfile />
          <div
            data-attack-units
            style={{
              position: "absolute",
              left: 262,
              top: 272,
              display: "flex",
              gap: 16,
              opacity: 0,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{ width: 72, height: 9, background: C.gold }}
              />
            ))}
          </div>
        </div>
        <svg style={full} width="1920" height="1080" viewBox="0 0 1920 1080">
          <path
            data-role-line
            pathLength="1"
            d="M410 594H1510"
            fill="none"
            stroke={C.line}
            strokeWidth="2"
            opacity="0"
          />
          <path
            data-patrol-line
            d="M325 785C633 845 1052 804 1390 830"
            fill="none"
            stroke={C.gold}
            strokeWidth="2"
            opacity="0"
          />
          <g data-carrier-branch opacity="0">
            <g transform="translate(1445 404) scale(.54)">
              <ShipPlan kind="carrier" color={C.line} />
            </g>
            <path
              data-exclusion-dash
              d="M1050 488H1390"
              fill="none"
              stroke={C.line}
              strokeWidth="2.5"
              strokeDasharray="10 9"
            />
            <path
              d="M1300 465V511"
              fill="none"
              stroke={C.red}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
      <Cue
        text="April 2025"
        at={text("april-2025")}
        duration={1.67}
        size={78}
      />
      <Stat
        value={57}
        label="vessels"
        at={text("surface-57")}
        duration={3.05}
        size={94}
        y={110}
      />
      <Stat
        value={13}
        label="RFA ships"
        at={text("rfa-13")}
        duration={2.3}
        size={90}
        y={110}
      />
      <Stat
        value={9}
        label="submarines"
        at={text("submarines-9")}
        duration={2.75}
        size={90}
        y={110}
      />
      <Stat
        value={4}
        label="Vanguard"
        at={text("vanguard-4")}
        duration={3.6}
        size={90}
        y={110}
      />
      <Cue
        text="Nuclear deterrent"
        at={text("nuclear-deterrent")}
        duration={1.38}
        size={78}
      />
      <Stat
        value={5}
        label="attack submarines"
        at={text("attack-5")}
        duration={3.05}
        size={86}
        y={110}
      />
      <Cue
        text="SSBN"
        at={text("different-roles")}
        duration={2.8}
        x={154}
        y={360}
        width={280}
        size={44}
      />
      <Cue
        text="SSN"
        at={text("different-roles")}
        duration={2.8}
        x={154}
        y={695}
        width={280}
        size={44}
      />
      <Cue
        text="Vanguard"
        at={text("vanguard-mission")}
        duration={3.35}
        size={84}
      />
      <Cue
        text="Second strike"
        at={text("deterrent-capability")}
        duration={2.4}
        size={84}
      />
    </Stage>
  );
};
