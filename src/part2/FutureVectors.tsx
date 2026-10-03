import type { CSSProperties } from "react";
import { C } from "./Shared";

export type FrigateKind = "type23" | "type26" | "type31";

/**
 * Original explanatory elevations, not engineering drawings.
 * Distinguishing geometry follows Royal Navy Duke / City / Inspiration references:
 * exposed fittings and separate masts; enclosed ASW mission ship; tall Arrowhead hull.
 * Every silhouette faces port so the replacement diagram has a common baseline.
 */
export const FrigateProfile = ({
  kind,
  style,
  outline = false,
}: {
  kind: FrigateKind;
  style?: CSSProperties;
  outline?: boolean;
}) => {
  const paint = outline ? "none" : "#7897AB";
  const upper = outline ? "none" : "#ADC1CC";
  const dark = outline ? "none" : "#24445B";
  return (
    <svg viewBox="0 0 1200 360" width="100%" height="100%" style={style}>
      <g
        stroke={C.line}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {kind === "type23" ? (
          <>
            <path
              data-hull
              data-draw
              pathLength="1"
              fill={paint}
              d="M48 253 202 242 307 240 307 256 1140 256 1124 290 1005 303 237 306 165 297 103 282Z"
            />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M324 247 339 211 350 211 350 166 374 153 464 153 485 176 485 233 570 233 570 247Z"
            />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M744 253 758 203 905 203 931 224 931 253Z"
            />
            <path fill={dark} d="M357 173 472 173 476 184 357 184Z" />
            <path fill={dark} d="M768 214 893 214 906 224 906 251 768 251Z" />
            <path fill={paint} d="M578 245 578 177 631 177 649 191 650 245Z" />
            <path fill={dark} d="M581 178 634 178 641 188 581 188Z" />
            <path
              data-draw
              pathLength="1"
              fill="none"
              d="M433 151 438 97 465 97 476 151M439 100 473 143M468 110 436 141M450 98V65M688 244V116M663 157H711M677 133H700M688 116V95"
            />
            <g data-radar transform="translate(450 67)">
              <path fill={upper} d="M-28-7H28V7H-28Z" />
              <path fill="none" d="M-18-4V4M-6-4V4M6-4V4M18-4V4" />
            </g>
            <path
              data-draw
              pathLength="1"
              fill="none"
              d="M533 241 518 217 538 206 555 234M557 241 541 217 561 206 577 234M506 242H580"
            />
            <path
              data-draw
              pathLength="1"
              fill={upper}
              d="M211 242 218 222 260 222 276 234 276 242Z"
            />
            <path d="M224 224 170 204" strokeWidth="6" />
            <path
              data-draw
              pathLength="1"
              fill="none"
              d="M342 244H488M359 199H475M360 211H475M744 256H1135M931 252H1117M953 259H1095"
            />
            <path
              fill="none"
              d="M100 252H311M136 249V236M180 246V233M224 244V231M275 242V230M971 254V242M1011 254V242M1051 254V242M1091 254V242M1130 254V242"
            />
            <path fill={dark} d="M299 249H342V257H299M705 239H749V255H705" />
            <circle cx="169" cy="271" r="4" fill={C.navy} />
            <circle cx="1088" cy="273" r="4" fill={C.navy} />
          </>
        ) : kind === "type26" ? (
          <>
            <path
              data-hull
              data-draw
              pathLength="1"
              fill={paint}
              d="M44 235 251 239 312 249 1141 253 1121 289 999 307 205 306 123 281Z"
            />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M338 248 351 209 363 170 392 150 469 150 494 173 507 238 551 248Z"
            />
            <path fill={dark} d="M372 171 481 171 486 184 368 184Z" />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M524 249 550 200 654 200 679 220 715 219 729 201 898 201 929 246Z"
            />
            <path fill={dark} d="M568 211H638V245H568Z" />
            <path fill={dark} d="M757 211H891L909 229V248H757Z" />
            <path fill={paint} d="M587 200 595 152 636 152 650 166 655 200Z" />
            <path fill={dark} d="M595 154H635L643 164H594Z" />
            <path
              data-draw
              pathLength="1"
              fill={upper}
              d="M414 150 426 97 458 97 470 150Z"
            />
            <path fill="none" d="M441 97V63M410 112H473M440 76V57" />
            <g data-radar transform="translate(441 62)">
              <path fill={upper} d="M-29-7H29V7H-29Z" />
              <path fill="none" d="M-18-4V4M-6-4V4M6-4V4M18-4V4" />
            </g>
            <path
              data-draw
              pathLength="1"
              fill={upper}
              d="M178 239 187 216 223 211 253 229 253 240Z"
            />
            <path d="M193 218 138 194" strokeWidth="6" />
            <path fill={dark} d="M277 241V233H326V245Z" />
            <path
              data-draw
              pathLength="1"
              fill="none"
              d="M282 232V225M293 232V225M304 232V225M315 232V225M283 227H322M548 250H900M562 256H893M932 252H1126M967 261H1093"
            />
            <path
              fill="none"
              d="M771 206V243M792 206V243M813 206V243M834 206V243M855 206V243M876 206V243M98 240H338"
            />
            <path
              fill="none"
              d="M131 240V230M174 240V230M267 245V234M998 254V243M1038 254V243M1078 254V243M1118 254V243"
            />
            <path fill={dark} d="M497 221H538V236H504Z" />
            <circle cx="122" cy="260" r="4" fill={C.navy} />
          </>
        ) : (
          <>
            <path
              data-hull
              data-draw
              pathLength="1"
              fill={paint}
              d="M43 226 304 234 376 248 1140 253 1123 289 993 306 190 303 105 271Z"
            />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M302 238 321 192 329 154 357 137 460 137 484 159 499 237Z"
            />
            <path fill={dark} d="M336 158H475L479 171H332Z" />
            <path
              data-superstructure
              data-draw
              pathLength="1"
              fill={upper}
              d="M526 248 537 202 649 202 668 228 722 228 737 201 904 201 929 251Z"
            />
            <path fill={dark} d="M552 214H643V245H552Z" />
            <path fill={dark} d="M756 211H895L910 225V251H756Z" />
            <path fill={paint} d="M565 201 574 163 624 163 639 179 645 201Z" />
            <path fill={dark} d="M575 164H625L632 175H573Z" />
            <path
              data-draw
              pathLength="1"
              fill={upper}
              d="M382 137 390 92 409 80 432 92 442 137Z"
            />
            <path
              fill="none"
              d="M408 82V52M377 103H447M408 61H429M697 224V124M681 159H713"
            />
            <g data-radar transform="translate(408 56)">
              <path fill={upper} d="M-21-9H21V9H-21Z" />
              <path fill={dark} d="M-15-5H15V5H-15Z" />
            </g>
            <path
              data-draw
              pathLength="1"
              fill={upper}
              d="M174 231 179 214 204 209 226 224 226 233Z"
            />
            <path d="M184 217 143 195" strokeWidth="4.5" />
            <path fill={dark} d="M472 184H504V196H483Z" />
            <path
              fill="none"
              d="M284 235V222H322M263 230H283M660 240H719M937 254H1124M969 261H1097M549 250H904M783 210V246M807 210V246M831 210V246M855 210V246M879 210V246"
            />
            <path
              fill="none"
              d="M90 232H299M128 232V222M166 232V222M247 233V223M973 255V244M1013 255V244M1053 255V244M1093 255V244M1133 255V244"
            />
            <circle cx="113" cy="250" r="4" fill={C.navy} />
          </>
        )}
        <path
          data-keel
          fill="none"
          stroke={C.steel}
          strokeWidth="4"
          d="M222 307H990"
        />
        <path
          data-wake
          fill="none"
          opacity=".55"
          strokeWidth="1.4"
          d="M5 319H212M880 323H1169M1060 333H1190"
        />
      </g>
    </svg>
  );
};

