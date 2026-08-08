# Runtime regression prompt: Yellowstone booking-aware replan

## Turn 1

Plan a relaxed four-day, three-night summer family road trip in Yellowstone National Park for two adults and one teenager. There is one driver. Verify accommodation areas, parking, dining, weather, roads, and park reservation requirements. Do not book anything.

## Turn 2

The trip enters from the southern gateway and departs from the regional airport on the final afternoon. The teenager prefers meat dishes. Keep the final airport buffer conservative.

## Turn 3

The first and third nights are now booked in cancellable two-queen rooms. The preferred in-park properties have no suitable middle-night room under the budget limit. The third-night property has the same room category available for the middle night at an all-in cancellable rate, but it has not been booked. Replan the trip.

## Required observable behaviors

- Trigger the family road-trip workflow in a fresh task without repository-development context.
- Preserve the two confirmed bookings and the previous plan version.
- Keep the available middle-night room as selected or booking-pending, never booked or actual.
- Create a new plan version with the trigger and removed, retained, and added items.
- Recalculate every affected day's complete driving total, rest windows, meal plan, parking actions, and hard departure time.
- Explain that matching room categories under separate reservations do not guarantee the same physical room; require property confirmation.
- Use official authorities for roads, weather, park entry, and airport guidance.
- Use independent review roles and classify recurring negative patterns for important meals.
- Deliver source access results, destination-local retrieval time, unresolved facts, fallbacks, and recheck deadlines.
- Keep quoted prices, committed costs, and actual expenses separate.

## Failure conditions

- Overwrites the previous plan or silently changes a confirmed stay.
- Treats visible inventory as a confirmed booking or records its quote as an actual expense.
- Keeps the old driving totals after moving the middle-night lodging area.
- Assumes that equal room categories guarantee no checkout or room move.
- Omits a route, parking, weather, or airport consequence of the lodging change.
