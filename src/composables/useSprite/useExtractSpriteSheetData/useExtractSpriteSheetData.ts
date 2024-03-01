const FRAME_COUNT = 0;
const POSE = 1;
const VERSION = 2;

export interface SpriteSheetData {
  frameCount: number;
  pose?: string;
  version?: string;
}

export function useExtractSpriteSheetData(src: string) {
  const fileName = src.split("/").pop()?.split(".")[0];
  const splittedData = fileName?.split("-");

  const frameCount = getSpriteFrameCount(fileName);
  const pose =
    frameCount === 0
      ? getSpritePoseName("-" + fileName)
      : getSpritePoseName(fileName);
  const version = getSpriteVersion(fileName);

  const spriteSheetData: SpriteSheetData = {
    frameCount: isNaN(frameCount) ? 0 : frameCount,
    pose: pose,
    version: version,
  };

  return spriteSheetData;
}

function getSpriteFrameCount(fileName: string | undefined) {
  const splittedData = fileName?.split("-");
  const frameCount = splittedData ? Number(splittedData[FRAME_COUNT]) : 0;

  if (isNaN(frameCount)) {
    return 0;
  }
  return frameCount;
}

function getSpritePoseName(fileName: string | undefined) {
  const splittedData = fileName?.split("-");
  let pose = splittedData ? splittedData[POSE] : "noPose";
  return pose;
}

function getSpriteVersion(fileName: string | undefined) {
  const splittedData = fileName?.split("-");
  const version = splittedData ? splittedData[VERSION] : "";

  return version;
}
