import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function jsonFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await jsonFiles(full));
    else if (entry.name.endsWith(".json")) result.push(full);
  }
  return result;
}

function requireFields(value, fields, label) {
  for (const field of fields) {
    if (!(field in value)) throw new Error(`${label}: missing required field ${field}`);
  }
}

const schemaFiles = await jsonFiles(path.join(root, "schemas"));
const exampleFiles = await jsonFiles(path.join(root, "examples"));
const policyEvalFiles = await jsonFiles(path.join(root, "evals", "cases"));
const sourceEvalFiles = await jsonFiles(path.join(root, "evals", "source-cases"));
const liveEvalFiles = await jsonFiles(path.join(root, "evals", "live"));
const installEvalFiles = await jsonFiles(path.join(root, "evals", "install"));
const runtimeEvalFiles = await jsonFiles(path.join(root, "evals", "runtime"));
const regionStatusFile = path.join(root, "compatibility", "regions.json");
const evalFiles = [...policyEvalFiles, ...sourceEvalFiles, ...liveEvalFiles, ...installEvalFiles, ...runtimeEvalFiles];

for (const file of [...schemaFiles, ...exampleFiles, ...evalFiles, regionStatusFile]) {
  JSON.parse(await fs.readFile(file, "utf8"));
}

for (const file of schemaFiles) {
  const schema = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(schema, ["$schema", "title", "type"], path.relative(root, file));
}

for (const file of policyEvalFiles) {
  const testCase = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(testCase, ["case_id", "title", "priority", "input", "must_include_actions", "must_not_include_actions", "privacy"], path.relative(root, file));
  if (testCase.privacy.synthetic_or_anonymized !== true) {
    throw new Error(`${path.relative(root, file)}: public eval data must be synthetic or anonymized`);
  }
}

for (const file of sourceEvalFiles) {
  const testCase = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(testCase, ["case_id", "title", "input", "expected_provider_ids", "prohibited_provider_ids", "assertions", "privacy"], path.relative(root, file));
  if (testCase.privacy.synthetic_or_anonymized !== true) {
    throw new Error(`${path.relative(root, file)}: public source eval data must be synthetic or anonymized`);
  }
}

for (const file of liveEvalFiles) {
  const record = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(record, ["test_id", "destination", "retrieved_at", "scope", "sources", "limitations", "privacy"], path.relative(root, file));
  if (record.privacy.contains_personal_data !== false) {
    throw new Error(`${path.relative(root, file)}: live smoke data must not contain personal data`);
  }
}

for (const file of installEvalFiles) {
  const record = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(record, ["test_id", "tested_at", "installer", "source_mode", "isolation", "hosts", "privacy"], path.relative(root, file));
  if (record.privacy.contains_local_paths !== false || record.privacy.contains_personal_data !== false) {
    throw new Error(`${path.relative(root, file)}: install smoke record contains private data`);
  }
}

for (const file of runtimeEvalFiles) {
  const record = JSON.parse(await fs.readFile(file, "utf8"));
  requireFields(record, ["test_id", "tested_at", "host", "execution_context", "clean_runtime_gate_satisfied", "result", "destination", "prompt_ref", "assertions", "sources", "limitations", "privacy"], path.relative(root, file));
  if (record.privacy.contains_local_paths !== false || record.privacy.contains_personal_data !== false) {
    throw new Error(`${path.relative(root, file)}: runtime record contains private data`);
  }
  if (record.clean_runtime_gate_satisfied && record.execution_context === "same_thread_assisted") {
    throw new Error(`${path.relative(root, file)}: an assisted same-thread run cannot satisfy the clean runtime gate`);
  }
  if (record.result !== "fail" && record.assertions.some((assertion) => assertion.verdict === "fail")) {
    throw new Error(`${path.relative(root, file)}: a non-failing result cannot contain a failed assertion`);
  }
  if (record.clean_runtime_gate_satisfied && record.result !== "pass") {
    throw new Error(`${path.relative(root, file)}: a clean runtime pass must have result=pass`);
  }
  await fs.access(path.join(root, record.prompt_ref));
}

const regionStatus = JSON.parse(await fs.readFile(regionStatusFile, "utf8"));
requireFields(regionStatus, ["schema_version", "updated_at", "levels", "regions"], "compatibility/regions.json");
const allowedRegionLevels = new Set(["experimental", "desk_verified", "community_tested", "field_tested"]);
for (const region of regionStatus.regions) {
  requireFields(region, ["region_id", "label", "status", "evidence_counts", "verified_scope", "limitations", "evidence_refs"], `compatibility/regions.json:${region.region_id || "unknown"}`);
  if (!allowedRegionLevels.has(region.status)) throw new Error(`compatibility/regions.json:${region.region_id}: invalid status ${region.status}`);
  requireFields(region.evidence_counts, ["source_routing_cases", "desk_itinerary_cases", "live_source_records", "community_reports", "field_trips"], `compatibility/regions.json:${region.region_id}:evidence_counts`);
  if (region.status === "field_tested" && region.evidence_counts.field_trips < 1) {
    throw new Error(`compatibility/regions.json:${region.region_id}: field_tested requires field-trip evidence`);
  }
  if (region.status === "community_tested" && region.evidence_counts.community_reports < 1) {
    throw new Error(`compatibility/regions.json:${region.region_id}: community_tested requires a community report`);
  }
}

const family = JSON.parse(await fs.readFile(path.join(root, "examples", "global-road-trip-synthetic", "family-profile.json"), "utf8"));
requireFields(family, ["schema_version", "record_id", "household_label", "members", "preferences", "rules"], "family-profile.json");

const trip = JSON.parse(await fs.readFile(path.join(root, "examples", "global-road-trip-synthetic", "trip.json"), "utf8"));
requireFields(trip, ["schema_version", "trip_id", "family_record_id", "title", "status", "route_options", "plan_versions"], "trip.json");
if (!trip.route_options.some((route) => route.selected)) throw new Error("trip.json: one route option must be selected");

console.log(`Validated ${schemaFiles.length} schemas, ${exampleFiles.length} example files, ${policyEvalFiles.length} policy cases, ${sourceEvalFiles.length} source cases, ${liveEvalFiles.length} live smoke records, ${installEvalFiles.length} install records, ${runtimeEvalFiles.length} runtime records, and ${regionStatus.regions.length} regional status entries.`);
