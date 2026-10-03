import { C } from "./Shared";

/** Representative interwar British capital ship, not a claim about one class. */
export const CapitalShip = ({ detail = true }: { detail?: boolean }) => (
  <g strokeLinecap="round" strokeLinejoin="round">
    <path
      data-war-ink
      pathLength="100"
      d="M22 132 L568 132 L604 115 L588 151 Q554 165 503 168 L66 164 Q40 161 22 132Z"
      fill={C.white}
      stroke={C.line}
      strokeWidth="2"
    />
    <path d="M40 137 H583 L568 147 H52Z" fill={C.steel} />
    <path
      d="M191 126 V111 H241 V87 H278 V67 H326 V75 H345 V108 H397 V126Z"
      fill="#BDD0DF"
      stroke={C.navy}
      strokeWidth="2"
    />
    <path
      d="M235 107 V70 H257 V107 M282 93 V52 H306 V93"
      fill="#758D9F"
      stroke={C.navy}
      strokeWidth="2"
    />
    <path d="M231 70 H261 M278 52 H310" stroke={C.white} strokeWidth="5" />
    <path
      d="M335 126 V37 M334 44 L307 108 M335 44 L362 108 M323 63 H347 M324 75 H349 M335 37 V22 M319 37 H351"
      stroke={C.line}
      strokeWidth="2.4"
      fill="none"
    />
    <path
      d="M409 129 L415 111 H452 L461 129 M480 130 L486 116 H522 L533 130 M95 130 L103 115 H141 L151 130 M157 120 L165 103 H201 L211 120"
      fill="#93AFC5"
      stroke={C.navy}
      strokeWidth="2"
    />
    <g data-war-guns>
      <path
        d="M451 116 L495 111 M519 121 L569 115 M106 120 L59 114 M168 108 L117 102"
        fill="none"
        stroke={C.white}
        strokeWidth="4"
      />
      <path
        d="M451 121 L494 117 M519 126 L567 121 M106 125 L61 120 M168 113 L117 108"
        fill="none"
        stroke={C.line}
        strokeWidth="2.3"
      />
    </g>
    {detail && (
      <>
        <path
          d="M358 111 Q369 89 390 109 L385 115 H360Z M204 113 Q217 95 230 110 L228 116 H207Z"
          fill={C.navy}
          stroke={C.line}
          strokeWidth="1.3"
        />
        <path
          d="M33 131 H581 M377 127 V120 M369 127 V120 M361 127 V120 M541 128 V120 M549 126 V117"
          stroke={C.line}
          strokeWidth="1"
        />
        <path
          d="M320 83 H345 M320 91 H345 M321 99 H346"
          stroke={C.navy}
          strokeWidth="3"
        />
        {Array.from({ length: 17 }, (_, i) => (
          <circle key={i} cx={80 + i * 25} cy={155} r="1.35" fill={C.navy} />
        ))}
        <path
          d="M562 132 V140 L567 144 L571 138"
          stroke={C.navy}
          fill="none"
          strokeWidth="2"
        />
      </>
    )}
    <path
      data-war-wake
      d="M14 170 Q91 165 179 172 T375 170 T609 169 M4 179 Q85 173 190 179 T404 178 T625 176"
      fill="none"
      stroke={C.line}
      strokeWidth="1.3"
      opacity=".55"
    />
  </g>
);

/** Plan view: flight deck, arresting wires, island, lifts and parked propeller aircraft. */
export const FleetCarrier = ({ detail = true }: { detail?: boolean }) => (
  <g strokeLinejoin="round">
    <path
      data-war-ink
      pathLength="100"
      d="M23 79 L44 33 L499 25 Q559 26 598 79 Q559 131 499 133 L44 126Z"
      fill="#B7C9D8"
      stroke={C.white}
      strokeWidth="2.5"
    />
    <path
      d="M52 47 L502 40 Q544 41 575 78 Q542 116 501 119 L52 112Z"
      fill={C.steel}
      stroke={C.navy}
      strokeWidth="2"
    />
    <path
      d="M65 79 H553"
      stroke={C.white}
      strokeWidth="2.1"
      strokeDasharray="15 10"
      opacity=".7"
    />
    <path
      d="M345 35 V17 H417 L434 28 V44 H345Z"
      fill={C.white}
      stroke={C.navy}
      strokeWidth="2"
    />
    <path
      d="M373 31 V6 M363 17 H384 M389 33 V12"
      stroke={C.line}
      strokeWidth="2"
    />
    {detail && (
      <>
        <path
          d="M105 49 V112 M121 48 V113 M137 48 V113 M153 48 V114"
          stroke={C.white}
          strokeWidth="1.5"
        />
        <path
          d="M207 58 H245 V99 H207Z M419 56 H456 V98 H419Z"
          fill="none"
          stroke={C.line}
          strokeWidth="2"
        />
        {[285, 330, 375].map((x) => (
          <g data-war-plane key={x}>
            <g transform={`translate(${x} 56) scale(.55)`}>
              <PropellerAircraft />
            </g>
          </g>
        ))}
      </>
    )}
  </g>
);

