import { bboxPolygon, rewind } from "@turf/turf";
import { geoMercator } from "d3-geo";
import atlas from "../../data/geography/atlas.json";

export type Point = [number, number];
const overlay = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "visible" as const,
  pointerEvents: "none" as const,
};

/** Signals use the frozen Turf geodesics. They denote connections, not sailed tracks. */
export const WorldSignals = ({
  mode,
  prefix,
}: {
  mode: "colonies" | "reach";
  prefix: string;
}) => (
  <svg viewBox="0 0 1200 760" style={overlay}>
    {atlas.views[mode].routes.map((route, i) => (
      <circle
        key={route.name}
        data-h={`${prefix}-${i}`}
        cx={route.from[0]}
        cy={route.from[1]}
        r="3.1"
        fill="#F4F7FA"
        opacity="0"
      />
    ))}
  </svg>
);

const curve = (p0: Point, p1: Point, p2: Point, p3: Point) => ({
  d: `M${p0} C${p1} ${p2} ${p3}`,
  samples: Array.from({ length: 25 }, (_, index): Point => {
    const t = index / 24,
      u = 1 - t;
    return [
      u * u * u * p0[0] +
        3 * u * u * t * p1[0] +
        3 * u * t * t * p2[0] +
        t * t * t * p3[0],
      u * u * u * p0[1] +
        3 * u * u * t * p1[1] +
        3 * u * t * t * p2[1] +
        t * t * t * p3[1],
    ];
  }),
});

// Schematic connections leave the illustration's harbour. These are not a map of Middle-earth.
export const fantasyPassage = curve(
  [650, 652],
  [890, 790],
  [1330, 610],
  [1565, 515],
);
export const fantasyInfluence = [
  curve([650, 652], [695, 900], [180, 1040], [-135, 930]),
  curve([650, 652], [720, 940], [1200, 1060], [1560, 875]),
  curve([650, 652], [820, 860], [1335, 845], [1560, 575]),
];

export const FantasyNavigation = () => (
  <svg viewBox="0 0 1320 880" style={overlay}>
    <g data-h="island-passage" opacity="0">
      <path
        data-h="island-passage-line"
        d={fantasyPassage.d}
        fill="none"
        stroke="#D4A94A"
        strokeWidth="3.5"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset="100"
      />
      <circle
        cx="650"
        cy="652"
        r="9"
        fill="#0B1A2E"
        stroke="#D4A94A"
        strokeWidth="3"
      />
      <circle
        data-h="island-passage-token"
        cx="650"
        cy="652"
        r="5.5"
        fill="#F4F7FA"
        opacity="0"
      />
      <circle
        data-h="island-destination"
        cx="1565"
        cy="515"
        r="10"
        fill="#0B1A2E"
        stroke="#D4A94A"
        strokeWidth="3"
        opacity="0"
      />
    </g>
    <g data-h="influence-net" opacity="0">
      {fantasyInfluence.map((route, i) => (
        <g key={route.d}>
          <path
            data-h={`influence-route-${i}`}
            d={route.d}
            fill="none"
            stroke="#D4A94A"
            strokeWidth="3.2"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <circle
            data-h={`influence-token-${i}`}
            cx="650"
            cy="652"
            r="5"
            fill="#F4F7FA"
            opacity="0"
          />
          <circle
            data-h={`influence-port-${i}`}
            cx={route.samples[24][0]}
            cy={route.samples[24][1]}
            r="8"
            fill="#0B1A2E"
            stroke="#D4A94A"
            strokeWidth="2.5"
            opacity="0"
          />
        </g>
      ))}
      <circle cx="650" cy="652" r="10" fill="#D4A94A" />
    </g>
  </svg>
);

