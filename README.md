# Family Trip Agent

An open-source, local-first Agent Skill designed for family road trips worldwide, with region-dependent source coverage and validation status.

> Status: `0.1.0-alpha.1`, release-candidate preparation. Static checks, deterministic evaluations, global-source smoke evidence, and an independent multi-turn Codex planning and replan test pass. Publication still requires the final clean-export, maintainer-privacy, and GitHub account checks.

## Why this project exists

Most travel planners stop after producing an itinerary. Family trips need a longer loop:

1. turn family constraints into an executable plan;
2. select sources that work in the destination market;
3. keep alternatives for weather, fatigue, traffic, meals, parking, and closures;
4. replan during the trip without destroying hard commitments;
5. compare the plan with what actually happened;
6. promote repeated, user-confirmed lessons into reusable family rules.

Family Trip Agent keeps `planned`, `selected`, `booked`, and `actual` facts separate. Recommendations remain traceable, revisable, and distinct from confirmed reservations.

## Global research support

The Agent uses a source-routing strategy rather than assuming that one travel platform works everywhere.

| Research need | Global defaults | Regional or independent fallbacks |
| --- | --- | --- |
| Maps and driving | Google Maps | Apple Maps, OpenStreetMap, official road authorities |
| Restaurants and reviews | Google reviews, Tripadvisor | Yelp where coverage exists, OpenTable, TheFork, direct restaurant sites |
| Travel discovery | official tourism boards, Tripadvisor forums | Reddit travel communities, established guide publishers |
| Hotels | Booking.com, Expedia | Agoda in relevant markets, direct hotel sites or property contact |
| Attractions and tickets | official venue or park site | GetYourGuide, Viator, Tiqets, regional reservation portals |
| Weather | national meteorological authority | Open-Meteo or another transparent forecast source |
| Roads and parks | official road and park authorities | Google Maps traffic and regional road services |

Examples of regional authority routing include NWS/NOAA and NPS in the United States, the Met Office in the United Kingdom, Environment and Climate Change Canada, the Australian Bureau of Meteorology, and national or regional European weather and transport authorities.

This is source-aware research support, not a claim of direct API integration with every provider. Some pages require JavaScript, login, a mobile app, or block automated retrieval. The Agent must record `full`, `partial`, `blocked`, or `manual_only` access, switch to an independent fallback, and never invent inaccessible facts. See [global source strategy](./skills/manage-family-road-trip/references/global-source-strategy.md).

Regional evidence is reported separately from webpage access and host compatibility. The current public matrix covers the United States, the United Kingdom, Australia, and an unknown-market fallback, with explicit scope and limitations. See [regional validation status](./docs/region-status.md).

## Supported AI hosts

The canonical workflow follows the open Agent Skills `SKILL.md` format. One skill is reused across hosts to prevent behavioral drift.

| Host | Distribution path | Current verification level |
| --- | --- | --- |
| Codex and ChatGPT Work | native Codex plugin plus Agent Skill | runtime verified in an independent planning and replan task |
| Claude Code | native Claude plugin or Agent Skill | manifest and portable structure passed; runtime pending |
| OpenCode | Agent Skill | portable structure passed; runtime pending |
| GitHub Copilot | Agent Skill | portable structure passed; runtime pending |
| Gemini CLI | Agent Skill | portable structure passed; runtime pending |
| Cursor | Agent Skill | portable structure passed; runtime pending |

The repository does not claim runtime verification until the same forward-test prompt passes in that host. See [host compatibility](./docs/compatibility.md) and [testing strategy](./docs/testing.md).

## What is included

- Codex and Claude Code plugin manifests.
- The portable `manage-family-road-trip` Agent Skill.
- JSON Schemas for family profiles, trips, feedback cases, family rules, source evaluations, regional validation, and live smoke records.
- A deterministic policy engine for high-risk replanning scenarios.
- Global source-routing logic for North America, Europe, Asia-Pacific, and unknown-market fallbacks.
- Synthetic public examples with no original family route or regional identity markers.
- Local validation, privacy audit, portability checks, release gates, and GitHub Actions CI.

## Quick start

Requirements:

- Node.js 20 or later for repository tests.
- Any supported host with Agent Skills support.

Clone and verify the project:

```bash
git clone https://github.com/ZeronO-L/family-trip-agent.git
cd family-trip-agent
npm test
```

Run the stricter release gate:

```bash
npm run release:check
```

The release gate requires all deterministic tests and a recorded global web-research smoke test no older than 30 days.

### Install the portable skill

GitHub CLI can install the same skill into host-specific locations. `gh skill` is currently a preview feature, so inspect its current documentation and preview the skill before installation.

```bash
gh skill preview ZeronO-L/family-trip-agent manage-family-road-trip
gh skill install ZeronO-L/family-trip-agent manage-family-road-trip --agent codex
```

