import { useGsapTimeline } from "@remotion/gsap";
import { along, greatCircle, length, lineString } from "@turf/turf";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { Img, Sequence, staticFile } from "remotion";
import atlas from "../../data/geography/atlas.json";
import { C, Cue, full, MediaShot, Passage, Stage } from "./Shared";
import {
  CapitalShip,
  EscortPlan,
  FleetCarrier,
  MerchantPlan,
  SubmarineProfile,
} from "./WarVectors";

const START = 2180 / 30;
const local = (seconds: number) => seconds - START;
type Point = [number, number];
const projection = geoNaturalEarth1().fitExtent(
  [
    [38, 80],
    [1162, 710],
  ],
  { type: "Sphere" },
);
projection.clipExtent([
  [20, 12],
  [1180, 748],
]);
const path = geoPath(projection).digits(2);
const projected = (point: Point) => projection(point) as Point;
const uk = atlas.views.reach.countries.find(
  (country) => country.code === "GBR",
)!;

// Geographic sea corridors illustrate commitments, not specific convoy tracks or wartime frontiers.
const seaRoute = (points: Point[]) => {
  const coordinates = points.slice(1).flatMap((point, index) => {
    const arc = greatCircle(points[index], point, { npoints: 24 }).geometry
      .coordinates as Point[];
    return index === 0 ? arc : arc.slice(1);
  });
  const geo = lineString(coordinates);
  const distance = length(geo);
  return {
    d: path(geo)!,
    samples: Array.from({ length: 37 }, (_, i) =>
      projected(along(geo, (distance * i) / 36).geometry.coordinates as Point),
    ),
  };
};
const routes = {
  atlantic: seaRoute([
    [-63.575, 44.65],
    [-47, 48],
    [-26, 53],
    [-12, 55],
    [-6.5, 56],
    [-3.1, 53.4],
  ]),
  mediterranean: seaRoute([
    [-5.61, 36.0],
    [0, 36.5],
    [11, 36.4],
    [14.5, 35.9],
    [23, 33.4],
    [29.92, 31.2],
  ]),
  northsea: seaRoute([
    [-1.1, 50.7],
    [0.8, 50.4],
    [2.1, 52],
    [2.4, 54],
    [4.3, 56.3],
    [6.9, 56.4],
  ]),
  east: seaRoute([
    [79.86, 6.92],
    [89, 4],
    [97, 5.5],
    [99.5, 4],
    [101.5, 2.2],
    [103.7, 1.15],
  ]),
  commitment: seaRoute([
    [-3.1, 53.4],
    [-6.8, 51.5],
    [-10.5, 45],
    [-10, 38],
    [-5.61, 36],
    [1, 36],
    [11, 36],
    [23, 33.4],
    [31.9, 31.3],
    [32.55, 29.7],
    [37, 22],
    [43.3, 12.6],
    [52, 11],
    [65, 8],
    [79.86, 6.92],
    [89, 4],
    [97, 5.5],
    [103.7, 1.15],
  ]),
};
type RouteName = keyof typeof routes;
const camera = (point: Point, scale: number) => {
  const [x, y] = projected(point);
  return { x: 960 - x * 1.6 * scale, y: 620 - y * 1.6 * scale, scale };
};
const markers = [
  { id: "britain", point: [-3.1, 53.4] as Point, color: C.gold },
  { id: "halifax", point: [-63.575, 44.65] as Point, color: C.gold },
  { id: "italy", point: [17.23, 40.45] as Point, color: C.red },
  { id: "germany", point: [8.15, 53.52] as Point, color: C.red },
  { id: "japan", point: [132.56, 34.24] as Point, color: C.red },
  { id: "singapore", point: [103.82, 1.35] as Point, color: C.gold },
];

