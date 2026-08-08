# Architecture

## Product boundary

Family Trip Agent is a local-first, portable Agent Skill, not a booking platform. Version `0.1` combines an open `SKILL.md` workflow with thin host manifests, deterministic schemas, source routing, and regression policies.

## Components

```text
Family request + destination market
                 |
                 v
     Portable Agent Skill workflow
       | research | plan | replan |
       v          v      v
  Global source router -----> Available host web or connector tools
       |                            |
       v                            v
  Structured records --------> Human-readable trip views
       |
       v
  Policy engine + evaluations
       |
       v
  Plan-versus-actual feedback -> candidate rules -> confirmed family rules
```

### Portable skill layer

`skills/manage-family-road-trip/SKILL.md` is the canonical workflow. Codex and Claude Code add thin plugin manifests; OpenCode, GitHub Copilot, Gemini CLI, Cursor, and other compatible hosts consume the same skill through the Agent Skills format.

Host packaging must not fork the workflow. A behavior change belongs in the canonical Skill and its regression cases.

### Source-routing layer

`src/source-catalog.mjs` chooses providers by destination country, destination type, and research need. It separates:

- official policy and safety sources;
- maps and navigation;
- commercial hotel or ticket inventory;
- review evidence;
- community discovery.

The router is deterministic, but web accessibility is not. Runtime research records `full`, `partial`, `blocked`, or `manual_only` access and selects an independent fallback.

### Regional validation layer

`compatibility/regions.json` records destination-market evidence separately from source access and host compatibility. A region can be `experimental`, `desk_verified`, `community_tested`, or `field_tested`, but only for its declared scope.

Each entry includes evidence counts, verified capabilities, limitations, and repository references. A provider-routing test does not become a field test, and one verified route does not validate an entire continent.

### Data layer

The JSON Schemas keep four core concepts separate:

- `family-profile`: stable or slowly changing preferences and constraints;
- `trip`: trip-specific dates, locale, source evidence, route candidates, decisions, bookings, and actual events;
- `feedback-case`: one observed mismatch or success with evidence and scope;
- `family-rule`: a reusable rule with status, evidence, confirmation, and revision history.

Additional evaluation schemas cover source routing, regional validation, and recorded live-source smoke tests.

### Deterministic policy layer

The policy engine handles small, high-value boundaries that should not drift between prompts, such as dropping optional activities when fatigue is high or rejecting a parking recommendation without a complete arrival path.

It is intentionally not a complete itinerary generator. The host model handles open-ended research; deterministic checks protect repeated operational rules.

## State model

```text
intake -> planning -> locked -> executing -> replanning
                    |             |             |
                    +-------------+-------------+
                                  v
                            retrospecting
                                  |
                                  v
                 case -> candidate -> active -> revised
```

Transitions do not overwrite history. A planned restaurant can differ from the selected restaurant, and the selected restaurant can differ from the actual meal.

## Research contract

Every high-impact fact stores source, role, retrieval time, access result, supported fact, confidence, conflict notes, recheck deadline, and direct-confirmation status.

Official sources take precedence for closures, legal restrictions, weather alerts, road status, and entry policy. Commercial inventory and community experience remain valuable but cannot override official safety facts.

## Deliberate exclusions in 0.1

- automatic booking or payment;
- credential storage;
- scraping adapters tied to one platform;
- claims of API integration where only browser research exists;
- cloud synchronization or a multi-user account system;
- public sharing of live itineraries;
- recommendation ranking based on an undisclosed commercial objective.
