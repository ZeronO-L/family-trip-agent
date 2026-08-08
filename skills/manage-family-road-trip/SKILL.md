---
name: manage-family-road-trip
description: Plan, validate, execute, replan, publish, and retrospect family self-drive trips while preserving plan-versus-actual history and user-confirmed family rules. Use when a user asks to plan a family road trip, compare route directions, research hotels/restaurants/attractions, verify POIs/parking/weather/operating status, adjust an active trip after heat/rain/fatigue/delay/closure, record actual expenses and feedback, or turn a completed trip into reusable rules and regression cases.
---

# Manage Family Road Trip

Build one coherent travel-management loop rather than a decorative itinerary. Preserve evidence, uncertainty, decisions, actual outcomes, and rule history.

## Route the request

Classify the current trip stage before acting:

1. `intake`: collect family and trip constraints.
2. `planning`: compare route shapes, dates, stays, meals, and activities.
3. `locked`: preserve confirmed bookings and expose only necessary alternatives.
4. `executing`: show today's executable plan and accept real events.
5. `replanning`: recalculate after weather, fatigue, delay, closure, parking failure, or a new hard constraint.
6. `retrospecting`: compare plan with reality and propose, but do not automatically activate, new family rules.

Read [workflow.md](references/workflow.md) for the state machine, approval nodes, and output contracts whenever planning or replanning a trip.

## Apply non-negotiable principles

- Keep `planned`, `selected`, `booked`, and `actual` as separate states.
- Never overwrite the old plan when conditions change; create a new plan version and record the trigger.
- Treat safety, hygiene, legal parking, booked commitments, and explicit budget limits as hard constraints.
- Treat restaurant fame, hotel brand, scenic completeness, and service-area timing as preferences or cancellable anchors.
- Verify volatile facts close to use time. Record source, checked time, confidence, and conflicts.
- Prefer user-reported on-site observations over stale public information, while preserving both as evidence.
- Select research sources by destination region and question. Never assume a provider has equal coverage or browser accessibility worldwide.
- Use independent source roles: official policy, map/navigation, commercial inventory, reviews, community discovery, and official weather or road alerts.
- Keep regional validation status separate from source access and host compatibility; never turn static or desk evidence into a field-tested claim.
- Do not infer a completed visit, expense, booking, or family preference from an unconfirmed plan.
- Do not activate a permanent family rule from one ordinary preference observation.

## Plan an executable trip

1. Build a structured family snapshot and trip brief.
2. Generate materially different route options, including reverse direction for loops.
3. Compare first-day load, last-day load, consecutive driving, hotel changes, theme coverage, and recovery windows.
4. Select the best accommodation area before naming hotels.
5. Create meal slots with a main option, alternatives, and a convenience or complete-meal fallback when risk warrants it.
6. Split attractions into core, optional, and removable items; provide compact and full variants for large scenic areas.
7. Add route-level weather checks, decision gates, parking actions, and exit conditions.
8. Validate time, budget, route order, opening status, hygiene risk, parking, and known hard constraints.
9. Compare the calculated driving and activity load with the requested pace. If all hard constraints cannot fit a relaxed pace, label the real intensity, explain the conflict, and offer a reduced-scope or longer-duration alternative.
10. Run the planning completeness gate below; expose any failure as an unresolved limitation instead of silently omitting it.
11. Ask for confirmation before locking route direction, paid/non-refundable choices, or family rules.

Read [execution-rules.md](references/execution-rules.md) before researching hotels, meals, scenic routes, weather, or parking.

Read [global-source-strategy.md](references/global-source-strategy.md) whenever the trip is outside the user's home market, crosses countries, or requires maps, reviews, hotels, tickets, weather, or road-status research. Record provider availability and use fallbacks when a site requires JavaScript, login, or blocks automated access.

## Run the planning completeness gate

Do not deliver a researched road-trip plan until each applicable item passes or is visibly marked unresolved:

- **Route evidence:** use a primary map plus an independent map or official-road cross-check. Recalculate each day's total from every planned drive, including hotel returns and evening outings; label static estimates as estimates.
- **Pace integrity:** do not call a plan relaxed when the calculated single-driver load contradicts that label. Expose infeasible constraint combinations and the smallest changes that would make them feasible.
- **Meal evidence:** for each important selected meal, use at least two independent review or discovery sources, classify recent negative patterns, and keep official menus or hours separate from quality evidence. If two sources are unavailable, downgrade the recommendation and state the limitation.
- **Source evidence:** show a compact evidence table with source role, destination-local retrieval time, `full`/`partial`/`blocked`/`manual_only`, supported fact, unresolved conflict, fallback, and recheck deadline.
- **Parking execution:** for each selected hotel and high-risk stop, provide the entrance/search term, approach, parking type, fee or height when relevant, luggage drop, lobby or destination path, fallback, and a visible list of unknowns requiring direct or arrival confirmation.

Keep the main itinerary readable, but never hide this evidence contract in internal reasoning.

## Replan during the trip

Create a replan record containing the trigger, current time/location/state, immutable commitments, old plan version, removed/retained/added items, downstream effects, and user decision.

Default responses:

- Heat: move outdoor activity out of the midday window and preserve rest/hydration.
- Heavy rain or mountain-road risk: remove scenic segments and choose the fastest safe official route.
- Fatigue: remove optional stops before moving meals, lodging, or safety actions.
- Late departure: recalculate ETA and hard-constraint buffer before keeping attractions.
- Closure: switch to a ranked verified alternative and record the source conflict.
- Reservation or ticket failure: remove the unavailable anchor, prefer a low-commute alternative, and recalculate downstream departure and arrival buffers.
- Weak dining corridor: eat before entering or carry a complete meal; set a decision deadline.
- Parking failure: use the documented fallback or switch candidates instead of circling indefinitely.

## Record reality and learn carefully

Capture actual time, route, place, expense, cancellation, replacement, experience, and completion status independently. Convert feedback into:

1. `case`: one observed event.
2. `candidate`: a potentially reusable rule.
3. `active`: a user-confirmed rule used in future plans.
4. `revised`: a changed or retired rule with history preserved.

Read [data-and-learning.md](references/data-and-learning.md) when writing trip data, expenses, feedback, family rules, privacy settings, or sync records.

## Validate before delivery

Run the P0 checks:

- no wrong or ambiguous POI/order remains unflagged;
- risky weather has an explicit action and exit condition;
- no closed/unverified venue is presented as confirmed;
- repeated hygiene or food-storage risk cannot be overridden by local fame;
- budget and actual spending are not mixed;
- public outputs contain no unapproved personal data;
- shared deliverables are verified in the real target surface.

For planning outputs, also fail delivery when daily driving omits a planned vehicle movement, an important restaurant has no review limitation, sources have no access status, or a selected hotel's parking card hides operational unknowns.

Read [evaluation.md](references/evaluation.md) when converting a failure into an eval or validating a behavior change.

## Deliver by audience

- Planning view: comparisons, evidence, confidence, and choices.
- Daily execution view: only today's actions, key alternatives, navigation order, and exit conditions.
- Mobile family view: large tap targets, concise details, selection, check-in, expense, and feedback actions.
- Archive view: plan versions, actuals, expenses, evidence, feedback, and rule changes.
- Public example: synthetic or anonymized data only.
