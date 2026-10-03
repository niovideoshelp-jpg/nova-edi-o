import { C } from "./Shared";

/** Period silhouettes are explanatory illustrations, never dimensioned plans. */
export const BattlePlan = ({ small = false }: { small?: boolean }) => (
  <g
    stroke={C.white}
    strokeWidth={small ? 2.2 : 1.7}
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <path
      data-draw
      d="M100 10 C81 48 65 126 63 206 L67 449 Q74 509 100 548 Q126 509 133 449 L137 206 C135 126 119 48 100 10Z"
      fill="#3A6EA5"
    />
    <path
      d="M100 27 C84 65 75 130 74 198 L78 444 Q84 489 100 523 Q116 489 122 444 L126 198 C125 130 116 65 100 27Z"
      fill="#748C9C"
      stroke="#BCCAD4"
    />
    <path
      d="M85 244 V203 L92 183 H108 L115 203 V244Z M84 255 H116 V317 H84Z M84 380 V333 H116 V380Z"
      fill="#23435B"
    />
    <path
      d="M78 218 H122 V233 H78Z M82 255 H118 M90 261 V309 M110 261 V309"
      fill="none"
      stroke="#C4D6E1"
    />
    <rect x="87" y="277" width="26" height="35" rx="7" fill="#132A40" />
    <rect x="87" y="339" width="26" height="31" rx="7" fill="#132A40" />
    {[115, 161, 417].map((y, i) => (
      <g key={y}>
        <path
          d={`M82 ${y} Q100 ${y - 13} 118 ${y} V${y + 22} H82Z`}
          fill="#567890"
        />
        {(i === 1 ? [95, 105] : [88, 96, 104, 112]).map((x) => (
          <path
            key={x}
            d={`M${x} ${i === 2 ? y + 20 : y} v${i === 2 ? 42 : -42}`}
            fill="none"
            strokeWidth="3"
          />
        ))}
      </g>
    ))}
    {[240, 315, 382].map((y) => (
      <g key={y}>
        <rect x="68" y={y} width="14" height="22" rx="3" fill="#496E8B" />
        <rect x="118" y={y} width="14" height="22" rx="3" fill="#496E8B" />
        <path
          d={`M72 ${y + 7} h-16 M72 ${y + 13} h-16 M128 ${y + 7} h16 M128 ${y + 13} h16`}
          strokeWidth="2"
        />
      </g>
    ))}
    <path
      d="M86 214 H114 M100 192 V243 M72 465 H128 M82 474 H118"
      fill="none"
      stroke={C.gold}
    />
  </g>
);

export const PatrolAircraft = () => (
  <g stroke="#D4DDE5" strokeWidth="2" strokeLinejoin="round" fill="#637F94">
    <path d="M0 -72 Q10 -62 12 -14 L94 8 L98 21 L13 12 L10 63 L35 78 L35 85 L0 76 L-35 85 L-35 78 L-10 63 L-13 12 L-98 21 L-94 8 L-12 -14 Q-10 -62 0 -72Z" />
    <path d="M-43 -4 V23 M43 -4 V23 M-48 -4 H-38 M38 -4 H48" strokeWidth="6" />
    <path d="M0 -49 V58 M-72 12 H-15 M15 12 H72" fill="none" stroke="#ABC0CF" />
    <path d="M-6 -48 Q0 -55 6 -48 V-30 H-6Z" fill="#0B1A2E" />
  </g>
);

export const EscortSide = () => (
  <g
    stroke={C.white}
    strokeWidth="2.2"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <path
      data-draw
      d="M18 148 L53 132 H570 L583 146 L546 181 H83 L44 167Z"
      fill={C.steel}
    />
    <path
      data-draw
      d="M150 131 L166 97 H202 L214 69 H281 L307 132 M337 132 V92 H365 V132 M429 132 V110 H502 V132"
      fill="#5F7F98"
    />
    <path
      data-draw
      d="M202 69 H282 V83 H202Z M218 70 V40 M219 40 H268 M244 41 V7 M245 21 L211 59 M245 21 L278 59 M338 94 V74 H364 V94"
      fill="#254D69"
    />
    <path
      d="M215 76 H276 M221 106 H279 M101 133 V115 H125 V133 M113 115 L77 101 M457 112 L479 97"
      fill="none"
    />
    <path d="M63 151 H558 M100 181 H535" fill="none" stroke="#9DBED5" />
    <path d="M520 132 L520 112 H544 V132 M541 116 L563 98" fill="none" />
  </g>
);

export const Submarine = () => (
  <g stroke={C.line} strokeWidth="2" strokeLinejoin="round">
    <path
      data-draw
      d="M17 80 Q23 52 78 51 H335 Q383 52 413 79 Q382 101 335 103 H78 Q22 102 17 80Z"
      fill="#234A65"
    />
    <path
      d="M156 51 V25 Q180 10 216 25 V51 M183 18 V1 H197 M337 60 L391 40 V113 L337 96 M70 79 H311"
      fill="none"
    />
  </g>
);
