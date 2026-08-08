import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateScenario } from "../src/policy-engine.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const casesDir = path.join(root, "evals", "cases");
const files = (await fs.readdir(casesDir)).filter((file) => file.endsWith(".json")).sort();
let failures = 0;

for (const file of files) {
  const testCase = JSON.parse(await fs.readFile(path.join(casesDir, file), "utf8"));
  const actions = evaluateScenario(testCase.input).map((action) => action.type);
  const missing = testCase.must_include_actions.filter((type) => !actions.includes(type));
  const forbidden = testCase.must_not_include_actions.filter((type) => actions.includes(type));
  const ok = missing.length === 0 && forbidden.length === 0;
  console.log(`${ok ? "PASS" : "FAIL"} ${testCase.case_id} ${testCase.title}`);
  if (!ok) {
    failures += 1;
    if (missing.length) console.log(`  missing: ${missing.join(", ")}`);
    if (forbidden.length) console.log(`  forbidden: ${forbidden.join(", ")}`);
    console.log(`  actions: ${actions.join(", ")}`);
  }
}

console.log(`\n${files.length - failures}/${files.length} evaluation cases passed.`);
if (failures) process.exitCode = 1;
