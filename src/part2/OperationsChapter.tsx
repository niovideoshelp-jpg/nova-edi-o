import { useGsapTimeline } from "@remotion/gsap";
import { Sequence } from "remotion";
import { C, Cue, full, MediaShot, Stage } from "./Shared";
import { ShipPlan, MerlinPlan, SubmarinePlan } from "./PresentVectors";
import { cueAt, iconAt, cueFor } from "./Timing";

/** Photographic insert with a full incoming plane, then return to the same diagram. */
const Evidence = ({
  src,
  credit,
  seconds,
  photo = true,
  position = "50% 50%",
}: {
  src: string;
  credit: string;
  seconds: number;
  photo?: boolean;
  position?: string;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      timeline.fromTo(
        selector("[data-evidence]"),
        { opacity: 0, clipPath: "inset(0% 8% 0% 8%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.5,
          ease: "power3.out",
        },
        0,
      );
      timeline.to(
        selector("[data-evidence]"),
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        seconds - 0.3,
      );
    },
    { dependencies: [seconds] },
  );
  return (
    <div ref={scope} style={full}>
      <div data-evidence style={{ ...full, background: C.navy }}>
        <MediaShot
          src={src}
          credit={credit}
          seconds={seconds}
          photo={photo}
          position={position}
          fromScale={1.02}
          toScale={1.065}
        />
      </div>
    </div>
  );
};

