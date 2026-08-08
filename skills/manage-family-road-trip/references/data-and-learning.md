# Data and learning contract

## Contents

- Core records
- Plan versus actual
- Rule lifecycle
- Evidence
- Sync and privacy

## Core records

Use stable IDs for family profiles, trips, route options, days, route legs, waypoints, candidates, bookings, plan versions, actual events, expenses, evidence, feedback cases, family rules, and replans.

Every mutable record should have `record_id`, `version`, `updated_at`, `updated_by`, and soft-delete state. Do not use spreadsheet row numbers as identity.

## Plan versus actual

Keep these concepts separate:

- `candidate`: researched option;
- `selected`: current decision;
- `booked`: externally committed fact;
- `planned`: scheduled action;
- `actual`: confirmed event;
- `expense`: confirmed monetary record.

Keep trip completion, day execution completeness, expense closure, and recap completeness as separate statuses.

Record both payment date and use date for advance tickets or bookings. Correct expenses with an amendment record rather than silent overwrite.

## Rule lifecycle

Use four states:

1. `case`: one observation; never applied automatically.
2. `candidate`: reusable hypothesis proposed by the Agent.
3. `active`: explicitly user-confirmed and applicable to future planning.
4. `revised`: changed, suspended, or retired with history preserved.

Store rule kind (`hard`, `soft`, or `dynamic`), conditions, actions, source cases, evidence count, confidence, applicable members, last verified time, confirmation, and superseded rule ID.

Escalate a single case only when it concerns safety, wrong navigation, serious hygiene, irreversible cost, or major avoidable loss. Otherwise seek repetition or explicit user confirmation.

## Evidence

Store provider, URL/search term, checked time, fact, extracted conclusion, confidence, validity window, conflict status, and whether a pre-use refresh is required.

When public evidence conflicts with an on-site user report, retain both and use the current user observation for that execution decision.

## Sync and privacy

Treat structured trip data as the source for all generated views. If cloud sync is absent in the local version, preserve the same record IDs and version fields so a future adapter can sync without migration.

Use append-only offline operations with idempotency keys. Prefer mobile-confirmed actuals over stale spreadsheet values. Allow spreadsheets to update only explicitly editable planning fields.

Default to local storage. Keep telemetry off. Before publishing, scan names, phone numbers, IDs, plates, home address, credentials, tokens, exact private location, and unapproved hotel/date details. Public examples must be synthetic or anonymized.
