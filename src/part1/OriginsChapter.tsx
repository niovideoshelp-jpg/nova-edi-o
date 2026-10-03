import { useId } from "react";
import { useGsapTimeline } from "@remotion/gsap";
import { Img, Sequence, staticFile } from "remotion";
import geo from "../../data/part1/geography.json";
import { Stage, Passage, Cue, MediaShot, C, full, mapEdge } from "./Shared";

const map = geo.views.world;
const links = map.routes.filter((r) =>
  ["Halifax", "CapeTown", "Mumbai", "Sydney"].includes(r.id),
);

export const OriginsChapter = () => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    const q = (v: string) => selector(`[data-origin="${v}"]`);
    timeline.set(q("ship"), { x: 140, y: 40, scale: 0.86, opacity: 0 }, 0);
    timeline.to(
      q("ship"),
      { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "power3.out" },
      2.98,
    );
    timeline.to(
      q("ship"),
      { x: -40, y: -14, scale: 1.035, duration: 2.1, ease: "none" },
      3.63,
    );
    timeline.to(
      q("ship"),
      { x: -80, y: 24, scale: 1.23, duration: 2.6, ease: "power2.inOut" },
      5.73,
    );
    timeline.to(
      q("ship"),
      { opacity: 0, x: -140, duration: 0.45, ease: "power2.in" },
      8.35,
    );
    timeline.fromTo(
      q("era-line"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.75, ease: "power3.out" },
      5.7,
    );
    timeline.fromTo(
      q("era-dot"),
      { x: 600 },
      { x: 0, duration: 1.2, ease: "power3.inOut" },
      5.7,
    );
    timeline.set(q("date-strip"), { opacity: 0 }, 0);
    timeline.to(q("date-strip"), { opacity: 1, duration: 0.4 }, 5.5);
    timeline.to(q("date-strip"), { opacity: 0, duration: 0.35 }, 8.35);
    timeline.set(q("map-stage"), { opacity: 0 }, 0);
    timeline.to(
      q("map-stage"),
      { opacity: 1, duration: 0.75, ease: "power2.inOut" },
      14.85,
    );
    timeline.set(
      q("map-camera"),
      {
        scale: 3.1,
        y: 120,
        transformOrigin: `${map.points.London[0]}px ${map.points.London[1]}px`,
      },
      0,
    );
    timeline.to(
      q("map-camera"),
      { scale: 3.32, y: 128, duration: 2.9, ease: "none" },
      14.85,
    );
    timeline.fromTo(
      q("uk-paint"),
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" },
      16.5,
    );
    timeline.to(
      q("map-camera"),
      { scale: 1.03, x: 0, y: 0, duration: 2.6, ease: "power3.inOut" },
      17.85,
    );
    timeline.to(
      q("map-camera"),
      { scale: 1.07, x: -24, y: -12, duration: 3.1, ease: "none" },
      20.45,
    );
    timeline.to(
      q("map-camera"),
      { scale: 1.15, x: -35, y: 0, duration: 4.6, ease: "none" },
      23.55,
    );
    timeline.fromTo(
      q("route-mask"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 1.65,
        stagger: 0.4,
        ease: "power2.inOut",
      },
      18.55,
    );
    timeline.fromTo(
      q("port"),
      { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.4, ease: "power3.out" },
      20.05,
    );
    timeline.fromTo(
      q("packets"),
      { strokeDashoffset: 0 },
      { strokeDashoffset: -24, duration: 8.7, ease: "none" },
      20.25,
    );
    timeline.fromTo(
      q("london-ring"),
      { scale: 0.5, opacity: 0.9, transformOrigin: "50% 50%" },
      { scale: 3, opacity: 0, duration: 1.6, repeat: 2, ease: "power2.out" },
      24.6,
    );
    timeline.fromTo(
      q("ship-detail"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.6, stagger: 0.13, ease: "power3.out" },
      3.1,
    );
  });
  return (
    <Stage ref={scope}>
      <Sequence durationInFrames={107} name="Present Royal Navy">
        <MediaShot
          src="video/pow-arrival.mp4"
          credit="U.S. Navy · 2023"
          seconds={3.57}
          fromScale={1.09}
          toScale={1.14}
          pan={22}
        />
      </Sequence>
      <Sequence from={88} durationInFrames={180} name="A century earlier">
        <Passage kind="east">
          <Stage />
        </Passage>
      </Sequence>
      <div
        data-origin="ship"
        style={{
          position: "absolute",
          left: 150,
          top: 260,
          width: 1620,
          height: 700,
          opacity: 0,
        }}
      >
        <Img
          src={staticFile("images/part1/generated/early-battleship.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <svg viewBox="0 0 1620 700" style={full}>
          <path
            data-origin="ship-detail"
            pathLength={100}
            d="M176 535 H1505"
            fill="none"
            stroke={C.gold}
            strokeWidth={2}
            strokeDasharray={100}
          />
          <path
            data-origin="ship-detail"
            pathLength={100}
            d="M360 564 V608 H720"
            fill="none"
            stroke={C.line}
            strokeWidth={2}
            strokeDasharray={100}
          />
        </svg>
      </div>
      <div data-origin="date-strip" style={{ ...full, opacity: 0 }}>
        <svg viewBox="0 0 1920 1080" style={full}>
          <path
            data-origin="era-line"
            pathLength={100}
            d="M490 915 H1430"
            fill="none"
            stroke={C.line}
            strokeWidth={2}
            strokeDasharray={100}
          />
          <g data-origin="era-dot">
            <circle cx={490} cy={915} r={9} fill={C.gold} />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 486,
            top: 940,
            fontSize: 30,
            fontWeight: 650,
            color: C.gold,
          }}
        >
          1914
        </div>
        <div
          style={{
            position: "absolute",
            left: 1350,
            top: 940,
            fontSize: 30,
            fontWeight: 650,
          }}
        >
          1939
        </div>
      </div>
      <Sequence from={258} durationInFrames={214} name="The Grand Fleet">
        <Passage kind="focus">
          <MediaShot
            src="images/part1/grand-fleet-highres.jpg"
            credit="Royal Navy / IWM Q18121 · 1914–1918"
            seconds={7.13}
            photo
            fromScale={1}
            toScale={1.09}
            pan={55}
            position="50% 54%"
          />
        </Passage>
      </Sequence>
      <div
        data-origin="map-stage"
        style={{
          ...full,
          opacity: 0,
          background: "radial-gradient(ellipse at 50% 55%,#183D57,#0B1A2E 70%)",
        }}
      >
        <div
          data-origin="map-camera"
          style={{
            ...mapEdge,
            position: "absolute",
            left: 160,
            top: 215,
            width: 1600,
            height: 800,
          }}
        >
          <Img src={staticFile("maps/part1/world.svg")} style={full} />
          <svg viewBox="0 0 1600 800" style={full}>
            <defs>
              {links.map((r, i) => (
                <mask
                  key={r.id}
                  id={`${uid}-${i}`}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={1600}
                  height={800}
                >
                  <path
                    data-origin="route-mask"
                    d={r.d}
                    pathLength={100}
                    stroke="white"
                    strokeWidth={10}
                    fill="none"
                    strokeDasharray={100}
                  />
                </mask>
              ))}
            </defs>
            <path data-origin="uk-paint" d={map.uk} fill={C.gold} />
            {links.map((r, i) => (
              <g key={r.id}>
                <path
                  data-origin="packets"
                  d={r.d}
                  pathLength={100}
                  fill="none"
                  stroke={C.gold}
                  strokeWidth={2.5}
                  strokeDasharray="1.2 1.1"
                  mask={`url(#${uid}-${i})`}
                />
                <g data-origin="port">
                  <circle cx={r.to[0]} cy={r.to[1]} r={6} fill={C.white} />
                  <circle
                    cx={r.to[0]}
                    cy={r.to[1]}
                    r={11}
                    stroke={C.gold}
                    strokeWidth={1.2}
                    fill="none"
                  />
                </g>
              </g>
            ))}
            <circle
              cx={map.points.London[0]}
              cy={map.points.London[1]}
              r={5}
              fill={C.gold}
            />
            <circle
              data-origin="london-ring"
              cx={map.points.London[0]}
              cy={map.points.London[1]}
              r={12}
              stroke={C.gold}
              strokeWidth={2}
              fill="none"
            />
          </svg>
        </div>
      </div>
      <Cue text="Royal Navy" at={69 / 30} duration={1.05} />
      <Cue text="World Wars" at={220 / 30} duration={1.2} />
      <Cue text="1914–1918" at={308 / 30} duration={3.6} />
      <Cue text="United Kingdom" at={503 / 30} duration={2} />
      <Cue text="London" at={768 / 30} duration={2.8} color={C.gold} />
    </Stage>
  );
};