export const PropellerAircraft = () => (
  <g fill={C.white} stroke={C.navy} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M0 -25 L5 -9 L38 -3 V4 L5 5 L3 23 L13 28 V32 L0 29 L-13 32 V28 L-3 23 L-5 5 L-38 4 V-3 L-5 -9Z" />
    <path
      d="M-12 -27 H12 M0 -32 V-21"
      fill="none"
      stroke={C.white}
      strokeWidth="2"
    />
  </g>
);

/** Merchant hull with holds, bridge and wake; bow points up. */
export const MerchantPlan = ({
  color = C.white,
  small = false,
}: {
  color?: string;
  small?: boolean;
}) => (
  <g strokeLinejoin="round">
    <path
      d="M0 -31 Q-9 -23 -10 -9 L-9 26 Q0 33 9 26 L10 -9 Q9 -23 0 -31Z"
      fill={color}
      stroke={C.line}
      strokeWidth="1.1"
    />
    <path d="M-5 -15 H5 V-3 H-5Z M-5 9 H5 V21 H-5Z" fill={C.steel} />
    <path d="M-8 1 H8 V7 H-8Z" fill={C.navy} />
    {!small && (
      <path
        d="M0 -23 V-16 M0 22 V29 M-7 37 Q0 41 7 37 M-11 46 Q0 51 11 46"
        fill="none"
        stroke={C.line}
        strokeWidth="1.1"
      />
    )}
  </g>
);

export const EscortPlan = () => (
  <g strokeLinejoin="round">
    <path
      data-war-ink
      pathLength="100"
      d="M0 -124 Q-21 -97 -23 -59 L-18 115 Q0 127 18 115 L23 -59 Q21 -97 0 -124Z"
      fill={C.white}
      stroke={C.line}
      strokeWidth="2"
    />
    <path d="M-12 -84 H12 V86 H-12Z" fill={C.steel} />
    <path
      d="M-16 -42 H16 V-13 H-16Z M-8 -5 H8 V21 H-8Z M-8 29 H8 V52 H-8Z"
      fill={C.navy}
    />
    <path
      d="M-8 -97 H8 V-80 H-8Z M-8 87 H8 V104 H-8Z"
      fill="#93AFC5"
      stroke={C.navy}
      strokeWidth="1.5"
    />
    <path
      d="M-3 -90 V-113 M3 -90 V-113 M-3 97 V117 M3 97 V117 M-28 -28 H28"
      stroke={C.navy}
      strokeWidth="2.5"
    />
    <path
      d="M-18 138 Q0 148 18 138 M-26 158 Q0 170 26 158"
      stroke={C.line}
      strokeWidth="2"
      fill="none"
    />
  </g>
);

export const SubmarineProfile = () => (
  <g strokeLinecap="round" strokeLinejoin="round">
    <path
      data-war-ink
      pathLength="100"
      d="M22 128 Q45 106 127 110 L263 108 L273 85 H332 L346 109 H493 Q554 110 592 130 Q551 153 493 154 H99 Q44 153 22 128Z"
      fill="#91ABC1"
      stroke={C.white}
      strokeWidth="2"
    />
    <path
      d="M38 132 H577 M302 84 V57 H313 V61 M291 85 V68 M242 111 V97 H266 M490 110 L510 100 M490 153 L510 166"
      stroke={C.navy}
      strokeWidth="3"
      fill="none"
    />
    <path d="M270 130 H449" stroke={C.steel} strokeWidth="18" />
    <path
      d="M278 130 H440"
      stroke={C.white}
      strokeWidth="2"
      strokeDasharray="10 14"
    />
    <circle cx="116" cy="129" r="10" fill={C.steel} />
    <circle cx="153" cy="129" r="10" fill={C.steel} />
    <circle cx="190" cy="129" r="10" fill={C.steel} />
  </g>
);
