import { useId } from "react";
import { useGsapTimeline } from "@remotion/gsap";
import atlas from "../data/geography/atlas.json";

export type MapMode = keyof typeof atlas.views;
const wave = (y: number, phase: number) => {
  let d = `M-100 ${y}`;
  for (let i = 0; i < 8; i++)
    d += ` Q${i * 180 - 10} ${y + Math.sin(i * 1.7 + phase) * 45} ${i * 180 + 80} ${y + Math.cos(i * 1.3 + phase) * 18}`;
  return `${d} L1400 1000 L-100 1000 Z`;
};

/** Real coastlines; liquid is clipped to the UK, never distorts its boundary. */
export const MapAtlas = ({
  mode,
  duration,
  delay = 0,
}: {
  mode: MapMode;
  duration: number;
  delay?: number;
}) => {
  const uid = useId().replace(/:/g, "");
  const map = atlas.views[mode];
  const paint = [
    "uk-paint",
    "comparison",
    "leadership",
    "sovereignty",
    "europe",
  ].includes(mode);
  const scope = useGsapTimeline<SVGSVGElement>(
    ({ timeline, selector }) => {
      timeline.fromTo(
        selector("[data-land]"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power3.out" },
        delay,
      );
      timeline.fromTo(
        selector("[data-camera]"),
        {
          scale: mode === "colonies" ? 1.12 : 1,
          x: 0,
          y: 0,
          svgOrigin: "600 380",
        },
        {
          scale: mode === "colonies" ? 1 : 1.055,
          x: mode === "europe" ? -12 : 8,
          y: -5,
          duration: Math.max(0.6, duration - delay),
          ease: "none",
        },
        delay,
      );
      if (paint) {
        timeline.fromTo(
          selector("[data-uk-outline]"),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 0.55, ease: "power3.out" },
          delay,
        );
        timeline.fromTo(
          selector("[data-liquid]"),
          { attr: { d: wave(820, 0) } },
          { attr: { d: wave(380, 1.7) }, duration: 0.75, ease: "power3.out" },
          delay + 0.1,
        );
        timeline.to(
          selector("[data-liquid]"),
          { attr: { d: wave(-60, 3.4) }, duration: 1.05, ease: "power2.inOut" },
          delay + 0.85,
        );
        timeline.fromTo(
          selector("[data-ink]"),
          { attr: { scale: 18 } },
          { attr: { scale: 5 }, duration: 1.8, ease: "none" },
          delay + 0.12,
        );
      } else if (map.uk) {
        timeline.fromTo(
          selector("[data-uk-outline]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: "power3.out" },
          delay,
        );
      }
      map.routes.forEach((route, i) => {
        const start = delay + 0.23 + i * 0.12;
        const drawDuration = Math.max(
          0.4,
          Math.min(1.25, duration - start - 0.5),
        );
        timeline.fromTo(
          selector(`[data-route-mask="${i}"]`),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: drawDuration, ease: "power2.inOut" },
          start,
        );
        timeline.fromTo(
          selector(`[data-destination="${i}"]`),
          { opacity: 0, scale: 0, svgOrigin: `${route.to[0]} ${route.to[1]}` },
          { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" },
          start + drawDuration - 0.15,
        );
      });
      if (mode === "daylight")
        timeline.fromTo(
          selector("[data-daylight]"),
          { x: -900 },
          { x: 1200, duration, ease: "none" },
          0,
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
      aria-label={`Geographic map: ${mode}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id={`${uid}-uk`}>
          <path d={map.uk} />
        </clipPath>
        <clipPath id={`${uid}-land`}>
          {map.countries.map((c) => (
            <path key={c.code} d={c.d} />
          ))}
        </clipPath>
        <filter id={`${uid}-ink`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".012 .025"
            numOctaves="2"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            data-ink
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <linearGradient id={`${uid}-paint`} x1="0" y1="1" x2=".7" y2="0">
          <stop stopColor="#23466A" />
          <stop offset=".55" stopColor="#3A6EA5" />
          <stop offset="1" stopColor="#8EB6D7" />
        </linearGradient>
        <linearGradient id={`${uid}-light`}>
          <stop stopColor="#D4A94A" stopOpacity="0" />
          <stop offset=".5" stopColor="#D4A94A" stopOpacity=".8" />
          <stop offset="1" stopColor="#D4A94A" stopOpacity="0" />
        </linearGradient>
        {map.routes.map((r, i) => (
          <mask
            key={i}
            id={`${uid}-route-${i}`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1200"
            height="760"
          >
            <path
              data-route-mask={i}
              d={r.d}
              pathLength="100"
              fill="none"
              stroke="white"
              strokeWidth="12"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
          </mask>
        ))}
      </defs>
      <g data-camera>
        <g data-land opacity="0">
          {map.countries.map((c) => (
            <path
              key={c.code}
              d={c.d}
              fill={c.highlight && !paint ? "#2B5477" : "#18334A"}
              stroke={c.highlight && !paint ? "#6E98BA" : "#38556D"}
              strokeWidth={c.highlight ? 1.5 : 0.8}
              strokeLinejoin="round"
            />
          ))}
        </g>
        {paint && (
          <g clipPath={`url(#${uid}-uk)`}>
            <path
              data-liquid
              d={wave(820, 0)}
              fill={`url(#${uid}-paint)`}
              filter={`url(#${uid}-ink)`}
            />
          </g>
        )}
        {map.uk && (
          <path
            data-uk-outline
            d={map.uk}
            fill={paint ? "none" : "#D4A94A"}
            fillOpacity=".8"
            stroke={paint ? "#C0D8EA" : "#E5C46B"}
            strokeWidth={paint ? 1.7 : 1}
            pathLength="100"
            strokeDasharray={paint ? 100 : undefined}
            strokeDashoffset={paint ? 100 : undefined}
          />
        )}
        {mode === "daylight" && (
          <g clipPath={`url(#${uid}-land)`}>
            <rect
              data-daylight
              x="0"
              y="0"
              width="850"
              height="760"
              fill={`url(#${uid}-light)`}
            />
          </g>
        )}
        {map.routes.map((r, i) => (
          <g key={i}>
            <path
              d={r.d}
              mask={`url(#${uid}-route-${i})`}
              fill="none"
              stroke="#D4A94A"
              strokeWidth="3.2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
            <g data-destination={i} opacity="0">
              <circle
                cx={r.to[0]}
                cy={r.to[1]}
                r="10"
                fill="#0B1A2E"
                stroke="#D4A94A"
                strokeWidth="1.5"
              />
              <circle cx={r.to[0]} cy={r.to[1]} r="3" fill="#F4F7FA" />
            </g>
          </g>
        ))}
        {map.routes.length > 0 && (
          <g>
            <circle
              cx={map.routes[0].from[0]}
              cy={map.routes[0].from[1]}
              r="5"
              fill="#F4F7FA"
            />
          </g>
        )}
      </g>
    </svg>
  );
};
