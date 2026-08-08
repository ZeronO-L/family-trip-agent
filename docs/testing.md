# Testing and release gates

## Current test layers

### 1. Static validation

- JSON syntax and required data fields.
- Codex Skill and plugin manifest validation.
- Claude Code manifest and marketplace JSON structure.
- Portable Agent Skills frontmatter and host matrix.
- GitHub Actions and issue-form YAML syntax, including the anonymous-feedback privacy confirmation.
- English-only public artifact and identity-marker audit.

### 2. Deterministic behavior evaluations

Eighteen policy cases cover heat, heavy rain, fatigue, late departure, venue closure, scenic waypoint order, multi-source route consistency, city clustering and dynamic entry claims, parking action cards, weak dining corridors, compact attraction plans, booking-state separation, locked-booking replans, failed-attraction local replans, consecutive-reservation room continuity, and pace-label integrity.

Four global source-routing cases cover:

- a United States national park;
- a United Kingdom city trip;
- an Australian road trip;
- an unknown-market fallback.

These cases verify provider diversity, regional weather routing, official-source coverage, and the absence of inappropriate regional providers.

The regional registry under `compatibility/regions.json` reports what these tests prove without converting desk or source-routing evidence into a field-tested claim. See [regional validation status](./region-status.md).

An installation smoke test also copies the canonical Skill from a local checkout into six isolated host-specific test repositories through GitHub CLI: Codex, Claude Code, OpenCode, GitHub Copilot, Gemini CLI, and Cursor. Installation succeeded for all six; model runtime was not executed by this test.

### 3. Recorded global web-research smoke test

The current Yosemite record checks:

- Google Maps POI discovery with a JavaScript limitation;
- Tripadvisor review discovery;
- a Yelp robots-blocked fallback;
- Booking.com parking and laundry evidence;
- a National Weather Service point forecast;
- National Park Service conditions and entry policy;
- GetYourGuide inventory as a commercial comparison source.

The record proves that the fallback contract is realistic. It does not prove booking, payment, live navigation, mobile-app behavior, or every destination market.

### 4. Runtime forward tests

The shared prompt under `evals/prompts/` must run in every claimed host. Review the output for observable behavior rather than wording.

Four Codex desktop records are stored under `evals/runtime/`:

- an assisted itinerary run that passed with limitations but cannot satisfy the clean runtime gate;
- the original failed independent blind run, retained as regression history;
- a later independent multi-turn planning and booking-aware replan that passed the clean Codex runtime gate;
- an anonymized non-US multigeneration replan that passed its behavior assertions with limitations, while withholding private destination and source identities.

The assisted run also corrected two over-broad claims in the earlier live-source record: Booking.com hotel details and the National Weather Service forecast are now `partial`, not `full`, because neither source supported a complete current operational claim in the recheck.

The deterministic suite preserves both the original blind-run failures and the later multi-turn replan lessons. Public cases contain only synthetic or anonymized decision boundaries.

## Commands

```bash
npm run validate
npm run eval:policy
npm run eval:sources
npm run test:portability
npm run test:github
npm run test:privacy
npm run test:live-record
npm test
npm run release:check
```

`release:check` rejects recorded live-source evidence older than 30 days.

## Release gate

Do not publish a release until all applicable items pass:

1. Run `npm run release:check` from a clean checkout.
2. Run the official Codex Skill and plugin validators.
3. Run `claude plugin validate .` when Claude Code is available.
4. Install the skill into each advertised host without relying on the development checkout.
5. Run the same forward-test prompt in a fresh independent task on every host that will be labeled `runtime verified`; keep untested hosts at `structural support`.
6. Run at least one United States and one non-US live-source scenario. Private non-US evidence may be published only as an anonymized behavior record and cannot upgrade a named region without reproducible public evidence.
7. Confirm blocked-provider fallback, official weather, official closure policy, parking actions, and plan-versus-booked separation.
8. Review all unresolved facts and ensure the Agent labels them instead of guessing.
9. Run the maintainer privacy and git metadata checklist.
10. Create a release candidate tag before the stable tag.

## What automated tests cannot prove

- that a provider will remain accessible tomorrow;
- that ranking or review content is unbiased;
- that a map route is safe without current road conditions;
- that inventory shown by a platform is actually bookable;
- that every model and host follows instructions equally well;
- that an itinerary feels right to a real family.

Those limits are reasons for layered evidence and human approval, not reasons to skip automation.