const OperationMap = () => (
  <div
    data-war="map-camera"
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: 1920,
      height: 1216,
      transformOrigin: "0 0",
      // The cached atlas clips at ~1.7%; soften the following 5% on both axes.
      maskImage:
        "linear-gradient(to right, transparent 2%, #000 7%, #000 93%, transparent 98%), linear-gradient(to bottom, transparent 2%, #000 7%, #000 93%, transparent 98%)",
      maskComposite: "intersect",
      WebkitMaskImage:
        "linear-gradient(to right, transparent 2%, #000 7%, #000 93%, transparent 98%), linear-gradient(to bottom, transparent 2%, #000 7%, #000 93%, transparent 98%)",
      WebkitMaskComposite: "source-in",
    }}
  >
    <Img
      src={staticFile("maps/part1/war-world.svg")}
      style={{ ...full, width: "100%", height: "100%" }}
    />
    <svg
      viewBox="0 0 1200 760"
      style={{ ...full, width: "100%", height: "100%", overflow: "visible" }}
    >
      <path
        d={uk.d}
        fill="#D4A94A"
        fillOpacity=".75"
        stroke={C.gold}
        strokeWidth=".8"
      />
      {(Object.entries(routes) as [RouteName, typeof routes.atlantic][]).map(
        ([id, route]) => (
          <g key={id}>
            <path
              data-war={`route-${id}`}
              d={route.d}
              fill="none"
              stroke={id === "commitment" ? C.red : C.gold}
              strokeWidth={id === "commitment" ? 1.25 : 1.1}
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              opacity={id === "commitment" ? 0.7 : 0.92}
            />
          </g>
        ),
      )}
      {markers.map((marker) => {
        const p = projected(marker.point);
        return (
          <g
            key={marker.id}
            data-war={`pin-${marker.id}`}
            transform={`translate(${p[0]} ${p[1]})`}
            opacity="0"
          >
            <circle r="2.4" fill={marker.color} />
            <circle
              data-war={`ring-${marker.id}`}
              r="5"
              fill="none"
              stroke={marker.color}
              strokeWidth=".65"
              opacity=".7"
            />
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <g data-war={`convoy-${i}`} key={i} opacity="0">
          <g transform="scale(.11)">
            <MerchantPlan small />
          </g>
        </g>
      ))}
      {(["mediterranean", "northsea", "east"] as const).map((id) => (
        <g data-war={`vessel-${id}`} key={id} opacity="0">
          <g transform="scale(.035)">
            <EscortPlan />
          </g>
        </g>
      ))}
      <g data-war="commitment-pulse" opacity="0">
        <circle r="3.5" fill={C.red} />
        <circle r="6" fill="none" stroke={C.red} strokeWidth=".7" />
      </g>
    </svg>
  </div>
);

type ArchiveMedia = { src: string; credit: string; photo?: boolean };

