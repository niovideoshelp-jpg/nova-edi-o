import { geoMercator, geoPath } from "d3-geo";
import { rewind } from "@turf/turf";
import type { FeatureCollection } from "geojson";
import world from "../../data/geography/world-50m.json";

const projection = geoMercator()
  .center([0, 15])
  .scale(270)
  .translate([960, 640])
  .clipExtent([
    [0, 0],
    [1920, 1080],
  ]);
export const jutlandPoint = (longitude: number, latitude: number) =>
  projection([longitude, latitude]) as [number, number];
// Real coastlines without modern political borders standing in for 1916.
const geography = rewind(world as unknown as FeatureCollection, {
  reverse: true,
});
const coast = geoPath(projection).digits(2)(geography) ?? "";
export const NorthSeaCoast = () => (
  <path d={coast} fill="#6A8AA1" fillOpacity=".42" />
);

/** British dreadnought silhouette: twin funnels, tripod masts, five centreline
 * turrets. An editorial illustration, not a measured plan or a named vessel. */
export const JutlandDreadnought = () => (
  <g stroke="#ADC0CB" strokeWidth="1.5" strokeLinejoin="round">
    <g data-j="smoke" fill="#7F9AAA" fillOpacity=".15" stroke="none">
      <path d="M446 159 C456 128 509 139 541 111 C581 79 632 106 692 65 C761 16 846 53 929 11 C848 82 786 84 736 104 C646 144 604 123 550 157 C509 180 473 173 446 159Z" />
      <path d="M568 170 C599 125 637 154 680 117 C730 78 790 111 849 76 C897 46 965 78 1001 37 C961 114 899 115 846 137 C767 168 723 151 682 177 C633 207 604 176 568 170Z" />
    </g>
    <path
      data-j-ship-draw
      data-j-ship-fill
      pathLength="100"
      d="M78 263 L128 242 L1096 242 L1124 255 L1094 296 L951 304 L213 304 L105 287Z"
      fill="#536E7D"
    />
    <path
      data-j-ship-draw
      pathLength="100"
      d="M103 278 L1099 278 M145 249 L1080 249 M213 303 L955 303"
      fill="none"
    />
    <path
      data-j-ship-fill
      d="M112 283 L1099 283 L1092 296 L951 304 L213 304Z"
      fill="#263F50"
      stroke="none"
    />
    <path
      data-j-ship-draw
      pathLength="100"
      d="M150 262 L1045 262 M222 253 L222 281 M952 250 L952 284"
      fill="none"
      stroke="#C3D0D7"
      strokeOpacity=".45"
    />
    <g data-j-ship-fill fill="#66808E">
      <path d="M272 242 L272 214 L321 214 L332 190 L382 190 L394 213 L412 213 L412 242Z" />
      <path d="M300 201 L300 179 L370 179 L385 191 L385 204Z" fill="#7E96A2" />
      <path d="M314 178 L326 152 L357 152 L365 178Z" />
      <path d="M443 241 L446 163 L478 163 L486 241Z M568 241 L570 172 L603 172 L610 241Z" />
      <path
        d="M445 163 L445 153 L480 153 L481 163Z M568 172 L568 163 L605 163 L606 172Z"
        fill="#263D4A"
      />
      <path d="M715 242 L728 213 L772 213 L788 241Z M810 242 L820 221 L871 221 L881 242Z" />
    </g>
    <g data-j-ship-group fill="none">
      <path
        d="M312 196 L378 196 M310 188 L371 188 M327 176 L360 176"
        stroke="#132B3D"
        strokeWidth="4"
      />
      <path d="M330 191 L345 90 L359 191 M343 109 L345 61 M323 118 L367 118 M332 93 L358 93 M344 73 L568 161 M345 90 L730 130 M346 90 L137 240" />
      <path d="M721 224 L742 137 L758 225 M741 142 L743 108 M722 157 L766 157 M730 131 L757 131 M741 141 L1036 241" />
      <path
        d="M132 241 L132 230 L267 230 M150 230 L150 242 M173 230 L173 242 M196 230 L196 242 M219 230 L219 242 M1001 242 L1001 230 L1083 230 L1083 242 M1029 230 L1029 242 M1054 230 L1054 242"
        strokeWidth="1"
      />
    </g>
    {[
      { x: 199, y: 237 },
      { x: 265, y: 216 },
      { x: 664, y: 237 },
      { x: 846, y: 220 },
      { x: 967, y: 237 },
    ].map((turret, i) => (
      <g
        key={turret.x}
        transform={"translate(" + turret.x + " " + turret.y + ")"}
      >
        <path
          data-j-ship-fill
          d="M-24 5 L-26 -8 L-13 -20 L22 -20 L33 -7 L29 6Z"
          fill="#829BA8"
        />
        <g data-j={"gun-" + i} transform="rotate(0)">
          <path
            data-j-ship-draw
            pathLength="100"
            d="M-18 -12 L-68 -12 M-18 -5 L-68 -5"
            stroke="#BCD0DC"
            strokeWidth="4"
          />
          <path
            d="M-67 -12 L-72 -12 M-67 -5 L-72 -5"
            stroke="#1B3547"
            strokeWidth="4"
          />
        </g>
      </g>
    ))}
    <g data-j-ship-fill fill="#9EB3BF">
      <path d="M499 206 Q524 223 548 207 L539 219 L509 219Z M621 209 Q639 222 655 209 L649 220 L629 220Z" />
      <path
        d="M505 206 L507 193 L544 193 L544 206 M625 208 L627 197 L653 197 L653 207"
        fill="none"
      />
    </g>
    <g fill="none">
      <path d="M488 236 L559 236 M611 236 L636 236 M692 237 L712 237 M892 237 L931 237 M390 241 L436 241" />
      <path
        d="M147 260 L147 278 L156 286 M143 274 L152 279"
        strokeWidth="2.2"
      />
      {Array.from({ length: 24 }, (_, i) => (
        <circle
          key={i}
          cx={240 + i * 31}
          cy="268"
          r="2.4"
          fill="#193243"
          stroke="none"
        />
      ))}
    </g>
    <g fill="none" stroke="#8BACBE" strokeOpacity=".55" strokeWidth="1.6">
      <path
        data-j="bow-wake"
        d="M30 291 Q92 286 141 306 C430 319 696 319 1180 311"
        strokeDasharray="40 15"
      />
      <path
        data-j="bow-wake"
        d="M15 311 C322 343 723 339 1188 325"
        strokeDasharray="70 24"
      />
    </g>
  </g>
);

