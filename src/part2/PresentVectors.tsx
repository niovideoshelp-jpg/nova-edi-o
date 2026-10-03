import { C } from "./Shared";

/** Editorial profiles, proportions based on visible RN ship classes; not plans. */
export const ShipPlan = ({
  kind = "frigate",
  color = C.white,
}: {
  kind?: "carrier" | "destroyer" | "frigate" | "supply";
  color?: string;
}) => {
  const carrier = kind === "carrier",
    supply = kind === "supply",
    destroyer = kind === "destroyer";
  return (
    <g
      stroke={color}
      strokeWidth={2.3}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        d={
          carrier
            ? "M0-162 Q40-146 51-101 L53 104 34 151 -45 151 -56 102 -48-99 Q-31-145 0-162Z"
            : supply
              ? "M0-151 Q30-123 33-86 L33 127 Q0 146-33 127 L-33-86 Q-30-123 0-151Z"
              : "M0-153 Q27-112 27-81 L27 122 17 143 -17 143 -27 122 -27-81 Q-27-112 0-153Z"
        }
        fill={C.navy}
      />
      {carrier ? (
        <>
          <path d="M-27-143 L-28 132 M-35 126 L27-108" opacity=".6" />
          <path
            d="M25-60 L42-60 42-9 25-9Z M25 7 L43 7 43 59 25 59Z"
            fill={C.steel}
          />
          <path d="M-21-120 L-21 112" strokeDasharray="10 7" />
          {[12, 55, 97].map((y) => (
            <path
              key={y}
              d={`M5 ${y - 13} l4 9 12 5 -1 5 -11-2 -1 7 -5 0 -1-7 -10 2 -1-5 11-5Z`}
              fill={color}
              strokeWidth="1"
            />
          ))}
          <path d="M-8-151 L17-136 M27-41 L45-41 M27 24 L45 24" />
        </>
      ) : supply ? (
        <>
          <path
            d="M-25-85 H25 V-55 H-25Z M-26 86 H26 V115 H-26Z"
            fill={C.steel}
          />
          {[-26, 30].map((y) => (
            <g key={y}>
              <path d={`M-22 ${y - 13} H22 V${y + 12} H-22Z`} fill="#163751" />
              <path d={`M-46 ${y} H46 M0 ${y - 18} V${y + 18}`} />
              <circle cy={y} r="5" fill={C.gold} />
            </g>
          ))}
          <path d="M-16-45 V71 M16-45 V71" opacity=".45" />
        </>
      ) : (
        <>
          <path
            d="M-18-39 L18-39 21 32 -21 32Z M-16 44 H16 V69 H-16Z"
            fill={C.steel}
          />
          <path d="M-9-115 H9 V-94 H-9Z M0-119 V-139" fill={color} />
          {[-79, -66].map((y) => (
            <g key={y}>
              {[-10, 0, 10].map((x) => (
                <rect
                  key={x}
                  x={x - 3}
                  y={y}
                  width="6"
                  height="8"
                  fill={C.line}
                  stroke="none"
                />
              ))}
            </g>
          ))}
          <path
            d={destroyer ? "M-12-11 L0-24 12-11 0 2Z" : "M-8-15 H8 V-1 H-8Z"}
            fill={C.gold}
          />
          <path d="M-15 84 H15 V126 H-15Z" strokeOpacity=".6" />
          <circle cy="104" r="13" strokeOpacity=".5" />
          <path d="M-5 98 V111 M5 98 V111 M-5 104 H5" strokeWidth="1.5" />
          <path d="M-10 10 H10 M-10 17 H10 M-10 24 H10" opacity=".6" />
        </>
      )}
    </g>
  );
};

export const MerlinPlan = ({ color = C.white }: { color?: string }) => (
  <g
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M0-36 C13-32 16-6 10 21 L3 58 -3 58 -10 21 C-16-6-13-32 0-36Z"
      fill={C.navy}
    />
    <path d="M-7-23 Q0-31 7-23 L8-10 -8-10Z" fill={C.steel} />
    <path d="M-23 8 H23 M-11 15 L-20 22 M11 15 L20 22 M-11 48 H11" />
    <circle cy="0" r="4" fill={C.gold} />
    <path d="M-51-13 L51 13 M-13 51 L13-51 M-14 58 H14" />
  </g>
);

export const SubmarinePlan = ({ color = C.white }: { color?: string }) => (
  <g stroke={color} strokeWidth="2.4" strokeLinejoin="round" fill={C.navy}>
    <path d="M0-145 C22-144 29-103 27-36 L23 81 Q17 116 0 140 Q-17 116-23 81 L-27-36 C-29-103-22-144 0-145Z" />
    <path d="M-8-53 Q0-64 8-53 V-12 H-8Z" fill={C.steel} />
    <path d="M-45-22 H45 M-31 102 H31 M0 126 V152" />
    <path d="M-19-94 Q0-109 19-94 M-18 73 H18" strokeOpacity=".6" />
  </g>
);

export const ShipSide = ({
  kind = "destroyer",
  color = C.white,
}: {
  kind?: "destroyer" | "patrol" | "mine" | "supply";
  color?: string;
}) => (
  <g
    stroke={color}
    strokeWidth="2.3"
    strokeLinejoin="round"
    strokeLinecap="round"
    fill={C.navy}
  >
    <path d="M-300 48 L-245 74 H242 L294 37 252 30 H-263Z" fill="#193B56" />
    {kind === "destroyer" ? (
      <>
        <path d="M-178 28 L-165-9 H-67 L-50 27 M-111-10 L-103-48 H-77 L-69-10 M-91-49 V-98 M-104-85 H-78 M-98-65 H-84" />
        <path d="M-29 29 V-29 H-8 L7 29 M40 29 V-17 H67 L83 29 M109 30 V9 H206 L224 30" />
        <path d="M-234 30 L-228 11 H-208 L-197 30 M-226 11 L-246-3" />
        <path
          d="M-159 0 H-78 M-154 8 H-75 M-157-8 H-143 M-138-8 H-126 M-121-8 H-110"
          strokeOpacity=".7"
        />
      </>
    ) : kind === "patrol" ? (
      <>
        <path d="M-131 28 V-23 H-29 L-1 28 M-99-24 V-63 H-80 V-24 M-92-63 V-86 M-109-66 H-66 M88 29 V6 H152 V29" />
        <path d="M-116-12 H-101 M-92-12 H-77 M-68-12 H-49 M-117 4 H-42 M-205 28 V12 H-187 V28 M-199 12 L-214 5" />
      </>
    ) : kind === "mine" ? (
      <>
        <path d="M-142 29 V-18 H-25 L0 29 M-77-18 V-78 M-98-61 H-51 M63 28 V-4 H144 V28 M154 28 V-20 L195-41 M-6 30 L26 13 H54 V30" />
        <path d="M-126-6 H-41 M-119 8 H-43 M102-4 V-29 M88-29 H116" />
      </>
    ) : (
      <>
        <path d="M-238 28 V-33 H-158 V28 M150 28 V-24 H218 V28 M-100 29 V-33 M-100-24 H-43 M-7 29 V-33 M-7-24 H50 M76 29 V-33 M76-24 H123" />
        <path d="M-219-22 H-176 M-214-12 H-178 M-207-34 V-74 M-224-60 H-185 M-143 23 H138" />
      </>
    )}
    <path d="M-251 45 H247 M-208 56 H210" strokeOpacity=".35" />
  </g>
);
