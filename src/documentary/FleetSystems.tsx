import { useId } from "react";
import { useGsapTimeline } from "@remotion/gsap";

const time = (frame: number) => (frame - 1916) / 30;
const ink = "#B7CBD6";
const gold = "#D4A94A";
const full = { position: "absolute", inset: 0 } as const;

export const FleetCarrierPlan = () => (
  <g stroke={ink} strokeWidth="2.2" strokeLinejoin="round">
    <path
      data-system-draw="carrier"
      data-system-fill="carrier"
      pathLength="100"
      d="M-310 -38 L-259 -83 L-135 -99 L111 -99 L155 -77 L284 -77 L310 -48 L310 69 L199 84 L-161 84 L-259 61Z"
      fill="#4C697D"
    />
    <path
      data-system-draw="carrier"
      pathLength="100"
      d="M-276 -30 L-192 -60 L278 -60 M-277 -12 L-185 -37 L278 -37 M-191 -48 L253 -48"
      fill="none"
      strokeWidth="1.8"
    />
    <path
      data-system-draw="carrier"
      pathLength="100"
      d="M-130 33 L240 33 M-115 54 L247 54"
      stroke="#D4A94A"
      fill="none"
    />
    <path
      data-system-fill="carrier"
      d="M-18 -88 L37 -88 L45 -68 L-22 -68Z M128 -88 L184 -88 L194 -68 L126 -68Z"
      fill="#90AAB8"
    />
    <path
      data-system-draw="carrier"
      pathLength="100"
      d="M-19 -91 L40 -91 M127 -92 L188 -92 M12 -104 L12 -80 M157 -104 L157 -79"
      fill="none"
    />
    <path
      data-system-draw="carrier"
      pathLength="100"
      d="M-192 71 L-154 71 M-100 71 L-62 71 M-8 71 L30 71 M84 71 L122 71 M176 71 L214 71"
      fill="none"
      strokeOpacity=".55"
    />
  </g>
);

const EscortPlan = ({ id }: { id: string }) => (
  <g stroke={ink} strokeWidth="2" strokeLinejoin="round">
    <path
      data-system-draw={id}
      data-system-fill={id}
      pathLength="100"
      d="M-165 0 Q-130 -35 -93 -42 L128 -42 L157 -26 L157 26 L128 42 L-93 42 Q-130 35 -165 0Z"
      fill="#668398"
    />
    <path
      data-system-draw={id}
      pathLength="100"
      d="M-132 0 L-80 0 M-57 -25 L-22 -25 L-14 0 L-22 25 L-57 25Z M7 -24 L64 -24 L72 -10 L72 10 L64 24 L7 24Z M89 -32 L143 -32 L143 32 L89 32Z"
      fill="#233C50"
    />
    <circle data-system-fill={id} cx="-94" cy="0" r="11" fill="#D3E0E7" />
    <path
      data-system-draw={id}
      pathLength="100"
      d="M-96 0 L-120 0 M29 -36 L29 36 M15 0 L45 0 M96 0 L135 0 M115 -18 L115 18"
      fill="none"
    />
    <circle cx="115" cy="0" r="22" fill="none" strokeOpacity=".6" />
  </g>
);

const SupportPlan = () => (
  <g stroke={ink} strokeWidth="2.2" strokeLinejoin="round">
    <path
      data-system-draw="support"
      data-system-fill="support"
      pathLength="100"
      d="M-177 0 L-138 -48 L124 -48 L175 -28 L175 28 L124 48 L-138 48Z"
      fill="#58768B"
    />
    <path
      data-system-draw="support"
      pathLength="100"
      d="M-124 -35 L-72 -35 L-72 35 L-124 35Z M-45 -30 L18 -30 L18 30 L-45 30Z M42 -30 L105 -30 L105 30 L42 30Z M127 -32 L157 -32 L157 32 L127 32Z"
      fill="#233C50"
    />
    <path
      data-system-draw="support"
      pathLength="100"
      d="M-65 0 L120 0 M-20 -52 L-20 52 M73 -52 L73 52"
      stroke={gold}
      fill="none"
    />
  </g>
);

const curves = [
  { start: [965, 624], control: [745, 396], end: [480, 430] },
  { start: [965, 652], control: [730, 838], end: [455, 854] },
  { start: [1000, 624], control: [1195, 384], end: [1400, 450] },
] as const;
const point = (curve: (typeof curves)[number], fraction: number) => ({
  cx:
    (1 - fraction) ** 2 * curve.start[0] +
    2 * (1 - fraction) * fraction * curve.control[0] +
    fraction ** 2 * curve.end[0],
  cy:
    (1 - fraction) ** 2 * curve.start[1] +
    2 * (1 - fraction) * fraction * curve.control[1] +
    fraction ** 2 * curve.end[1],
});

