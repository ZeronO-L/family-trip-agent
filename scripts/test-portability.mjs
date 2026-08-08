import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillPath = path.join(root, "skills", "manage-family-road-trip", "SKILL.md");
const skill = await fs.readFile(skillPath, "utf8");
const frontmatterMatch = skill.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontmatterMatch) throw new Error("SKILL.md: missing YAML frontmatter");

const frontmatter = frontmatterMatch[1];
const keys = frontmatter.split("\n")
  .filter((line) => /^[a-zA-Z0-9_-]+:/.test(line))
  .map((line) => line.slice(0, line.indexOf(":")));
const nonPortableKeys = keys.filter((key) => !["name", "description", "license", "compatibility", "metadata"].includes(key));
if (nonPortableKeys.length) throw new Error(`SKILL.md: non-portable frontmatter keys: ${nonPortableKeys.join(", ")}`);
if (!/^name: manage-family-road-trip$/m.test(frontmatter)) throw new Error("SKILL.md: name must match its directory");
if (!/^description: .+/m.test(frontmatter)) throw new Error("SKILL.md: description is required");

const codexManifest = JSON.parse(await fs.readFile(path.join(root, ".codex-plugin", "plugin.json"), "utf8"));
const claudeManifest = JSON.parse(await fs.readFile(path.join(root, ".claude-plugin", "plugin.json"), "utf8"));
const claudeMarketplace = JSON.parse(await fs.readFile(path.join(root, ".claude-plugin", "marketplace.json"), "utf8"));
const packageManifest = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
for (const [label, value] of [["Codex", codexManifest], ["Claude Code", claudeManifest]]) {
  if (value.name !== "family-trip-agent") throw new Error(`${label} manifest: unexpected plugin name`);
  if (value.version !== packageManifest.version) throw new Error(`${label} manifest: version mismatch`);
}
const claudeMarketplaceEntry = claudeMarketplace.plugins.find((plugin) => plugin.name === "family-trip-agent");
if (!claudeMarketplaceEntry) {
  throw new Error("Claude Code marketplace: plugin entry missing");
}
if (claudeMarketplaceEntry.version !== packageManifest.version) {
  throw new Error("Claude Code marketplace: version mismatch");
}

const hosts = JSON.parse(await fs.readFile(path.join(root, "compatibility", "hosts.json"), "utf8"));
const requiredHosts = ["Codex and ChatGPT Work", "Claude Code", "OpenCode", "GitHub Copilot", "Gemini CLI", "Cursor"];
for (const host of requiredHosts) {
  if (!hosts.some((entry) => entry.host === host)) throw new Error(`Compatibility matrix: missing ${host}`);
}

const allowedRuntimeStatuses = new Set(["verified", "pending"]);
for (const entry of hosts) {
  if (!allowedRuntimeStatuses.has(entry.runtime_validation)) {
    throw new Error(`Compatibility matrix: invalid runtime status for ${entry.host}`);
  }
}

const runtimeDir = path.join(root, "evals", "runtime");
const runtimeRecords = await Promise.all(
  (await fs.readdir(runtimeDir))
    .filter((file) => file.endsWith(".json"))
    .map(async (file) => JSON.parse(await fs.readFile(path.join(runtimeDir, file), "utf8")))
);
const codexVerified = runtimeRecords.some((record) =>
  record.host.startsWith("Codex") &&
  record.execution_context === "independent_fresh_task" &&
  record.clean_runtime_gate_satisfied === true &&
  record.result === "pass"
);
if (hosts.find((entry) => entry.host === "Codex and ChatGPT Work")?.runtime_validation === "verified" && !codexVerified) {
  throw new Error("Compatibility matrix: Codex runtime verification has no clean independent passing record");
}

const installRecord = JSON.parse(await fs.readFile(path.join(root, "evals", "install", "gh-skill-local-2026-08-08.json"), "utf8"));
const requiredInstallFlags = ["codex", "claude-code", "opencode", "github-copilot", "gemini-cli", "cursor"];
for (const agentFlag of requiredInstallFlags) {
  const result = installRecord.hosts.find((entry) => entry.agent_flag === agentFlag);
  if (!result?.installed) throw new Error(`Installation smoke record: ${agentFlag} did not install`);
}

console.log(`Portable Agent Skill frontmatter, runtime claims, and recorded installation smoke passed for ${requiredHosts.length} documented hosts.`);
