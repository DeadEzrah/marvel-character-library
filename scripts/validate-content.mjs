import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(root, "packs", "_source");
const allowedClassifications = new Set(["original", "licensed", "public-domain"]);
const errors = [];
let actorCount = 0;

for (const file of await findJsonFiles(sourceRoot)) {
  const relativePath = path.relative(root, file);
  let actor;
  try {
    actor = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message}).`);
    continue;
  }

  actorCount += 1;
  const content = actor?.flags?.["marvel-character-library"]?.content;
  if (!content || typeof content !== "object") {
    errors.push(`${relativePath}: missing flags.marvel-character-library.content provenance.`);
    continue;
  }

  if (!allowedClassifications.has(content.classification)) {
    errors.push(`${relativePath}: unsupported content classification '${content.classification ?? "<missing>"}'.`);
  }
  for (const field of ["creator", "provenance", "reviewedAt"]) {
    if (typeof content[field] !== "string" || !content[field].trim()) {
      errors.push(`${relativePath}: content provenance requires '${field}'.`);
    }
  }
  if (content.classification !== "original") {
    for (const field of ["license", "sourceUrl"]) {
      if (typeof content[field] !== "string" || !content[field].trim()) {
        errors.push(`${relativePath}: ${content.classification} content requires '${field}'.`);
      }
    }
  }

  if (content.readyToPlay === true) {
    validateReadyToPlayActor(actor, relativePath);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated provenance for ${actorCount} public Actor records.`);

function validateReadyToPlayActor(actor, relativePath) {
  for (const ability of ["mle", "agl", "res", "vig", "ego", "log"]) {
    if (!Number.isFinite(actor?.system?.abilities?.[ability]?.value)) {
      errors.push(`${relativePath}: scene-ready Actor requires numeric system.abilities.${ability}.value.`);
    }
  }
  for (const resource of ["health", "focus"]) {
    if (!Number.isFinite(actor?.system?.[resource]?.value) || !Number.isFinite(actor?.system?.[resource]?.max)) {
      errors.push(`${relativePath}: scene-ready Actor requires numeric ${resource} value and max.`);
    }
  }
  for (const field of ["history", "personality"]) {
    if (typeof actor?.system?.[field] !== "string" || !actor.system[field].trim()) {
      errors.push(`${relativePath}: scene-ready Actor requires system.${field}.`);
    }
  }
  if (!actor?.prototypeToken?.texture?.src) {
    errors.push(`${relativePath}: scene-ready Actor requires a prototype token texture.`);
  }
  if (!actor?.items?.some(item => item?.system?.attack === true)) {
    errors.push(`${relativePath}: scene-ready Actor requires at least one rollable attack.`);
  }
  for (const item of actor?.items ?? []) {
    const expectedKey = `!actors.items!${actor._id}.${item._id}`;
    if (item?._key !== expectedKey) {
      errors.push(`${relativePath}: embedded item '${item?.name ?? item?._id ?? "<unknown>"}' requires _key '${expectedKey}'.`);
    }
  }
}

async function findJsonFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findJsonFiles(resolved));
    else if (entry.isFile() && entry.name.endsWith(".json")) files.push(resolved);
  }
  return files;
}
