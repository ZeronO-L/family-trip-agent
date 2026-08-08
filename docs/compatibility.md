# Host compatibility

## Compatibility strategy

The project uses one canonical `SKILL.md` workflow and thin host-specific packaging. This follows the open Agent Skills model and reduces the risk that one host receives outdated travel or safety rules.

## Support matrix

| Host | Installation model | Static status | Runtime status |
| --- | --- | --- | --- |
| Codex and ChatGPT Work | `.codex-plugin/plugin.json` or Agent Skill | official validators pass | `runtime verified` in an independent planning and replan task |
| Claude Code | `.claude-plugin/plugin.json` or Agent Skill | manifest and portable structure pass | `claude plugin validate` and prompt run pending |
| OpenCode | Agent Skill via `.agents/skills` or `.opencode/skills` | portable structure passes | prompt run pending |
| GitHub Copilot | Agent Skill via `.agents/skills` or `.github/skills` | portable structure passes | prompt run pending |
| Gemini CLI | Agent Skill via `.agents/skills` or `.gemini/skills` | portable structure passes | prompt run pending |
| Cursor | Agent Skill installed by a compatible installer | portable structure passes | prompt run pending |

`Static status` means the files match the documented structure. It does not mean that an independent model run has passed. Only the Codex row currently carries a runtime-verification claim; every other host remains structural support until independently tested.

## Why these hosts

- OpenAI documents Agent Skills as the reusable authoring format for Codex and ChatGPT, with plugins as an installable distribution unit: [Build skills](https://learn.chatgpt.com/docs/build-skills).
- Claude Code documents the same open Agent Skills standard and accepts project, personal, and plugin skills: [Claude Code skills](https://code.claude.com/docs/en/skills).
- OpenCode explicitly discovers `.agents/skills`, `.claude/skills`, and `.opencode/skills`: [OpenCode Agent Skills](https://opencode.ai/docs/skills).
- GitHub Copilot supports Agent Skills in the cloud agent, code review, CLI, app, and VS Code agent mode: [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).
- Gemini CLI exposes an Agent Skills activation tool and skill directories: [Gemini CLI tools](https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/tools.md).
- GitHub CLI's `gh skill` installer lists Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, and OpenCode among supported targets: [gh skill install](https://cli.github.com/manual/gh_skill_install).

## Installation approaches

### Portable installation with GitHub CLI

Preview before installation:

```bash
gh skill preview ZeronO-L/family-trip-agent manage-family-road-trip
```

Install for one host:

```bash
gh skill install ZeronO-L/family-trip-agent manage-family-road-trip --agent HOST
```

Use `codex`, `claude-code`, `opencode`, `github-copilot`, `gemini-cli`, or `cursor` as `HOST`. Check the current `gh skill install --help` because this feature is in public preview.

### Codex plugin

Use the repository's `.codex-plugin/plugin.json` and follow the current [Codex plugin installation documentation](https://developers.openai.com/plugins/build/plugins#install-a-local-plugin-manually).

### Claude Code plugin

The repository contains `.claude-plugin/plugin.json` and a marketplace entry. Before public release, run:

```bash
claude plugin validate .
```

Then test adding the local marketplace and installing the plugin from a clean checkout. Follow the current [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

## Claim policy

Use these labels consistently:

- `structural support`: files match the host's documented Agent Skills or plugin structure;
- `runtime verified`: a clean installation and the shared forward-test prompt pass on that host;
- `live-source verified`: the host can access and correctly fall back across the required map, review, hotel, weather, official attraction, and ticket source roles.

Do not collapse these labels into a generic `supported everywhere` claim.
