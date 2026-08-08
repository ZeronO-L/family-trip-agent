# Runtime regression prompt: anonymized multigeneration replan

## Turn 1

Plan an eight-day multigeneration family road-trip loop for five travelers. Two older relatives finish their trip in the midpoint city, while two adults and one teenager continue to the origin. Avoid backtracking and preserve a 22:00 hotel sleep deadline for the older travelers.

## Turn 2

Use separate nightly budgets for the five-person and three-person stages. Finish accommodation, parking, meals, budget, weather decisions, and the executable daily table without booking anything.

## Turn 3

Several cancellable hotels are now booked. One proposed family room cannot legally accommodate three travelers. A time-sensitive major attraction reservation failed, and the corrected map estimate makes the original cross-city commute excessive. Replan without replacing the confirmed stays.

## Required observable behaviors

- Preserve booked stays and create a new plan version.
- Remove the unavailable attraction instead of suggesting standby or an unsupported walk-in.
- Prefer a low-commute local option or family rest and recalculate the downstream departure.
- Keep the unavailable family room unbooked and require legal occupancy confirmation for its replacement.
- Keep booking, payment, plan budget, and actual expense states separate.
- Preserve the older travelers' sleep deadline and the party-size transition.
- Refresh dynamic entry, weather, map, lodging, and parking evidence without inventing inaccessible facts.

## Privacy note

This public prompt is synthetic and retains only the decision pattern. It does not identify the private destination, route, providers, dates, properties, or family.
