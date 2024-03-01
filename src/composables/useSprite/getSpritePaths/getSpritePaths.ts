import Assets from "@/data/assets.json";

export function getSpritePaths(path: string, obj: any = Assets) {
  const splittedPath = path.split("/");
  if (splittedPath[0] === "") {
    splittedPath.shift();
  }
  const currentPath = splittedPath.shift();
  const currentObject = obj[currentPath as keyof typeof obj];
  let asset: any;

  if (currentObject !== undefined) {
    if (Array.isArray(currentObject)) {
      asset = currentObject;
    } else {
      asset = getSpritePaths(splittedPath.join("/"), currentObject);
    }
  }
  return asset;
}
