import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const githubRoot = path.join(root, ".github");

async function yamlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await yamlFiles(full));
    else if (/\.ya?ml$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const files = await yamlFiles(githubRoot);
for (const file of files) {
  const document = YAML.parseDocument(await fs.readFile(file, "utf8"));
  if (document.errors.length) {
    throw new Error(`${path.relative(root, file)}: ${document.errors.map((error) => error.message).join("; ")}`);
  }
}

const issueFormPath = path.join(githubRoot, "ISSUE_TEMPLATE", "anonymized-behavior-report.yml");
const issueForm = YAML.parse(await fs.readFile(issueFormPath, "utf8"));
if (!issueForm.name || !issueForm.description || !Array.isArray(issueForm.body)) {
  throw new Error("Anonymized behavior report: missing name, description, or body");
}
if (!issueForm.body.some((item) => item.type === "checkboxes" && item.id === "privacy_confirmation")) {
  throw new Error("Anonymized behavior report: privacy confirmation is required");
}

console.log(`Validated ${files.length} GitHub YAML files and the anonymized feedback privacy gate.`);
