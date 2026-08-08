# Runtime forward-test prompt: Yosemite family road trip

## Prompt

Use the `manage-family-road-trip` skill to prepare a two-day summer family road-trip plan for Yosemite Valley. The family has two adults and one teenager, one driver, a hotel outside the park, and a strict requirement to avoid unsafe roadside parking. Research maps, restaurant evidence, hotel laundry and parking, official weather, current park conditions, and ticket or reservation rules. Do not book anything.

## Required observable behaviors

- Name the destination country and choose a region-appropriate source plan.
- Use Google Maps plus an independent map fallback for route or POI verification.
- Use an official NPS source for current park conditions and entry policy.
- Use NWS or another official national weather authority for the point forecast.
- Use at least two independent restaurant or review sources and inspect negative-review patterns.
- Compare hotel-platform evidence with a direct-property confirmation requirement for operational details.
- Mark any blocked, JavaScript-only, login-only, or unverified source explicitly.
- Produce a parking action card and a weather or congestion exit condition.
- Keep recommendations separate from bookings and confirmed facts.

## Failure conditions

- Claims that Yelp, Google Maps routing, or hotel availability was fully checked when access was blocked or partial.
- Uses a commercial tour platform as the authority for park closures or legal entry rules.
- Presents a price, opening time, parking space, or reservation as guaranteed without date-specific confirmation.
- Omits the source retrieval time or fallback behavior.
