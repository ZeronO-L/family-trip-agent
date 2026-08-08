# Evaluation contract

## Turn failures into cases

Create one evaluation case with:

- scenario input;
- original problem;
- required action types;
- forbidden action types;
- priority;
- anonymization status;
- source case reference.

Prefer behavior assertions over exact prose. For example, require `add_rest_window` and forbid `keep_midday_outdoor_activity` instead of matching a paragraph.

## Initial regression themes

- compare both directions of a road-trip loop;
- verify manual waypoint order;
- reconcile conflicting text, image, and map waypoint lists before routing;
- cluster city stops by area and recheck dynamic entry claims with official sources;
- protect lunch on a weak-dining mountain route;
- replan after a venue closure;
- downgrade outdoor activity in extreme heat;
- cancel scenic mountain driving in dangerous rain;
- create a complete hotel parking action card;
- recompute ETA after a late departure with a hard appointment;
- keep budget and actual spending separate.
- choose global research providers by destination country and source role;
- fall back when a provider is blocked, JavaScript-only, login-only, or lacks local coverage;
- preserve official sources for weather, closures, road restrictions, and entry policy;
- keep the portable `SKILL.md` valid across supported Agent Skills hosts.
- cross-check published road-trip routes and complete daily driving totals with independent map roles;
- require two independent review sources and negative-pattern classification for important meals;
- expose source access result, retrieval time, fallback, and unresolved facts in the delivered plan;
- expand generic hotel parking claims into complete action cards with visible unknowns.

## Run local checks

From the plugin root:

```bash
npm test
```

`npm run validate` checks schemas and example data. `npm run eval` executes deterministic safety, replanning, and global source-routing cases. `npm run test:portability` verifies the open Agent Skills entrypoint and host manifests. `npm run test:privacy` rejects local identity and original-route markers. `npm run test:live-record` validates recorded web-research smoke evidence.

Run `npm run release:check` before a release. It executes the full suite and rejects live source evidence older than 30 days.

Static and deterministic tests do not prove end-to-end model quality. Run the prompts under `evals/prompts/` in each claimed host and record the result before changing that host from `structural support` to `runtime verified`.

When changing the Skill, policy engine, or data contract, add the failure case first, confirm the old behavior fails when practical, implement the correction, then run the full suite.
