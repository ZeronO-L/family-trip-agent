# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| Latest `0.1.x` alpha | Yes |
| Older alpha releases | Best effort |

## Report a vulnerability privately

Use [GitHub private vulnerability reporting](https://github.com/ZeronO-L/family-trip-agent/security/advisories/new) for security-sensitive findings. Do not open a public issue containing an exploit, credential, private itinerary, booking reference, live location, or other personal data.

Useful reports include:

- prompt-injection or instruction-confusion paths that could expose local data;
- unsafe file, credential, browser, or network assumptions;
- dependency or workflow vulnerabilities;
- ways the Skill could misrepresent booking, legal, road, weather, or safety facts as confirmed;
- privacy-audit bypasses involving traveler or maintainer identity.

Include a minimal synthetic reproduction, affected version, likely impact, and a suggested mitigation when available. Never use a real active itinerary as the reproduction.

## Scope

The project does not store credentials, make bookings, or process payments. Live research inherits the permissions and tools of the user's AI host. Users should preview third-party Skills before installation and grant only the access needed for the current task.
