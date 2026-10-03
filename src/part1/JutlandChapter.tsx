import { useGsapTimeline } from "@remotion/gsap";
import { gsap } from "gsap";
import { useCurrentFrame } from "remotion";
import { C, Cue, MediaShot, Stage, full } from "./Shared";
import {
  DreadnoughtPlan,
  JutlandDreadnought,
  JutlandToken,
  NorthSeaCoast,
  jutlandPoint,
} from "./JutlandVectors";

const START = 860;
const at = (seconds: number) => seconds - START / 30;
const lead = (frame: number) => (frame - START - 4) / 30;
const off = { opacity: 0 };
const view = (longitude: number, latitude: number, scale: number) => {
  const p = jutlandPoint(longitude, latitude);
  return { x: 960 - p[0] * scale, y: 620 - p[1] * scale, scale };
};
const northView = view(3.2, 56.5, 6.3);
const british = [
  jutlandPoint(-0.4, 58.4),
  jutlandPoint(0.65, 57.8),
  jutlandPoint(1.7, 57.2),
];
const germanPort = jutlandPoint(8.1, 53.5);
const germanControl = jutlandPoint(6.2, 56.1);
const germanEnd = jutlandPoint(3.8, 57.5);
const northGate = [
  jutlandPoint(-1.3, 60.4),
  jutlandPoint(2.4, 59.2),
  jutlandPoint(7.3, 57.6),
];
const gate =
  "M" +
  northGate[0].join(" ") +
  " Q" +
  northGate[1].join(" ") +
  " " +
  northGate[2].join(" ");
const approach =
  "M" +
  germanPort.join(" ") +
  " Q" +
  germanControl.join(" ") +
  " " +
  germanEnd.join(" ");
const remoteStations = [
  jutlandPoint(-30, 24),
  jutlandPoint(59, -8),
  jutlandPoint(119, -17),
];
const curvePoint = (fraction: number) => ({
  cx:
    (1 - fraction) ** 2 * germanPort[0] +
    2 * (1 - fraction) * fraction * germanControl[0] +
    fraction ** 2 * germanEnd[0],
  cy:
    (1 - fraction) ** 2 * germanPort[1] +
    2 * (1 - fraction) * fraction * germanControl[1] +
    fraction ** 2 * germanEnd[1],
});

const Count = ({
  value,
  frame,
  x,
  y,
  name,
  size = 146,
  suffix = "",
  color = C.white,
}: {
  value: number;
  frame: number;
  x: number;
  y: number;
  name: string;
  size?: number;
  suffix?: string;
  color?: string;
}) => {
  const local = useCurrentFrame();
  const amount = gsap.utils.snap(
    1,
    value *
      gsap.parseEase("power3.out")(
        Math.max(0, Math.min(1, (local + START - frame) / 22)),
      ),
  );
  return (
    <text
      data-j={name}
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontWeight="760"
      letterSpacing="-7"
      style={off}
    >
      {amount.toLocaleString("en-GB")}
      {suffix}
    </text>
  );
};

/** 860–2180 plus the outgoing 24-frame overlap. No autonomous playback.
 * Geographic paths show strategic access, never claimed tactical battle tracks.
 * IWM SP1704 is an actual 31 May 1916 photograph; vectors are schematic.
 */
