import timeline from "../../data/part2/timeline.json";

export const FPS = 30;
export const FRAMES = 6593;
export const cueFor = (id: string) => {
  const cue = timeline.scenes.find((scene) => scene.id === id);
  if (!cue) throw new Error(`Unknown Part2 cue: ${id}`);
  return cue;
};
export const cueAt = (id: string, originFrame: number) =>
  (cueFor(id).triggerFrame - originFrame) / FPS;
export const cueDuration = (id: string) => cueFor(id).durationInFrames / FPS;
export const iconAt = (id: string, originFrame: number) =>
  (cueFor(id).iconRevealFrame - originFrame) / FPS;
export const textAt = (id: string, originFrame: number) =>
  (cueFor(id).textRevealFrame - originFrame) / FPS;
export const beatFrame = (id: string, originFrame: number) =>
  cueFor(id).startFrame - originFrame;
export const chapterFor = (id: string) => {
  const chapter = timeline.chapters.find((item) => item.id === id);
  if (!chapter) throw new Error(`Unknown Part2 chapter: ${id}`);
  return chapter;
};
