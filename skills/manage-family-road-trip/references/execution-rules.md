# Execution rules

## Contents

- Route and fatigue
- POI and navigation
- Accommodation
- Meals
- Attractions
- Weather and safety
- Priorities
- Evidence delivery

## Route and fatigue

- Compare loop directions instead of accepting the first city order.
- Count parking, meals, waits, photography, heat, mountain-road speed, and hotel changes in the fatigue budget.
- Treat service areas as cancellable anchors chosen by driver condition and live traffic.
- After a long drive, default to meal or check-in, hotel rest, then optional evening activity.
- Add hard arrival constraints immediately and recalculate the remaining trip.
- Build each published daily driving total from all vehicle movements: main route, detours, hotel returns, evening outings, fuel or meal diversions, and parking transfers. Keep driving separate from queue and stop time.
- Compare the calculated load with the user's requested pace. If a single driver still faces several long consecutive days after optimization, label the plan with its real intensity and offer fewer stops, another night, or a different entry or exit pattern.

## POI and navigation

- Select map providers by destination market. Start with Google Maps where available and retain OpenStreetMap or another independent map for coordinate and POI fallback.
- Before publishing a route or daily total, compare the primary map with an independent map or the official road authority. Record disagreements and never present a single-source total as fully verified.
- Verify administrative region, coordinates/search result, driving direction, order, detour, and risk of navigation leaving a scenic road.
- Preserve manual waypoint order; never allow automatic reordering on themed scenic routes.
- Resolve spoken-name ambiguity before routing.
- Use official places, villages, fuel stations, hotels, or formal parking lots as anchors. A government office may be a route anchor but not an attraction or parking promise.
- Prefer verified main roads at night. Do not optimize for a few minutes through unknown roads.

## Accommodation

Select the area before the property. Score the area for evening activity, next-day departure, parking, food, price, and family convenience.

Store preferred room type separately from available/booked room type. After booking, keep rejected candidates in history but hide them from the execution view.

For consecutive nights at the same property under separate reservations, ask the property to link the bookings. Matching room types do not guarantee the same physical room or continuous keys; keep checkout, luggage handling, and room-move requirements unresolved until confirmed.

For stays of five or more days, inspect laundry, dryer, detergent, floor, hours, machine count, and queue risk when available.

Create a parking action card with entrance/search term, street side, ground/underground, height and fee, luggage drop, lobby path, and fallback parking. Mark unknown details for arrival confirmation.

Do not reduce the card to “parking available.” List missing components explicitly and attach either a direct-property confirmation checklist or a safe arrival fallback.

## Meals

- Use one meal slot with a primary and one or two alternatives.
- Use at least two independent review or discovery sources when the decision is important. Treat blocked or login-only access as missing evidence, not a positive signal.
- Official restaurant pages support hours, menus, and reservation policy; they do not count as independent food-quality evidence.
- Cover full-meal and light-meal needs. Add convenience or vehicle fallback when route risk requires it.
- Compare breakfast shop versus hotel using hours, distance, departure direction, parking, price, and failure fallback.
- Separate restaurant quality from dish quality: recommended, acceptable, avoid, and whether the famous item is genuinely worthwhile.
- Classify recent negative reviews by taste, hygiene, freshness/storage, service, wait, price, parking, noise, and likely one-off conditions.
- Repeated hygiene, freshness, or long-holding complaints are hard rejection signals for family travel.
- Do not schedule highly repetitive regional dishes only to complete a checklist.
- On weak-dining mountain routes, verify a full meal before entry or carry a complete meal. Set a decision deadline such as 11:30.

If two independent review sources cannot be accessed, say so, downgrade the recommendation to provisional, and retain a complete-meal fallback.

## Attractions

- Classify core, optional, and removable stops.
- Offer compact and full versions for large scenic areas.
- Recalculate duration from crowd, parking, family photo pace, heat, and child interest.
- Allow exit after the core experience is complete.
- Check actual content, ticket price, exposure, and family value for paid photo-stop attractions.

## Weather and safety

- Prefer the destination's national meteorological authority and official road or park alerts. Use global forecast providers as independent fallbacks, not replacements for official warnings.
- Check route-level radar and hourly conditions, not only origin/destination weather.
- Inspect mountain, bridge, tunnel, riverside, flood, landslide, fog, closure, and heat risks.
- Add decision gates before departure, before risky terrain, after lunch, and before dark when applicable.
- State explicit actions: what to cancel, which route class to use, when to wait, and the latest safe continuation time.
- Never recommend stopping on bridges, curves, narrow shoulders, tunnel mouths, or emergency lanes; never recommend water crossing or unfamiliar mountain driving at night.

## Priorities

P0: wrong POI/order, unsafe weather without exit action, closed venue presented as confirmed, serious repeated food risk, budget recorded as actual, or unapproved private data published.

P1: excessive long-drive tasks, weak parking action, vague breakfast, missing dish/review analysis, heat without rest, unverified mountain meal, no attraction prioritization, or repeated meal experience.

P2: local drinks, detailed laundry queue data, print compression, and visual polish.

## Evidence delivery

For every selected hotel, important meal, ticketed attraction, or risky route, deliver a compact evidence row containing:

- source and source role;
- destination-local retrieval time;
- access result: `full`, `partial`, `blocked`, or `manual_only`;
- exact supported fact;
- confidence, conflict, and unresolved facts;
- fallback or direct-confirmation action;
- recheck deadline.

Links without these labels are discovery references, not proof of full verification.
