import { useId } from "react";
import { Img, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";

const gold = "#D4A94A";
const white = "#F4F7FA";
const world = atlas.views.distance;
const route = world.routes[0];
const sec = (absoluteFrame: number) => (absoluteFrame - 3326) / 30;

/**
 * One continuous editorial camera for Operation Highmast and its supply chain.
 * Geography and geodesic samples are frozen Natural Earth / Turf output.
 * The line illustrates reach; it is not a claimed navigation track.
 */
export const OperationsChapter = () => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const el = (name: string) => selector(`[data-ops="${name}"]`);
      // All environments stay mounted. Their shared movement carries the edit,
      // instead of making every three-second annotation restart an entrance.
      timeline.fromTo(
        el("map"),
        { opacity: 1 },
        { opacity: 1, duration: 0.1 },
        0,
      );
      timeline.fromTo(
        el("map-camera"),
        { scale: 2.05, x: -1040, y: -25.6, transformOrigin: "0 0" },
        { scale: 1.85, x: -864, y: -8, duration: 3.7, ease: "none" },
        0,
      );
      timeline.to(
        el("map-camera"),
        { scale: 1.15, x: -168, y: 96, duration: 1.7, ease: "power3.inOut" },
        sec(3437),
      );
      timeline.to(
        el("map-camera"),
        { scale: 1.67, x: -1400, y: -176, duration: 2.3, ease: "power3.inOut" },
        sec(3552) - 0.8,
      );
      timeline.to(
        el("map-camera"),
        { scale: 2.3, x: -1392, y: -272, duration: 1.55, ease: "power3.inOut" },
        sec(3658) - 0.7,
      );
      timeline.fromTo(
        el("route-mask"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 7.8, ease: "none" },
        2.1,
      );
      timeline.fromTo(
        el("route-pulse"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -180, duration: 12.8, ease: "none" },
        0,
      );
      route.samples.slice(1).forEach((p, i) => {
        timeline.to(
          el("position"),
          { attr: { cx: p[0], cy: p[1] }, duration: 7.8 / 24, ease: "none" },
          2.1 + (i * 7.8) / 24,
        );
      });
      timeline.fromTo(
        el("month-rule"),
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power3.out" },
        sec(3437),
      );
      timeline.fromTo(
        selector("[data-month]"),
        { scaleY: 0, opacity: 0, transformOrigin: "center bottom" },
        {
          scaleY: 1,
          opacity: 1,
          stagger: 0.085,
          duration: 0.45,
          ease: "power3.out",
        },
        sec(3437) + 0.12,
      );
      timeline.to(
        el("months"),
        { y: 60, opacity: 0, duration: 0.4, ease: "power2.in" },
        sec(3552),
      );
      timeline.fromTo(
        el("mission-carrier"),
        { x: -90, y: 15, scale: 1.06 },
        { x: 150, y: -25, scale: 0.92, duration: 8.5, ease: "none" },
        0,
      );
      timeline.to(
        el("mission-carrier"),
        {
          x: 490,
          y: -125,
          scale: 0.28,
          opacity: 0,
          duration: 1.3,
          ease: "power3.inOut",
        },
        8.5,
      );

      // A close F-35 becomes the first unit of the visual count, then the camera
      // pulls back to reveal the complete 24-aircraft arrangement.
      timeline.fromTo(
        el("airwing"),
        { opacity: 0, x: 550 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        sec(3713) - 0.2,
      );
      timeline.to(
        el("map"),
        { x: -190, opacity: 0, duration: 0.75, ease: "power3.inOut" },
        sec(3713),
      );
      timeline.fromTo(
        el("jet-hero"),
        { x: 60, y: 70, scale: 1.08 },
        { x: -10, y: -20, scale: 1.015, duration: 2.7, ease: "none" },
        sec(3713),
      );
      timeline.to(
        el("jet-hero"),
        { x: -555, y: -155, scale: 0.185, duration: 1.2, ease: "power3.inOut" },
        sec(3842) - 0.8,
      );
      timeline.to(
        el("jet-hero"),
        { opacity: 0, duration: 0.15 },
        sec(3842) + 0.3,
      );
      timeline.fromTo(
        el("airwing-grid"),
        { scale: 1.4, x: 130, y: 125 },
        { scale: 1, x: 0, y: 0, duration: 2.5, ease: "power3.inOut" },
        sec(3842) - 0.8,
      );
      timeline.fromTo(
        selector("[data-aircraft]"),
        { opacity: 0, x: 70, y: 45, scale: 0.85 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.055,
          ease: "power3.out",
        },
        sec(3842) - 0.15,
      );
      timeline.to(
        el("airwing-grid"),
        { x: 95, y: -8, scale: 1.065, duration: 2.2, ease: "none" },
        sec(3842) + 1.7,
      );
      timeline.to(
        el("airwing"),
        {
          x: -570,
          scale: 0.73,
          opacity: 0,
          duration: 0.9,
          ease: "power3.inOut",
        },
        sec(3954) - 0.2,
      );

      // Match the aircraft's direction into a close crop of the carrier.
      timeline.fromTo(
        el("deck"),
        { x: 750, opacity: 0, scale: 1.35 },
        { x: 0, opacity: 1, scale: 1, duration: 1.15, ease: "power3.inOut" },
        sec(3954) - 0.4,
      );
      timeline.fromTo(
        el("deck-carrier"),
        { x: 170, y: 50, scale: 1.08 },
        { x: -95, y: -25, scale: 1.18, duration: 3.7, ease: "none" },
        sec(3954),
      );
      timeline.to(
        el("deck-carrier"),
        { x: -150, y: -45, scale: 1.28, duration: 3.8, ease: "power3.inOut" },
        sec(4065),
      );
      timeline.to(
        el("deck"),
        {
          scale: 0.16,
          x: 600,
          y: 135,
          opacity: 0,
          duration: 1.3,
          ease: "power3.inOut",
        },
        sec(4183) - 0.35,
      );

      // The pull-out explains the first finding: a fleet operating across a world
      // map. The same geodesic then becomes a visible logistics connection.
      timeline.set(el("map"), { x: 0 }, sec(4183) - 0.5);
      timeline.set(
        el("map-camera"),
        { scale: 2.7, x: -2944, y: -832 },
        sec(4183) - 0.5,
      );
      timeline.to(el("map"), { opacity: 1, duration: 1 }, sec(4183) - 0.5);
      timeline.to(
        el("map-camera"),
        { scale: 1.12, x: -139.2, y: 56, duration: 3.2, ease: "power3.inOut" },
        sec(4183) - 0.4,
      );
      timeline.to(
        el("map-camera"),
        { scale: 1.2, x: -227.2, y: 12.8, duration: 4.4, ease: "none" },
        sec(4295),
      );
      timeline.to(
        el("route-pulse"),
        { strokeDashoffset: -750, duration: 11.6, ease: "none" },
        sec(4183),
      );
      timeline.fromTo(
        el("remote-carrier"),
        { opacity: 0, x: 70, y: 30, scale: 0.85 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out" },
        sec(4295) - 0.3,
      );
      timeline.to(
        el("remote-carrier"),
        { x: 38, y: -18, scale: 1.05, duration: 6.3, ease: "none" },
        sec(4295) + 0.7,
      );
      timeline.to(
        el("remote-carrier"),
        { x: 45, y: -170, scale: 1.45, duration: 1.5, ease: "power3.inOut" },
        sec(4494) - 0.5,
      );
      timeline.to(
        el("map"),
        {
          opacity: 0.1,
          y: 180,
          scale: 1.18,
          duration: 1.3,
          ease: "power3.inOut",
        },
        sec(4494) - 0.5,
      );
      timeline.fromTo(
        el("supply"),
        { opacity: 0, x: -290, y: 120, scale: 0.7 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        sec(4494) - 0.12,
      );
      timeline.fromTo(
        el("supply-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.7, ease: "power3.out" },
        sec(4543) - 0.12,
      );
      timeline.fromTo(
        el("fuel-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power3.out" },
        sec(4569) - 0.12,
      );
      timeline.fromTo(
        el("ammo-line"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power3.out" },
        sec(4589) - 0.12,
      );
      timeline.fromTo(
        el("flow"),
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        sec(4569),
      );
      timeline.fromTo(
        el("flow"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -220, duration: 7.5, ease: "none" },
        sec(4569),
      );
      timeline.to(
        el("supply"),
        { x: 35, y: -25, scale: 1.06, duration: 6, ease: "none" },
        sec(4494) + 1,
      );
      timeline.fromTo(
        el("escort"),
        { x: 170, y: 100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        sec(4615) - 0.12,
      );
      timeline.to(
        el("escort"),
        { x: -70, y: -25, duration: 5.5, ease: "none" },
        sec(4615) + 0.7,
      );
      // Expand the transfer hose into the documentary photograph of the same
      // physical action. It lasts through the handoff to the allies chapter.
      timeline.fromTo(
        el("replenishment"),
        { clipPath: "inset(50% 43% 49% 43%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.55,
          ease: "power3.inOut",
        },
        sec(4770) - 0.45,
      );
      timeline.fromTo(
        el("replenishment-image"),
        { scale: 1.24, x: -80, y: 40 },
        { scale: 1.04, x: 15, y: 0, duration: 7.4, ease: "power2.out" },
        sec(4770) - 0.45,
      );
      timeline.to(
        el("supply"),
        { x: -310, opacity: 0, duration: 1, ease: "power3.inOut" },
        sec(4770) - 0.45,
      );
      timeline.to(
        el("remote-carrier"),
        { x: 370, opacity: 0, duration: 1, ease: "power3.inOut" },
        sec(4770) - 0.45,
      );
      timeline.to(el("escort"), { opacity: 0, duration: 0.4 }, sec(4770));
      timeline.to(
        el("supply-network"),
        { opacity: 0, duration: 0.5 },
        sec(4770),
      );
    },
    { dependencies: [uid] },
  );

  return (
    <div
      ref={scope}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div data-ops="map" style={{ position: "absolute", inset: 0 }}>
        <div
          data-ops="map-camera"
          style={{ position: "absolute", inset: 0, transformOrigin: "0 0" }}
        >
          <Img
            src={staticFile(atlasLayerPath("distance"))}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 1920,
              height: 1216,
            }}
          />
          <svg
            width="1920"
            height="1080"
            viewBox="0 0 1200 675"
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <mask id={`${uid}-route`}>
                <path
                  data-ops="route-mask"
                  d={route.d}
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </mask>
            </defs>
            <g>
              <path
                d={world.uk}
                fill={gold}
                stroke="#698399"
                strokeWidth=".65"
              />
              <path
                d={route.d}
                fill="none"
                stroke={gold}
                strokeWidth="2.2"
                strokeDasharray="1 5"
                strokeLinecap="round"
                mask={`url(#${uid}-route)`}
              />
              <path
                data-ops="route-pulse"
                d={route.d}
                fill="none"
                stroke={white}
                strokeWidth="1.35"
                strokeDasharray="6 100"
                strokeLinecap="round"
                mask={`url(#${uid}-route)`}
              />
              <circle
                cx={route.from[0]}
                cy={route.from[1]}
                r="5"
                fill={gold}
                stroke="#0B1A2E"
                strokeWidth="2"
              />
              <circle
                data-ops="position"
                cx={route.from[0]}
                cy={route.from[1]}
                r="4.5"
                fill={white}
                stroke={gold}
                strokeWidth="1.5"
              />
              <circle cx={route.to[0]} cy={route.to[1]} r="4" fill={gold} />
            </g>
          </svg>
        </div>
      </div>
      <div
        data-ops="mission-carrier"
        style={{
          position: "absolute",
          left: 220,
          top: 380,
          width: 1080,
          filter: "drop-shadow(0 34px 25px #0007)",
        }}
      >
        <Img
          src={staticFile("images/generated/carrier.png")}
          style={{ width: "100%" }}
        />
      </div>
      <div
        data-ops="months"
        style={{
          position: "absolute",
          left: 320,
          top: 910,
          width: 1280,
          height: 70,
        }}
      >
        <div
          data-ops="month-rule"
          style={{
            height: 2,
            background: "#F4F7FA66",
            width: "100%",
            transform: "scaleX(0)",
          }}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            data-month={i}
            style={{
              position: "absolute",
              width: 90,
              height: 32,
              top: -15,
              left: i * 164,
              borderLeft: `3px solid ${gold}`,
              background: "linear-gradient(90deg, #D4A94A55, transparent)",
              opacity: 0,
            }}
          />
        ))}
      </div>
      <div
        data-ops="airwing"
        style={{ position: "absolute", inset: 0, opacity: 0 }}
      >
        <div
          data-ops="jet-hero"
          style={{
            position: "absolute",
            left: 265,
            top: 220,
            width: 1390,
            filter: "drop-shadow(0 28px 24px #0008)",
            transformOrigin: "center",
          }}
        >
          <Img
            src={staticFile("images/generated/f35b.png")}
            style={{ width: "100%" }}
          />
        </div>
        <div
          data-ops="airwing-grid"
          style={{
            position: "absolute",
            left: 210,
            top: 300,
            width: 1510,
            height: 680,
            transformOrigin: "center",
          }}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              data-aircraft={i}
              style={{
                position: "absolute",
                left: (i % 6) * 242,
                top: Math.floor(i / 6) * 163,
                width: 218,
                height: 150,
                opacity: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 23,
                  right: 19,
                  bottom: 10,
                  height: 1,
                  background: "#F4F7FA33",
                }}
              />
              <Img
                src={staticFile("images/generated/f35b.png")}
                style={{
                  width: "100%",
                  filter: "drop-shadow(0 9px 6px #0008)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        data-ops="deck"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transformOrigin: "72% 60%",
        }}
      >
        <div
          data-ops="deck-carrier"
          style={{
            position: "absolute",
            width: 1810,
            left: 55,
            top: 165,
            filter: "drop-shadow(0 45px 32px #0008)",
          }}
        >
          <Img
            src={staticFile("images/generated/carrier.png")}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div
        data-ops="remote-carrier"
        style={{
          position: "absolute",
          left: 1030,
          top: 555,
          width: 690,
          opacity: 0,
          filter: "drop-shadow(0 25px 18px #0007)",
        }}
      >
        <Img
          src={staticFile("images/generated/carrier.png")}
          style={{ width: "100%" }}
        />
      </div>
      <div
        data-ops="supply"
        style={{
          position: "absolute",
          left: 120,
          top: 330,
          width: 820,
          opacity: 0,
          filter: "drop-shadow(0 20px 15px #0009)",
        }}
      >
        <Img
          src={staticFile("images/generated/logistics.png")}
          style={{ width: "100%" }}
        />
      </div>
      <svg
        data-ops="supply-network"
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          data-ops="supply-line"
          d="M710 585 C945 585 930 550 1150 550"
          fill="none"
          stroke={white}
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
        <path
          data-ops="fuel-line"
          d="M745 680 C1010 680 920 600 1190 600"
          fill="none"
          stroke={gold}
          strokeWidth="7"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
        <path
          data-ops="ammo-line"
          d="M735 790 C1030 790 920 650 1220 650"
          fill="none"
          stroke="#7CA8CB"
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
        <path
          data-ops="flow"
          d="M745 680 C1010 680 920 600 1190 600"
          fill="none"
          stroke={white}
          strokeWidth="4"
          strokeDasharray="4 34"
          strokeLinecap="round"
          opacity="0"
        />
      </svg>
      <div
        data-ops="escort"
        style={{
          position: "absolute",
          left: 1190,
          top: 705,
          width: 490,
          height: 255,
          overflow: "hidden",
          opacity: 0,
          borderTop: `3px solid ${gold}`,
          transform: "rotate(-4deg)",
        }}
      >
        <Img
          src={staticFile("images/web/daring-dauntless.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 69%",
          }}
        />
      </div>
      <div
        data-ops="replenishment"
        style={{
          position: "absolute",
          left: 135,
          top: 260,
          width: 1650,
          height: 720,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <Img
          data-ops="replenishment-image"
          src={staticFile("images/web/replenishment.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 48%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,#0B1A2E00 70%,#0B1A2E55)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, #0B1A2E 0%, #0B1A2Eee 7%, #0B1A2E00 29%, #0B1A2E00 88%, #0B1A2E77 100%)",
        }}
      />
    </div>
  );
};
