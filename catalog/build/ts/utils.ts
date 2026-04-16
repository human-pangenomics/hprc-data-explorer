import fsp from "fs/promises";

export async function saveJson(filePath: string, data: unknown): Promise<void> {
  await fsp.writeFile(filePath, JSON.stringify(data, undefined, 2));
}

export async function readJson<T = unknown>(filePath: string): Promise<T> {
  return JSON.parse(await fsp.readFile(filePath, "utf8"));
}
