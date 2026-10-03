import { useGsapTimeline } from "@remotion/gsap";
import { Img, Sequence, staticFile } from "remotion";
import geography from "../../data/part2/geography.json";
import { cueAt, iconAt, textAt } from "./Timing";
import { C, Cue, full, MediaShot, Stage } from "./Shared";

const ORIGIN = 5461;
const timing = {
  north: textAt("atlantic-north-atlantic", ORIGIN),
  northImage: iconAt("atlantic-north-atlantic", ORIGIN),
  threat: iconAt("atlantic-russian-submarines", ORIGIN),
  surveillance: iconAt("atlantic-surveillance", ORIGIN),
  cables: cueAt("atlantic-cable-infrastructure", ORIGIN),
  cableImage: iconAt("atlantic-cable-infrastructure", ORIGIN),
  cableText: textAt("atlantic-cable-infrastructure", ORIGIN),
};
const atlas = geography.views["north-atlantic"];

/** Geographic links are explanatory great-circle connections, never cable/patrol tracks. */
export const AtlanticChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    timeline.set(
      selector("[data-atlas],[data-seabed],[data-cable]"),
      { opacity: 0 },
      0,
    );
    timeline.set(
      selector("[data-geo-link],[data-bottom-cable]"),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      0,
    );
    timeline.set(selector("[data-undersea-boat]"), { opacity: 0 }, 0);
    timeline.set(selector("[data-cable-signal]"), { strokeDashoffset: 80 }, 0);
    timeline.to(
      selector("[data-photo]"),
      { opacity: 0, duration: 0.65, ease: "power2.inOut" },
      timing.northImage,
    );
    timeline.fromTo(
      selector("[data-atlas]"),
      { opacity: 0, clipPath: "inset(5% 0% 75% 0%)" },
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: "power3.out",
      },
      timing.northImage,
    );
    timeline.fromTo(
      selector("[data-map-camera]"),
      { scale: 1.48, x: -50, y: -142 },
      { scale: 1.66, x: -108, y: -124, duration: 3.6, ease: "power2.inOut" },
      timing.northImage,
    );
    timeline.to(
      selector("[data-geo-link]"),
      { strokeDashoffset: 0, stagger: 0.25, duration: 0.8, ease: "power3.out" },
      timing.northImage + 0.25,
    );
    timeline.fromTo(
      selector("[data-place-halo]"),
      { scale: 0.7, opacity: 0.3 },
      {
        scale: 1.7,
        opacity: 0,
        duration: 2.5,
        stagger: 0.18,
        repeat: 1,
        ease: "power1.out",
        transformOrigin: "center",
      },
      timing.northImage + 0.3,
    );
    timeline.to(
      selector("[data-map-camera]"),
      { scale: 1.9, y: -240, x: -170, duration: 1.25, ease: "power3.inOut" },
      7.55,
    );
    timeline.to(selector("[data-atlas]"), { opacity: 0, duration: 0.65 }, 8.0);
    timeline.fromTo(
      selector("[data-seabed]"),
      { opacity: 0, y: 220 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      7.7,
    );
    timeline.fromTo(
      selector("[data-depth-camera]"),
      { scale: 1, x: 0, y: 0 },
      { scale: 1.065, x: -38, y: -14, duration: 7.8, ease: "none" },
      7.7,
    );
    timeline.to(
      selector("[data-undersea-boat]"),
      { opacity: 0.86, duration: 0.5, ease: "power3.out" },
      timing.threat,
    );
    timeline.fromTo(
      selector("[data-undersea-boat]"),
      { x: 68, y: -5 },
      { x: -65, y: 8, duration: 3.2, ease: "none", immediateRender: false },
      timing.threat,
    );
    timeline.to(
      selector("[data-undersea-boat]"),
      { opacity: 0, duration: 0.45 },
      timing.cableText - 0.25,
    );
    timeline.to(
      selector("[data-bottom-cable]"),
      { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" },
      timing.surveillance,
    );
    timeline.fromTo(
      selector("[data-cable]"),
      { opacity: 0, x: 85, scale: 0.86 },
      { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      timing.cableImage,
    );
    timeline.to(
      selector("[data-cable]"),
      { x: -22, scale: 1.035, duration: 3.65, ease: "none" },
      timing.cables + 0.38,
    );
    timeline.to(
      selector("[data-seabed-detail]"),
      { opacity: 0.24, y: 45, duration: 0.7 },
      timing.cableImage,
    );
    timeline.to(
      selector("[data-cable-signal]"),
      { strokeDashoffset: -140, duration: 3.7, ease: "none" },
      timing.cables,
    );
  });

  return (
    <Stage ref={scope}>
      <div data-photo style={full}>
        <Sequence durationInFrames={147} name="Proteus · Cammell Laird · 2025">
          <MediaShot
            src="images/part2/proteus-2025.jpg"
            photo
            seconds={4.9}
            credit="Steve Knight · CC BY 4.0 · RFA Proteus · 2025"
            position="50% 58%"
            fromScale={1.015}
            toScale={1.055}
            pan={20}
          />
        </Sequence>
      </div>
      <div data-atlas style={{ ...full, overflow: "hidden" }}>
        <div
          data-map-camera
          style={{
            position: "absolute",
            left: 154,
            top: 240,
            width: 1600,
            height: 800,
            transformOrigin: "765px 555px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 88%, transparent 100%)",
          }}
        >
          <Img
            src={staticFile("maps/part2/north-atlantic.svg")}
            style={{ ...full, width: 1600, height: 800 }}
          />
          <svg
            viewBox="0 0 1600 800"
            style={{ ...full, width: 1600, height: 800 }}
          >
            <path d={atlas.uk} fill={C.gold} fillOpacity={0.75} />
            {atlas.routes
              .filter((r) => ["Canada", "Iceland", "Norway"].includes(r.id))
              .map((route) => (
                <path
                  key={route.id}
                  data-geo-link
                  pathLength="1"
                  d={route.d}
                  stroke={C.gold}
                  strokeWidth="2.1"
                  fill="none"
                  opacity={0.8}
                />
              ))}
            {(["UK", "Canada", "Iceland", "Norway"] as const).map((name) => (
              <g
                key={name}
                transform={`translate(${atlas.points[name].join(" ")})`}
              >
                <circle
                  data-place-halo
                  r="12"
                  stroke={C.gold}
                  strokeWidth="1.1"
                  fill="none"
                />
                <circle r="4.3" fill={name === "UK" ? C.gold : C.white} />
              </g>
            ))}
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 154,
            bottom: 86,
            fontSize: 19,
            color: C.line,
          }}
        >
          Natural Earth · Geographic connections
        </div>
      </div>
      <div data-seabed style={full}>
        <div data-depth-camera style={{ ...full, transformOrigin: "50% 64%" }}>
          <svg viewBox="0 0 1920 1080" style={full}>
            <defs>
              <linearGradient id="p2-atlantic-water" x2="0" y2="1">
                <stop stopColor="#285573" stopOpacity=".4" />
                <stop offset="1" stopColor={C.navy} />
              </linearGradient>
            </defs>
            <g data-seabed-detail>
              <path
                d="M0 360 Q320 345 640 360 T1280 360 T1920 360 V1080 H0Z"
                fill="url(#p2-atlantic-water)"
              />
              <path
                d="M0 360 Q320 345 640 360 T1280 360 T1920 360"
                stroke={C.line}
                strokeOpacity=".6"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M0 783 C250 810 405 869 665 853 S1010 775 1230 815 S1610 922 1920 862 V1080 H0Z"
                fill="#243A4A"
              />
              <path
                d="M0 783 C250 810 405 869 665 853 S1010 775 1230 815 S1610 922 1920 862"
                fill="none"
                stroke={C.line}
                strokeOpacity=".6"
                strokeWidth="2"
              />
              <path
                data-bottom-cable
                pathLength="1"
                d="M130 797 C360 860 482 878 674 866 S1026 790 1230 828 S1520 901 1780 895"
                stroke={C.gold}
                strokeWidth="6"
                fill="none"
              />
            </g>
            <g
              data-undersea-boat
              stroke={C.line}
              strokeWidth="2.6"
              strokeLinejoin="round"
              fill="#132D42"
            >
              <path d="M846 580 Q866 558 935 558 H1205 Q1255 561 1280 580 Q1252 605 1205 605 H930 Q867 604 846 580Z" />
              <path d="M981 558 V532 Q1000 519 1021 532 V558 M1001 529 V508 M1214 558 L1242 543 M1214 605 L1241 622 M1277 580 H1302" />
              <path d="M900 578 H1218" strokeOpacity=".35" />
            </g>
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 154,
            bottom: 86,
            fontSize: 19,
            color: C.line,
          }}
        >
          Schematic · No operational positions
        </div>
      </div>
      <div
        data-cable
        style={{
          position: "absolute",
          left: 314,
          top: 363,
          width: 1292,
          height: 618,
          transformOrigin: "67% 54%",
        }}
      >
        <Img
          src={staticFile("images/part2/generated/subsea-cable.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <svg viewBox="0 0 1292 618" style={full}>
          <path
            data-cable-signal
            d="M1005 400 L1210 452"
            stroke={C.gold}
            strokeWidth="3"
            strokeDasharray="3 28"
            fill="none"
            opacity=".7"
          />
        </svg>
      </div>
      <Cue text="RFA Proteus" at={0.3} duration={2.9} />
      <Cue text="North Atlantic" at={timing.north} duration={4.25} />
      <Cue text="Undersea cables" at={timing.cableText} duration={3.05} />
    </Stage>
  );
};
