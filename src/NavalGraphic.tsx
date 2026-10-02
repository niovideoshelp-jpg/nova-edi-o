import { useId, type ReactNode } from "react";
import { useGsapTimeline } from "@remotion/gsap";

const P = ({
  d,
  fill = "none",
  accent = false,
}: {
  d: string;
  fill?: string;
  accent?: boolean;
}) => (
  <path
    data-draw
    d={d}
    pathLength="100"
    strokeDasharray="100"
    strokeDashoffset="100"
    fill={fill}
    fillOpacity="0"
    stroke={accent ? "#D4A94A" : "#B8CDDE"}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);
const Hull = ({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <P
      d="M75 355 L124 366 H904 L961 326 950 379 900 408 H143 L101 391 Z"
      fill="#294E6B"
    />
    <P d="M84 344 H908 L962 323 972 333 907 357 H96 Z" fill="#466C88" />
    <P
      d="M360 344 L370 249 452 249 473 344 Z M567 344 L579 260 651 260 675 344 Z"
      fill="#355C7A"
    />
    <P d="M368 275 H451 M365 292 H455 M579 287 H655 M576 302 H659 M393 249 V193 L410 186 422 249 M600 260 V210 H621 V260" />
    <P d="M376 263 H448 V275 H376 Z M587 273 H650 V286 H587 Z" fill="#0B1A2E" />
    <P d="M392 207 H435 M385 225 H438 M586 225 H637 M601 196 V214 M186 381 H852" />
    <P d="M112 424 C205 420 257 430 328 425 M698 425 H923" />
  </g>
);
const Frigate = ({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <P d="M106 342 L905 320 874 389 H173 Z" fill="#315978" />
    <P
      d="M295 337 L325 265 H472 L508 332 M516 332 V283 H694 L735 328"
      fill="#294C68"
    />
    <P
      d="M379 265 L397 178 H430 L449 265 Z M399 210 H428 M385 237 H440 M546 283 V243 H584 V283 M195 340 V313 H238 L259 335"
      fill="#3A6EA5"
    />
    <P d="M226 314 L274 298 M358 285 H459 M628 305 H683 M820 332 L843 303 M172 368 H850" />
  </g>
);
const TopShip = ({
  x,
  y,
  scale = 1,
  carrier = false,
}: {
  x: number;
  y: number;
  scale?: number;
  carrier?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <P
      d={
        carrier
          ? "M-43 174 L-49 152 V-150 Q-49 -181 -28 -190 H9 Q26 -181 29 -161 L32 -70 46 -63 V-20 L51 -15 V131 L38 131 V157 L22 178 Z"
          : "M0 -150 Q34 -105 32 -64 V135 L0 153 -32 135 V-64 Q-34 -105 0 -150 Z"
      }
      fill="#315D7F"
    />
    {carrier ? (
      <>
        <P d="M-41 148 V-147 Q-41 -172 -25 -180 H6 M-39 161 H21 L30 149 M-31 133 L-31 -152 M-15 133 L-15 -152 M-5 139 L18 -139" />
        <P
          d="M19 -91 L25 -108 35 -106 38 -93 V-56 L33 -49 H19 Z M22 21 L28 13 40 19 V57 L34 66 H22 Z"
          fill="#466F8C"
        />
        <P d="M24 -87 H34 M24 -79 H34 M25 30 H36 M25 38 H36 M37 -29 H47 V-8 H37 Z M39 91 H48 V115 H39 Z" />
        <P
          d="M-36 -161 H-12 M-36 -153 H-12 M-36 -145 H-12 M-36 118 H-12"
          accent
        />
        <path
          d="M-23 101 V-131"
          stroke="#94B4CC"
          strokeWidth="1"
          strokeDasharray="5 5"
          fill="none"
        />
      </>
    ) : (
      <>
        <P d="M-20 59 V-39 L0 -65 20 -39 V59 Z M-14 -75 H14 M-16 83 H16 M0 -115 V-83" />
        <P d="M0 -5 V30 M-10 12 H10" accent />
      </>
    )}
  </g>
);
const Plane = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <P
      d="M0 -70 L8 -27 22 -7 65 27 62 40 17 24 13 53 29 64 27 72 5 64 0 76 -5 64 -27 72 -29 64 -13 53 -17 24 -62 40 -65 27 -22 -7 -8 -27 Z"
      fill="#416E92"
    />
    <P d="M0 -34 Q8 -17 0 -8 Q-8 -17 0 -34 Z" fill="#D4A94A" accent />
  </g>
);
const Arc = ({ d }: { d: string }) => (
  <path data-signal d={d} fill="none" stroke="#3A6EA5" strokeWidth="2" />
);
const Circle = ({
  x,
  y,
  r,
  gold = false,
}: {
  x: number;
  y: number;
  r: number;
  gold?: boolean;
}) => (
  <P
    d={`M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`}
    accent={gold}
  />
);

export const NavalGraphic = ({
  mode,
  duration,
  delay = 0,
}: {
  mode: string;
  duration: number;
  delay?: number;
}) => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<SVGSVGElement>(
    ({ timeline, selector }) => {
      timeline.fromTo(
        selector("[data-assembly]"),
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        delay,
      );
      timeline.to(
        selector("[data-draw]"),
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.006,
          ease: "power3.out",
        },
        delay,
      );
      timeline.to(
        selector("[data-draw]"),
        {
          fillOpacity: 0.82,
          duration: 0.3,
          stagger: 0.006,
          ease: "power2.out",
        },
        delay + 0.36,
      );
      timeline.to(
        selector("[data-assembly]"),
        {
          scale: 1.045,
          svgOrigin: "600 380",
          duration: Math.max(0.6, duration - delay),
          ease: "none",
        },
        delay,
      );
      const signals = selector("[data-signal]");
      if (signals.length)
        timeline.fromTo(
          signals,
          { opacity: 0.12 },
          {
            opacity: 0.72,
            duration: 0.75,
            stagger: 0.11,
            repeat: 2,
            yoyo: true,
            ease: "sine.inOut",
          },
          delay + 0.25,
        );
      const sweep = selector("[data-sweep]");
      if (sweep.length)
        timeline.fromTo(
          sweep,
          { rotation: -70, svgOrigin: "600 380" },
          { rotation: 55, duration, ease: "none" },
          0,
        );
      const progress = selector("[data-progress]");
      if (progress.length)
        timeline.fromTo(
          progress,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: Math.max(1, duration - 0.6),
            ease: "power2.inOut",
          },
          delay + 0.3,
        );
      const move = selector("[data-moving]");
      if (move.length)
        timeline.fromTo(
          move,
          { x: -18 },
          { x: 26, duration: Math.max(0.6, duration - delay), ease: "none" },
          delay,
        );
    },
    { dependencies: [mode, duration, delay] },
  );
  return (
    <svg
      ref={scope}
      viewBox="0 0 1200 760"
      width="1200"
      height="760"
      aria-label={`Naval illustration: ${mode}`}
    >
      <NavalArtwork mode={mode} uid={uid} />
    </svg>
  );
};

