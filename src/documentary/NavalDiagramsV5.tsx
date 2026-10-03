import type { CSSProperties } from "react";

export const diagramPalette = {
  navy: "#0B1A2E",
  steel: "#3A6EA5",
  paper: "#F4F7FA",
  gold: "#D4A94A",
  line: "#8FA9C0",
};

/** Editorial silhouettes: recognizable naval structures, never dimensioned plans. */
export const NavalProfile = ({
  kind = "escort",
  tone = "#3A6EA5",
}: {
  kind?: "carrier" | "escort" | "supply";
  tone?: string;
}) => (
  <g
    stroke="#C4D5E3"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      data-vessel-outline
      d="M25 151 L55 136 L564 136 L578 151 L552 180 L98 180 L56 172 Z"
      fill={tone}
    />
    <path d="M56 157 L564 157 M95 180 L552 180" fill="none" stroke="#87A9C6" />
    {kind === "carrier" ? (
      <>
        <path
          d="M31 132 L79 112 Q89 109 109 112 L576 124 L578 138 L25 138 Z"
          fill="#6D8FA9"
        />
        <path
          d="M190 124 L190 89 L208 77 L249 77 L267 91 L267 124 M368 124 L368 82 L385 72 L428 72 L444 87 L444 124"
          fill="#31566F"
        />
        <path
          d="M196 83 L258 83 L267 94 L191 94 Z M374 79 L435 79 L444 90 L368 90 Z"
          fill="#A4BED0"
        />
        <path
          d="M215 77 L215 36 L225 36 L225 77 M397 72 L397 22 L407 22 L407 72"
          fill="#567A96"
        />
        <path
          d="M220 36 L203 52 L235 52 M402 24 L385 45 L419 45 M205 112 L253 112 M382 111 L430 111"
          fill="none"
        />
        <path
          d="M99 120 L178 121 M283 123 L353 124 M461 127 L550 128"
          stroke="#E1E8ED"
          strokeDasharray="18 10"
        />
      </>
    ) : kind === "supply" ? (
      <>
        <path
          d="M112 135 L112 72 L138 61 L185 65 L196 85 L196 135 M200 112 L477 112 L477 136"
          fill="#486E8B"
        />
        <path d="M107 77 L192 77 L197 91 L107 91 Z" fill="#B9CCDA" />
        <path
          d="M151 61 L151 33 M137 49 L166 49 M255 112 L255 54 L323 89 M407 111 L407 51 L476 88"
          fill="none"
        />
        <path
          d="M247 109 L263 109 M400 109 L415 109 M302 110 L302 88 M455 109 L455 88"
          fill="none"
        />
        <path
          d="M219 115 L241 115 L241 133 L219 133 Z M279 115 L301 115 L301 133 L279 133 Z M339 115 L361 115 L361 133 L339 133 Z M435 115 L457 115 L457 133 L435 133 Z"
          fill="#90AFC5"
        />
      </>
    ) : (
      <>
        <path
          d="M151 136 L166 101 L212 101 L223 77 L304 77 L319 111 L391 111 L414 134"
          fill="#4D7696"
        />
        <path
          d="M221 76 L227 60 L284 60 L305 77 L306 90 L221 90 Z"
          fill="#A7C0D2"
        />
        <path d="M249 60 L256 26 L269 26 L278 60 Z" fill="#365D7D" />
        <path
          d="M260 26 L260 10 M242 28 L281 28 M330 110 L330 63 L343 63 L343 110 M324 68 L350 68"
          fill="none"
        />
        <path
          d="M91 135 L95 117 L111 109 L130 116 L135 135 M111 114 L73 101 M432 136 L439 120 L512 120 L532 136"
          fill="#668DAA"
        />
        <path
          d="M221 82 L297 82 M445 128 L513 128 M173 116 L201 116"
          fill="none"
          stroke="#0B1A2E"
        />
      </>
    )}
    {[114, 151, 188, 225, 262, 299, 336, 373, 410, 447, 484, 521].map((x) => (
      <path key={x} d={`M${x} 162 v5`} stroke="#193C59" />
    ))}
  </g>
);

export const VesselProfile = ({
  kind,
  style,
  tone,
}: {
  kind?: "carrier" | "escort" | "supply";
  style?: CSSProperties;
  tone?: string;
}) => (
  <svg
    viewBox="0 0 600 200"
    style={{ width: "100%", overflow: "visible", ...style }}
  >
    <NavalProfile kind={kind} tone={tone} />
  </svg>
);

/** Top view establishes the physical geometry of replenishment alongside. */
export const VesselPlan = ({
  kind = "carrier",
  tone = "#3A6EA5",
}: {
  kind?: "carrier" | "supply" | "escort";
  tone?: string;
}) => (
  <g
    stroke="#B6CDDE"
    strokeWidth="2"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <path
      data-vessel-outline
      d="M100 16 Q158 63 166 134 L166 476 Q157 518 100 533 Q43 518 34 476 L34 134 Q42 63 100 16 Z"
      fill={tone}
    />
    <path
      d="M100 34 Q146 82 150 143 L150 471 Q140 504 100 517 Q61 504 50 471 L50 143 Q54 82 100 34 Z"
      fill="#274760"
    />
    {kind === "carrier" ? (
      <>
        <path
          d="M65 129 L79 86 L111 57 L122 107 L122 488 L65 488 Z"
          fill="#536F83"
        />
        <path
          d="M91 96 L91 480 M69 280 L120 280 M69 381 L120 381"
          stroke="#D6E1E8"
          strokeDasharray="10 9"
          fill="none"
        />
        <path
          d="M135 173 L152 173 L152 228 L135 228 Z M135 306 L152 306 L152 362 L135 362 Z"
          fill="#A6BDCF"
        />
        <path d="M143 183 v34 M143 316 v35" stroke="#0B1A2E" />
        <path d="M55 142 L128 142 M55 485 L144 485" fill="none" />
      </>
    ) : kind === "supply" ? (
      <>
        <path d="M61 99 L139 99 L139 181 L61 181 Z" fill="#6589A3" />
        <path d="M69 109 L131 109 L131 122 L69 122 Z" fill="#AFC4D3" />
        {[215, 285, 355, 425].map((y) => (
          <g key={y}>
            <rect x="65" y={y} width="70" height="43" rx="4" fill="#506E83" />
            <path d={`M100 ${y - 13} v69 M82 ${y + 21} h36`} fill="none" />
          </g>
        ))}
      </>
    ) : (
      <>
        <path
          d="M81 106 L119 106 L119 139 L81 139 Z M67 184 L133 184 L133 333 L67 333 Z"
          fill="#678BA7"
        />
        <path d="M100 77 v55 M73 238 h54 M100 210 v67" fill="none" />
        <rect x="63" y="383" width="74" height="105" fill="#325B78" />
        <circle cx="100" cy="435" r="24" fill="none" stroke="#8CAAC0" />
      </>
    )}
  </g>
);

/** Small counting mark, deliberately without invented technical detailing. */
export const AircraftUnit = () => (
  <g stroke="#F4F7FA" strokeWidth="1.8" strokeLinejoin="round">
    <path
      d="M60 8 L68 38 L97 60 L98 74 L71 65 L69 89 L82 98 L79 107 L61 99 L41 107 L38 98 L51 89 L49 65 L22 74 L23 60 L52 38 Z"
      fill="#6D92AD"
    />
    <path d="M60 23 L60 87 M54 41 L66 41" fill="none" stroke="#D7E4ED" />
  </g>
);