/** Astute's low rounded hull, forward sail, aft taper and shrouded propulsor. */
export const AstuteProfile = ({
  outline = false,
  compact = false,
}: {
  outline?: boolean;
  compact?: boolean;
}) => (
  <svg viewBox="0 0 1200 330" width="100%" height="100%">
    <g
      stroke={C.line}
      strokeWidth={compact ? 5 : 2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        data-draw
        pathLength="1"
        fill={outline ? "none" : "#375B73"}
        d="M72 211C67 182 97 159 166 155L802 158C874 160 929 176 1001 188L1063 190V216L1001 216C928 225 875 248 799 250L167 253C108 253 76 236 72 211Z"
      />
      <path
        data-draw
        pathLength="1"
        fill={outline ? "none" : "#628599"}
        d="M354 158 366 99Q370 89 385 88H434Q448 89 453 104L464 159Z"
      />
      <path
        fill="none"
        d="M390 87V61M414 86V53M438 93V69M370 119H450M87 202H1019"
      />
      <path
        fill={outline ? "none" : "#628599"}
        d="M374 135 321 148 370 150M446 135 499 148 454 150M963 182 987 136 1008 136 1001 191M963 222 989 268 1009 268 1001 216"
      />
      <path
        fill={outline ? "none" : "#24445B"}
        d="M1063 181H1100Q1118 202 1100 225H1063Z"
      />
      {!compact && (
        <>
          <path
            fill="none"
            d="M166 158V247M812 162V245M875 171V236M1070 189H1094M1070 217H1094M166 185H292M526 184H696"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={"M" + (516 + i * 35) + " 170v7"} opacity=".5" />
          ))}
        </>
      )}
    </g>
  </svg>
);