export const EscortChapter = () => {
  const at = (id: string) => cueAt(id, 1771);
  const early = (id: string) => iconAt(id, 1771);
  const photo45 = cueFor("escort-type-45").iconRevealFrame - 1771;
  const photoAsw = cueFor("escort-asw-team").iconRevealFrame - 1771;
  const photoRfa = cueFor("escort-logistics").iconRevealFrame - 1771;
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    timeline.set(selector("[data-role]"), { opacity: 0 }, 0);
    timeline.set(
      selector("[data-radar],[data-sonar]"),
      { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 },
      0,
    );
    timeline.fromTo(
      selector("[data-formation-camera]"),
      { scale: 0.86, x: 40, y: 15 },
      { scale: 0.96, x: -10, y: -10, duration: 6, ease: "power3.out" },
      0,
    );
    timeline.to(
      selector("[data-formation-camera]"),
      { scale: 1.035, x: 15, y: 0, duration: 15.8, ease: "none" },
      6,
    );
    timeline.fromTo(
      selector("[data-carrier]"),
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
      0,
    );
    timeline.to(
      selector("[data-destroyer]"),
      { opacity: 1, duration: 0.5 },
      early("escort-type-45"),
    );
    timeline.to(
      selector("[data-radar]"),
      { opacity: 0.6, strokeDashoffset: 0, duration: 1.15, ease: "power3.out" },
      early("escort-type-45"),
    );
    timeline.to(
      selector("[data-frigate],[data-helicopter]"),
      { opacity: 1, duration: 0.5 },
      early("escort-asw-team"),
    );
    timeline.to(
      selector("[data-sonar]"),
      { opacity: 0.55, strokeDashoffset: 0, duration: 1.3, ease: "power3.out" },
      early("escort-asw-team"),
    );
    timeline.to(
      selector("[data-submarine]"),
      { opacity: 1, duration: 0.5 },
      early("escort-attack-submarine"),
    );
    timeline.to(
      selector("[data-supply]"),
      { opacity: 1, duration: 0.5 },
      early("escort-logistics"),
    );
    timeline.fromTo(
      selector("[data-logistics]"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 3, ease: "none" },
      early("escort-logistics"),
    );
    timeline.fromTo(
      selector("[data-route-flow]"),
      { strokeDashoffset: 0 },
      { strokeDashoffset: -100, duration: 22, ease: "none" },
      0,
    );
    timeline.fromTo(
      selector("[data-wake]"),
      { opacity: 0.2 },
      {
        opacity: 0.55,
        duration: 2.5,
        repeat: 8,
        yoyo: true,
        ease: "sine.inOut",
      },
      0,
    );
  });
  return (
    <Stage ref={scope}>
      <div
        data-formation-camera
        style={{ ...full, transformOrigin: "50% 52%" }}
      >
        <svg viewBox="0 0 1920 1080" style={full}>
          <path
            data-route-flow
            d="M960 905 V240"
            stroke={C.steel}
            opacity=".3"
            strokeWidth="2"
            strokeDasharray="5 15"
          />
          <g data-wake stroke={C.steel} strokeWidth="2" fill="none">
            <path d="M910 693 Q888 771 888 836 M1008 693 Q1030 771 1030 836" />
            <path d="M657 447 L640 512 M702 447 L719 512 M1227 526 L1212 581 M1271 526 L1286 581" />
          </g>
          <g data-carrier>
            <g transform="translate(960 545)">
              <ShipPlan kind="carrier" />
            </g>
          </g>
          <path
            data-radar
            pathLength="1"
            d="M448 418 A245 245 0 0 1 903 418"
            stroke={C.gold}
            fill="none"
            strokeWidth="4"
          />
          <g data-role data-destroyer>
            <g transform="translate(678 343) scale(.69)">
              <ShipPlan kind="destroyer" color={C.gold} />
            </g>
          </g>
          <g data-role data-frigate>
            <g transform="translate(1248 436) scale(.63)">
              <ShipPlan kind="frigate" />
            </g>
          </g>
          <g data-role data-helicopter>
            <g transform="translate(1195 236) scale(.88)">
              <MerlinPlan />
            </g>
          </g>
          <path
            data-sonar
            pathLength="1"
            d="M1100 250 Q1248 89 1383 253 M1129 275 Q1248 145 1356 275"
            stroke={C.steel}
            strokeWidth="4"
            fill="none"
          />
          <g data-role data-submarine>
            <g transform="translate(710 651) rotate(-12) scale(.53)">
              <SubmarinePlan color={C.line} />
            </g>
          </g>
          <g data-role data-supply>
            <g transform="translate(1195 763) scale(.68)">
              <ShipPlan kind="supply" />
            </g>
            <path
              data-logistics
              d="M1158 756 Q1080 678 1004 651"
              pathLength="100"
              stroke={C.gold}
              strokeWidth="3"
              strokeDasharray="5 8"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <Cue
        text="Carrier protection"
        at={at("escort-carrier-protection")}
        duration={4.6}
      />
      <Cue
        text="Attack submarines"
        at={at("escort-attack-submarine")}
        duration={2.5}
      />
      <Sequence
        from={photo45}
        durationInFrames={99}
        name="Type45 · photographic evidence"
      >
        <Evidence
          src="images/part2/daring-profile.jpg"
          credit="James Crawford / MOD · English Channel · 2010"
          seconds={3.3}
          position="50% 58%"
        />
        <Cue text="Type 45" at={4 / 30} duration={3.1} />
      </Sequence>
      <Sequence from={photoAsw} durationInFrames={96} name="Merlin HM2 · ASW">
        <Evidence
          src="images/part2/merlin-hm2-2025.jpg"
          credit="US Navy · Merlin HM2 · 2025"
          seconds={3.2}
        />
        <Cue text="Merlin HM2" at={4 / 30} duration={2.9} />
      </Sequence>
      <Sequence
        from={photoRfa}
        durationInFrames={656 - photoRfa}
        name="Royal Fleet Auxiliary · fuel"
      >
        <Evidence
          src="images/part2/tiderace-ras-2021.jpg"
          credit="UK MOD · Baltic Sea · 2021"
          seconds={(656 - photoRfa) / 30}
        />
        <Cue
          text="Royal Fleet Auxiliary"
          at={4 / 30}
          duration={3.6}
          size={66}
        />
      </Sequence>
    </Stage>
  );
};

