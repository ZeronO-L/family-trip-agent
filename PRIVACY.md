# Privacy

Family travel data is unusually sensitive because ordinary planning details can reveal where a family lives, when a home is unattended, where children will be, and where a vehicle is parked.

## Local-first default

Version `0.1` stores examples and working data as local files. The repository does not include telemetry, analytics, a hosted backend, or an account system. Browsing and model requests are governed by the user's own Codex environment and the services they choose to use.

## Sensitive data

Treat the following as private by default:

- exact home, school, and frequently visited addresses;
- real names, phone numbers, identity documents, and vehicle plates;
- booking references, payment details, and hotel room numbers;
- children's ages when combined with identity or school information;
- active travel dates, live location, and a precise future route;
- medical, accessibility, dietary, and family relationship information;
- browser sessions, cookies, tokens, and API credentials.

## Publishing examples

Before publishing an example or issue:

1. wait until the trip is complete;
2. replace people and businesses with neutral identifiers when identity is unnecessary;
3. generalize dates and exact locations;
4. remove order numbers, screenshots, metadata, and embedded location data;
5. preserve only the decision pattern needed to reproduce the behavior;
6. ask every affected adult for permission when their information remains recognizable.

Do not publish live itineraries merely because they seem harmless. A route plus dates can expose absence from home.

## Source content

Do not copy full reviews, articles, maps, photos, or proprietary listings into the repository. Record a short factual summary, source type, retrieval time, confidence, and the decision it supported. Respect each source's terms and copyright.

## Security reports

If a vulnerability could expose personal travel data, do not include real user data in a public issue. Share only a minimal synthetic reproduction until a private reporting channel is documented for the project.