/** Future boats intentionally remain an abstract planned-capacity symbol. */
export const PlannedBoat = () => (
  <svg viewBox="0 0 220 70" width="100%" height="100%">
    <path
      data-boat-draw
      pathLength="1"
      d="M15 42Q15 30 36 29H78L81 13H101L105 29H161L189 37H203V46H189L164 54H36Q15 53 15 42Z"
      fill="none"
      stroke={C.line}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M20 43H196M88 14V8M181 36 184 23H190V37M181 47 185 59H191V46"
      fill="none"
      stroke={C.steel}
      strokeWidth="2"
    />
  </svg>
);

/** Crane / modular hull assembly: hook and load share one animated SVG group. */
export const YardRig = () => (
  <svg viewBox="0 0 1600 800" width="100%" height="100%">
    <g fill="none" stroke={C.line} strokeWidth="3" strokeLinejoin="round">
      <path
        data-yard-line
        pathLength="1"
        d="M190 690V178H1405V690M215 690V205H1380V690M190 230H1405M204 178 297 230 390 178 483 230 576 178 669 230 762 178 855 230 948 178 1041 230 1134 178 1227 230 1320 178 1405 230"
      />
      <path
        opacity=".4"
        d="M190 690H1405M180 710H1420M215 602H1380M215 629H1380"
      />
      <path data-yard-cables stroke={C.gold} d="M717 231V385M895 231V385" />
      <g data-yard-load>
        <path
          stroke={C.gold}
          d="M705 385H907M716 385 734 414M895 385 877 414"
        />
        <path fill="#375B73" d="M695 418H919L904 487Q808 516 710 487Z" />
        <path
          opacity=".6"
          d="M723 420V490M752 420V498M783 420V503M814 420V504M845 420V500M876 420V493M904 420V484"
        />
      </g>
      <path
        fill="#24445B"
        d="M304 571H688V627H441Q347 620 304 571ZM926 571H1301L1260 613 1179 627H926Z"
      />
      <path stroke={C.gold} d="M689 568H925" strokeDasharray="10 12" />
      <path
        opacity=".7"
        d="M430 650H1190M470 629V676M558 629V676M1034 629V676M1140 629V676"
      />
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          data-yard-module={i}
          transform={"translate(" + (265 + i * 133) + " 722)"}
        >
          <path fill="#375B73" d="M0 0H96V39H0Z" />
          <path d="M16 0V39M40 0V39M64 0V39M80 0V39" />
        </g>
      ))}
    </g>
  </svg>
);