// A pure static layer also exports to portable SVG; animation stays in the official hook.
export const NavalArtwork = ({
  mode,
  uid = "naval",
}: {
  mode: string;
  uid?: string;
}) => {
  let art: ReactNode;
  switch (mode) {
    case "compass":
      art = (
        <>
          <Circle x={600} y={380} r={212} />
          <Circle x={600} y={380} r={190} />
          <P
            d="M600 170 L633 347 810 380 633 413 600 590 567 413 390 380 567 347 Z"
            fill="#254B69"
          />
          <P d="M600 170 L633 347 600 380 Z" fill="#D4A94A" accent />
          <Circle x={600} y={380} r={19} />
        </>
      );
      break;
    case "inquiry":
      art = (
        <>
          <P d="M476 252 C476 106 744 106 744 259 C744 321 672 348 619 390 Q596 409 596 453" />
          <Circle x={596} y={530} r={9} gold />
        </>
      );
      break;
    case "communications":
      art = (
        <>
          <P d="M576 592 L600 269 624 592 M512 596 H688" fill="#315D7F" />
          <Circle x={600} y={259} r={18} gold />
          <Arc d="M514 179 Q465 259 514 339 M686 179 Q735 259 686 339" />
          <Arc d="M463 133 Q385 259 463 385 M737 133 Q815 259 737 385" />
        </>
      );
      break;
    case "task-group":
      art = (
        <>
          <TopShip x={600} y={245} scale={0.9} carrier />
          <TopShip x={403} y={441} scale={0.6} />
          <TopShip x={797} y={441} scale={0.6} />
          <P
            d="M600 431 V538 M578 515 L600 538 622 515 M403 565 V631 M797 565 V631"
            accent
          />
        </>
      );
      break;
    case "archive":
    case "manuscript":
      art = (
        <>
          <P
            d="M340 140 Q582 104 846 140 V614 Q600 584 340 616 Z"
            fill="#21425D"
          />
          <P d="M366 163 Q590 138 818 165 M366 589 Q590 564 818 591 M410 217 H744 M410 270 H721 M410 323 H757 M410 376 H707 M410 429 H740 M410 482 H642" />
          {mode === "archive" ? (
            <g transform="translate(503 130) scale(.25)">
              <Hull />
            </g>
          ) : (
            <>
              <P
                d="M672 496 Q656 370 768 223 Q866 253 800 353 Q765 410 712 432 Z"
                fill="#678AA2"
              />
              <P
                d="M672 496 L787 265 M712 430 L718 366 M741 383 L790 355"
                accent
              />
            </>
          )}
        </>
      );
      break;
    case "harbor":
      art = (
        <>
          <P
            d="M260 553 H940 L914 531 H289 Z M290 522 H913 V495 H290 Z M354 494 V298 H418 V494 M781 494 V298 H845 V494 M470 494 V307 H731 V494"
            fill="#294D69"
          />
          <P
            d="M343 298 Q345 247 386 222 Q427 247 429 298 Z M771 298 Q773 247 813 222 Q855 247 856 298 Z M480 306 Q491 221 601 181 Q714 221 724 306 Z"
            fill="#426B89"
          />
          <P d="M539 248 V177 Q539 136 601 99 Q663 136 663 177 V249 M567 199 H635 M586 141 V220 M615 141 V220" />
          <P
            d="M372 374 V333 Q385 312 401 333 V374 M795 374 V333 Q810 312 828 333 V374 M497 421 V355 Q512 333 528 355 V421 M671 421 V355 Q687 333 704 355 V421 M565 494 V398 Q601 354 637 398 V494 M543 326 H659"
            accent
          />
          <P d="M313 558 Q410 619 600 619 Q790 619 887 558 M255 589 Q412 671 600 671 Q788 671 945 589" />
        </>
      );
      break;
    case "island-distance":
      art = (
        <>
          <P
            d="M605 217 C630 262 619 296 651 307 C681 317 711 302 759 310 C739 338 704 350 699 376 C693 403 726 439 718 478 C682 465 658 426 625 427 C587 428 560 481 522 495 C519 456 548 422 532 396 C515 370 474 372 441 348 C477 327 510 339 539 319 C566 301 572 248 605 217 Z"
            fill="#35698E"
          />
          <P
            d="M585 356 Q606 341 626 357 L637 389 608 404 576 388 Z"
            fill="#658AA8"
          />
          <Arc d="M354 507 Q601 633 839 507" />
          <Arc d="M288 552 Q600 716 912 552" />
          <P d="M135 196 C225 134 275 185 340 166 Q388 166 413 222 M836 163 C899 133 961 181 1067 222" />
        </>
      );
      break;
    case "naval-influence":
    case "broadside":
      art = (
        <>
          <P d="M210 482 L966 472 896 536 H297 Z" fill="#30536C" />
          <P d="M434 183 V479 M602 126 V477 M766 210 V475 M309 450 L602 131 887 455" />
          <P
            d="M446 204 Q519 237 533 322 H446 Z M588 149 Q516 219 504 305 H588 Z M618 152 Q709 210 724 305 H618 Z M754 229 Q707 259 696 349 H754 Z M780 230 Q843 270 854 352 H780 Z M423 331 Q362 357 348 431 H423 Z M446 338 Q498 363 513 430 H446 Z M619 329 Q687 365 698 432 H619 Z M588 329 Q528 365 516 432 H588 Z"
            fill="#6A8AA1"
          />
          {mode === "broadside" ? (
            <P
              d="M336 505 H861 M355 505 V514 M422 505 V514 M489 505 V514 M556 505 V514 M623 505 V514 M690 505 V514 M757 505 V514 M824 505 V514"
              accent
            />
          ) : (
            <Arc d="M215 579 Q597 641 982 571" />
          )}
        </>
      );
      break;
    case "era-change":
      art = (
        <>
          <g opacity=".45">
            <Frigate x={82} y={-25} scale={1} />
          </g>
          <P d="M308 552 H900 M308 538 V566 M900 538 V566" />
          <path
            data-progress
            d="M308 552 H900"
            pathLength="100"
            strokeDasharray="100"
            stroke="#D4A94A"
            strokeWidth="5"
            fill="none"
          />
        </>
      );
      break;
    case "capability":
      art = (
        <>
          <Plane x={600} y={270} scale={1.75} />
          <P d="M294 598 H906 M333 617 H867 M418 578 H782" />
          <path
            data-progress
            d="M600 511 V443"
            pathLength="100"
            strokeDasharray="100"
            stroke="#D4A94A"
            strokeWidth="4"
          />
          <P d="M585 461 L600 443 615 461" accent />
        </>
      );
      break;
    case "interoperability":
      art = (
        <>
          <TopShip x={398} y={436} scale={0.85} />
          <TopShip x={802} y={436} scale={0.85} />
          <Arc d="M264 344 A202 202 0 0 1 600 236" />
          <Arc d="M230 317 A247 247 0 0 1 631 190" />
          <Arc d="M936 344 A202 202 0 0 0 600 236" />
          <Arc d="M970 317 A247 247 0 0 0 569 190" />
          <P d="M536 249 Q600 190 664 249 L600 323 Z" fill="#D4A94A" accent />
        </>
      );
      break;
    case "endurance":
      art = (
        <>
          <P
            d="M260 263 H940 V537 H260 Z M260 316 H940 M330 242 V283 M870 242 V283"
            fill="#234962"
          />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <P
                d={`M${303 + i * 80} 363 H${349 + i * 80} V424 H${303 + i * 80} Z`}
                fill="#3A6EA5"
              />
            </g>
          ))}
          <path
            data-progress
            d="M303 481 H895"
            pathLength="100"
            strokeDasharray="100"
            stroke="#D4A94A"
            strokeWidth="5"
          />
        </>
      );
      break;
    case "sustain":
      art = (
        <>
          <P
            d="M348 207 H853 V552 H348 Z M382 235 H819 M382 517 H819"
            fill="#234962"
          />
          {Array.from({ length: 5 }, (_, i) => (
            <P
              key={i}
              d={`M${400 + i * 82} 281 H${453 + i * 82} V470 H${400 + i * 82} Z`}
              fill={i < 3 ? "#3A6EA5" : "#152D42"}
            />
          ))}
          <path
            data-progress
            d="M805 604 H397"
            pathLength="100"
            strokeDasharray="100"
            stroke="#D4A94A"
            strokeWidth="5"
          />
        </>
      );
      break;
    case "dockyard":
      art = (
        <>
          <Hull x={95} y={35} />
          <P d="M206 528 H1000 M248 528 V561 M408 528 V561 M568 528 V561 M728 528 V561 M888 528 V561 M286 169 V429 M286 169 H912 V198 M912 198 V290 M291 169 L361 119 H910 V169 M286 225 L361 169" />
          <P d="M885 292 H939 V318 H885 Z" fill="#D4A94A" accent />
        </>
      );
      break;
    case "formation":
    case "defense-ring":
    case "autonomy":
      art = (
        <>
          <TopShip
            x={600}
            y={385}
            carrier
            scale={mode === "autonomy" ? 1.55 : 1.1}
          />
          {mode !== "autonomy" && (
            <>
              <TopShip x={366} y={276} scale={0.5} />
              <TopShip x={840} y={273} scale={0.5} />
              <TopShip x={400} y={563} scale={0.46} />
              <TopShip x={812} y={551} scale={0.46} />
            </>
          )}
          {mode === "defense-ring" ? (
            <>
              <Arc d="M272 390 A328 244 0 0 1 928 390" />
              <Arc d="M227 390 A373 284 0 0 1 973 390" />
              <Arc d="M182 390 A418 324 0 0 1 1018 390" />
            </>
          ) : mode === "formation" ? (
            <>
              <P d="M403 321 L538 367 M786 319 L671 365 M440 522 L539 444 M768 510 L671 444" />
            </>
          ) : (
            <P d="M476 158 H429 V594 H476 M724 158 H771 V594 H724" accent />
          )}
        </>
      );
      break;
    case "deck-plan":
    case "ski-jump":
    case "airwing":
      art = (
        <>
          <g
            transform={
              mode === "ski-jump"
                ? "translate(60 -135) scale(1.15)"
                : "translate(0 0)"
            }
          >
            <TopShip x={600} y={390} scale={1.65} carrier />
            {mode === "airwing" ? (
              Array.from({ length: 24 }, (_, i) => (
                <Plane
                  key={i}
                  x={538 + (i % 3) * 32}
                  y={175 + Math.floor(i / 3) * 54}
                  scale={0.17}
                />
              ))
            ) : (
              <Plane x={562} y={439} scale={0.43} />
            )}
          </g>
          {mode === "ski-jump" && (
            <path
              data-progress
              d="M622 452 Q622 258 622 151 Q622 103 624 71"
              pathLength="100"
              strokeDasharray="100"
              fill="none"
              stroke="#D4A94A"
              strokeWidth="4"
            />
          )}
        </>
      );
      break;
    case "frigate":
      art = <Frigate x={78} y={14} />;
      break;
    case "replenishment":
    case "supply":
      art = (
        <>
          <TopShip x={399} y={380} carrier scale={1.35} />
          <TopShip x={817} y={380} scale={1.35} />
          <P d="M490 322 Q600 390 775 322 M490 418 Q608 480 775 418" accent />
          {mode === "supply" && (
            <>
              <P
                d="M550 336 H593 V380 H550 Z M654 351 H697 V395 H654 Z"
                fill="#3A6EA5"
              />
              <g data-moving>
                <P d="M560 453 H640" accent />
              </g>
            </>
          )}
        </>
      );
      break;
    case "command":
    case "burden":
      art = (
        <>
          <TopShip x={600} y={387} carrier scale={0.95} />
          {[
            [297, 236],
            [903, 236],
            [298, 552],
            [902, 552],
          ].map(([x, y], i) => (
            <g key={i}>
              <TopShip x={x} y={y} scale={0.38} />
              <P
                d={`M${x < 600 ? x + 35 : x - 35} ${y} L${x < 600 ? 520 : 680} ${y < 380 ? 319 : 471}`}
                accent={mode === "burden"}
              />
            </g>
          ))}
          {mode === "command" && (
            <>
              <Arc d="M526 146 Q600 80 674 146" />
              <Arc d="M549 177 Q600 133 651 177" />
            </>
          )}
        </>
      );
      break;
    case "sonar":
      art = (
        <>
          <P d="M190 312 H1010" />
          <P
            d="M371 483 Q338 483 338 518 Q338 553 377 553 H830 Q875 553 885 518 Q875 483 830 483 Z M516 483 V446 H602 V483 M543 446 V421 H572"
            fill="#315D7F"
          />
          <P d="M409 511 H788" />
          <Arc d="M609 288 Q635 344 609 397" />
          <Arc d="M667 266 Q714 344 667 416" />
          <Arc d="M727 245 Q794 344 727 438" />
        </>
      );
      break;
    case "highmast":
      art = (
        <>
          <Hull x={78} y={22} />
          <P d="M689 190 L786 163 786 239 689 263 Z" fill="#3A6EA5" />
          <P d="M689 263 V142" accent />
        </>
      );
      break;
    case "eight-months":
      art = (
        <>
          <g transform="translate(166 9) scale(.83)">
            <Hull />
          </g>
          <P d="M290 564 H913" />
          <path
            data-progress
            d="M290 564 H913"
            pathLength="100"
            strokeDasharray="100"
            fill="none"
            stroke="#D4A94A"
            strokeWidth="5"
          />
          {Array.from({ length: mode === "eight-months" ? 8 : 12 }, (_, i) => (
            <P
              key={i}
              d={`M${290 + i * (623 / (mode === "eight-months" ? 7 : 11))} 551 V579`}
            />
          ))}
        </>
      );
      break;
    case "reveal":
      art = (
        <>
          <TopShip x={600} y={391} carrier scale={1.45} />
          <g data-sweep>
            <path
              d="M600 380 L317 98 A400 400 0 0 1 891 113 Z"
              fill={`url(#${uid}-scan)`}
            />
          </g>
        </>
      );
      break;
    case "logistics":
      art = (
        <>
          <P
            d="M297 284 L577 173 889 270 610 399 Z M297 284 V507 L610 616 889 488 V270 M610 399 V616"
            fill="#305A79"
          />
          <P d="M389 246 L697 360 V561 M481 210 L798 313 V518 M339 332 V460 M386 349 V477 M432 366 V494 M479 383 V511 M525 400 V528" />
          <P d="M703 448 L801 406 V457 L703 500 Z" fill="#D4A94A" accent />
        </>
      );
      break;
    case "maintenance":
      art = (
        <>
          <Circle x={600} y={380} r={131} />
          <Circle x={600} y={380} r={57} />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 30} 600 380)`}>
              <P d="M582 249 V220 H618 V249" fill="#315D7F" />
            </g>
          ))}
          <P d="M362 524 L486 400 M715 269 L847 142" accent />
        </>
      );
      break;
    case "fuel":
      art = (
        <>
          <P
            d="M402 226 Q600 140 798 226 V544 Q600 630 402 544 Z"
            fill="#305A79"
          />
          <P d="M402 226 Q600 312 798 226 M402 262 Q600 348 798 262 M402 510 Q600 596 798 510 M402 544 Q600 458 798 544" />
          <P
            d="M602 331 Q550 397 550 421 A52 52 0 0 0 654 421 Q654 397 602 331 Z"
            fill="#D4A94A"
            accent
          />
        </>
      );
      break;
    case "ammunition":
      art = (
        <>
          <P
            d="M306 561 H895 M360 528 V248 Q360 203 385 172 Q410 203 410 248 V528 Z M504 528 V218 Q504 173 529 142 Q554 173 554 218 V528 Z M648 528 V248 Q648 203 673 172 Q698 203 698 248 V528 Z M792 528 V278 Q792 233 817 202 Q842 233 842 278 V528 Z"
            fill="#315D7F"
          />
          <P
            d="M360 290 H410 M504 260 H554 M648 290 H698 M792 320 H842"
            accent
          />
        </>
      );
      break;
    case "availability":
    case "fleet-pressure":
      art = (
        <>
          <P d="M230 153 H977 M230 607 H977 M275 153 V240 M275 520 V607 M515 153 V240 M515 520 V607 M755 153 V240 M755 520 V607 M978 153 V607" />
          {[382, 619, 858].map((x, i) => (
            <g key={i} opacity={mode === "availability" && i === 2 ? 0.25 : 1}>
              <TopShip x={x} y={380} scale={0.77} />
            </g>
          ))}
          {mode === "fleet-pressure" ? (
            <>
              <path
                data-progress
                d="M229 654 H978"
                pathLength="100"
                strokeDasharray="100"
                stroke="#C8102E"
                strokeWidth="5"
              />
              <P d="M902 192 L941 250 H864 Z" accent />
              <P d="M902 211 V229 M902 237 V239" />
            </>
          ) : (
            <P d="M812 570 H901" accent />
          )}
        </>
      );
      break;
    default:
      art = <Hull x={78} y={22} />;
  }
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-scan`}>
          <stop stopColor="#3A6EA5" stopOpacity=".02" />
          <stop offset="1" stopColor="#3A6EA5" stopOpacity=".3" />
        </radialGradient>
      </defs>
      <g data-assembly>{art}</g>
    </>
  );
};
