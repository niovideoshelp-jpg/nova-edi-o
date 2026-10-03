import { C } from "./Shared";

/**
 * Vanguard has a long raised missile deck behind a forward sail.
 * Based on the Royal Navy's public class profile; this is an exterior elevation,
 * not a cutaway or an assertion about deployed missile / warhead loads.
 * https://www.royalnavy.mod.uk/equipment/submarine/vanguard-class
 */
export const VanguardProfile = () => (
  <svg viewBox="0 0 1400 350" width="100%" height="100%">
    <g
      stroke={C.line}
      strokeWidth="2.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        data-nuclear-draw
        data-nuclear-hull
        pathLength="1"
        fill="#42657C"
        d="M66 222C66 193 102 170 170 165L1073 169Q1140 171 1215 199L1270 203V223L1217 228Q1143 260 1066 263L171 267C106 266 69 249 66 222Z"
      />
      <path
        data-nuclear-draw
        pathLength="1"
        fill="#66899D"
        d="M360 165 375 112Q380 103 395 101H450Q469 104 474 119L485 165Z"
      />
      <path
        data-missile-deck
        data-nuclear-draw
        pathLength="1"
        fill="#7898A9"
        d="M487 166 502 146 923 146Q969 148 1001 169Z"
      />
      <path
        data-nuclear-draw
        pathLength="1"
        fill="none"
        d="M397 101V76M421 101V65M447 102V80M382 127H472M87 215H1228"
      />
      <path
        fill="#66899D"
        d="M358 177 277 187 355 196M465 177 546 187 473 196"
      />
      <path
        fill="#42657C"
        d="M1171 186 1200 137H1220L1215 200M1177 242 1201 288H1221L1215 228"
      />
      <path
        data-nuclear-draw
        pathLength="1"
        fill="#24445B"
        d="M1270 191H1315Q1339 214 1315 236H1270Z"
      />
      <path
        fill="none"
        opacity=".62"
        d="M179 168V260M1066 172V261M1128 181V250M1278 199H1308M1278 228H1308M200 197H307"
      />
      <path
        data-mission-highlight
        fill="none"
        stroke={C.gold}
        strokeWidth="3"
        opacity="0"
        d="M502 145H922Q966 147 1002 168M519 155H905"
      />
      <path
        fill="none"
        opacity=".45"
        d="M523 151V161M552 151V161M581 151V161M610 151V161M639 151V161M668 151V161M697 151V161M726 151V161M755 151V161M784 151V161M813 151V161M842 151V161M871 151V161M900 151V161"
      />
      <path
        data-sub-wake
        fill="none"
        stroke={C.steel}
        opacity=".55"
        d="M30 286H227M988 285H1360M1145 298H1384"
      />
    </g>
  </svg>
);

/** A small anonymous hull used only as one unit in a counted inventory chart. */
export const InventoryHull = ({
  kind = "surface",
}: {
  kind?: "surface" | "supply" | "submarine";
}) => {
  if (kind === "submarine")
    return (
      <svg viewBox="0 0 210 72" width="100%" height="100%">
        <g
          stroke={C.line}
          strokeWidth="2.5"
          fill="#23455E"
          strokeLinejoin="round"
        >
          <path
            data-unit-draw
            pathLength="1"
            d="M12 43Q12 29 35 29H78L82 16H103L107 29H158L184 36H199V47H184L159 57H35Q12 56 12 43Z"
          />
          <path
            d="M28 42H188M89 15V8M172 34 176 23H183V37M172 50 177 63H184V47"
            fill="none"
            stroke={C.steel}
          />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 70 190" width="100%" height="100%">
      <g stroke={C.line} strokeWidth="2" fill="#24475F" strokeLinejoin="round">
        <path
          data-unit-draw
          pathLength="1"
          d={
            kind === "supply"
              ? "M35 8Q53 19 55 47V165Q35 177 15 165V47Q17 19 35 8Z"
              : "M35 7Q51 28 53 55V158L45 177H25L17 158V55Q20 28 35 7Z"
          }
        />
        {kind === "supply" ? (
          <>
            <path d="M20 39H50V60H20ZM20 139H50V159H20Z" fill={C.steel} />
            <path
              d="M18 81H52M18 109H52M35 68V130M25 73V120M45 73V120"
              fill="none"
            />
          </>
        ) : (
          <>
            <path d="M24 69H46V110H24Z" fill={C.steel} />
            <path d="M29 39H41V52H29ZM26 128H44V156H26Z" />
            <path d="M35 38V24M28 83H42M28 92H42M30 117H40" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
};

export const InventoryWater = () => (
  <svg viewBox="0 0 1920 1080" width="1920" height="1080">
    <defs>
      <linearGradient id="inventory-depth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.steel} stopOpacity=".12" />
        <stop offset="1" stopColor={C.navy} stopOpacity="0" />
      </linearGradient>
    </defs>
    <g data-water-plane>
      <path
        d="M-500 530C-290 500-40 548 145 520S390 555 540 535 968 499 1200 526 1672 547 2070 516 2320 530 2450 519V1700H-500Z"
        fill="url(#inventory-depth)"
      />
      <path
        data-surface-line
        d="M-500 530C-290 500-40 548 145 520S390 555 540 535 968 499 1200 526 1672 547 2070 516 2320 530 2450 519"
        fill="none"
        stroke={C.steel}
        strokeWidth="2.5"
        opacity=".38"
      />
    </g>
    <g
      data-depth-lines
      fill="none"
      stroke={C.steel}
      strokeWidth="1.5"
      opacity=".14"
    >
      <path d="M-500 690C-290 662-90 720 103 685S438 720 703 690 1230 655 1630 696 1925 710 2140 687 2310 690 2450 681" />
      <path d="M-500 862C-210 849-80 894 182 862S478 886 746 862 1292 827 1560 862 1980 873 2110 844 2330 853 2450 865" />
      <path d="M-500 1009C-220 983-40 1041 214 1009S591 1046 879 1013 1431 992 1980 1020 2290 1013 2450 1028" />
    </g>
  </svg>
);
