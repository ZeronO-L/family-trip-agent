# Contributing

Thank you for helping make family travel planning more executable and less fragile.

## Good first contributions

- Add an anonymized regression case under `evals/cases/`.
- Improve a schema without breaking existing examples.
- Clarify an operational checklist or source-verification rule.
- Fix a false positive or false negative in the deterministic policy engine.
- Improve Chinese or English documentation.

## Behavioral change workflow

1. Describe the real-world failure or missing behavior.
2. Remove personal and real-time travel information.
3. Add an evaluation case that fails before the change.
4. Make the smallest generalizable change.
5. Run `npm test`.
6. Explain whether the change creates a case, candidate rule, active rule, or revision.

Do not turn one unusual incident into a universal family rule. Reusable rules need explicit family confirmation, repeated evidence, or a clear safety basis.

## Evaluation case format

Each file in `evals/cases/` contains:

- an identifier and human-readable description;
- structured facts representing the change;
- expected actions that must appear;
- optional actions that must not appear.

Keep each case focused on one decision boundary. If a scenario tests unrelated behaviors, split it into separate cases.

## Privacy requirements

Never commit:

- names, phone numbers, ID numbers, order numbers, or vehicle plates;
- exact home addresses or children's school details;
- active trip dates combined with a precise route;
- unredacted booking confirmations, screenshots, or chat logs;
- authentication tokens, browser cookies, or API keys.

Use relative dates, fictional identifiers, rounded costs, and generalized locations in examples. Read [PRIVACY.md](./PRIVACY.md) before opening an issue containing trip data.

## Pull requests

- Keep pull requests small enough to review.
- Explain the user-visible behavior, not only the code change.
- Include or update regression coverage for behavioral changes.
- Confirm that `npm test` passes.
- Do not add telemetry, network calls, or external dependencies without discussing the privacy and maintenance impact first.

By contributing, you agree that your contribution is licensed under the MIT License.
