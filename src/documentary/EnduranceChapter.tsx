import type { CSSProperties } from "react";
import { Img, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";

const fill: CSSProperties = { position: "absolute", inset: 0 };
const navy = "#0B1A2E";
const gold = "#D4A94A";
const allies = atlas.views.allies;
const local = (global: number) => (global - 4972) / 30;

/** One spatial argument: allied connections → independent sailing → time in dock. */
export const EnduranceChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline: t, selector: s }) => {
      t.fromTo(
        s("[data-atlantic]"),
        { scale: 1.35, x: -280, y: -260 },
        { scale: 1.1, x: -80, y: -165, duration: 3.35, ease: "power2.inOut" },
        0,
      );
      t.fromTo(
        s("[data-link]"),
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.42,
          ease: "power3.out",
        },
        local(5058),
      );
      t.fromTo(
        s("[data-country-pin]"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.38,
          transformOrigin: "center",
          ease: "expo.out",
        },
        local(5076),
      );
      t.to(
        s("[data-atlantic]"),
        { x: -580, y: -330, scale: 1.65, duration: 2.7, ease: "power2.inOut" },
        local(5142),
      );
      // The same connections gather toward the task group rather than cutting to another icon.
      t.to(
        s("[data-atlantic]"),
        {
          scale: 0.75,
          x: -300,
          y: 15,
          opacity: 0.28,
          duration: 2,
          ease: "power3.inOut",
        },
        local(5253),
      );
      t.fromTo(
        s("[data-group]"),
        { x: 2200, y: 80, scale: 1.22 },
        { x: 0, y: 0, scale: 1, duration: 1.25, ease: "power3.out" },
        local(5239),
      );
      t.fromTo(
        s("[data-cooperation]"),
        { strokeDashoffset: 100, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.8,
          duration: 1.2,
          stagger: 0.14,
          ease: "power2.out",
        },
        local(5270),
      );
      t.to(
        s("[data-group]"),
        { x: -130, y: -30, scale: 0.83, duration: 3.1, ease: "power2.inOut" },
        local(5340),
      );
      t.to(s("[data-atlantic]"), { opacity: 0, duration: 0.5 }, local(5420));
      t.to(s("[data-cooperation]"), { opacity: 0, duration: 0.5 }, local(5453));
      t.fromTo(
        s("[data-uk]"),
        { x: -470, scale: 1.5, opacity: 0 },
        { x: 0, scale: 1, opacity: 0.8, duration: 1.3, ease: "power3.out" },
        local(5440),
      );
      t.to(
        s("[data-group]"),
        { x: 420, y: 30, scale: 0.94, duration: 3.5, ease: "power2.inOut" },
        local(5453),
      );
      t.fromTo(
        s("[data-home-line]"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 3.5, ease: "none" },
        local(5480),
      );
      // Follow the vessel back through a photographic dock, then reveal the cost of time away.
      t.fromTo(
        s("[data-dock]"),
        { x: -2000 },
        { x: 0, duration: 1.2, ease: "power3.inOut" },
        local(5637),
      );
      t.to(
        s("[data-uk], [data-home-line]"),
        { opacity: 0, duration: 0.4 },
        local(5655),
      );
      t.to(
        s("[data-group]"),
        {
          x: 1020,
          scale: 1.6,
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        local(5637),
      );
      t.fromTo(
        s("[data-dock-photo]"),
        { scale: 1.34, x: -200, y: -30 },
        { scale: 1.08, x: 20, y: 10, duration: 5.8, ease: "power1.inOut" },
        local(5637),
      );
      t.fromTo(
        s("[data-sea-window]"),
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 52%)", duration: 1.6, ease: "power3.inOut" },
        local(5825),
      );
      t.fromTo(
        s("[data-sea-carrier]"),
        { x: -80, y: 45, scale: 0.84 },
        { x: 145, y: -35, scale: 1.06, duration: 5.9, ease: "power1.inOut" },
        local(5825),
      );
      t.fromTo(
        s("[data-endurance-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 5.7, ease: "none", transformOrigin: "left" },
        local(5854),
      );
      t.fromTo(
        s("[data-pressure]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          transformOrigin: "left",
        },
        local(5961),
      );
      t.fromTo(
        s("[data-question]"),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        local(5851),
      );
    },
    { dependencies: [] },
  );
  return (
    <div ref={scope} style={{ ...fill, overflow: "hidden" }}>
      <div
        data-atlantic
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1216,
          transformOrigin: "960px 608px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 77%)",
        }}
      >
        <Img
          src={staticFile(atlasLayerPath("allies", { routes: true }))}
          style={{ position: "absolute", inset: 0, width: 1920, height: 1216 }}
        />
        <svg
          viewBox="0 0 1200 760"
          width="1920"
          height="1216"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            {allies.routes.map((r, i) => (
              <mask key={r.name} id={`end-route-${i}`}>
                <path
                  data-link
                  d={r.d}
                  fill="none"
                  stroke="white"
                  strokeWidth="9"
                  pathLength={100}
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </mask>
            ))}
          </defs>
          <path
            d={allies.uk}
            fill="#3A6EA5"
            stroke="#6E8EAF"
            strokeWidth=".65"
          />
          {allies.routes.map((r, i) => (
            <g key={r.name}>
              <path
                d={r.d}
                fill="none"
                stroke={gold}
                strokeWidth="2.3"
                strokeDasharray="1 7"
                strokeLinecap="round"
                mask={`url(#end-route-${i})`}
              />
              <circle
                data-country-pin
                cx={r.to[0]}
                cy={r.to[1]}
                r="6"
                fill="#F4F7FA"
                stroke={gold}
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>
      <svg
        data-uk
        viewBox="0 0 1200 760"
        style={{
          position: "absolute",
          left: -140,
          top: 145,
          width: 1230,
          height: 780,
          opacity: 0,
        }}
      >
        <path
          d={atlas.views["uk-paint"].uk}
          fill="#3A6EA5"
          stroke="#B2C8DA"
          strokeWidth="1.5"
        />
      </svg>
      <svg viewBox="0 0 1920 1080" style={fill}>
        <path
          data-home-line
          d="M580 590 C830 760 1080 750 1370 630"
          fill="none"
          stroke={gold}
          strokeWidth="3"
          strokeDasharray="100"
          strokeDashoffset="100"
          pathLength="100"
        />
        <path
          data-cooperation
          d="M365 405 Q650 320 860 580 M260 760 Q640 820 860 580 M1360 440 Q1150 320 860 580"
          fill="none"
          stroke={gold}
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          opacity="0"
        />
      </svg>
      <div
        data-group
        style={{
          position: "absolute",
          left: 330,
          top: 330,
          width: 1280,
          height: 640,
          transform: "translateX(2200px)",
        }}
      >
        <Img
          src={staticFile("images/generated/carrier.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 32px 20px #020b1988)",
          }}
        />
      </div>
      <div
        data-dock
        style={{ ...fill, background: navy, transform: "translateX(-2000px)" }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 235,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
        >
          <Img
            data-dock-photo
            src={staticFile("images/web/prince-of-wales.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 65%",
              filter: "saturate(.5) contrast(1.08) brightness(.68)",
            }}
          />
          <div
            style={{
              ...fill,
              background:
                "linear-gradient(90deg, #0B1A2E22, transparent 45%, #0B1A2E77)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 154,
              fontSize: 17,
              color: "#F4F7FAaa",
            }}
          >
            Alex Ceolin / UK MOD · OGL
          </div>
        </div>
        <div
          data-sea-window
          style={{
            ...fill,
            background:
              "radial-gradient(ellipse at 75% 55%, #29496B, #0B1A2E 75%)",
            clipPath: "inset(0 0 0 100%)",
          }}
        >
          <Img
            data-sea-carrier
            src={staticFile("images/generated/carrier.png")}
            style={{ position: "absolute", width: 1100, left: 900, top: 400 }}
          />
          <div
            style={{
              position: "absolute",
              left: 998,
              top: 240,
              width: 2,
              height: 720,
              background: "#F4F7FA30",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 154,
            top: 890,
            right: 154,
            height: 7,
            background: "#F4F7FA33",
          }}
        >
          <div
            data-endurance-line
            style={{ ...fill, background: gold, transform: "scaleX(0)" }}
          />
          <div
            data-pressure
            style={{
              position: "absolute",
              left: "65%",
              right: 0,
              top: 0,
              bottom: 0,
              background: "#C8102E",
              transform: "scaleX(0)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 154,
            top: 117,
            height: 130,
            overflow: "hidden",
          }}
        >
          <div
            data-question
            style={{
              fontSize: 94,
              fontWeight: 650,
              letterSpacing: "-.05em",
              color: "#F4F7FA",
              opacity: 0,
            }}
          >
            How long?
          </div>
        </div>
      </div>
    </div>
  );
};