export const JutlandChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    const q = (name: string) => selector('[data-j="' + name + '"]');
    timeline.set(q("photo"), { opacity: 1 }, 0);
    timeline.to(
      q("photo"),
      {
        clipPath: "inset(0% 0% 100% 0%)",
        y: -80,
        duration: 0.95,
        ease: "power3.inOut",
      },
      at(32.65),
    );
    timeline.to(q("photo"), { opacity: 0, duration: 0.1 }, at(33.65));

    timeline.set(
      q("ship-camera"),
      { x: 145, y: 45, scale: 1.1, opacity: 0 },
      0,
    );
    timeline.set(
      selector("[data-j-ship-draw], [data-j-ship-group] path"),
      {
        attr: { pathLength: 100 },
        strokeDasharray: 100,
        strokeDashoffset: 100,
      },
      0,
    );
    timeline.set(selector("[data-j-ship-fill]"), { fillOpacity: 0 }, 0);
    timeline.to(
      q("ship-camera"),
      { opacity: 1, duration: 0.45, ease: "power3.out" },
      at(32.5),
    );
    timeline.to(
      selector("[data-j-ship-draw], [data-j-ship-group] path"),
      {
        strokeDashoffset: 0,
        duration: 0.58,
        stagger: 0.017,
        ease: "power3.out",
      },
      at(32.5),
    );
    timeline.to(
      selector("[data-j-ship-fill]"),
      {
        fillOpacity: 1,
        duration: 0.4,
        stagger: 0.025,
        ease: "power2.out",
      },
      at(32.75),
    );
    timeline.to(
      q("ship-camera"),
      { x: -90, y: 10, scale: 1.18, duration: 2.45, ease: "none" },
      at(32.5),
    );
    timeline.to(
      q("ship-camera"),
      { y: 220, scale: 0.9, opacity: 0, duration: 0.65, ease: "power3.inOut" },
      at(34.95),
    );
    timeline.to(
      q("smoke"),
      { x: 80, y: -22, duration: 3.2, ease: "none" },
      at(32.5),
    );
    timeline.to(
      q("bow-wake"),
      { strokeDashoffset: -160, duration: 3.2, ease: "none" },
      at(32.5),
    );
    for (let i = 0; i < 5; i++)
      timeline.to(
        q("gun-" + i),
        {
          attr: { transform: "rotate(" + (-4 + i * 1.3) + ")" },
          duration: 2,
          ease: "power2.inOut",
        },
        at(32.6) + i * 0.06,
      );

    timeline.set(q("comparison"), { opacity: 0, y: 80, scale: 1.04 }, 0);
    timeline.set(
      q("brit-token"),
      { opacity: 0, attr: { transform: "scale(1 .1)" } },
      0,
    );
    timeline.set(
      q("german-token"),
      { opacity: 0, attr: { transform: "scale(1 .1)" } },
      0,
    );
    timeline.to(
      q("comparison"),
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      at(34.9),
    );
    timeline.to(q("brit-label"), { opacity: 1, duration: 0.18 }, at(35.26));
    timeline.to(q("count-brit"), { opacity: 1, duration: 0.16 }, at(35.94));
    timeline.to(
      q("brit-token"),
      {
        opacity: 1,
        attr: { transform: "scale(1 1)" },
        duration: 0.32,
        stagger: 0.004,
        ease: "power3.out",
      },
      lead(1078),
    );
    timeline.to(q("german-label"), { opacity: 1, duration: 0.18 }, at(38.9));
    timeline.to(q("count-german"), { opacity: 1, duration: 0.16 }, at(38.06));
    timeline.to(
      q("german-token"),
      {
        opacity: 1,
        attr: { transform: "scale(1 1)" },
        duration: 0.32,
        stagger: 0.005,
        ease: "power3.out",
      },
      lead(1142),
    );
    timeline.to(
      q("comparison"),
      { x: -14, y: 8, scale: 1.015, duration: 4.4, ease: "none" },
      at(35.4),
    );
    // The counted battle force recedes into a wider operational context.
    timeline.to(
      q("comparison"),
      { x: 80, y: 70, scale: 0.77, duration: 1.25, ease: "power3.inOut" },
      at(40.66),
    );
    timeline.to(
      q("comparison"),
      {
        x: 300,
        y: -75,
        scale: 0.28,
        opacity: 0,
        duration: 1.05,
        ease: "power3.inOut",
      },
      at(42.5),
    );

    timeline.set(q("map"), { opacity: 0 }, 0);
    timeline.set(q("map-camera"), northView, 0);
    timeline.set(q("regional-symbols"), { opacity: 0 }, 0);
    timeline.set(q("regional-labels"), { opacity: 0 }, 0);
    timeline.set(q("remote"), { opacity: 0 }, 0);
    timeline.set(q("remote-ring"), { opacity: 0, attr: { r: 2 } }, 0);
    timeline.set(
      q("access-gate"),
      { opacity: 0, strokeDasharray: 100, strokeDashoffset: 100 },
      0,
    );
    timeline.set(
      q("german-approach"),
      { opacity: 0, strokeDasharray: 100, strokeDashoffset: 100 },
      0,
    );
    timeline.set(q("attempt"), { opacity: 0, attr: curvePoint(0) }, 0);
    timeline.to(q("map"), { opacity: 0.24, duration: 1.1 }, at(40.66));
    timeline.to(
      q("map"),
      { opacity: 1, duration: 0.7, ease: "power2.out" },
      at(43.14),
    );
    timeline.to(
      q("regional-symbols"),
      { opacity: 1, duration: 0.48 },
      at(43.01),
    );
    timeline.to(
      q("regional-labels"),
      { opacity: 1, duration: 0.45 },
      at(43.14),
    );
    timeline.to(
      q("map-camera"),
      { ...view(3.6, 56.1, 6.8), duration: 2.9, ease: "none" },
      at(43.14),
    );
    timeline.to(q("regional-symbols"), { opacity: 0, duration: 0.5 }, at(46.6));
    timeline.to(q("regional-labels"), { opacity: 0, duration: 0.5 }, at(46.6));
    timeline.to(
      q("map-camera"),
      { x: 0, y: -28, scale: 1.035, duration: 1.35, ease: "power3.inOut" },
      at(46.6),
    );
    timeline.to(
      q("remote"),
      { opacity: 1, duration: 0.4, stagger: 0.13 },
      at(47.2),
    );
    timeline.to(
      q("remote-ring"),
      { opacity: 0.8, attr: { r: 9 }, duration: 0.4, stagger: 0.13 },
      at(47.2),
    );
    timeline.to(
      q("remote-ring"),
      {
        opacity: 0,
        attr: { r: 27 },
        duration: 1.7,
        stagger: 0.13,
        repeat: 1,
        ease: "power2.out",
      },
      at(47.65),
    );
    timeline.to(
      q("map-camera"),
      { x: -22, y: -34, scale: 1.06, duration: 2.2, ease: "none" },
      at(47.95),
    );
    timeline.to(q("map"), { opacity: 0, duration: 0.6 }, at(50.8));
    timeline.to(q("remote"), { opacity: 0, duration: 0.3 }, at(50.8));

    // Losses are absences in a ship register, not explosions or human pictograms.
    timeline.set(q("losses"), { opacity: 0, y: 1080 }, 0);
    timeline.set(
      q("loss-register"),
      { attr: { transform: "matrix(1.03 0 0 1.03 -28.8 23.94)" } },
      0,
    );
    timeline.set(q("loss-ship"), { opacity: 0 }, 0);
    timeline.to(
      q("losses"),
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" },
      at(50.52),
    );
    timeline.to(
      q("loss-ship"),
      { opacity: 1, duration: 0.35, stagger: 0.06 },
      at(51.04),
    );
    timeline.to(
      q("loss-register"),
      {
        attr: { transform: "matrix(1 0 0 1 0 0)" },
        duration: 2.1,
        ease: "none",
      },
      at(51.1),
    );
    timeline.to(
      q("count-lost-ships"),
      { opacity: 1, duration: 0.2 },
      at(53.92),
    );
    timeline.to(
      q("loss-fill"),
      { opacity: 0, duration: 0.65, stagger: 0.05, ease: "power2.out" },
      lead(1618),
    );
    timeline.to(
      q("loss-register"),
      {
        attr: { transform: "matrix(.88 0 0 .88 25.2 254.24)" },
        opacity: 0.13,
        duration: 1,
        ease: "power3.inOut",
      },
      at(55.28),
    );
    timeline.to(
      q("count-lost-ships"),
      { opacity: 0, duration: 0.3 },
      at(55.28),
    );
    timeline.to(q("count-men"), { opacity: 1, duration: 0.35 }, at(55.62));
    timeline.to(
      q("losses"),
      { y: -190, opacity: 0, duration: 0.8, ease: "power3.inOut" },
      at(57.37),
    );

    // Return to the same geographic space and show access remaining constrained.
    timeline.to(
      q("map-camera"),
      { ...northView, duration: 1.25, ease: "power3.inOut" },
      at(56.05),
    );
    timeline.to(q("map"), { opacity: 1, duration: 0.8 }, at(57.37));
    timeline.to(
      q("regional-symbols"),
      { opacity: 1, duration: 0.5 },
      at(57.37),
    );
    timeline.to(q("regional-labels"), { opacity: 1, duration: 0.5 }, at(57.37));
    timeline.to(
      q("access-gate"),
      { opacity: 1, strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
      at(58.36),
    );
    timeline.to(
      q("german-approach"),
      { opacity: 0.6, strokeDashoffset: 0, duration: 1.7, ease: "none" },
      at(58.5),
    );
    timeline.to(q("attempt"), { opacity: 1, duration: 0.18 }, at(58.5));
    timeline.to(
      q("attempt"),
      {
        keyframes: Array.from({ length: 21 }, (_, i) => ({
          attr: curvePoint(i / 20),
          duration: 0.085,
          ease: "none",
        })),
      },
      at(58.5),
    );
    timeline.to(q("attempt"), { opacity: 0.3, duration: 0.5 }, at(60.3));
    timeline.to(
      q("map-camera"),
      { ...view(3.4, 56.4, 6.5), duration: 3.0, ease: "none" },
      at(58.5),
    );
    timeline.to(
      q("map-camera"),
      { ...view(4.3, 56.2, 6.15), duration: 2.3, ease: "power2.inOut" },
      at(61.6),
    );
    timeline.to(
      q("map-camera"),
      { ...view(3.4, 56.2, 5.9), duration: 3.6, ease: "power2.inOut" },
      at(64.44),
    );
    timeline.to(
      q("map-camera"),
      { ...view(3.1, 56.4, 6.04), duration: 4.2, ease: "none" },
      at(69.25),
    );
    for (let i = 0; i < 3; i++)
      timeline.to(
        q("patrol-" + i),
        {
          attr: {
            transform: "translate(" + (4 + i) + " " + (-3 - i) + ") rotate(8)",
          },
          duration: 3.4 + i * 0.2,
          repeat: 8,
          yoyo: true,
          ease: "power2.inOut",
        },
        at(43.01),
      );
    timeline.to(
      q("patrol-wake"),
      { strokeDashoffset: -20, duration: 29, ease: "none" },
      at(43.01),
    );
    timeline.to(
      q("access-gate"),
      {
        strokeWidth: 1.1,
        duration: 1.1,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
      },
      at(64.44),
    );
    timeline.to(q("years"), { opacity: 1, duration: 0.45 }, at(69.6));
    timeline.fromTo(
      q("years-line"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 2.8, ease: "power2.inOut" },
      at(69.6),
    );
  });

  return (
    <Stage ref={scope} data-part1-chapter="jutland">
      <div data-j="photo" style={full}>
        <MediaShot
          src="images/part1/jutland-lion.jpg"
          photo
          credit="IWM · SP1704 · 1916"
          seconds={5.5}
          fromScale={1.22}
          toScale={1.37}
          pan={42}
          position="50% 61%"
        />
      </div>
      <div data-j="map" style={{ ...full, ...off }}>
        <div data-j="map-camera" style={{ ...full, transformOrigin: "0 0" }}>
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
            <NorthSeaCoast />
            <g
              data-j="regional-labels"
              style={off}
              fill="#C6D5DF"
              fontSize="6.5"
              fontWeight="550"
              letterSpacing=".15"
            >
              <text
                x={jutlandPoint(-5.8, 54.7)[0]}
                y={jutlandPoint(-5.8, 54.7)[1]}
              >
                Britain
              </text>
              <text
                x={jutlandPoint(8.8, 51.9)[0]}
                y={jutlandPoint(8.8, 51.9)[1]}
              >
                Germany
              </text>
            </g>
            <g data-j="regional-symbols" style={off}>
              {british.map((p, i) => (
                <g key={i} transform={"translate(" + p.join(" ") + ")"}>
                  <g
                    data-j={"patrol-" + i}
                    transform="translate(0 0) rotate(0)"
                  >
                    <g transform="scale(.23)">
                      <DreadnoughtPlan />
                    </g>
                    <path
                      data-j="patrol-wake"
                      d="M-1 7 L-1 15 M1 7 L1 15"
                      fill="none"
                      stroke="#B5CCDB"
                      strokeWidth=".3"
                      strokeDasharray="1.5 1.5"
                      opacity=".5"
                    />
                  </g>
                </g>
              ))}
              <g
                transform={
                  "translate(" +
                  germanPort.join(" ") +
                  ") rotate(-30) scale(.2)"
                }
              >
                <DreadnoughtPlan />
              </g>
            </g>
            <path
              data-j="access-gate"
              d={gate}
              pathLength="100"
              stroke={C.gold}
              strokeWidth=".55"
              strokeLinecap="round"
              fill="none"
              style={off}
            />
            <path
              data-j="german-approach"
              d={approach}
              pathLength="100"
              stroke="#C5D8E3"
              strokeWidth=".35"
              fill="none"
              style={off}
            />
            <circle
              data-j="attempt"
              cx={germanPort[0]}
              cy={germanPort[1]}
              r=".75"
              fill="#F4F7FA"
              style={off}
            />
            {remoteStations.map((p, i) => (
              <g key={i}>
                <g
                  data-j="remote"
                  transform={"translate(" + p.join(" ") + ") scale(.65)"}
                  style={off}
                >
                  <DreadnoughtPlan />
                </g>
                <circle
                  data-j="remote-ring"
                  cx={p[0]}
                  cy={p[1]}
                  r="2"
                  stroke={C.gold}
                  strokeWidth="1.5"
                  fill="none"
                  style={off}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div
        data-j="ship-camera"
        style={{ ...full, ...off, transformOrigin: "50% 64%" }}
      >
        <svg
          viewBox="0 0 1200 380"
          style={{
            position: "absolute",
            left: 120,
            top: 320,
            width: 1680,
            height: 570,
            overflow: "visible",
          }}
        >
          <JutlandDreadnought />
        </svg>
      </div>
      <div
        data-j="comparison"
        style={{ ...full, ...off, transformOrigin: "50% 65%" }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <Count value={151} frame={1078} name="count-brit" x={260} y={350} />
          <Count
            value={99}
            frame={1142}
            name="count-german"
            x={1160}
            y={350}
            color={C.gold}
          />
          <text
            data-j="brit-label"
            x="260"
            y="414"
            fontSize="38"
            fontWeight="550"
            fill={C.line}
            style={off}
          >
            British
          </text>
          <text
            data-j="german-label"
            x="1160"
            y="414"
            fontSize="38"
            fontWeight="550"
            fill="#D2BD88"
            style={off}
          >
            German
          </text>
          {Array.from({ length: 151 }, (_, i) => (
            <g
              key={i}
              transform={
                "translate(" +
                (260 + (i % 16) * 35) +
                " " +
                (470 + Math.floor(i / 16) * 43) +
                ")"
              }
            >
              <g data-j="brit-token" style={off}>
                <JutlandToken />
              </g>
            </g>
          ))}
          {Array.from({ length: 99 }, (_, i) => (
            <g
              key={i}
              transform={
                "translate(" +
                (1160 + (i % 11) * 35) +
                " " +
                (470 + Math.floor(i / 11) * 43) +
                ")"
              }
            >
              <g data-j="german-token" style={off}>
                <JutlandToken color="#C4B17D" />
              </g>
            </g>
          ))}
        </svg>
      </div>
      <div data-j="losses" style={{ ...full, ...off, background: "#E5EBEF" }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <g data-j="loss-register" transform="matrix(1 0 0 1 0 0)">
            {Array.from({ length: 14 }, (_, i) => (
              <g
                data-j="loss-ship"
                key={i}
                transform={
                  "translate(" +
                  (294 + (i % 7) * 216) +
                  " " +
                  (564 + Math.floor(i / 7) * 195) +
                  ") scale(2.7)"
                }
                style={off}
              >
                <path
                  d="M0 -24 Q8 -17 9 -7 L9 19 Q7 24 0 26 Q-7 24 -9 19 L-9 -7 Q-8 -17 0 -24Z"
                  fill="none"
                  stroke="#5E7789"
                  strokeWidth=".8"
                />
                <g data-j="loss-fill">
                  <DreadnoughtPlan />
                </g>
              </g>
            ))}
          </g>
          <Count
            value={14}
            frame={1618}
            name="count-lost-ships"
            x={154}
            y={330}
            size={190}
            color={C.navy}
          />
          <Count
            value={6000}
            frame={1669}
            name="count-men"
            x={365}
            y={578}
            size={242}
            suffix="+"
            color={C.navy}
          />
        </svg>
        <Cue
          text="ships"
          at={at(54.42)}
          duration={0.92}
          x={436}
          y={250}
          size={60}
          color={C.navy}
        />
        <Cue
          text="men"
          at={at(56.52)}
          duration={1}
          x={1280}
          y={512}
          size={70}
          color={C.navy}
        />
      </div>
      <div
        style={{
          ...full,
          background: "linear-gradient(180deg,#0B1A2Eaa 0%,#0B1A2E00 27%)",
          pointerEvents: "none",
        }}
      />
      <Cue text="Jutland" at={at(31.6)} duration={3.6} />
      <Cue
        text="1916"
        at={at(32.24)}
        duration={2.75}
        x={1432}
        y={120}
        size={64}
        color={C.gold}
      />
      <Cue text="Royal Navy" at={at(41.86)} duration={1.6} />
      <Cue text="North Sea" at={at(45.78)} duration={1.4} />
      <Cue text="Royal Navy" at={at(46.96)} duration={3.1} />
      <Cue text="Germany" at={at(58.5)} duration={2.6} />
      <Cue text="Royal Navy" at={at(64.54)} duration={2.1} />
      <Cue text="Germany" at={at(68.72)} duration={2.45} />
      <svg
        data-j="years"
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ ...full, ...off, pointerEvents: "none" }}
      >
        <text x="154" y="966" fontSize="38" fontWeight="650" fill={C.white}>
          1916
        </text>
        <path
          data-j="years-line"
          d="M282 952 L1600 952"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          stroke={C.gold}
          strokeWidth="2"
        />
        <path
          d="M282 942 L282 962 M1600 942 L1600 962"
          stroke={C.gold}
          strokeWidth="2"
        />
        <text x="1640" y="966" fontSize="38" fontWeight="650" fill={C.white}>
          1918
        </text>
      </svg>
    </Stage>
  );
};