/** One aligned explanatory system; ship counts are symbolic, not an order of battle. */
export const FleetSystems = () => {
  const uid = useId().replace(/:/g, "");
  const ref = useGsapTimeline<HTMLDivElement>(({ timeline, selector }) => {
    const q = (name: string) => selector(`[data-system="${name}"]`);
    timeline.set(
      q("camera"),
      {
        x: 1100,
        y: 170,
        scale: 1.24,
        opacity: 0,
        transformOrigin: "480px 430px",
      },
      0,
    );
    timeline.set(
      selector("[data-system-draw]"),
      { strokeDasharray: 100, strokeDashoffset: 100 },
      0,
    );
    timeline.set(selector("[data-system-fill]"), { fillOpacity: 0 }, 0);
    timeline.set(q("escort-low"), { opacity: 0 }, 0);
    timeline.set(q("support"), { opacity: 0 }, 0);
    timeline.set(q("connections"), { opacity: 0 }, 0);
    timeline.set(q("air-zone"), { opacity: 0 }, 0);
    timeline.to(
      q("camera"),
      { x: 445, opacity: 1, duration: 0.52, ease: "power3.out" },
      time(2851),
    );
    timeline.to(
      q("camera"),
      { x: -390, y: 170, scale: 1.1, duration: 0.65, ease: "power3.inOut" },
      time(2880),
    );
    timeline.to(
      q("camera"),
      { x: 0, y: 0, scale: 1, duration: 0.85, ease: "power3.inOut" },
      // Complete the pullback at frame 2925.5, before the network explanation.
      // Vessel bounds at scale 1: x313..1575, y388..891, within the safe grid.
      time(2900),
    );
    timeline.to(
      q("camera"),
      { x: -26, y: 14, scale: 1.045, duration: 2.6, ease: "none" },
      time(2957),
    );
    timeline.to(
      q("camera"),
      { y: -870, scale: 1.07, duration: 0.95, ease: "power3.inOut" },
      time(3020),
    );
    timeline.to(q("camera"), { opacity: 0, duration: 0.2 }, time(3050));
    for (const [name, frame] of [
      ["carrier", 2851],
      ["escort", 2851],
      ["escort-low", 2861],
      ["support", 2880],
    ] as const) {
      timeline.to(
        selector(`[data-system-draw="${name}"]`),
        {
          strokeDashoffset: 0,
          duration: 0.45,
          stagger: 0.025,
          ease: "power3.out",
        },
        time(frame),
      );
      timeline.to(
        selector(`[data-system-fill="${name}"]`),
        { fillOpacity: 1, duration: 0.22, ease: "power2.out" },
        time(frame + 7),
      );
    }
    timeline.to(q("escort-low"), { opacity: 1, duration: 0.35 }, time(2861));
    timeline.to(q("support"), { opacity: 1, duration: 0.3 }, time(2880));
    timeline.to(
      q("wake"),
      { strokeDashoffset: -120, duration: 6.5, ease: "none" },
      time(2851),
    );
    timeline.to(q("connections"), { opacity: 1, duration: 0.25 }, time(2931));
    timeline.fromTo(
      q("link"),
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.inOut",
      },
      time(2931),
    );
    curves.forEach((curve, i) => {
      timeline.set(q(`packet-${i}`), { opacity: 0, attr: point(curve, 0) }, 0);
      timeline.to(
        q(`packet-${i}`),
        { opacity: 1, duration: 0.1 },
        time(2965) + i * 0.13,
      );
      timeline.to(
        q(`packet-${i}`),
        {
          keyframes: Array.from({ length: 21 }, (_, n) => ({
            attr: point(curve, n / 20),
            duration: 0.065,
            ease: "none",
          })),
          repeat: 2,
        },
        time(2965) + i * 0.13,
      );
    });
    timeline.to(q("air-zone"), { opacity: 1, duration: 0.4 }, time(3006));
    timeline.fromTo(
      q("air-ring"),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" },
      time(3006),
    );
    timeline.to(
      q("sweep"),
      { attr: { transform: "rotate(160)" }, duration: 1.8, ease: "none" },
      time(3006),
    );
  });
  return (
    <div ref={ref} style={{ ...full, pointerEvents: "none" }}>
      <div
        data-system="camera"
        style={{ ...full, opacity: 0, transformOrigin: "480px 430px" }}
      >
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={full}>
          <defs>
            <clipPath id={`${uid}-safe`}>
              <rect x="155" y="270" width="1610" height="710" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-safe)`}>
            <g opacity=".5" stroke="#3A6EA5" strokeWidth="2" fill="none">
              <path
                data-system="wake"
                d="M680 423 L1830 423 M680 437 L1830 437 M630 847 L1800 847 M630 861 L1800 861 M1575 444 L1960 444 M1575 457 L1960 457"
                strokeDasharray="38 22"
              />
            </g>
            <g data-system="connections" opacity="0" fill="none">
              {curves.map((curve, i) => (
                <g key={i}>
                  <path
                    data-system="link"
                    d={`M${curve.start.join(" ")} Q${curve.control.join(" ")} ${curve.end.join(" ")}`}
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    stroke={gold}
                    strokeWidth="3"
                  />
                  <circle
                    data-system={`packet-${i}`}
                    cx={curve.start[0]}
                    cy={curve.start[1]}
                    r="6"
                    fill="#F4F7FA"
                  />
                </g>
              ))}
            </g>
            <g data-system="air-zone" opacity="0">
              <g transform="translate(480 430) scale(1 .65)">
                <path
                  data-system="air-ring"
                  d="M-277 0 A277 277 0 1 1 277 0 A277 277 0 1 1 -277 0"
                  pathLength="100"
                  stroke={gold}
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  fill="none"
                />
                <g data-system="sweep" transform="rotate(-80)">
                  <path
                    d="M0 0 L-275 0 A275 275 0 0 1 -150 -230Z"
                    fill="#3A6EA5"
                    fillOpacity=".24"
                  />
                  <path d="M0 0 L-150 -230" stroke={gold} strokeWidth="2" />
                </g>
              </g>
            </g>
            <g transform="translate(1000 650)">
              <FleetCarrierPlan />
            </g>
            <g transform="translate(480 430)">
              <EscortPlan id="escort" />
            </g>
            <g
              data-system="escort-low"
              transform="translate(455 854) scale(.86)"
            >
              <EscortPlan id="escort-low" />
            </g>
            <g data-system="support" transform="translate(1400 450)">
              <SupportPlan />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