const project = geoMercator().fitExtent(
  [
    [75, 36],
    [1125, 724],
  ],
  rewind(
    bboxPolygon(atlas.views.europe.bounds as [number, number, number, number]),
    { reverse: true },
  ),
);
// Illustrative sea corridors start at Portsmouth and stay offshore. No deployment claim.
const corridors: Point[][] = [
  [
    [-1.108, 50.8],
    [-2.2, 50.25],
    [-4, 49.5],
    [-6, 49],
    [-10, 47],
    [-15, 45],
  ],
  [
    [-1.108, 50.8],
    [0.2, 50.5],
    [1.6, 51.3],
    [2.2, 53],
    [2.5, 55.5],
    [4, 57.7],
  ],
  [
    [-1.108, 50.8],
    [-2.2, 50.25],
    [-4, 49.5],
    [-6.3, 48],
    [-9.8, 44],
    [-11, 39.5],
  ],
];
export const europeSeaRoutes = corridors.map((points) => {
  const projected = points.map((point) => project(point) as Point);
  return {
    d: `M${projected.map((point) => point.join(",")).join(" L")}`,
    samples: projected,
  };
});

/** Tiny chart vessels show a fleet moving along a drawn course, rather than another hero cutout. */
export const EuropeNavigation = () => (
  <svg viewBox="0 0 1200 760" style={overlay}>
    <g data-h="sea-network" opacity="0">
      {europeSeaRoutes.map((route, i) => (
        <g key={i}>
          <path
            data-h={`sea-route-${i}`}
            d={route.d}
            fill="none"
            stroke="#D4A94A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <g data-h={`sea-vessel-${i}`} opacity="0">
            <g transform="scale(0.5)">
              <path
                d="M0 -20 C-5 -16 -7 -7 -7 8 L-5 17 Q0 21 5 17 L7 8 C7 -7 5 -16 0 -20Z"
                fill="#F4F7FA"
                stroke="#B8CAD9"
                strokeWidth="1.25"
              />
              <path d="M-3 -9 H3 V10 H-3Z" fill="#3A6EA5" />
              <path
                d="M-6 -4 H6 M-5 5 H5 M0 -14 V14"
                fill="none"
                stroke="#0B1A2E"
                strokeWidth="1.3"
              />
              <path
                d="M-5 24 Q0 29 5 24 M-7 31 Q0 36 7 31"
                fill="none"
                stroke="#AFCFE1"
                strokeWidth="1.2"
                opacity=".6"
              />
            </g>
          </g>
        </g>
      ))}
      <circle
        cx={europeSeaRoutes[0].samples[0][0]}
        cy={europeSeaRoutes[0].samples[0][1]}
        r="4.5"
        fill="#F4F7FA"
      />
    </g>
  </svg>
);

export const SailNavigation = () => (
  <svg viewBox="0 0 1330 980" style={overlay}>
    <g
      data-h="sail-wind"
      opacity="0"
      fill="none"
      stroke="#ADC7DA"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path
        data-h="wind-0"
        d="M-90 265 C85 235 285 246 406 310"
        pathLength="100"
        strokeDasharray="22 78"
        strokeDashoffset="100"
      />
      <path
        data-h="wind-1"
        d="M-80 360 C100 320 298 355 434 396"
        pathLength="100"
        strokeDasharray="24 76"
        strokeDashoffset="100"
      />
      <path
        data-h="wind-2"
        d="M-35 460 C105 430 285 445 388 486"
        pathLength="100"
        strokeDasharray="18 82"
        strokeDashoffset="100"
      />
    </g>
    <g
      data-h="sail-course"
      opacity="0"
      fill="none"
      stroke="#AFCFE1"
      strokeLinecap="round"
    >
      <path
        data-h="wake-0"
        d="M-320 868 C-155 890 35 894 160 850"
        strokeWidth="3"
        pathLength="100"
        strokeDasharray="52 48"
        strokeDashoffset="100"
      />
      <path
        data-h="wake-1"
        d="M-260 904 C-105 925 48 927 145 878"
        strokeWidth="2"
        pathLength="100"
        strokeDasharray="38 62"
        strokeDashoffset="100"
        opacity=".5"
      />
    </g>
  </svg>
);
