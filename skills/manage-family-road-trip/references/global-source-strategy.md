# Global source strategy

## Contents

- Source roles
- Default global providers
- Regional routing
- Regional validation status
- Access and fallback rules
- Evidence requirements

## Source roles

Use sources by role instead of treating one platform as the complete answer:

1. **Official policy:** venue, park, transport, border, road, and meteorological authorities.
2. **Map and navigation:** coordinates, route order, drive time, entrances, parking, and live traffic.
3. **Commercial inventory:** hotel rooms, cancellation terms, ticket inventory, and reservation availability.
4. **Review evidence:** recent experience patterns, dish-level feedback, queues, noise, hygiene, and parking friction.
5. **Community discovery:** itinerary ideas, failure clues, family experience, and questions worth verifying elsewhere.

Never use a community post or commercial ranking as the sole source for closures, safety, legal restrictions, visa rules, or weather warnings.

## Default global providers

Start with this provider set, then adapt it to the destination market and available browser tools:

| Need | Primary choices | Useful fallbacks | What to verify |
| --- | --- | --- | --- |
| Maps and driving | Google Maps | Apple Maps, OpenStreetMap | exact POI, direction, entrance, waypoint order, drive time |
| Restaurants and reviews | Google reviews, Tripadvisor | Yelp, OpenTable, TheFork | recent negative-review patterns, dishes, booking, queue, parking |
| Travel discovery | official tourism boards, Tripadvisor forums | Reddit travel communities, established guide publishers | family fit, failure clues, seasonality; verify facts elsewhere |
| Hotels | Booking.com, Expedia | Agoda and direct hotel sites | room configuration, laundry, parking, taxes, cancellation, actual availability |
| Attractions and tickets | official venue or park site | GetYourGuide, Viator, Tiqets, regional reservation portals | opening status, entry rules, seller terms, total price |
| Weather | national meteorological authority | Open-Meteo or another transparent forecast provider | point forecast, elevation, hourly risk, alerts, checked time |
| Roads and parks | official road and park authorities | Google Maps traffic, regional 511 services | closures, chains, permits, construction, safe route class |

Provider availability is not proof of coverage. Record when a page is dynamic, requires login, is unavailable in the user's region, or blocks automated retrieval.

## Regional routing

- United States: prefer NWS/NOAA for weather, state or regional 511 services for roads, NPS for national parks, and Recreation.gov when it is the official reservation channel.
- United Kingdom: prefer the Met Office, official transport and local authority sources, and direct venue sites.
- Canada: prefer Environment and Climate Change Canada and provincial road or park authorities.
- Australia: prefer the Bureau of Meteorology and state road or park authorities.
- Europe: prefer each country's meteorological and transport authority; use Meteoalarm for cross-border alert discovery where applicable.
- Other regions: identify the destination's national meteorological, road, park, and tourism authorities before using a global fallback.

For restaurant coverage, use Yelp only where it has meaningful local inventory. TheFork and OpenTable are reservation signals, not universal quality authorities. Agoda may be more useful in parts of Asia-Pacific, but direct hotel confirmation remains necessary for operational details.

## Regional validation status

Keep destination-market evidence separate from both provider access and host compatibility:

- `experimental`: routing rules or static checks exist, but no complete destination research case has been reviewed.
- `desk_verified`: maps, official sources, and operational claims were checked without a completed family trip.
- `community_tested`: an independent user completed a trip and submitted anonymized plan-versus-actual feedback.
- `field_tested`: a real trip was completed with captured evidence for the declared scope.

Always state verified scope, evidence counts, limitations, and last review date. Never infer that a whole country or continent is field-tested from one provider check, one itinerary, or one route.

## Access and fallback rules

1. Try the best source for the question.
2. If the site requires JavaScript, login, a local app, or blocks automated access, record `partial` or `blocked`; do not invent the missing facts.
3. Use an independent fallback from the same role.
4. For high-impact facts, verify with an official or direct source.
5. Mark facts that still require a phone call, message, or arrival confirmation.

Examples:

- If a Google Maps result resolves the POI but the interactive route cannot be inspected, verify coordinates with OpenStreetMap and leave live traffic unconfirmed.
- If Yelp blocks automated retrieval, use Tripadvisor or Google reviews for review patterns and the restaurant's direct site for hours and booking.
- If a hotel platform lists laundry without hours or pricing, mark those details unknown and request direct property confirmation.

## Evidence requirements

For every selected hotel, restaurant, ticketed attraction, or risky route, store:

- source name and URL;
- source role;
- retrieval time and destination timezone;
- access result: `full`, `partial`, `blocked`, or `manual_only`;
- the exact fact supported;
- confidence and conflict notes;
- recheck deadline;
- whether direct confirmation is still required.

Do not copy full reviews or proprietary listings. Store a short factual summary and the decision it informed.
