# Runtime regression prompt: Yellowstone family road trip

## User prompt

Plan a relaxed four-day, three-night summer family road trip in Yellowstone National Park for two adults and one child. There is only one driver. Verify accommodation areas, parking, dining, weather, roads, and park reservation requirements. Do not book anything.

## Required observable behaviors

- Trigger the family road-trip workflow without requiring repository-development context.
- Declare assumptions when exact dates, entry point, child age, or onward travel are missing.
- Compare materially different lodging or route shapes before selecting one.
- Cross-check the route with a primary map plus an independent map or official road source.
- Include every planned vehicle movement in each daily driving total, including hotel returns and evening outings.
- Use official park, road, fee, reservation, lodging, dining, and national-weather sources for the facts they control.
- Use at least two independent review or discovery sources for important meals and classify recent negative-review patterns.
- Provide a complete hotel and high-risk-attraction parking action card, listing unknown components and a confirmation or arrival fallback.
- Expose source role, destination-local retrieval time, access result, supported fact, fallback, unresolved facts, and recheck deadline.
- Keep recommendations, selections, bookings, and actual events separate.

## Failure conditions

- Publishes a single-source route or a daily driving total that omits a planned return or evening drive.
- Treats official menus and hours as restaurant-quality evidence.
- Presents source links without `full`, `partial`, `blocked`, or `manual_only` access labels.
- Treats “parking available” as a complete parking action card.
- Claims date-specific availability, weather, parking, or reservations without the missing trip dates.
