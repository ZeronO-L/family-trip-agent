import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "evals", "live");
const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".json"));
const maxAgeArg = process.argv.find((value) => value.startsWith("--max-age-days="));
const maxAgeDays = maxAgeArg ? Number(maxAgeArg.split("=")[1]) : null;
const requiredRoles = ["maps", "reviews", "hotels", "weather", "official_attraction", "tickets"];

for (const file of files) {
  const record = JSON.parse(await fs.readFile(path.join(directory, file), "utf8"));
  for (const role of requiredRoles) {
    const available = record.sources.some((source) => source.role === role && ["full", "partial"].includes(source.access_result));
    if (!available) throw new Error(`${file}: no usable source for ${role}`);
  }
  if (!record.sources.some((source) => source.access_result === "blocked")) {
    throw new Error(`${file}: smoke record must exercise at least one fallback path`);
  }
  if (record.privacy?.contains_personal_data !== false) throw new Error(`${file}: personal data is not allowed`);
  if (maxAgeDays !== null) {
    const ageDays = (Date.now() - new Date(record.retrieved_at).getTime()) / 86_400_000;
    if (ageDays > maxAgeDays) throw new Error(`${file}: live smoke evidence is ${ageDays.toFixed(1)} days old`);
  }
}

console.log(`Validated ${files.length} recorded global web-research smoke test${files.length === 1 ? "" : "s"}.`);
