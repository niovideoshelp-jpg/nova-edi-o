import { useId } from "react";
import { Img, Sequence, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../../data/geography/atlas.json";
import { atlasLayerPath } from "./Atlas";
import { NavalProfile, VesselPlan } from "./NavalDiagramsV5";
import { FootageShot } from "./FootageShot";

const fill = { position: "absolute" as const, inset: 0 };
const gold = "#D4A94A";
const white = "#F4F7FA";
const allies = atlas.views.allies;
const local = (globalFrame: number) => (globalFrame - 4972) / 30;

/** Partners become a coordinated group; one operating cycle explains availability. */
export const EnduranceChapter = () => {
  const uid = useId().replace(/:/g, "");
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline: t, selector: s }) => {
      const q = (n: string) => s(`[data-end="${n}"]`);
      t.set(
        q("atlantic-camera"),
        { scale: 1.15, x: -145, y: -80, transformOrigin: "0 0" },
        0,
      );
      t.to(
        q("atlantic-camera"),
        { scale: 1.02, x: -8, y: -45, duration: 3.3, ease: "power2.inOut" },
        0,
      );
      t.fromTo(
        s('[data-country-route="0"]'),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" },
        local(5090),
      );
      t.fromTo(
        s('[data-country-route="1"]'),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" },
        local(5109),
      );
      t.fromTo(
        s("[data-country-pin]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.63, ease: "power3.out" },
        local(5090),
      );
      t.to(
        q("atlantic-camera"),
        { scale: 1.48, x: -740, y: -245, duration: 2.5, ease: "power3.inOut" },
        local(5157) - 0.35,
      );
      t.to(
        q("atlantic"),
        { opacity: 0, scale: 0.93, duration: 0.8, ease: "power3.inOut" },
        local(5253) - 0.35,
      );

      t.fromTo(
        q("cooperation"),
        { opacity: 0, scale: 1.1, y: 65 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
        local(5253) - 0.25,
      );
      t.fromTo(
        s("[data-allied-ship]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.14, ease: "power3.out" },
        local(5253) - 0.12,
      );
      t.fromTo(
        q("command-links"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" },
        local(5253) + 0.1,
      );
      t.fromTo(
        q("command-flow"),
        { opacity: 0, strokeDashoffset: 0 },
        { opacity: 1, strokeDashoffset: -310, duration: 6.3, ease: "none" },
        local(5253) + 0.35,
      );
      t.fromTo(
        q("support-node"),
        { opacity: 0, y: 65 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        local(5340) - 0.12,
      );
      t.fromTo(
        q("support-link"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.65, ease: "power3.out" },
        local(5340),
      );
      t.to(
        q("cooperation-camera"),
        { scale: 1.035, x: -16, y: -10, duration: 5.3, ease: "none" },
        local(5253) + 0.4,
      );
      t.to(
        q("cooperation"),
        { opacity: 0, x: -100, duration: 0.75, ease: "power3.inOut" },
        local(5453) - 0.3,
      );

      t.fromTo(
        q("independence"),
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: "power3.out" },
        local(5453) - 0.2,
      );
      t.fromTo(
        q("home-map"),
        { x: -110, scale: 1.08 },
        { x: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        local(5453) - 0.2,
      );
      t.fromTo(
        q("independent-vessel"),
        { x: -290, y: 22 },
        { x: 170, y: -12, duration: 5.6, ease: "power1.inOut" },
        local(5453),
      );
      t.fromTo(
        q("independent-trail"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 4.4, ease: "none" },
        local(5453) + 0.4,
      );
      t.to(
        q("independence"),
        { opacity: 0, x: 90, duration: 0.8, ease: "power3.inOut" },
        local(5637),
      );

      // A single representative vessel leaves a berth and occupies the operating
      // cycle. This is a qualitative availability explanation, not a fleet count.
      t.fromTo(
        q("availability"),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        local(5785) - 0.65,
      );
      t.fromTo(
        q("cycle-draw"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.45, ease: "power3.out" },
        local(5785) - 0.2,
      );
      t.fromTo(
        q("cycle-vessel"),
        { x: 0 },
        { x: 970, duration: 3.1, ease: "power3.inOut" },
        local(5785) + 0.25,
      );
      t.fromTo(
        q("sea-flow"),
        { strokeDashoffset: 0 },
        { strokeDashoffset: -145, duration: 8.9, ease: "none" },
        local(5785) - 0.2,
      );
      t.fromTo(
        q("time-flow"),
        { opacity: 0, strokeDashoffset: 0 },
        { opacity: 1, strokeDashoffset: -480, duration: 6.3, ease: "none" },
        local(5854),
      );
      t.fromTo(
        q("long-question"),
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        local(5854),
      );
      t.fromTo(
        q("pressure"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.9, ease: "power2.inOut" },
        local(5961),
      );
      t.to(
        q("availability-camera"),
        { scale: 1.035, x: -20, y: -6, duration: 7.4, ease: "none" },
        local(5785) + 0.5,
      );
    },
    { dependencies: [uid] },
  );

  return (
    <div ref={scope} style={{ ...fill, overflow: "hidden" }}>
      <div data-end="atlantic" style={fill}>
        <div
          data-end="atlantic-camera"
          style={{ ...fill, transformOrigin: "0 0" }}
        >
          <Img
            src={staticFile(atlasLayerPath("allies"))}
            style={{ ...fill, width: 1920, height: 1216 }}
          />
          <svg width="1920" height="1216" viewBox="0 0 1200 760" style={fill}>
            <defs>
              {allies.routes.map((r, i) => (
                <mask
                  key={r.name}
                  id={`${uid}-allied-${i}`}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="1200"
                  height="760"
                >
                  <path
                    data-country-route={i}
                    d={r.d}
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                  />
                </mask>
              ))}
            </defs>
            <path d={allies.uk} fill={gold} />
            {allies.routes.map((r, i) => (
              <g key={r.name}>
                <path
                  d={r.d}
                  stroke={gold}
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="1 6"
                  strokeLinecap="round"
                  mask={`url(#${uid}-allied-${i})`}
                />
                <circle
                  data-country-pin
                  cx={r.to[0]}
                  cy={r.to[1]}
                  r="6"
                  fill={white}
                  stroke={gold}
                  strokeWidth="2"
                  opacity="0"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div data-end="cooperation" style={{ ...fill, opacity: 0 }}>
        <div
          data-end="cooperation-camera"
          style={{ ...fill, transformOrigin: "50% 60%" }}
        >
          <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={fill}>
            <path
              data-end="command-links"
              d="M520 485 C520 600 760 560 960 640 M1400 485 C1400 600 1160 560 960 640"
              stroke={gold}
              strokeWidth="3"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-end="command-flow"
              d="M520 485 C520 600 760 560 960 640 M1400 485 C1400 600 1160 560 960 640"
              stroke={white}
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 34"
              opacity="0"
            />
            <path
              data-end="support-link"
              d="M960 859 L960 757"
              stroke={gold}
              strokeWidth="4"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <g data-allied-ship opacity="0">
              <g transform="translate(238 308) scale(.94)">
                <NavalProfile kind="escort" />
              </g>
              <text
                x="520"
                y="313"
                textAnchor="middle"
                fill="#9EB6C9"
                fontSize="26"
              >
                Canada
              </text>
            </g>
            <g data-allied-ship opacity="0">
              <g transform="translate(1118 308) scale(.94)">
                <NavalProfile kind="escort" />
              </g>
              <text
                x="1400"
                y="313"
                textAnchor="middle"
                fill="#9EB6C9"
                fontSize="26"
              >
                Norway
              </text>
            </g>
            <g data-allied-ship opacity="0">
              <g transform="translate(612 548) scale(1.16)">
                <NavalProfile kind="carrier" tone="#416F94" />
              </g>
              <text
                x="960"
                y="541"
                textAnchor="middle"
                fill="#B6CBDC"
                fontSize="27"
              >
                United Kingdom
              </text>
            </g>
            <g data-end="support-node" opacity="0">
              <g transform="translate(678 785) scale(.94)">
                <NavalProfile kind="supply" />
              </g>
              <text
                x="960"
                y="986"
                textAnchor="middle"
                fill="#9EB6C9"
                fontSize="26"
              >
                Norway
              </text>
            </g>
          </svg>
        </div>
      </div>

      <div data-end="independence" style={{ ...fill, opacity: 0 }}>
        <div
          data-end="home-map"
          style={{
            position: "absolute",
            left: 100,
            top: 260,
            width: 790,
            height: 655,
          }}
        >
          <svg width="790" height="655" viewBox="0 0 1200 760">
            <path
              d={atlas.views["uk-paint"].uk}
              fill="#3A6EA5"
              stroke="#B1CBDD"
              strokeWidth="2"
            />
          </svg>
        </div>
        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={fill}>
          <path
            data-end="independent-trail"
            d="M562 728 Q840 815 1414 759"
            stroke={gold}
            strokeWidth="3"
            fill="none"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <g data-end="independent-vessel">
            <g transform="translate(860 505) scale(1.2)">
              <NavalProfile kind="carrier" />
            </g>
          </g>
        </svg>
      </div>

      <Sequence
        from={665}
        durationInFrames={148}
        name="Highmast 2025 — deck preparation"
      >
        <FootageShot
          asset="ordnance-deck"
          durationInFrames={148}
          direction="starboard"
        />
      </Sequence>

      <div data-end="availability" style={{ ...fill, opacity: 0 }}>
        <div
          data-end="availability-camera"
          style={{ ...fill, transformOrigin: "50% 60%" }}
        >
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={fill}>
            <g stroke="#56758E" fill="none" strokeWidth="2">
              <path d="M205 400 H620 V586 H600 V751 H620 V920 H205 M235 586 H615 M235 751 H615" />
              <path
                d="M258 424 V559 M307 424 V559 M356 424 V559 M405 424 V559 M454 424 V559 M503 424 V559 M552 424 V559"
                strokeOpacity=".45"
              />
              <path
                d="M258 778 V891 M307 778 V891 M356 778 V891 M405 778 V891 M454 778 V891 M503 778 V891 M552 778 V891"
                strokeOpacity=".45"
              />
              <path
                d="M612 423 H677 V541 M645 424 V507 M628 522 H686"
                stroke="#9AB2C7"
              />
            </g>
            <g
              data-end="sea-flow"
              stroke="#5C7E98"
              fill="none"
              strokeWidth="2"
              strokeDasharray="72 12"
              opacity=".6"
            >
              {[421, 469, 517, 804, 852, 900].map((y) => (
                <path key={y} d={`M1100 ${y} q80 -17 160 0 t160 0 t160 0`} />
              ))}
            </g>
            <path
              data-end="cycle-draw"
              d="M600 665 H1520 Q1640 665 1640 787 Q1640 920 1500 920 H775 Q696 920 696 820 V750"
              stroke="#698AA4"
              strokeWidth="3"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <path
              data-end="time-flow"
              d="M600 665 H1520 Q1640 665 1640 787 Q1640 920 1500 920 H775 Q696 920 696 820 V750"
              stroke={gold}
              strokeWidth="4"
              fill="none"
              strokeDasharray="10 38"
              opacity="0"
            />
            <path
              data-end="pressure"
              d="M1500 920 H775 Q696 920 696 820 V750"
              stroke="#C8102E"
              strokeWidth="5"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            <g data-end="cycle-vessel">
              <g transform="translate(585 592) rotate(90) scale(.65)">
                <VesselPlan kind="escort" tone="#4C7898" />
              </g>
            </g>
            <text
              x="410"
              y="350"
              textAnchor="middle"
              fill="#9EB8CB"
              fontSize="30"
            >
              United Kingdom
            </text>
          </svg>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 154,
          top: 110,
          height: 112,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          data-end="long-question"
          style={{
            opacity: 0,
            color: white,
            fontSize: 82,
            fontWeight: 620,
            letterSpacing: "-.055em",
            lineHeight: 1.12,
          }}
        >
          How long?
        </div>
      </div>
      <div
        style={{
          ...fill,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg,#0B1A2E 0%,#0B1A2Edc 7%,#0B1A2E00 28%,#0B1A2E00 91%,#0B1A2E66 100%)",
        }}
      />
    </div>
  );
};
