import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkedExtensions = new Set([".md", ".json", ".yaml", ".yml", ".mjs", ".js"]);
const originalRouteTerms = [
  ["north", "east"], ["bei", "jing"], ["shen", "yang"], ["ji", "'an"],
  ["kuan", "dian"], ["dan", "dong"], ["pan", "jin"]
].map((parts) => parts.join("")).join("|");
const domesticProviderTerms = [
  ["bai", "du"], ["dian", "ping"], ["xiao", "hong", "shu"], ["c", "trip"]
].map((parts) => parts.join("")).join("|");
const forbidden = [
  { label: "CJK identity or localization text", pattern: /[\p{Script=Han}]/u },
  { label: "local absolute user path", pattern: /\/Users\// },
  { label: "original regional example", pattern: new RegExp(originalRouteTerms, "i") },
  { label: "domestic-only provider", pattern: new RegExp(domesticProviderTerms, "i") }
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (checkedExtensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const failures = [];
for (const file of await walk(root)) {
  if (path.basename(file) === "privacy-audit.mjs") continue;
  const content = await fs.readFile(file, "utf8");
  for (const check of forbidden) {
    if (check.pattern.test(content)) failures.push(`${path.relative(root, file)}: ${check.label}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Public-repository privacy audit passed: no local identity, original-route, or domestic-provider markers found.");
}
