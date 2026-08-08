# Regional validation status

Regional validation describes evidence for destination-market behavior. It is separate from host compatibility and from whether an individual webpage returned `full`, `partial`, `blocked`, or `manual_only` access.

## Levels

- `experimental`: provider-routing rules or static checks exist, but no complete destination research case has been reviewed.
- `desk_verified`: maps, official sources, and operational claims have been checked in a non-field scenario; no completed family trip is implied.
- `community_tested`: at least one independent user has completed a trip and submitted anonymized plan-versus-actual feedback.
- `field_tested`: a real trip has been completed with captured plan-versus-actual evidence for the declared scope.

No level applies to an entire continent by implication. Status is limited to the capabilities and evidence listed in the registry.

## Current public matrix

| Region | Status | Public evidence | Important limitation |
| --- | --- | --- | --- |
| United States | `desk_verified` | One source-routing case, one live-source smoke test, one assisted itinerary run, one retained failed blind-run record, and one passing independent multi-turn Codex replan | No completed trip, booking transaction, or field evidence |
| United Kingdom | `desk_verified` | One source-routing case and two anonymized itinerary-behavior evaluations | No completed family trip, live route timing, or booking workflow |
| Australia | `experimental` | One static source-routing case | No end-to-end destination research case |
| Other regions | `experimental` | Unknown-market global fallback case | Country-specific coverage has not been established |

The machine-readable registry is in [`compatibility/regions.json`](../compatibility/regions.json). Evidence counts, declared scope, limitations, and file references are required so that a label cannot imply broader coverage than the repository demonstrates.

Version `0.1` does not run an active tester-recruitment program. Future unsolicited reports may be accepted only when they are anonymized, scoped, and separated from bookings, identities, and real-time travel details.

One additional non-US multigeneration runtime run is recorded only as anonymized behavior evidence. Its destination and source identities are intentionally withheld, so it does not upgrade any named regional status.
