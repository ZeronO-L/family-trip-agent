import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSourcePlan } from "../src/source-catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "evals", "source-cases");
const files = (await fs.readdir(casesDir)).filter((file) => file.endsWith(".json")).sort();
let failures = 0;

for (const file of files) {
  const testCase = JSON.parse(await fs.readFile(path.join(casesDir, file), "utf8"));
  const plan = buildSourcePlan(testCase.input);
  const providerIds = new Set(Object.values(plan.by_need).flat().map((source) => source.id));
  const missing = testCase.expected_provider_ids.filter((id) => !providerIds.has(id));
  const prohibited = testCase.prohibited_provider_ids.filter((id) => providerIds.has(id));
  const coverageFailures = [];

  for (const [need, minimum] of Object.entries(testCase.assertions.min_providers_per_need || {})) {
    if ((plan.by_need[need]?.length || 0) < minimum) coverageFailures.push(`${need}<${minimum}`);
  }

  for (const need of testCase.assertions.require_official_for || []) {
    if (!(plan.by_need[need] || []).some((source) => source.roles.includes("official"))) {
      coverageFailures.push(`${need}:missing-official`);
    }
  }

  const ok = missing.length === 0 && prohibited.length === 0 && coverageFailures.length === 0;
  console.log(`${ok ? "PASS" : "FAIL"} ${testCase.case_id} ${testCase.title}`);
  if (!ok) {
    failures += 1;
    if (missing.length) console.log(`  missing providers: ${missing.join(", ")}`);
    if (prohibited.length) console.log(`  prohibited providers: ${prohibited.join(", ")}`);
    if (coverageFailures.length) console.log(`  coverage failures: ${coverageFailures.join(", ")}`);
  }
}

console.log(`\n${files.length - failures}/${files.length} global source-routing cases passed.`);
if (failures) process.exitCode = 1;