export const CapacityChapter = () => {
  const at = (id: string) => cueAt(id, 2403);
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    timeline.set(selector("[data-loss]"), { opacity: 0 }, 0);
    timeline.set(selector("[data-replacement]"), { opacity: 0 }, 0);
    timeline.fromTo(
      selector("[data-capacity-camera]"),
      { scale: 0.98, x: 0, y: 0 },
      { scale: 1.06, x: -18, y: 8, duration: 8.3, ease: "none" },
      0,
    );
    timeline.to(
      selector("[data-maintenance]"),
      { x: 140, y: 292, opacity: 0.45, duration: 1.4, ease: "power3.inOut" },
      at("capacity-maintenance-delays") - 4 / 30,
    );
    timeline.fromTo(
      selector("[data-dock]"),
      { opacity: 0, y: 18 },
      { opacity: 0.8, y: 0, duration: 0.5 },
      at("capacity-maintenance-delays") - 4 / 30,
    );
    timeline.to(
      selector("[data-capacity-camera]"),
      { scale: 0.93, x: 55, y: 0, duration: 2, ease: "power3.inOut" },
      9.3,
    );
    timeline.to(
      selector("[data-loss]"),
      { opacity: 1, duration: 0.35 },
      at("capacity-single-loss") - 4 / 30,
    );
    timeline.to(
      selector("[data-lost]"),
      { opacity: 0, scale: 0.88, duration: 0.65, ease: "power2.in" },
      at("capacity-single-loss") + 0.35,
    );
    timeline.to(
      selector("[data-cover]"),
      { stroke: C.red, opacity: 0.5, strokeDasharray: "8 13", duration: 0.6 },
      at("capacity-single-loss") + 0.35,
    );
    timeline.to(
      selector("[data-loss]"),
      { opacity: 0, duration: 0.5 },
      at("capacity-single-loss") + 1.4,
    );
    timeline.to(
      selector("[data-capacity-camera]"),
      { scale: 1.11, x: -22, y: 35, duration: 4.1, ease: "power3.inOut" },
      15.9,
    );
    timeline.to(
      selector("[data-replacement]"),
      { opacity: 0.7, duration: 0.5 },
      20.8,
    );
    timeline.fromTo(
      selector("[data-replacement-line]"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.5 },
      20.8,
    );
    timeline.to(
      selector("[data-capacity-camera]"),
      { scale: 1.02, x: 0, y: 0, duration: 5, ease: "none" },
      22.3,
    );
    timeline.fromTo(
      selector("[data-active-flow]"),
      { strokeDashoffset: 0 },
      { strokeDashoffset: -160, duration: 28, ease: "none" },
      0,
    );
  });
  return (
    <Stage ref={scope}>
      <div data-capacity-camera style={{ ...full, transformOrigin: "50% 50%" }}>
        <svg viewBox="0 0 1920 1080" style={full}>
          <path
            data-active-flow
            d="M970 804 V263"
            stroke={C.steel}
            opacity=".4"
            strokeDasharray="6 18"
            strokeWidth="2"
          />
          <g transform="translate(970 528)">
            <ShipPlan kind="carrier" />
          </g>
          <g data-lost>
            <g transform="translate(674 336) scale(.7)">
              <ShipPlan kind="destroyer" color={C.gold} />
            </g>
          </g>
          <path
            data-cover
            d="M436 404 A250 250 0 0 1 909 404"
            stroke={C.gold}
            strokeWidth="3"
            fill="none"
            opacity=".55"
          />
          <g data-loss stroke={C.red} strokeWidth="4">
            <path d="M622 290 L725 389 M725 290 L622 389" />
          </g>
          <g data-maintenance>
            <g transform="translate(1250 435) scale(.66)">
              <ShipPlan kind="frigate" />
            </g>
          </g>
          <g data-dock opacity="0" stroke={C.line} strokeWidth="3" fill="none">
            <path d="M1330 633 V860 H1450 V633" />
            <path d="M1350 855 V905 M1380 855 V915 M1410 855 V905" />
          </g>
          <g transform="translate(732 697) scale(.58)">
            <SubmarinePlan color={C.line} />
          </g>
          <g transform="translate(1175 760) scale(.59)">
            <ShipPlan kind="supply" />
          </g>
          <g data-replacement>
            <path
              data-replacement-line
              d="M1530 489 H1310 Q1240 489 1210 558"
              pathLength="1"
              strokeDasharray="1"
              stroke={C.line}
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M1492 342 H1573 V565 H1492Z"
              fill="none"
              stroke={C.line}
              strokeDasharray="7 10"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
      <Cue
        text="Limited capacity"
        at={at("capacity-limited-fleet")}
        duration={3.8}
      />
      <Cue
        text="Maintenance"
        at={at("capacity-maintenance-delays")}
        duration={3.2}
      />
      <Cue
        text="Fewer options"
        at={at("capacity-reduced-options")}
        duration={3.2}
      />
      <Cue
        text="One escort"
        at={at("capacity-single-loss")}
        duration={3.2}
        color={C.gold}
      />
      <Cue
        text="Little spare capacity"
        at={at("capacity-spare-capacity")}
        duration={4.8}
        size={70}
      />
      <div
        style={{
          position: "absolute",
          left: 154,
          bottom: 90,
          fontSize: 19,
          color: C.line,
        }}
      >
        Illustrative formation
      </div>
    </Stage>
  );
};