/** One token represents one ship only in the two numerical battle fields. */
export const JutlandToken = ({ color = "#B1CBDA" }: { color?: string }) => (
  <path
    d="M0 -16 Q7 -10 8 -4 L8 11 L4 16 L-4 16 L-8 11 L-8 -4 Q-7 -10 0 -16Z"
    fill={color}
  />
);

/** Larger period plan for geographic schematics; no numerical count implied. */
export const DreadnoughtPlan = () => (
  <g stroke="#D6E1E8" strokeWidth=".65" strokeLinejoin="round">
    <path
      d="M0 -24 Q8 -17 9 -7 L9 19 Q7 24 0 26 Q-7 24 -9 19 L-9 -7 Q-8 -17 0 -24Z"
      fill="#6D91A9"
    />
    <path d="M0 -20 L0 20" stroke="#274E69" />
    {[-13, -5, 7, 15].map((y) => (
      <g key={y}>
        <path
          d={
            "M-4 " +
            (y - 2) +
            " L4 " +
            (y - 2) +
            " L4 " +
            (y + 2) +
            " L-4 " +
            (y + 2) +
            "Z"
          }
          fill="#B6C9D5"
        />
        <path d={"M-1 " + (y - 2) + " v-5 M1 " + (y - 2) + " v-5"} />
      </g>
    ))}
    <path d="M-3 -1 L3 -1 L3 4 L-3 4Z" fill="#18364D" />
  </g>
);
