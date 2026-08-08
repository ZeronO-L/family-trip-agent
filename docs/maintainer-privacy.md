# Maintainer privacy before public release

The repository content uses a neutral contributor identity, but GitHub publication can expose identity through account profiles, commit metadata, email addresses, timezone offsets, screenshots, issue history, and linked accounts.

## Before the first commit

- Decide whether to publish from a neutral project organization or a dedicated project account.
- Do not impersonate another person or make false biographical claims.
- Use a project-facing display name such as `Family Trip Agent Contributors`.
- Use a GitHub-provided `noreply` email associated with the publishing account.
- Keep personal location, employer, social links, and profile biography out of the publishing account unless intentionally public.
- Configure repository-local git identity rather than changing unrelated repositories.

## Before the first push

- Run `npm run test:privacy`.
- Inspect `git log --format=fuller` for names, email addresses, dates, and timezone metadata.
- Inspect all tracked filenames and file contents for local paths, original trip names, and personal identifiers.
- Remove EXIF and location metadata from images before adding them.
- Check issue templates, screenshots, terminal captures, and sample data.
- Confirm that the remote URL points to the intended neutral account or organization.

## After publication

- Review the public repository while logged out.
- Check commit authors, contributor graphs, profile links, Actions logs, releases, package metadata, and generated artifacts.
- Avoid opening issues or discussions from a personal account if that connection should remain private.
- Treat a later identity cleanup as difficult: forks, caches, commit objects, and third-party indexes may preserve old metadata.

This checklist reduces unnecessary identity exposure; it cannot guarantee anonymity against platform operators or determined correlation analysis.
