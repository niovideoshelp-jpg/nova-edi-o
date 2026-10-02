import { Img, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import { Atlas, liquidCoast } from "./Atlas";

const image = (name: string) => staticFile(`images/generated/${name}.png`);
const full = { position: "absolute" as const, inset: 0 };

/** The camera stays in an environment across narration cues instead of restarting per icon. */
export const HistoryChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (name: string) => selector(`[data-h="${name}"]`);

      // An overhead map resolves into pigment, then the camera travels towards the coast.
      timeline.fromTo(
        q("uk-camera"),
        { opacity: 0, scale: 1.35, x: -80, y: 50 },
        {
          opacity: 1,
          scale: 1.13,
          x: 0,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
        },
        0.8,
      );
      timeline.fromTo(
        selector('[data-h="uk-camera"] [data-atlas-uk]'),
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" },
        0.8,
      );
      timeline.to(
        selector('[data-h="uk-camera"] [data-atlas-liquid]'),
        {
          attr: { d: liquidCoast(370, 1.3) },
          duration: 0.85,
          ease: "power2.out",
        },
        0.9,
      );
      timeline.to(
        selector('[data-h="uk-camera"] [data-atlas-liquid]'),
        {
          attr: { d: liquidCoast(-30, 3.1) },
          duration: 1.15,
          ease: "power2.inOut",
        },
        1.75,
      );
      timeline.to(
        selector('[data-h="uk-camera"] [data-atlas-liquid-edge]'),
        {
          attr: { d: liquidCoast(-45, 2.8) },
          duration: 2.1,
          ease: "power2.inOut",
        },
        1.05,
      );
      timeline.to(
        q("uk-camera"),
        { scale: 1.5, x: -210, y: -210, duration: 2.5, ease: "sine.inOut" },
        3.35,
      );
      timeline.to(
        q("uk-camera"),
        {
          scale: 1.72,
          x: -530,
          y: -230,
          opacity: 0.13,
          duration: 1.3,
          ease: "power2.inOut",
        },
        5.45,
      );
      timeline.to(
        q("uk-camera"),
        { opacity: 0, x: -610, duration: 0.8, ease: "power2.in" },
        10.9,
      );

      // A close sail fills the camera before the entire ship is revealed over the same sea.
      timeline.fromTo(
        q("sail"),
        { opacity: 0, scale: 1.53, x: 520, y: 150, rotation: -3 },
        {
          opacity: 1,
          scale: 1.13,
          x: 140,
          y: 45,
          rotation: -1,
          duration: 1.55,
          ease: "power3.out",
        },
        5.9,
      );
      timeline.to(
        q("sail"),
        {
          scale: 1.02,
          x: 75,
          y: 9,
          rotation: 0.6,
          duration: 2.1,
          ease: "sine.inOut",
        },
        7.45,
      );
      timeline.to(
        q("sail"),
        {
          scale: 0.76,
          x: -465,
          y: 205,
          rotation: -1.1,
          duration: 2.1,
          ease: "power2.inOut",
        },
        9.55,
      );
      timeline.to(
        q("sail"),
        {
          scale: 0.43,
          x: -635,
          y: 330,
          opacity: 0,
          duration: 1.7,
          ease: "power2.inOut",
        },
        11.65,
      );
      timeline.fromTo(
        q("wake"),
        { opacity: 0, x: 260, scaleX: 0.1 },
        { opacity: 0.7, x: -90, scaleX: 1, duration: 3.7, ease: "power2.out" },
        7.65,
      );
      timeline.to(
        q("wake"),
        { x: -510, opacity: 0, duration: 1.45, ease: "power2.in" },
        11.45,
      );

      // London remains the visual origin as the camera opens out to the empire's connections.
      timeline.fromTo(
        q("empire"),
        { opacity: 0, scale: 2.4, x: 120, y: 335 },
        {
          opacity: 1,
          scale: 1.08,
          x: 0,
          y: 0,
          duration: 1.9,
          ease: "power3.inOut",
        },
        11.25,
      );
      timeline.to(
        q("empire"),
        { scale: 1.15, x: 50, y: 23, duration: 3.1, ease: "sine.inOut" },
        13.15,
      );
      for (let i = 0; i < 5; i++) {
        timeline.to(
          selector(`[data-h="empire"] [data-atlas-route-mask="${i}"]`),
          { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut" },
          12.34 + i * 0.42,
        );
        timeline.fromTo(
          selector(`[data-h="empire"] [data-atlas-destination="${i}"]`),
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power3.out" },
          13.38 + i * 0.42,
        );
      }
      timeline.to(
        q("empire"),
        { scale: 1.02, x: -40, y: 25, duration: 2.4, ease: "sine.inOut" },
        16.25,
      );
      timeline.fromTo(
        selector('[data-h="empire"] [data-atlas-daylight]'),
        { opacity: 0, x: -380 },
        { opacity: 1, x: 1430, duration: 5.8, ease: "none" },
        16.8,
      );
      timeline.to(
        q("empire"),
        { scale: 1.18, x: -170, y: -5, duration: 2.75, ease: "sine.inOut" },
        19.1,
      );
      timeline.to(
        q("empire"),
        {
          opacity: 0,
          scale: 1.6,
          x: -430,
          y: 10,
          duration: 1.35,
          ease: "power2.inOut",
        },
        21.85,
      );

      // The painted atlas becomes a book leaf. The island is inspected with wide, tower and harbour views.
      timeline.fromTo(
        q("fantasy"),
        { opacity: 0, x: 1270, rotation: 8, scale: 0.82 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 1.25,
          ease: "power3.inOut",
        },
        22.2,
      );
      timeline.fromTo(
        q("island"),
        { scale: 0.84, x: 170, y: 70 },
        { scale: 1.02, x: 70, y: 20, duration: 3.05, ease: "sine.inOut" },
        22.5,
      );
      timeline.to(
        q("island"),
        { scale: 0.74, x: -130, y: 150, duration: 2.1, ease: "power2.inOut" },
        25.55,
      );
      timeline.to(
        q("island"),
        { scale: 0.68, x: -285, y: 140, duration: 2.1, ease: "sine.inOut" },
        27.65,
      );
      timeline.fromTo(
        q("separation"),
        { opacity: 0, strokeDashoffset: 100 },
        {
          opacity: 0.8,
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
        },
        28.16,
      );
      timeline.to(
        q("island"),
        { scale: 1.43, x: -80, y: 200, duration: 2.4, ease: "power2.inOut" },
        30.15,
      );
      timeline.to(q("separation"), { opacity: 0, duration: 0.6 }, 30.4);
      timeline.to(
        q("island"),
        { scale: 1.34, x: -145, y: 170, duration: 1.5, ease: "sine.inOut" },
        32.55,
      );
      timeline.to(
        q("island"),
        { scale: 0.72, x: -120, y: 88, duration: 2, ease: "power2.inOut" },
        34.05,
      );
      timeline.to(
        q("island"),
        { scale: 0.78, x: -120, y: 60, duration: 1.5, ease: "sine.inOut" },
        36.05,
      );
      timeline.fromTo(
        q("influence"),
        { opacity: 0, scale: 0.28 },
        { opacity: 0.66, scale: 1.1, duration: 2.4, ease: "power2.out" },
        36.5,
      );
      timeline.to(
        q("influence"),
        { opacity: 0, scale: 1.24, duration: 1.5, ease: "power2.in" },
        38.9,
      );
      timeline.to(
        q("island"),
        { scale: 0.58, x: -435, y: 135, duration: 1.65, ease: "power3.inOut" },
        39.5,
      );
      timeline.to(
        q("fantasy-paper"),
        { backgroundColor: "#152B40", duration: 1.2, ease: "sine.inOut" },
        39.65,
      );

      // Side by side comparison is a camera composition, not a balance symbol.
      timeline.fromTo(
        q("comparison"),
        { opacity: 0, scale: 0.84, x: 690, y: 70 },
        {
          opacity: 1,
          scale: 0.9,
          x: 360,
          y: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
        39.9,
      );
      timeline.to(
        q("comparison"),
        { scale: 0.96, x: 350, y: -25, duration: 2.25, ease: "sine.inOut" },
        41.4,
      );
      timeline.to(
        q("island"),
        { scale: 0.62, x: -460, y: 130, duration: 3.1, ease: "sine.inOut" },
        41.15,
      );
      timeline.to(
        q("island"),
        { x: -1520, scale: 0.7, duration: 1.6, ease: "power2.inOut" },
        44.15,
      );
      timeline.to(
        q("comparison"),
        { scale: 1.25, x: -170, y: -95, duration: 2, ease: "power2.inOut" },
        44.55,
      );
      timeline.to(
        q("fantasy"),
        { opacity: 0, duration: 1.1, ease: "power2.in" },
        45.6,
      );
      timeline.to(
        q("comparison"),
        { scale: 1.15, x: -190, y: -45, duration: 2.7, ease: "sine.inOut" },
        46.55,
      );

      // The map pulls back from the accurate coastline to the European context.
      timeline.fromTo(
        q("europe"),
        { opacity: 0, scale: 1.9, x: 330, y: 150 },
        {
          opacity: 1,
          scale: 1.18,
          x: 0,
          y: -5,
          duration: 1.7,
          ease: "power2.inOut",
        },
        49.0,
      );
      timeline.to(
        q("comparison"),
        {
          opacity: 0,
          scale: 0.56,
          x: -105,
          y: 80,
          duration: 1.45,
          ease: "power2.inOut",
        },
        49.0,
      );
      timeline.to(
        q("europe"),
        { scale: 1.29, x: -70, y: -22, duration: 2.75, ease: "sine.inOut" },
        50.7,
      );
      timeline.to(
        q("europe"),
        {
          opacity: 0.18,
          scale: 1.5,
          x: -270,
          y: -70,
          duration: 1.45,
          ease: "power2.inOut",
        },
        53.1,
      );
      timeline.fromTo(
        q("return-sail"),
        { opacity: 0, scale: 1.8, x: 1200, y: 350 },
        {
          opacity: 1,
          scale: 1.02,
          x: 35,
          y: 5,
          duration: 1.75,
          ease: "power3.inOut",
        },
        53.15,
      );
      timeline.to(
        q("return-sail"),
        { scale: 0.64, x: -490, y: 210, duration: 2, ease: "power2.inOut" },
        54.9,
      );
      timeline.to(
        q("return-sail"),
        {
          opacity: 0,
          scale: 0.45,
          x: -960,
          y: 350,
          duration: 1.35,
          ease: "power2.in",
        },
        56.9,
      );
      timeline.to(q("europe"), { opacity: 0, duration: 1.2 }, 56.2);
      timeline.fromTo(
        q("reach"),
        { opacity: 0, scale: 2, x: -40, y: 190 },
        {
          opacity: 1,
          scale: 1.09,
          x: 0,
          y: 0,
          duration: 1.7,
          ease: "power3.inOut",
        },
        56.35,
      );
      for (let i = 0; i < 3; i++) {
        timeline.to(
          selector(`[data-h="reach"] [data-atlas-route-mask="${i}"]`),
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
          56.9 + i * 0.17,
        );
        timeline.to(
          selector(`[data-h="reach"] [data-atlas-destination="${i}"]`),
          { opacity: 1, duration: 0.4 },
          57.8 + i * 0.17,
        );
      }
      timeline.to(
        q("reach"),
        { scale: 1.2, x: -115, y: -45, duration: 2.15, ease: "sine.inOut" },
        58.05,
      );
      timeline.to(
        q("reach"),
        {
          opacity: 0.11,
          scale: 1.38,
          x: -190,
          y: -120,
          duration: 1.7,
          ease: "power2.inOut",
        },
        60.2,
      );
      timeline.fromTo(
        q("modern"),
        { opacity: 0, x: 800, y: 240, scale: 1.02 },
        {
          opacity: 1,
          x: 50,
          y: 30,
          scale: 1.16,
          duration: 2.0,
          ease: "power3.inOut",
        },
        60.65,
      );
      timeline.to(
        q("modern"),
        { x: -40, y: 5, scale: 1.25, duration: 1.62, ease: "sine.inOut" },
        62.65,
      );
    },
    { dependencies: [] },
  );

  return (
    <div ref={scope} style={{ ...full, overflow: "hidden" }}>
      <div
        data-h="uk-camera"
        style={{
          position: "absolute",
          left: 90,
          top: 110,
          width: 1500,
          height: 950,
          transformOrigin: "58% 58%",
          opacity: 0,
        }}
      >
        <Atlas mode="uk-paint" liquid onlyUk />
      </div>

      <svg
        data-h="wake"
        width="1800"
        height="470"
        viewBox="0 0 1800 470"
        style={{
          position: "absolute",
          left: 80,
          top: 650,
          opacity: 0,
          transformOrigin: "90% 50%",
        }}
      >
        <path
          d="M20 305 C310 322 785 300 1340 167 M70 340 C470 378 975 321 1430 186 M180 366 C620 429 1090 332 1490 208"
          fill="none"
          stroke="#AFCFE1"
          strokeWidth="2"
          opacity=".55"
        />
      </svg>
      <div
        data-h="sail"
        style={{
          position: "absolute",
          left: 320,
          top: 92,
          width: 1330,
          height: 980,
          transformOrigin: "55% 60%",
          opacity: 0,
        }}
      >
        <Img
          src={image("sailing-ship")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0px 28px 25px rgba(0,0,0,.38))",
          }}
        />
      </div>

      <div
        data-h="empire"
        style={{
          position: "absolute",
          left: -40,
          top: 175,
          width: 1980,
          height: 1020,
          transformOrigin: "50% 30%",
          opacity: 0,
        }}
      >
        <Atlas mode="colonies" routes routeLabels />
      </div>

      <div
        data-h="fantasy"
        style={{ ...full, opacity: 0, transformOrigin: "80% 60%" }}
      >
        <div
          data-h="fantasy-paper"
          style={{ ...full, background: "#233B4C" }}
        />
        <div
          style={{
            ...full,
            background:
              "radial-gradient(ellipse at 54% 51%, rgba(201,217,221,.13), transparent 70%)",
          }}
        />
        <Img
          src={staticFile("grain.png")}
          style={{ ...full, width: 1920, height: 1080, opacity: 0.045 }}
        />
        <svg
          width="1920"
          height="1080"
          style={{ ...full, overflow: "visible" }}
        >
          <path
            data-h="separation"
            d="M925 645 C1100 540 1320 540 1510 598"
            fill="none"
            stroke="#D4A94A"
            strokeWidth="4"
            strokeDasharray="100"
            pathLength="100"
            strokeDashoffset="100"
            opacity="0"
          />
        </svg>
        <svg
          data-h="influence"
          width="1800"
          height="900"
          viewBox="0 0 1800 900"
          style={{
            position: "absolute",
            left: 50,
            top: 180,
            opacity: 0,
            transformOrigin: "49% 52%",
          }}
        >
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              cx="880"
              cy="470"
              rx={440 + i * 145}
              ry={210 + i * 90}
              fill="none"
              stroke="#D4A94A"
              strokeWidth={2.2 - i * 0.4}
              strokeDasharray="3 13"
              opacity={0.85 - i * 0.15}
            />
          ))}
        </svg>
        <div
          data-h="island"
          style={{
            position: "absolute",
            left: 320,
            top: 180,
            width: 1320,
            height: 880,
            transformOrigin: "50% 57%",
          }}
        >
          <Img
            src={image("numenor")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      <div
        data-h="comparison"
        style={{
          position: "absolute",
          left: 240,
          top: 145,
          width: 1400,
          height: 870,
          opacity: 0,
          transformOrigin: "60% 55%",
        }}
      >
        <Atlas mode="uk-paint" onlyUk />
      </div>
      <div
        data-h="europe"
        style={{
          position: "absolute",
          left: -120,
          top: 20,
          width: 2200,
          height: 1350,
          opacity: 0,
          transformOrigin: "50% 42%",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)",
        }}
      >
        <Atlas mode="europe" />
      </div>
      <div
        data-h="return-sail"
        style={{
          position: "absolute",
          left: 240,
          top: 160,
          width: 1360,
          height: 920,
          opacity: 0,
          transformOrigin: "55% 65%",
        }}
      >
        <Img
          src={image("sailing-ship")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0px 26px 24px rgba(0,0,0,.4))",
          }}
        />
      </div>
      <div
        data-h="reach"
        style={{
          position: "absolute",
          left: -50,
          top: 135,
          width: 2020,
          height: 1100,
          opacity: 0,
          transformOrigin: "50% 30%",
        }}
      >
        <Atlas mode="reach" routes />
      </div>
      <div
        data-h="modern"
        style={{
          position: "absolute",
          left: 165,
          top: 300,
          width: 1660,
          height: 720,
          opacity: 0,
          transformOrigin: "50% 60%",
        }}
      >
        <Img
          src={image("carrier")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0px 26px 24px rgba(0,0,0,.4))",
          }}
        />
      </div>
      <div
        style={{
          ...full,
          background:
            "linear-gradient(to bottom, rgba(8,20,34,.62), transparent 26%, transparent 90%, rgba(8,20,34,.22))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