/** Global 2180–3608, with 24 frames reserved for the outgoing overlap. */
export const WorldWarChapter = ({
  convoyMedia = {
    src: "video/part1/atlantic-convoy.mp4",
    credit: "NARA / OSS  ·  1941–42",
  },
}: {
  convoyMedia?: ArchiveMedia;
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (name: string) => selector(`[data-war="${name}"]`);
      const reveal = (name: string, at: number, duration = 0.5) =>
        timeline.to(q(name), { opacity: 1, duration, ease: "power3.out" }, at);
      const hide = (name: string, at: number, duration = 0.3) =>
        timeline.to(q(name), { opacity: 0, duration, ease: "power2.in" }, at);
      const draw = (name: RouteName, at: number, duration: number) =>
        timeline.to(
          q(`route-${name}`),
          { strokeDashoffset: 0, duration, ease: "power2.inOut" },
          at,
        );
      const sail = (
        name: string,
        route: RouteName,
        at: number,
        duration: number,
      ) => {
        const samples = routes[route].samples;
        const transform = (i: number) => {
          const p = samples[i],
            a = samples[Math.max(0, i - 1)],
            b = samples[Math.min(samples.length - 1, i + 1)];
          const angle =
            (Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180) / Math.PI;
          return `translate(${p[0]} ${p[1]}) rotate(${angle})`;
        };
        timeline.set(q(name), { attr: { transform: transform(0) } }, 0);
        reveal(name, at, 0.2);
        samples.slice(1).forEach((_, i) =>
          timeline.to(
            q(name),
            {
              attr: { transform: transform(i + 1) },
              duration: duration / 36,
              ease: "none",
            },
            at + (i * duration) / 36,
          ),
        );
      };

      timeline.set(
        [
          q("capital-count"),
          q("carrier-count"),
          q("type-study"),
          q("map"),
          q("convoy-study"),
          q("archive"),
        ],
        { opacity: 0 },
        0,
      );
      timeline.set([q("count-15"), q("count-7")], { textContent: 0 }, 0);
      timeline.set(selector("[data-war-cell]"), { opacity: 0, y: 24 }, 0);
      timeline.set(q("carrier-count"), { y: 38 }, 0);
      timeline.set(q("type-submarine"), { opacity: 0, y: 65 }, 0);
      timeline.set(q("type-escort"), { opacity: 0 }, 0);
      timeline.set(q("map-camera"), camera([-27, 37], 1.12), 0);

      // A close inspection becomes a measured fleet, rather than a succession of icon cards.
      timeline.fromTo(
        q("capital-close"),
        { x: 115, y: 45, scale: 1.23, opacity: 0 },
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
        q("capital-close"),
        { x: -42, scale: 1.065, duration: 6.8, ease: "none" },
        0.85,
      );
      timeline.fromTo(
        selector('[data-war="capital-close"] [data-war-ink]'),
        { strokeDasharray: 100, strokeDashoffset: 100, fillOpacity: 0 },
        {
          strokeDashoffset: 0,
          fillOpacity: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        0.05,
      );
      timeline.fromTo(
        selector('[data-war="capital-close"] [data-war-guns]'),
        { y: 3 },
        { y: 0, duration: 0.55, ease: "power3.out" },
        1.15,
      );
      timeline.to(
        selector('[data-war="capital-close"] [data-war-wake]'),
        { x: -28, duration: 7.8, ease: "none" },
        0,
      );
      timeline.to(
        q("capital-close"),
        {
          x: -334,
          y: -150,
          scale: 0.36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        local(80.9),
      );
      reveal("capital-count", local(81.6));
      timeline.to(
        selector('[data-war="capital-count"] [data-war-cell]'),
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.035,
          ease: "power3.out",
        },
        local(81.72),
      );
      timeline.to(
        q("count-15"),
        {
          textContent: 15,
          snap: { textContent: 1 },
          duration: 0.56,
          ease: "power3.out",
        },
        local(81.88),
      );
      timeline.fromTo(
        q("capital-field"),
        { x: 0, scale: 1 },
        { x: 15, scale: 1.025, duration: 2.2, ease: "none" },
        local(81.55),
      );
      timeline.to(
        q("capital-count"),
        { x: -150, opacity: 0, duration: 0.42, ease: "power2.in" },
        local(83.42),
      );

      timeline.to(
        q("carrier-count"),
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        local(83.61),
      );
      timeline.to(
        selector('[data-war="carrier-count"] [data-war-cell]'),
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.045,
          ease: "power3.out",
        },
        local(83.64),
      );
      timeline.to(
        q("count-7"),
        {
          textContent: 7,
          snap: { textContent: 1 },
          duration: 0.55,
          ease: "power3.out",
        },
        local(83.76),
      );
      timeline.to(
        q("carrier-field"),
        { x: 27, y: -6, scale: 1.04, duration: 2.5, ease: "none" },
        local(83.61),
      );
      timeline.to(
        selector('[data-war="carrier-count"] [data-war-plane]'),
        { x: 7, duration: 2.3, ease: "none" },
        local(83.7),
      );
      timeline.to(
        q("carrier-count"),
        { x: 150, y: -38, opacity: 0, duration: 0.4, ease: "power2.in" },
        local(85.75),
      );

      reveal("type-study", local(85.96), 0.5);
      timeline.fromTo(
        q("type-capital"),
        { x: -130, scale: 0.92 },
        { x: 0, scale: 1.02, duration: 1.7, ease: "power3.out" },
        local(85.96),
      );
      hide("type-capital", local(87.7), 0.32);
      reveal("type-escort", local(87.82), 0.36);
      timeline.fromTo(
        q("type-escort"),
        { x: -30, rotation: 93, scale: 0.8 },
        { x: 40, rotation: 90, scale: 0.9, duration: 1.2, ease: "power3.out" },
        local(87.82),
      );
      hide("type-escort", local(88.65), 0.28);
      timeline.to(
        q("type-submarine"),
        { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" },
        local(88.7),
      );
      timeline.to(
        q("type-submarine"),
        { x: 32, y: -6, duration: 2.3, ease: "none" },
        local(89.2),
      );
      timeline.to(
        q("type-study"),
        { y: 100, opacity: 0, duration: 0.6, ease: "power2.in" },
        local(91.9),
      );

      // Physical convoy formation provides the visual match into geographic routes.
      reveal("convoy-study", local(91.86), 0.7);
      timeline.fromTo(
        q("convoy-study"),
        { x: -70, y: 115, scale: 1.18 },
        { x: 0, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
        local(91.86),
      );
      timeline.to(
        q("merchant-column"),
        { y: -72, duration: 3.5, ease: "none" },
        local(92),
      );
      timeline.to(
        q("escort-column"),
        { x: 22, y: -42, duration: 3.5, ease: "none" },
        local(92),
      );
      timeline.to(
        q("convoy-study"),
        {
          x: -480,
          y: -270,
          scale: 0.07,
          opacity: 0,
          duration: 1.4,
          ease: "power3.inOut",
        },
        local(94.5),
      );
      reveal("map", local(94.2), 1.2);
      timeline.to(
        q("map-camera"),
        { ...camera([-28, 47], 2.48), duration: 2.1, ease: "power3.inOut" },
        local(94.45),
      );
      reveal("pin-britain", local(95.55));
      reveal("pin-halifax", local(96.63));
      draw("atlantic", local(96.63), 1.65);
      [0, 1, 2].forEach((i) =>
        sail(`convoy-${i}`, "atlantic", local(97.9) + i * 0.65, 4.65),
      );
      timeline.to(
        q("map-camera"),
        { ...camera([-24, 48], 2.61), duration: 3.2, ease: "none" },
        local(98.1),
      );
      reveal("archive", 26.2, 0.45);
      hide("archive", 29.76, 0.34);

      // One persistent globe-free map; camera movement follows the narration eastward.
      timeline.to(
        q("map-camera"),
        { ...camera([14, 37], 5.45), duration: 1.2, ease: "power3.inOut" },
        local(102.5),
      );
      draw("mediterranean", local(103.22), 1.2);
      reveal("pin-italy", local(104.46), 0.38);
      sail("vessel-mediterranean", "mediterranean", local(103.24), 2.65);
      timeline.to(
        q("map-camera"),
        { ...camera([2.5, 54], 4.5), duration: 0.92, ease: "power3.inOut" },
        local(105.6),
      );
      draw("northsea", local(105.88), 1.15);
      reveal("pin-germany", local(107.13), 0.36);
      sail("vessel-northsea", "northsea", local(106.02), 2.35);
      timeline.to(
        q("map-camera"),
        { ...camera([123, 25], 3.12), duration: 1.35, ease: "power3.inOut" },
        local(108.26),
      );
      reveal("pin-japan", local(108.45), 0.38);
      timeline.to(
        q("map-camera"),
        { ...camera([112, 16], 3.32), duration: 3.3, ease: "sine.inOut" },
        local(109.65),
      );
      draw("east", local(110.36), 1.75);
      reveal("pin-singapore", local(111.84), 0.38);
      sail("vessel-east", "east", local(110.95), 3.3);

      // The widening field reveals why dispersed responsibilities create strain.
      timeline.to(
        q("map-camera"),
        { ...camera([30, 27], 1.35), duration: 2.15, ease: "power3.inOut" },
        local(113.38),
      );
      draw("commitment", local(115.94), 1.65);
      sail("commitment-pulse", "commitment", local(116.18), 2.45);
      timeline.to(
        [
          q("ring-britain"),
          q("ring-singapore"),
          q("ring-italy"),
          q("ring-germany"),
          q("ring-japan"),
        ],
        { attr: { r: 8 }, opacity: 0.2, duration: 1.4, ease: "sine.inOut" },
        local(116),
      );
      timeline.to(
        q("map-camera"),
        { ...camera([39, 23], 1.39), duration: 1.45, ease: "none" },
        local(115.65),
      );
      timeline.to(
        q("map-camera"),
        { ...camera([110, 12], 3.4), duration: 1.3, ease: "power3.inOut" },
        local(118.95),
      );
      timeline.to(
        q("map-camera"),
        { ...camera([108, 10], 3.5), duration: 0.95, ease: "sine.out" },
        local(120.25),
      );
    },
    { dependencies: [] },
  );

  return (
    <div ref={scope} style={full}>
      <Stage>
        <Passage kind="rise">
          <div
            data-war="capital-close"
            style={{
              position: "absolute",
              left: 180,
              top: 305,
              width: 1560,
              height: 500,
              transformOrigin: "50% 60%",
            }}
          >
            <svg
              viewBox="0 0 640 210"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <CapitalShip />
            </svg>
          </div>
          <div data-war="capital-count" style={full}>
            <div
              data-war="count-15"
              style={{
                position: "absolute",
                left: 154,
                top: 100,
                fontSize: 156,
                fontWeight: 780,
                color: C.gold,
                letterSpacing: -7,
              }}
            >
              0
            </div>
            <svg
              data-war="capital-field"
              viewBox="0 0 1920 1080"
              style={{
                ...full,
                width: "100%",
                height: "100%",
                transformOrigin: "50% 55%",
              }}
            >
              {Array.from({ length: 15 }, (_, i) => (
                <g data-war-cell key={i}>
                  <g
                    transform={`translate(${280 + (i % 5) * 280} ${376 + Math.floor(i / 5) * 172}) scale(.4)`}
                  >
                    <CapitalShip detail={false} />
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div data-war="carrier-count" style={full}>
            <div
              data-war="count-7"
              style={{
                position: "absolute",
                left: 154,
                top: 100,
                fontSize: 156,
                fontWeight: 780,
                color: C.gold,
                letterSpacing: -7,
              }}
            >
              0
            </div>
            <svg
              data-war="carrier-field"
              viewBox="0 0 1920 1080"
              style={{
                ...full,
                width: "100%",
                height: "100%",
                transformOrigin: "50% 55%",
              }}
            >
              {Array.from({ length: 7 }, (_, i) => {
                const row = i < 4 ? 0 : 1,
                  column = row ? i - 4 : i;
                return (
                  <g data-war-cell key={i}>
                    <g
                      transform={`translate(${285 + column * 350 + (row ? 175 : 0)} ${445 + row * 235}) scale(.5)`}
                    >
                      <FleetCarrier />
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
          <div data-war="type-study" style={full}>
            <svg
              viewBox="0 0 1920 1080"
              style={{ ...full, width: "100%", height: "100%" }}
            >
              <g data-war="type-capital">
                <g transform="translate(205 390) scale(2.4)">
                  <CapitalShip />
                </g>
              </g>
              <g
                data-war="type-escort"
                style={{ transformOrigin: "960px 610px" }}
              >
                <g transform="translate(960 610) scale(2.45)">
                  <EscortPlan />
                </g>
              </g>
              <g data-war="type-submarine">
                <g transform="translate(205 355) scale(2.4)">
                  <SubmarineProfile />
                </g>
              </g>
            </svg>
          </div>
          <div
            data-war="convoy-study"
            style={{ ...full, transformOrigin: "50% 60%" }}
          >
            <svg
              viewBox="0 0 1920 1080"
              style={{ ...full, width: "100%", height: "100%" }}
            >
              <g data-war="merchant-column">
                {Array.from({ length: 6 }, (_, i) => (
                  <g
                    key={i}
                    transform={`translate(${765 + (i % 2) * 360} ${397 + Math.floor(i / 2) * 226}) scale(2.18)`}
                  >
                    <MerchantPlan />
                  </g>
                ))}
              </g>
              <g data-war="escort-column">
                <g transform="translate(465 596) scale(1.18)">
                  <EscortPlan />
                </g>
                <g transform="translate(1480 570) scale(1.18)">
                  <EscortPlan />
                </g>
              </g>
            </svg>
          </div>
          <div data-war="map" style={full}>
            <OperationMap />
          </div>
          <div data-war="archive" style={full}>
            <Sequence from={786} durationInFrames={117} layout="none">
              <Passage kind="focus">
                <div style={{ ...full, background: C.navy }}>
                  <MediaShot
                    {...convoyMedia}
                    seconds={3.9}
                    fromScale={1.03}
                    toScale={1.08}
                    pan={42}
                    style={{ left: 480, top: 245, width: 960, height: 720 }}
                  />
                </div>
              </Passage>
            </Sequence>
          </div>
          <Cue text="World War II" at={local(72.94)} duration={3.2} />
          <Cue text="1939" at={local(77.1)} duration={4.2} />
          <Cue text="Atlantic" at={local(96.8)} duration={2.45} />
          <Cue
            text="Mediterranean"
            at={local(103.38)}
            duration={1.24}
            size={73}
          />
          <Cue text="Italy" at={local(104.62)} duration={1.05} />
          <Cue text="Europe" at={local(106.02)} duration={1.15} />
          <Cue text="Germany" at={local(107.28)} duration={1.12} />
          <Cue text="Japan" at={local(108.6)} duration={3.0} />
          <Cue text="Far East" at={local(112.64)} duration={2.35} />
        </Passage>
      </Stage>
    </div>
  );
};
