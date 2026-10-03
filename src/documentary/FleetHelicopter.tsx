import { useGsapTimeline } from "@remotion/gsap";

/** Editable side-view rotorcraft. The dipping-sonar attachment is (1416, 286). */
export const FleetHelicopter = ({
  left = 1170,
  top = 85,
  scale = 1,
  startFrame = 3020,
}: {
  left?: number;
  top?: number;
  scale?: number;
  startFrame?: number;
}) => {
  const ref = useGsapTimeline<SVGSVGElement>(
    ({ timeline, selector }) => {
      timeline.to(
        selector('[data-rotor="main"]'),
        { attr: { transform: "rotate(3456)" }, duration: 8, ease: "none" },
        (startFrame - 1916) / 30,
      );
      timeline.to(
        selector('[data-rotor="tail"]'),
        { attr: { transform: "rotate(-4896)" }, duration: 8, ease: "none" },
        (startFrame - 1916) / 30,
      );
    },
    { dependencies: [startFrame] },
  );
  return (
    <svg
      ref={ref}
      width="630"
      height="240"
      viewBox="0 0 630 240"
      style={{
        position: "absolute",
        left,
        top,
        overflow: "visible",
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
      }}
    >
      <g stroke="#ADC4D0" strokeWidth="2.2" strokeLinejoin="round">
        <path
          d="M80 124 Q101 87 152 85 L280 85 Q317 89 339 119 L465 127 L527 83 L545 83 L526 150 L340 158 Q302 190 226 190 L127 184 Q75 176 61 151 Q57 134 80 124Z"
          fill="#5C7A8F"
        />
        <path
          d="M131 97 L155 97 L148 132 L100 132Z M167 97 L205 97 L205 132 L160 132Z M218 98 L261 98 L271 133 L218 133Z"
          fill="#0B1A2E"
        />
        <path
          d="M283 108 L306 110 L318 138 L283 138Z M172 145 L244 145 L244 181 L172 181Z"
          fill="#36566E"
        />
        <path
          d="M340 133 L482 141 M330 152 L503 153 M120 184 L120 204 M289 181 L289 201 M142 188 L142 203"
          fill="none"
        />
        <path d="M246 190 L246 201" stroke="#D4A94A" strokeWidth="3" />
        <path d="M241 86 L246 64 L283 64 L288 86" fill="#37576D" />
        <path d="M258 64 L258 50 L267 50 L267 64" fill="#A2B9C6" />
        <circle cx="120" cy="205" r="10" fill="#0B1A2E" />
        <circle cx="289" cy="204" r="10" fill="#0B1A2E" />
        <circle cx="100" cy="151" r="7" fill="#0B1A2E" />
      </g>
      <ellipse
        cx="264"
        cy="49"
        rx="267"
        ry="30"
        fill="#BDD1DC"
        fillOpacity=".07"
      />
      <g transform="translate(264 49) scale(1 .12)">
        <g
          data-rotor="main"
          transform="rotate(0)"
          fill="#D2E0E8"
          fillOpacity=".68"
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              transform={`rotate(${angle})`}
              d="M12 -5 L251 -11 L269 -3 L261 8 L12 9Z"
            />
          ))}
        </g>
      </g>
      <circle cx="264" cy="49" r="7" fill="#D4A94A" />
      <g transform="translate(532 123)">
        <circle r="29" fill="#BFD1DC" fillOpacity=".08" />
        <g
          data-rotor="tail"
          transform="rotate(0)"
          stroke="#C7D8E1"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M-26 0 L26 0 M0 -26 L0 26" />
        </g>
        <circle r="5" fill="#D4A94A" />
      </g>
    </svg>
  );
};
