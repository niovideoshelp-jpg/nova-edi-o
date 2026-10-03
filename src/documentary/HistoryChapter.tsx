import { Img, staticFile } from "remotion";
import { useGsapTimeline } from "@remotion/gsap";
import { Atlas, liquidCoast } from "./Atlas";
import atlas from "../../data/geography/atlas.json";
import {
  EuropeNavigation,
  europeSeaRoutes,
  FantasyNavigation,
  fantasyInfluence,
  fantasyPassage,
  SailNavigation,
  WorldSignals,
  type Point,
} from "./HistoryNavigation";

const image = (name: string) => staticFile(`images/generated/${name}.png`);
const full = { position: "absolute" as const, inset: 0 };

/** Sustained camera moves reveal a mechanism at each cue; camera and diagram share a coordinate space. */
export const HistoryChapter = () => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({ timeline, selector }) => {
      const q = (name: string) => selector(`[data-h="${name}"]`);
      const travel = (
        name: string,
        points: number[][],
        start: number,
        duration: number,
      ) => {
        timeline.set(
          q(name),
          { attr: { cx: points[0][0], cy: points[0][1] } },
          0,
        );
        timeline.fromTo(
          q(name),
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: "power3.out" },
          start,
        );
        points.slice(1).forEach((point, index) =>
          timeline.to(
            q(name),
            {
              attr: { cx: point[0], cy: point[1] },
              duration: duration / (points.length - 1),
              ease: "none",
            },
            start + (index * duration) / (points.length - 1),
          ),
        );
        timeline.to(
          q(name),
          { opacity: 0, duration: 0.25, ease: "power2.in" },
          start + duration + 0.1,
        );
      };

      // The coastline paints in on "United". A single dolly then approaches the sea.
      timeline.fromTo(
        q("uk-camera"),
        { opacity: 0, scale: 1.26, x: -45, y: 35 },
        {
          opacity: 1,
          scale: 1.1,
          x: 0,
          y: -20,
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
        { scale: 1.43, x: -235, y: -185, duration: 3.3, ease: "sine.inOut" },
        2.35,
      );
      timeline.to(
        q("uk-camera"),
        {
          scale: 1.65,
          x: -505,
          y: -205,
          opacity: 0.14,
          duration: 1.2,
          ease: "power2.inOut",
        },
        5.55,
      );
      timeline.to(
        q("uk-camera"),
        { opacity: 0, x: -585, duration: 0.7, ease: "power2.in" },
        11.0,
      );

      // The ship fits the safe frame. Wind and a trailing wake animate navigation internally.
      timeline.fromTo(
        q("sail"),
        { opacity: 0, scale: 1.03, x: 290, y: 90, rotation: -1.2 },
        {
          opacity: 1,
          scale: 0.89,
          x: 55,
          y: -40,
          rotation: -0.3,
          duration: 1.25,
          ease: "power3.out",
        },
        6.2,
      );
      timeline.to(
        q("sail"),
        {
          scale: 0.94,
          x: 105,
          y: -60,
          rotation: 0.35,
          duration: 2.3,
          ease: "none",
        },
        7.45,
      );
      timeline.to(
        q("sail"),
        {
          scale: 0.61,
          x: -385,
          y: 35,
          rotation: -0.4,
          duration: 2.75,
          ease: "power2.inOut",
        },
        9.75,
      );
      timeline.to(
        q("sail"),
        { opacity: 0, x: -620, duration: 0.55, ease: "power2.in" },
        12.15,
      );
      timeline.fromTo(
        q("sail-wind"),
        { opacity: 0 },
        { opacity: 0.72, duration: 0.5, ease: "power3.out" },
        7.2,
      );
      for (let i = 0; i < 3; i++) {
        timeline.fromTo(
          q(`wind-${i}`),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 1.35, repeat: 2, ease: "none" },
          7.25 + i * 0.13,
        );
      }
      timeline.fromTo(
        q("sail-course"),
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5 },
        7.7,
      );
      timeline.to(
        q("wake-0"),
        { strokeDashoffset: -65, duration: 4, ease: "none" },
        7.75,
      );
      timeline.to(
        q("wake-1"),
        { strokeDashoffset: -40, duration: 3.7, ease: "none" },
        8.1,
      );

      // Bright signals follow the same Turf samples as the dotted connections.
      timeline.fromTo(
        q("empire"),
        { opacity: 0, scale: 2.22, x: 80, y: 270 },
        {
          opacity: 1,
          scale: 1.06,
          x: 12,
          y: -26,
          duration: 1.65,
          ease: "power3.inOut",
        },
        11.3,
      );
      timeline.to(
        q("empire"),
        { scale: 1.12, x: -70, y: -22, duration: 6.1, ease: "none" },
        12.95,
      );
      atlas.views.colonies.routes.forEach((route, i) => {
        const start = 12.34 + i * 0.42;
        timeline.to(
          selector(`[data-h="empire"] [data-atlas-route-mask="${i}"]`),
          { strokeDashoffset: 0, duration: 1.5, ease: "none" },
          start,
        );
        timeline.fromTo(
          selector(`[data-h="empire"] [data-atlas-destination="${i}"]`),
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power3.out" },
          start + 1.23,
        );
        travel(`empire-signal-${i}`, route.samples, start, 1.5);
      });
      timeline.to(
        q("empire"),
        { scale: 1.16, x: -130, y: -16, duration: 2.8, ease: "sine.inOut" },
        19.05,
      );
      // Move only the light, keeping the land mask registered to its coastline.
      timeline.fromTo(
        selector('[data-h="empire"] [data-atlas-daylight]'),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        19.12,
      );
      timeline.fromTo(
        selector('[data-h="empire"] [data-atlas-daylight] rect'),
        { x: -280 },
        { x: 1710, duration: 3.55, ease: "none" },
        19.13,
      );
      timeline.to(
        q("empire"),
        {
          opacity: 0,
          scale: 1.36,
          x: -300,
          y: -12,
          duration: 1,
          ease: "power2.inOut",
        },
        22.0,
      );

      // Fictional illustration -> separated island -> outward influence, with routes anchored to its harbour.
      timeline.fromTo(
        q("fantasy"),
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: "power3.out" },
        22.3,
      );
      timeline.fromTo(
        q("island"),
        { scale: 1.12, x: 135, y: 15 },
        { scale: 0.92, x: 55, y: -80, duration: 2.9, ease: "sine.inOut" },
        22.5,
      );
      timeline.to(
        q("island"),
        { scale: 0.76, x: -170, y: -70, duration: 2.25, ease: "power2.inOut" },
        25.4,
      );
      timeline.to(
        q("island"),
        { scale: 0.73, x: -190, y: -75, duration: 2.7, ease: "none" },
        27.65,
      );
      timeline.fromTo(
        q("island-passage"),
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" },
        28.16,
      );
      timeline.to(
        q("island-passage-line"),
        { strokeDashoffset: 0, duration: 1.65, ease: "none" },
        28.16,
      );
      travel("island-passage-token", fantasyPassage.samples, 28.16, 1.65);
      timeline.to(
        q("island-destination"),
        { opacity: 1, duration: 0.35, ease: "power3.out" },
        29.53,
      );
      timeline.to(
        q("island-passage"),
        { opacity: 0, duration: 0.35, ease: "power2.in" },
        30.6,
      );
      timeline.to(
        q("island"),
        { scale: 1.18, x: -20, y: 85, duration: 2.1, ease: "power2.inOut" },
        30.35,
      );
      timeline.to(
        q("island"),
        { scale: 1.2, x: -78, y: 72, duration: 1.55, ease: "none" },
        32.45,
      );
      timeline.to(
        q("island"),
        { scale: 0.67, x: -40, y: -145, duration: 2.15, ease: "power2.inOut" },
        34.0,
      );
      timeline.to(
        q("island"),
        { scale: 0.72, x: -60, y: -153, duration: 3.35, ease: "none" },
        36.15,
      );
      timeline.fromTo(
        q("influence-net"),
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        36.7,
      );
      fantasyInfluence.forEach((route, i) => {
        const start = 36.85 + i * 0.26;
        timeline.to(
          q(`influence-route-${i}`),
          { strokeDashoffset: 0, duration: 1.45, ease: "none" },
          start,
        );
        travel(`influence-token-${i}`, route.samples, start, 1.45);
        timeline.to(
          q(`influence-port-${i}`),
          { opacity: 1, duration: 0.3 },
          start + 1.2,
        );
      });
      timeline.to(
        q("influence-net"),
        { opacity: 0, duration: 0.45, ease: "power2.in" },
        39.42,
      );

      // Both subjects settle onto one lower alignment before the camera chooses Britain.
      timeline.to(
        q("island"),
        { scale: 0.51, x: -490, y: 25, duration: 1.55, ease: "power3.inOut" },
        39.5,
      );
      timeline.to(
        q("fantasy-paper"),
        { backgroundColor: "#152B40", duration: 1.2, ease: "sine.inOut" },
        39.65,
      );
      timeline.fromTo(
        q("comparison"),
        { opacity: 0, scale: 0.84, x: 610, y: 40 },
        {
          opacity: 1,
          scale: 0.9,
          x: 360,
          y: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        39.95,
      );
      timeline.to(
        q("comparison"),
        { scale: 0.92, x: 344, y: -8, duration: 3.5, ease: "none" },
        41.15,
      );
      timeline.to(
        q("island"),
        { scale: 0.525, x: -494, y: 19, duration: 3.5, ease: "none" },
        41.05,
      );
      timeline.to(
        q("island"),
        { x: -1510, scale: 0.61, duration: 1.7, ease: "power2.inOut" },
        44.25,
      );
      timeline.to(
        q("comparison"),
        { scale: 1.22, x: -165, y: -78, duration: 2.05, ease: "power2.inOut" },
        44.6,
      );
      timeline.to(
        q("fantasy"),
        { opacity: 0, duration: 0.9, ease: "power2.in" },
        45.75,
      );
      timeline.to(
        q("comparison"),
        { scale: 1.16, x: -178, y: -38, duration: 2.55, ease: "sine.inOut" },
        46.65,
      );

      // A moving chart explains naval projection instead of repeating the hero ship.
      timeline.fromTo(
        q("europe"),
        { opacity: 0, scale: 1.86, x: 320, y: 145 },
        {
          opacity: 1,
          scale: 1.17,
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
          scale: 0.58,
          x: -95,
          y: 65,
          duration: 1.45,
          ease: "power2.inOut",
        },
        49.0,
      );
      timeline.to(
        q("europe"),
        { scale: 1.25, x: 72, y: -8, duration: 3.2, ease: "none" },
        50.7,
      );
      timeline.to(
        q("europe"),
        { scale: 1.15, x: 125, y: 35, duration: 2.4, ease: "sine.inOut" },
        53.9,
      );
      timeline.fromTo(
        q("sea-network"),
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power3.out" },
        53.4,
      );
      europeSeaRoutes.forEach((route, i) => {
        const start = 53.5 + i * 0.18;
        const segments = route.samples.length - 1;
        const direction = (from: Point, to: Point) =>
          (Math.atan2(to[0] - from[0], -(to[1] - from[1])) * 180) / Math.PI;
        timeline.set(
          q(`sea-vessel-${i}`),
          {
            x: route.samples[0][0],
            y: route.samples[0][1],
            rotation: direction(route.samples[0], route.samples[1]),
            svgOrigin: "0 0",
          },
          0,
        );
        timeline.to(
          q(`sea-route-${i}`),
          { strokeDashoffset: 0, duration: 1.85, ease: "none" },
          start,
        );
        timeline.to(
          q(`sea-vessel-${i}`),
          { opacity: 1, duration: 0.3, ease: "power3.out" },
          start,
        );
        route.samples.slice(1).forEach((point, index) =>
          timeline.to(
            q(`sea-vessel-${i}`),
            {
              x: point[0],
              y: point[1],
              rotation: direction(route.samples[index], point),
              duration: 2.25 / segments,
              ease: "none",
            },
            start + (index * 2.25) / segments,
          ),
        );
      });
      timeline.to(
        q("europe"),
        { opacity: 0, duration: 1.15, ease: "power2.in" },
        56.25,
      );
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
      atlas.views.reach.routes.forEach((route, i) => {
        const start = 56.9 + i * 0.17;
        timeline.to(
          selector(`[data-h="reach"] [data-atlas-route-mask="${i}"]`),
          { strokeDashoffset: 0, duration: 1.55, ease: "none" },
          start,
        );
        timeline.to(
          selector(`[data-h="reach"] [data-atlas-destination="${i}"]`),
          { opacity: 1, duration: 0.35 },
          start + 1.25,
        );
        travel(`reach-signal-${i}`, route.samples, start, 1.55);
      });
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

      // FleetChapter's shared handoff: geometry and timings intentionally unchanged from v4.
      timeline.fromTo(
        q("modern"),
        { opacity: 0, x: 800, y: 240, scale: 1.02 },
        {
          opacity: 1,
          x: 50,
          y: 30,
          scale: 1.16,
          duration: 2,
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
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <SailNavigation />
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
        <WorldSignals mode="colonies" prefix="empire-signal" />
      </div>
      <div data-h="fantasy" style={{ ...full, opacity: 0 }}>
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
          <FantasyNavigation />
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
        <EuropeNavigation />
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
        <WorldSignals mode="reach" prefix="reach-signal" />
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
