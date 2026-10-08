import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(root, "packs", "_source");
const destinationRoot = path.join(root, "packs");
const packs = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

for (const pack of packs) {
  const source = path.join(sourceRoot, pack);
  const destination = path.join(destinationRoot, pack);
  await rm(destination, { recursive: true, force: true });
  await compilePack(source, destination, { recursive: true, log: true });
}

console.log(`Built ${packs.length} Actor compendiums.`);
