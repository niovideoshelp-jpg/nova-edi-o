import { useId } from "react";
import styled from "@emotion/styled";
import { Img, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";

const START = 1916;
const at = (absoluteFrame: number) => (absoluteFrame - START) / 30;
const navy = "#0B1A2E";
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
    timeline.to(q("hero-camera"), { opacity: 0, duration: 0.45 }, at(2394));

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
    timeline.to(q("atlas"), { opacity: 0, duration: 0.6 }, at(2390));
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

    // The two archive photographs form a single horizontal travelling strip.
    timeline.set(q("archive-window"), { x: 1920 }, 0);
    timeline.to(
      q("archive-window"),
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.inOut" },
      at(2391),
    );
    timeline.set(q("archive-strip"), { x: 0 }, 0);
    timeline.to(
      q("archive-strip"),
      { x: -90, duration: 1.55, ease: "none" },
      at(2405),
    );
    timeline.to(
      q("archive-strip"),
      { x: -1960, duration: 1.05, ease: "power3.inOut" },
      at(2455),
    );
    timeline.to(
      q("pow-photo"),
      { scale: 1.12, x: -75, y: 17, duration: 3.6, ease: "none" },
      at(2487),
    );
    timeline.to(
      q("archive-window"),
      { y: -780, duration: 1.0, ease: "power3.inOut" },
      at(2590),
    );
    timeline.to(q("archive-window"), { opacity: 0, duration: 0.15 }, at(2625));
    timeline.to(q("photo-credit"), { opacity: 1, duration: 0.3 }, at(2405));
    timeline.to(q("photo-credit"), { opacity: 0, duration: 0.3 }, at(2585));

    // Camera drops onto the flight deck, then follows a departing F-35B.
    timeline.set(q("deck-camera"), { y: 880, x: -130, scale: 1.24 }, 0);
    timeline.to(
      q("deck-camera"),
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.inOut" },
      at(2590),
    );
    timeline.to(
      q("deck-camera"),
      { x: -530, y: 72, scale: 1.54, duration: 3.0, ease: "power2.inOut" },
      at(2620),
    );
    timeline.fromTo(
      q("deck-path"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 2.3,
        ease: "power2.inOut",
      },
      at(2638),
    );
    timeline.to(
      q("deck-camera"),
      { x: 600, y: 310, scale: 0.79, duration: 1.7, ease: "power3.inOut" },
      at(2723),
    );
    timeline.to(q("deck-camera"), { opacity: 0, duration: 0.5 }, at(2777));
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

    // Real spinning rotors in the documentary image replace a frozen icon.
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
      q("merlin-photo"),
      { x: 100, scale: 1.1, duration: 1.8, ease: "none" },
      at(2811),
    );
    timeline.to(
      q("merlin-window"),
      { x: -1940, rotation: 2, duration: 0.78, ease: "power3.inOut" },
      at(2853),
    );
    timeline.to(q("merlin-window"), { opacity: 0, duration: 0.1 }, at(2877));

    // The escort and support images assemble into one connected environment.
    timeline.set(
      q("operations-camera"),
      {
        x: 1750,
        scale: 1.27,
        transformOrigin: "42% 56%",
      },
      0,
    );
    timeline.to(
      q("operations-camera"),
      { opacity: 1, x: 200, duration: 0.7, ease: "power3.inOut" },
      at(2851),
    );
    timeline.to(
      q("operations-camera"),
      { x: -150, scale: 1.2, duration: 1.35, ease: "power2.inOut" },
      at(2871),
    );
    timeline.to(
      q("support-window"),
      { x: -300, opacity: 1, duration: 0.7, ease: "power3.out" },
      at(2880),
    );
    timeline.to(
      q("operations-camera"),
      { x: 15, y: -10, scale: 0.85, duration: 1.2, ease: "power3.inOut" },
      at(2931),
    );
    timeline.to(
      q("operations-camera"),
      { x: -28, y: -20, scale: 0.9, duration: 2.6, ease: "none" },
      at(2967),
    );
    timeline.to(
      q("support-photo"),
      { x: -100, scale: 1.12, duration: 5.9, ease: "none" },
      at(2880),
    );
    timeline.to(
      q("escort-photo"),
      { y: -75, scale: 1.08, duration: 5.5, ease: "none" },
      at(2851),
    );
    timeline.to(q("command-lines"), { opacity: 1, duration: 0.35 }, at(2931));
    timeline.fromTo(
      q("link"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.13,
        ease: "power2.inOut",
      },
      at(2931),
    );
    timeline.fromTo(
      q("signal"),
      { strokeDashoffset: 0 },
      {
        strokeDashoffset: -120,
        duration: 3.4,
        ease: "none",
      },
      at(2965),
    );
    timeline.to(
      q("air-zone"),
      { opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" },
      at(3006),
    );
    timeline.to(
      q("air-zone"),
      { rotation: 25, duration: 1.6, ease: "none" },
      at(3010),
    );
    timeline.to(
      q("operations-camera"),
      { y: -900, scale: 0.86, duration: 1.15, ease: "power3.inOut" },
      at(3020),
    );
    timeline.to(
      q("operations-camera"),
      { opacity: 0, duration: 0.15 },
      at(3067),
    );

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
        duration: 1.1,
        ease: "power2.out",
      },
      at(3040),
    );
    for (let index = 0; index < 4; index++) {
      timeline.fromTo(
        q(`ping-${index}`),
        { scale: 0.15, opacity: 0 },
        {
          scale: 1,
          opacity: 0.7,
          duration: 1.1,
          transformOrigin: "100% 0%",
          ease: "power2.out",
        },
        at(3050) + index * 0.4,
      );
      timeline.to(
        q(`ping-${index}`),
        { scale: 1.3, opacity: 0.15, duration: 1.8, ease: "none" },
        at(3050) + index * 0.4 + 1.1,
      );
    }
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

    // Surface again onto the next real-world example; no empty reset frame.
    timeline.set(q("year-photo"), { y: 1110, scale: 1.09 }, 0);
    timeline.to(
      q("underwater"),
      { y: -1000, duration: 1.0, ease: "power3.inOut" },
      at(3215),
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
      { x: -260, opacity: 0, duration: 0.4, ease: "power2.in" },
      at(3314),
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

      <div
        data-fleet="archive-window"
        style={{
          position: "absolute",
          left: 0,
          top: 253,
          width: 1920,
          height: 825,
          overflow: "hidden",
          ...hidden,
        }}
      >
        <div
          data-fleet="archive-strip"
          style={{ position: "absolute", inset: 0, width: 3920 }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 1960,
              height: 825,
              overflow: "hidden",
            }}
          >
            <Img
              src={staticFile("images/web/queen-elizabeth.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 57%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 1960,
              top: 0,
              width: 1960,
              height: 825,
              overflow: "hidden",
            }}
          >
            <Img
              data-fleet="pow-photo"
              src={staticFile("images/web/prince-of-wales.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 45%",
                transformOrigin: "35% 58%",
              }}
            />
          </div>
        </div>
        <div
          style={{
            ...full,
            background:
              "linear-gradient(180deg, #0B1A2E30, transparent 32%, #0B1A2E70)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 5,
            background: gold,
          }}
        />
      </div>
      <div
        data-fleet="photo-credit"
        style={{
          position: "absolute",
          left: 156,
          bottom: 80,
          fontSize: 19,
          letterSpacing: ".08em",
          ...hidden,
        }}
      >
        MOD · OGL
      </div>

      <div
        data-fleet="deck-camera"
        style={{ ...full, ...hidden, transformOrigin: "45% 70%" }}
      >
        <Img
          src={staticFile("images/generated/carrier.png")}
          style={{
            position: "absolute",
            width: 2420,
            left: -350,
            top: 380,
            filter: "drop-shadow(0 40px 30px #0007)",
          }}
        />
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <path
            data-fleet="deck-path"
            d="M1580 535 C1180 530 820 536 465 565 C300 550 180 475 75 360"
            fill="none"
            stroke={gold}
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>
      </div>
      <div
        data-fleet="jet"
        style={{ ...full, ...hidden, transformOrigin: "50% 60%" }}
      >
        <Img
          src={staticFile("images/generated/f35b.png")}
          style={{
            position: "absolute",
            left: 300,
            top: 120,
            width: 1310,
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
        <Img
          data-fleet="merlin-photo"
          src={staticFile("images/web/merlin-hm2.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transformOrigin: "55% 50%",
          }}
        />
        <div
          style={{
            ...full,
            background: "linear-gradient(0deg, #0B1A2E88, transparent 35%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 50,
            bottom: 48,
            fontSize: 18,
            letterSpacing: ".08em",
          }}
        >
          MOD · OGL
        </div>
      </div>

      <div
        data-fleet="operations-camera"
        style={{ ...full, ...hidden, transformOrigin: "50% 55%" }}
      >
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 280,
            width: 740,
            height: 710,
            overflow: "hidden",
          }}
        >
          <Img
            data-fleet="escort-photo"
            src={staticFile("images/web/daring-dauntless.jpg")}
            style={{
              width: "100%",
              height: 900,
              objectFit: "cover",
              objectPosition: "50% 60%",
            }}
          />
          <div
            style={{
              ...full,
              background:
                "linear-gradient(180deg, #0B1A2E11, transparent 50%, #0B1A2Eaa)",
            }}
          />
        </div>
        <div
          data-fleet="support-window"
          style={{
            position: "absolute",
            left: 1150,
            top: 345,
            width: 970,
            height: 645,
            overflow: "hidden",
            ...hidden,
          }}
        >
          <Img
            data-fleet="support-photo"
            src={staticFile("images/web/replenishment.jpg")}
            style={{
              width: 1100,
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 43%",
            }}
          />
          <div
            style={{
              ...full,
              background:
                "linear-gradient(180deg, #0B1A2E11, transparent 50%, #0B1A2Eaa)",
            }}
          />
        </div>
        <svg
          data-fleet="command-lines"
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ ...full, ...hidden }}
        >
          <path
            data-fleet="link"
            d="M482 526 L482 253 L1305 253 L1305 524"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            stroke={gold}
            strokeWidth="4"
            fill="none"
          />
          <path
            data-fleet="link"
            d="M482 526 L780 687 L1305 524"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            stroke={white}
            strokeWidth="2.5"
            fill="none"
          />
          <path
            data-fleet="signal"
            d="M482 526 L482 253 L1305 253 L1305 524"
            strokeDasharray="3 25"
            stroke={white}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {[
            [482, 526],
            [1305, 524],
            [780, 687],
          ].map(([cx, cy]) => (
            <circle
              key={cx}
              cx={cx}
              cy={cy}
              r="10"
              fill={gold}
              stroke={navy}
              strokeWidth="4"
            />
          ))}
          <g
            data-fleet="air-zone"
            style={{ opacity: 0, scale: 0.35, transformOrigin: "482px 526px" }}
          >
            <path
              d="M125 526 A357 357 0 0 1 839 526"
              fill="none"
              stroke={gold}
              strokeWidth="3"
              strokeDasharray="5 12"
            />
            <path
              d="M202 526 A280 280 0 0 1 762 526"
              fill="none"
              stroke={white}
              strokeOpacity=".5"
              strokeWidth="2"
            />
            <path
              d="M482 526 L205 306 A353 353 0 0 1 482 172 Z"
              fill={steel}
              fillOpacity=".22"
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 125,
            top: 1010,
            fontSize: 18,
            letterSpacing: ".06em",
            opacity: 0.75,
          }}
        >
          MOD · OGL
        </div>
      </div>

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
            d="M1440 265 L1440 604 L1050 771"
            fill="none"
            stroke={gold}
            strokeWidth="3"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          {[0, 1, 2, 3].map((index) => (
            <path
              key={index}
              data-fleet={`ping-${index}`}
              d={`M${1450 - 125 - index * 74} 580 Q${1450 - 150 - index * 100} ${690 + index * 35} ${1450 - 60 - index * 75} ${775 + index * 45}`}
              stroke={index === 0 ? gold : white}
              strokeWidth={index === 0 ? 3 : 2}
              fill="none"
              style={hidden}
            />
          ))}
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
          </g>
          <path
            d="M165 960 L165 1010 L1760 1010 L1760 960"
            stroke={steel}
            strokeWidth="1.4"
            fill="none"
            opacity=".55"
          />
        </svg>
        <Img
          src={staticFile("images/generated/merlin.png")}
          style={{
            position: "absolute",
            left: 1200,
            top: 94,
            width: 495,
            filter: "drop-shadow(0 20px 15px #0006)",
          }}
        />
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
        <Img
          src={staticFile("images/web/prince-of-wales.jpg")}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2100,
            height: 1200,
            objectFit: "cover",
            objectPosition: "40% 52%",
          }}
        />
        <div
          style={{
            ...full,
            background:
              "linear-gradient(180deg, #0B1A2Ef8 0%, #0B1A2E66 35%, #0B1A2E33 73%, #0B1A2Ecc)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 160,
            bottom: 86,
            fontSize: 18,
            letterSpacing: ".08em",
          }}
        >
          MOD · OGL
        </div>
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
