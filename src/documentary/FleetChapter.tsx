import { useId } from "react";
import styled from "@emotion/styled";
import { Img, Sequence, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";
import { FleetSystems, FleetCarrierPlan } from "./FleetSystems";
import { FootageShot } from "./FootageShot";
import { FleetHelicopter } from "./FleetHelicopter";

const START = 1916;
const at = (absoluteFrame: number) => (absoluteFrame - START) / 30;
const white = "#F4F7FA";
const gold = "#D4A94A";
const steel = "#3A6EA5";
const full = { position: "absolute", inset: 0 } as const;
const hidden = { opacity: 0 };

const Stage = styled.div({
  ...full,
  overflow: "hidden",
  color: white,
  fontFamily: "Inter, sans-serif",
  background: "radial-gradient(ellipse at 58% 68%, #18374f 0%, #0B1A2E 70%)",
});

/**
 * One 47-second camera journey. The image field survives the editorial cues;
 * the original word-anchored title Sequences are composed above it by Film.
 * All animation is authored on the official frame-seeked GSAP timeline.
 */
export function FleetChapter() {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    const q = (name: string) => selector(`[data-fleet="${name}"]`);

    // Initial states must be placed at t=0. An omitted position appends a set
    // after the preceding shot and can move an already visible layer offscreen.

    // Begin with a travelling close-up; the second shot is the same ship.
    timeline.set(q("hero-camera"), { x: -38, y: 6, scale: 1.248 }, 0);
    timeline.to(
      q("hero-camera"),
      {
        x: -45,
        y: 8,
        scale: 1.255,
        duration: 0.65,
        ease: "none",
      },
      0,
    );
    timeline.to(
      q("hero-camera"),
      {
        x: -74,
        y: 15,
        scale: 1.285,
        duration: 2.68,
        ease: "none",
      },
      0.65,
    );
    timeline.to(
      q("hero-camera"),
      {
        x: -220,
        y: 110,
        scale: 1.52,
        duration: 1.1,
        ease: "power3.inOut",
      },
      at(2016),
    );
    timeline.to(
      q("hero-camera"),
      {
        x: -375,
        y: 116,
        scale: 1.57,
        duration: 2.67,
        ease: "none",
      },
      at(2016) + 1.1,
    );
    timeline.to(
      q("hero-camera"),
      {
        x: 290,
        y: 125,
        scale: 0.66,
        duration: 1.1,
        ease: "power3.inOut",
      },
      at(2129),
    );
    timeline.to(
      q("hero-camera"),
      {
        x: 170,
        y: 96,
        scale: 0.65,
        duration: 2.3,
        ease: "none",
      },
      at(2129) + 1.1,
    );
    timeline.to(
      q("hero-camera"),
      {
        x: -260,
        y: 8,
        scale: 0.43,
        duration: 2.7,
        ease: "power2.inOut",
      },
      at(2226),
    );
    timeline.to(
      q("hero-camera"),
      {
        x: -795,
        y: -3,
        scale: 0.36,
        duration: 2.0,
        ease: "power2.inOut",
      },
      at(2309),
    );
    timeline.to(q("hero-camera"), { opacity: 0, duration: 0.45 }, at(2408));

    timeline.set(
      q("wake"),
      {
        scaleX: 0.05,
        opacity: 0.2,
        transformOrigin: "0% 50%",
      },
      0,
    );
    timeline.to(
      q("wake"),
      { scaleX: 1, opacity: 0.7, duration: 3.3, ease: "none" },
      0,
    );
    timeline.to(
      q("wake"),
      { x: -360, opacity: 0, duration: 3.3, ease: "power2.in" },
      at(2129),
    );
    timeline.set(q("atlas"), { x: -180, y: 60, scale: 1.2 }, 0);
    timeline.to(q("atlas"), { opacity: 0.72, duration: 1.0 }, at(2129));
    timeline.to(
      q("atlas"),
      { x: -50, y: 30, scale: 1.08, duration: 3.3, ease: "power2.inOut" },
      at(2129),
    );
    timeline.to(
      q("atlas"),
      { x: -240, y: 30, scale: 1.24, duration: 3.8, ease: "power2.inOut" },
      at(2226),
    );
    timeline.to(
      q("atlas"),
      { x: -440, scale: 1.35, duration: 2.5, ease: "none" },
      at(2334),
    );
    timeline.to(q("atlas"), { opacity: 0, duration: 0.6 }, at(2410));
    timeline.fromTo(
      q("ocean-course"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 3.3,
        ease: "power2.inOut",
      },
      at(2226),
    );
    timeline.fromTo(
      q("course-dot"),
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        transformOrigin: "50% 50%",
        ease: "power3.out",
      },
      at(2298),
    );

    // A physical flight continues from the real deck footage into the cutout.
    timeline.set(q("jet"), { x: 1200, y: -350, scale: 0.6, rotation: -17 }, 0);
    timeline.to(
      q("jet"),
      {
        opacity: 1,
        x: 150,
        y: -80,
        scale: 1.02,
        rotation: -2,
        duration: 0.68,
        ease: "power3.out",
      },
      at(2759),
    );
    timeline.to(
      q("jet"),
      {
        x: -180,
        y: 110,
        scale: 1.13,
        rotation: 4,
        duration: 0.85,
        ease: "none",
      },
      at(2759) + 0.68,
    );
    timeline.to(
      q("jet"),
      {
        x: -1540,
        y: 820,
        scale: 1.45,
        rotation: 9,
        duration: 0.8,
        ease: "power2.in",
      },
      at(2805),
    );
    timeline.to(q("jet"), { opacity: 0, duration: 0.1 }, at(2831));

    // Rotor motion belongs to the aircraft and continues during the camera move.
    timeline.set(q("merlin-window"), { x: 1940, y: 50, rotation: -4 }, 0);
    timeline.to(
      q("merlin-window"),
      {
        opacity: 1,
        x: 200,
        y: 0,
        rotation: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      at(2811),
    );
    timeline.to(
      q("merlin-window"),
      { x: -1940, rotation: 2, duration: 0.78, ease: "power3.inOut" },
      at(2853),
    );
    timeline.to(q("merlin-window"), { opacity: 0, duration: 0.1 }, at(2877));

    // Escort, support and command are one aligned animated system.

    // Crossing the waterline is a spatial transition into the sonar diagram.
    timeline.set(q("underwater"), { y: 980 }, 0);
    timeline.to(
      q("underwater"),
      { y: 0, opacity: 1, duration: 1.15, ease: "power3.inOut" },
      at(3020),
    );
    timeline.fromTo(
      q("sonar-line"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      at(3029),
    );
    for (let index = 0; index < 4; index++) {
      timeline.fromTo(
        q(`ping-${index}`),
        { attr: { r: 0 }, opacity: 0.7 },
        {
          attr: { r: 590 },
          opacity: 0,
          duration: 2.2,
          repeat: 1,
          ease: "none",
        },
        at(3050) + index * 0.45,
      );
    }
    timeline.to(q("sonar-sonde"), { opacity: 1, duration: 0.15 }, at(3047));
    timeline.to(
      q("propeller"),
      { attr: { transform: "rotate(2880)" }, duration: 6.4, ease: "none" },
      at(3040),
    );
    timeline.to(
      q("sub-wake"),
      { strokeDashoffset: -250, duration: 6.4, ease: "none" },
      at(3040),
    );
    timeline.set(q("submarine"), { x: 280, y: 85, scale: 0.83 }, 0);
    timeline.to(
      q("submarine"),
      { x: -95, y: 18, scale: 1.08, duration: 3.1, ease: "power2.inOut" },
      at(3040),
    );
    timeline.to(
      q("submarine"),
      { x: -415, y: -25, scale: 1.24, duration: 2.7, ease: "none" },
      at(3133),
    );
    timeline.to(
      q("underwater"),
      { x: -100, scale: 1.055, duration: 3.0, ease: "none" },
      at(3138),
    );

    timeline.fromTo(
      q("departure-course"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 3.4, ease: "power2.inOut" },
      at(3223),
    );
    timeline.to(
      q("departure-wake"),
      { strokeDashoffset: -180, duration: 4.5, ease: "none" },
      at(3223),
    );
    timeline.to(
      q("departure-ship"),
      {
        attr: { transform: "translate(825 656) scale(1.72)" },
        duration: 4.5,
        ease: "none",
      },
      at(3223),
    );

    // Surface into the deployment diagram and retain it through the chapter handoff.
    timeline.set(q("year-photo"), { y: 1110, scale: 1.09 }, 0);
    timeline.to(
      q("underwater"),
      { y: -1000, duration: 1.0, ease: "power3.inOut" },
      at(3215),
    );
    timeline.to(
      q("underwater"),
      { opacity: 0, duration: 0.2, ease: "power2.out" },
      at(3241),
    );
    timeline.to(
      q("year-photo"),
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.inOut" },
      at(3215),
    );
    timeline.to(
      q("year-photo"),
      { x: -90, scale: 1.04, duration: 2.4, ease: "none" },
      at(3245),
    );
    timeline.to(
      q("year-photo"),
      { x: -118, scale: 1.06, duration: 1.1, ease: "none" },
      at(3317),
    );
  });

  const ocean = atlas.views["home-range"];
  return (
    <Stage ref={scope} data-documentary-chapter="fleet">
      <svg
        data-fleet="wake"
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={full}
      >
        <path
          d="M-50 865 C420 830 1020 745 1970 792"
          fill="none"
          stroke={steel}
          strokeWidth="2"
        />
        <path
          d="M-50 907 C580 872 1160 788 1990 841"
          fill="none"
          stroke={white}
          strokeOpacity=".18"
          strokeWidth="1"
        />
      </svg>

      <div
        data-fleet="atlas"
        style={{ ...full, ...hidden, transformOrigin: "50% 60%" }}
      >
        <Img
          src={staticFile(atlasLayerPath("home-range"))}
          style={{ ...full, width: 1920, height: 1080, objectFit: "contain" }}
        />
        <svg width="1920" height="1080" viewBox="0 0 1200 760" style={full}>
          <path d={ocean.uk} fill={gold} stroke="#7598ae" strokeWidth=".75" />
          <path
            data-fleet="ocean-course"
            d={ocean.routes[0]?.d ?? ""}
            pathLength="100"
            stroke={gold}
            strokeWidth="3"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <circle
            data-fleet="course-dot"
            cx={ocean.routes[0]?.point[0] ?? 0}
            cy={ocean.routes[0]?.point[1] ?? 0}
            r="8"
            fill={gold}
            style={hidden}
          />
        </svg>
      </div>

      <div
        data-fleet="hero-camera"
        style={{ ...full, transformOrigin: "50% 60%", willChange: "transform" }}
      >
        <Img
          src={staticFile("images/generated/carrier.png")}
          style={{
            position: "absolute",
            left: 165,
            top: 300,
            width: 1660,
            height: 720,
            objectFit: "contain",
            filter: "drop-shadow(0 45px 40px #020c18aa)",
          }}
        />
      </div>

      <Sequence from={2405 - START} durationInFrames={92} layout="none">
        <FootageShot
          asset="qe-arrival"
          durationInFrames={92}
          direction="port"
          holdExit
        />
      </Sequence>
      <Sequence from={2455 - START} durationInFrames={170} layout="none">
        <FootageShot
          asset="pow-arrival"
          durationInFrames={170}
          direction="starboard"
          holdExit
        />
      </Sequence>
      <Sequence from={2603 - START} durationInFrames={174} layout="none">
        <FootageShot
          asset="f35-landing"
          durationInFrames={174}
          direction="deck"
        />
      </Sequence>

      <div
        data-fleet="jet"
        style={{ ...full, ...hidden, transformOrigin: "50% 60%" }}
      >
        <Img
          src={staticFile("images/generated/f35b.png")}
          style={{
            position: "absolute",
            left: 320,
            top: 190,
            width: 1180,
            filter: "drop-shadow(40px 90px 38px #02091580)",
          }}
        />
      </div>

      <div
        data-fleet="merlin-window"
        style={{
          position: "absolute",
          left: 0,
          top: 225,
          width: 1620,
          height: 855,
          overflow: "hidden",
          ...hidden,
        }}
      >
        <FleetHelicopter left={160} top={40} scale={2.4} startFrame={2811} />
      </div>

      <FleetSystems />

      <div
        data-fleet="underwater"
        style={{ ...full, ...hidden, transformOrigin: "55% 65%" }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <defs>
            <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#315c7c" />
              <stop offset=".52" stopColor="#102e48" />
              <stop offset="1" stopColor="#071626" />
            </linearGradient>
            <linearGradient id={`${uid}-hull`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7795a5" />
              <stop offset=".18" stopColor="#4c6b7e" />
              <stop offset=".46" stopColor="#233f52" />
              <stop offset="1" stopColor="#0c2134" />
            </linearGradient>
          </defs>
          <path
            d="M0 375 C180 361 350 385 550 375 C780 364 925 385 1130 374 C1400 360 1650 390 1920 372 L1920 1080 L0 1080Z"
            fill={`url(#${uid}-sea)`}
          />
          <path
            d="M0 375 C180 361 350 385 550 375 C780 364 925 385 1130 374 C1400 360 1650 390 1920 372"
            fill="none"
            stroke={white}
            strokeOpacity=".64"
            strokeWidth="2.5"
          />
          <path
            data-fleet="sonar-line"
            d="M1416 286 L1416 590"
            fill="none"
            stroke={gold}
            strokeWidth="3"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <defs>
            <clipPath id={`${uid}-undersea`}>
              <rect x="0" y="375" width="1920" height="705" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-undersea)`}>
            {[0, 1, 2, 3].map((index) => (
              <circle
                key={index}
                data-fleet={`ping-${index}`}
                cx="1416"
                cy="590"
                r="0"
                fill="none"
                stroke={index === 0 ? gold : white}
                strokeWidth={index === 0 ? 2.5 : 1.5}
                style={hidden}
              />
            ))}
          </g>
          <g data-fleet="sonar-sonde" style={hidden}>
            <ellipse
              cx="1416"
              cy="595"
              rx="11"
              ry="19"
              fill="#B7CBD6"
              stroke={gold}
              strokeWidth="2"
            />
            <path d="M1404 604 L1428 604" stroke={gold} strokeWidth="3" />
          </g>
          <g data-fleet="submarine">
            <path
              d="M357 748 C400 698 477 679 593 679 L1265 692 C1330 695 1368 717 1412 737 L1478 755 L1423 774 C1360 805 1327 819 1262 820 L565 819 C474 818 402 792 357 748Z"
              fill={`url(#${uid}-hull)`}
              stroke="#7695a8"
              strokeWidth="2"
            />
            <path
              d="M690 684 L695 628 Q698 612 713 609 L770 609 Q786 612 788 629 L798 687"
              fill="#3b586b"
              stroke="#7695a8"
              strokeWidth="2"
            />
            <path
              d="M724 609 L724 590 L729 590 L729 608 M750 609 L750 578 L756 578 L756 608"
              fill="none"
              stroke="#b8c7ce"
              strokeWidth="3"
            />
            <path
              d="M1377 735 L1436 678 L1451 678 L1430 746 M1378 777 L1437 833 L1450 833 L1430 766"
              fill="#28485f"
              stroke="#7595a8"
              strokeWidth="2"
            />
            <path
              d="M554 737 L673 711 L668 735 L576 763Z"
              fill="#1a3449"
              stroke="#69879a"
              strokeWidth="1.5"
            />
            <path
              d="M376 747 C576 722 860 715 1264 727"
              fill="none"
              stroke="#a6bac6"
              strokeOpacity=".38"
              strokeWidth="2"
            />
            <path
              d="M402 769 C598 794 919 792 1280 790"
              fill="none"
              stroke="#041321"
              strokeOpacity=".7"
              strokeWidth="3"
            />
            <path
              d="M476 697 C507 731 508 777 475 803 M1244 692 C1270 730 1271 783 1247 821"
              fill="none"
              stroke="#59798d"
              strokeOpacity=".6"
              strokeWidth="1.5"
            />
            <circle cx="735" cy="651" r="4" fill={white} fillOpacity=".48" />
            <g transform="translate(1482 755) scale(.23 1)">
              <g data-fleet="propeller" transform="rotate(0)" fill="#8FAABA">
                <path d="M-4 -3 Q-35 -43 -8 -42 L5 -5 Q43 -35 42 -8 L5 5 Q35 43 8 42 L-5 5 Q-43 35 -42 8Z" />
              </g>
            </g>
            <path
              data-fleet="sub-wake"
              d="M1500 746 L1700 743 M1500 755 L1750 755 M1500 764 L1700 767"
              stroke="#7EA5BC"
              strokeOpacity=".32"
              strokeWidth="2"
              strokeDasharray="28 20"
              fill="none"
            />
          </g>
          <path
            d="M165 960 L165 1010 L1760 1010 L1760 960"
            stroke={steel}
            strokeWidth="1.4"
            fill="none"
            opacity=".55"
          />
        </svg>
        <FleetHelicopter />
      </div>

      <div
        data-fleet="year-photo"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          ...hidden,
          transformOrigin: "55% 60%",
        }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <path
            data-fleet="departure-course"
            d="M1790 727 C1420 727 1240 672 1050 660 L144 660"
            fill="none"
            stroke={gold}
            strokeWidth="2.5"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <path
            data-fleet="departure-wake"
            d="M1160 692 C1390 698 1610 751 1990 751 M1160 634 C1400 628 1630 690 1990 690"
            fill="none"
            stroke={steel}
            strokeWidth="2"
            strokeDasharray="42 24"
          />
          <g
            data-fleet="departure-ship"
            transform="translate(950 656) scale(1.72)"
          >
            <FleetCarrierPlan />
          </g>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 300,
          background:
            "linear-gradient(180deg, #0B1A2Eec 0%, #0B1A2Eb0 62%, #0B1A2E00 100%)",
          pointerEvents: "none",
        }}
      />
    </Stage>
  );
}
