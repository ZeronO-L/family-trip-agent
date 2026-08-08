# Workflow and state machine

## Contents

- State model
- Planning flow
- Execution and replanning
- Human approval nodes
- Output contracts

## State model

Use these trip states:

`draft -> planning -> locked -> in_progress -> completed -> archived`

Use `replanning` as a run type, not a permanent trip state. A replan starts from a saved plan version and produces a new version only after user acceptance.

## Planning flow

1. Intake the family, dates, origin, destination ideas, destination country or countries, language, currency, vehicle, budget, bookings, theme, and hard constraints.
2. Separate missing critical fields from optional preferences. Ask only questions that can materially change the route or cost.
3. For loops, generate forward and reverse alternatives. For linear themed roads, test stay allocation against both through-driving and out-and-back exploration.
4. Build a destination-appropriate source plan, then research route, accommodation areas, hotels, meal slots, attractions, weather risks, and parking.
5. Store evidence and confidence separately from the recommendation text, then expose a compact evidence table in the delivered planning view.
6. Validate hard constraints and identify unresolved facts.
7. Present a compact decision view. Preserve rejected route options and reasons in history.
8. Lock confirmed selections and create the first executable plan version.

## Execution and replanning

Keep a daily plan and an append-only actual event stream. Do not mark a plan item completed unless the user or an authorized family member confirms it.

When conditions change:

1. Capture the trigger and current time/location.
2. Refresh volatile evidence that affects the decision.
3. Freeze immutable commitments such as lodging, tickets, appointments, safety limits, and required arrival time.
4. Remove optional items before weakening hard constraints.
5. Recalculate travel, meal, rest, and arrival buffers.
6. If a reservation or ticket failed, remove the unavailable anchor and prefer a nearby replacement before adding a new long commute.
7. Compare the recalculated load with the requested pace and disclose any constraint conflict.
8. Show old versus proposed plan and downstream effects.
9. Apply only after user confirmation, except for clearly reversible safety guidance that does not spend money or alter bookings.

## Human approval nodes

Require confirmation before:

- final route direction or overnight-city sequence;
- booking, payment, cancellation, or any irreversible action;
- replacing a booked item;
- publishing dates, hotels, or family information;
- activating or revising a long-term family rule;
- resolving a material conflict between family members' needs.

## Output contracts

### Planning comparison

Include route alternatives, complete daily driving totals, first/last-day load, stay changes, theme coverage, hard constraints, risks, parking action cards, unresolved facts, and a recommendation with confidence. Append a compact source-access table; do not leave it only in internal notes.

### Daily execution

Include only ordered actions, navigation waypoints, planned meal/rest windows, confirmed bookings, essential alternatives, decision gates, and exit conditions.

### Replan

Include trigger, evidence refreshed, immutable items, removed/retained/added items, new ETA/buffer, cost impact, and confirmation status.

### Recap

Include plan, actual, deviation, cause, impact, what worked, candidate rule, priority, and a proposed evaluation case.