Replace `codex` with `claude-code`, `opencode`, `github-copilot`, `gemini-cli`, or `cursor` for another host. Host-specific paths and direct installation alternatives are documented in [compatibility.md](./docs/compatibility.md).

### Start a trip

Invocation syntax varies by host. A portable prompt is:

```text
Use the manage-family-road-trip skill to plan a seven-day family road trip.
There are two adults and one teenager. We prefer a relaxed pace,
need reliable parking, and want a full meal option plus a light-meal backup.
Choose map, review, hotel, ticket, weather, and official sources appropriate
for the destination country. Mark blocked or partially accessible sources.
```

No external API keys are required for the deterministic test suite. Live research depends on the browser, search, MCP, or connector tools available in the user's host environment.

## Repository structure

```text
.codex-plugin/                 Codex plugin manifest
.claude-plugin/                Claude Code plugin and marketplace manifests
skills/manage-family-road-trip Canonical portable Agent Skill
compatibility/                 Host and regional validation registries
schemas/                       Portable data contracts
src/                           Policy engine and global source catalog
evals/cases/                   Replanning and safety regression cases
evals/source-cases/            Regional provider-routing cases
evals/live/                    Recorded web-research smoke evidence
evals/prompts/                 Runtime forward-test prompts
evals/runtime/                 Recorded runtime behavior evidence
examples/                      Fully synthetic public example
scripts/                       Validation, privacy, portability, and eval commands
docs/                          Architecture, compatibility, and testing scope
```

## Test status

The project has already started testing; it is not waiting until publication.

- 18 deterministic safety, route-consistency, booking-state, city-planning, and replanning scenarios.
- 4 regional source-routing scenarios.
- 1 recorded global web-research smoke test covering maps, reviews, hotels, official weather, official park status, tickets, and a blocked-provider fallback.
- 4 Codex runtime records: one assisted pass with limitations, one retained failed blind run, one independent multi-turn clean pass, and one anonymized non-US pass with limitations.
- Static Agent Skills portability checks and isolated local installation smoke tests for 6 hosts.
- Official Codex Skill and plugin manifest validation.
- A public-repository privacy audit that rejects CJK identity text, local user paths, original-route markers, and domestic-only provider names.
- A regional validation registry that keeps `experimental`, `desk_verified`, `community_tested`, and `field_tested` claims separate and evidence-scoped.

What remains before the first public GitHub push:

- keep untested hosts labeled as structural support rather than runtime verified;
- rerun or refresh the live-source smoke record if it is older than 30 days at publication time;
- run the complete release gate from a clean exported copy;
- verify installation from a clean checkout;
- inspect git author metadata, account profile, screenshots, and repository history for identity leakage;
- complete a final human review of safety claims and documentation.

See [testing.md](./docs/testing.md) for the full quality gate and current limitations.

## Design principles

- **Executable over impressive:** provide addresses, distances, parking paths, opening hours, fallback triggers, and next actions.
- **Evidence over popularity:** use independent source roles and inspect recent negative reviews, not only rankings.
- **Official sources for high-impact facts:** closures, legal restrictions, weather warnings, and entry policy must not rely on community or commercial rankings alone.
- **Hard commitments first:** protect booked tickets, check-in windows, medical needs, and safety constraints when replanning.
- **Learning requires confirmation:** one incident creates a case; repeated or explicitly confirmed evidence creates a reusable rule.
- **Privacy by default:** public examples are synthetic and active trip details stay local unless the family explicitly approves publication.

## Development

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

Add a failing evaluation before changing behavior. Keep host-specific packaging thin and put shared workflow changes in the canonical Skill. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Scope of version 0.1

Version `0.1` includes an open-source repository, portable Agent Skill, local-first structured files, deterministic regression checks, global source routing, recorded web smoke evidence, and synthetic examples.

Not in this phase: payments, commercial tiers, recruiting test families, a hosted backend, credential storage, automatic booking, or automatic payment.

## Privacy and safety

Travel plans can reveal home addresses, unattended-home dates, children's information, vehicle details, and real-time location. Read [PRIVACY.md](./PRIVACY.md) before publishing examples or issues. This project does not collect telemetry in version `0.1`; see [DATA_COLLECTION.md](./DATA_COLLECTION.md).

Repository content is written in English and uses a neutral contributor identity. Publishing through a personal GitHub account can still expose profile, commit, email, timezone, or historical identity signals. Follow [maintainer privacy](./docs/maintainer-privacy.md) before the first public push.

Recommendations must be rechecked because weather, road conditions, business hours, entry policies, and prices change. The Agent must not claim that a booking, parking space, venue entry, or route is guaranteed unless it has actually been confirmed.

## License

[MIT](./LICENSE)
