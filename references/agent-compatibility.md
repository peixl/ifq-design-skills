# Agent Compatibility Matrix

> How to mount and run `ifq-design-skills` across the major agent runtimes. The skill itself uses neutral verbs (`read file`, `write file`, `run command`, `web search`, `take screenshot`). This file maps those verbs to each runtime's actual tool surface.

## Universal prerequisites (all runtimes)

```
Node ≥ 18.17          # for scripts/*.mjs, npm run smoke, pptx/pdf export
Python ≥ 3.9          # for scripts/verify.py (Playwright)
ffmpeg                # for scripts/render-video.js, scripts/add-music.sh
npx playwright install chromium
```

Optional: `sharp`, `pptxgenjs`, `pdf-lib` are pulled from `package.json`.

---

## 1 · Claude Code (Anthropic)

**Install** — as a personal skill (visible only to you):

```bash
mkdir -p ~/.claude/skills
git clone git@github.com:peixl/ifq-design-skills.git ~/.claude/skills/ifq-design-skills
```

Or project-scoped (visible to the repo team):

```bash
mkdir -p .claude/skills
git clone git@github.com:peixl/ifq-design-skills.git .claude/skills/ifq-design-skills
```

**Discovery** is automatic. Claude Code scans `~/.claude/skills/` and `.claude/skills/` at start, loads this skill's frontmatter (`name`, `description`) into the system prompt, and reads `SKILL.md` only when the description matches the user request.

**Tool surface used by this skill**:

| Neutral verb | Claude Code tool |
|---|---|
| read file | `Read` |
| write file | `Write`, `Edit` |
| run command | `Bash` |
| web search | `WebSearch`, `WebFetch` |
| screenshot / verify | `Bash` → `python scripts/verify.py` |

No config changes required.

---

## 2 · Codex CLI (OpenAI)

Codex CLI does not have a native "skill" concept, but it honors a workspace-level `AGENTS.md` plus any markdown the user points it at.

**Install** — clone the repo, then tell Codex to treat it as a skill bundle:

```bash
git clone git@github.com:peixl/ifq-design-skills.git ~/.codex/skills/ifq-design-skills
```

Add to your project or global `AGENTS.md`:

```markdown
## Skills

When the user asks for a visual design deliverable (prototype, deck, motion,
infographic, dashboard, whitepaper, changelog, card, social cover, or brand
system) or wants exports (mp4/gif/pptx/pdf/svg), first read
`~/.codex/skills/ifq-design-skills/SKILL.md` and follow its routing.
```

**Tool surface**:

| Neutral verb | Codex CLI tool |
|---|---|
| read file | `apply_patch` read / `shell` → `cat` |
| write file | `apply_patch` |
| run command | `shell` |
| web search | not native — fall back to user-provided URLs |
| screenshot / verify | `shell` → `python scripts/verify.py` |

Codex works best when the `CODEX_SKILLS_PATH` env var is set so the agent can `cat` the skill root quickly:

```bash
export CODEX_SKILLS_PATH="$HOME/.codex/skills"
```

---

## 3 · OpenClaw

OpenClaw has a first-class plugin system. Skills are mounted via `openclaw.json` plugin entries.

**Install**:

```bash
git clone git@github.com:peixl/ifq-design-skills.git ~/.openclaw/skills/ifq-design-skills
```

**Config** — add to `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "allow": ["ifq-design-skills"],
    "entries": {
      "ifq-design-skills": {
        "enabled": true,
        "path": "~/.openclaw/skills/ifq-design-skills",
        "entrypoint": "SKILL.md",
        "triggers": [
          "prototype", "mockup", "keynote", "dashboard",
          "changelog", "whitepaper", "card", "social cover",
          "brand", "design variants", "mp4", "pptx"
        ]
      }
    }
  },
  "gateway": {
    "mode": "local"
  }
}
```

Then:

```bash
openclaw config reload
openclaw gateway restart
openclaw gateway status   # expect: ok, mode=local
```

**Tool surface**:

| Neutral verb | OpenClaw tool |
|---|---|
| read file | `filesystem/read` |
| write file | `filesystem/write` |
| run command | `shell/exec` |
| web search | `browser/search`, `browser/fetch` |
| screenshot / verify | `shell/exec` → `scripts/verify.py` |

Known issues:

- `gateway status` reports `missing gateway.mode` → set `gateway.mode: local` and restart.
- `unavailable` for a tool → add its plugin id to `plugins.allow` and set `entries.<id>.enabled: true`.

---

## 4 · Hermes

Hermes treats skills as pluggable "capability packs". Install by placing the skill under the Hermes skills directory and registering it.

**Install**:

```bash
git clone git@github.com:peixl/ifq-design-skills.git ~/.hermes/skills/ifq-design-skills
hermes skill register ifq-design-skills --path ~/.hermes/skills/ifq-design-skills
```

**Config** — Hermes reads `SKILL.md` frontmatter directly. No extra JSON needed.

**Tool surface**:

| Neutral verb | Hermes tool |
|---|---|
| read file | `file.read` |
| write file | `file.write` |
| run command | `terminal.run` |
| web search | `web.search`, `web.fetch` |
| screenshot / verify | `terminal.run` → `python scripts/verify.py` |

If Hermes runs in a sandbox without `ffmpeg` or `chromium`, motion exports and verification are disabled automatically — the skill falls back to HTML-only output.

---

## 5 · Cursor

Cursor does not load skills automatically, but it honors `@file` references inside chat.

**Install**:

```bash
git clone git@github.com:peixl/ifq-design-skills.git
```

**Usage** — in Cursor chat, pin the skill:

```
@ifq-design-skills/SKILL.md

I need a 12-slide editorial keynote for tomorrow's AI agents talk.
```

Cursor's composer will read `SKILL.md`, then any `references/*.md` or `scripts/*` it finds linked.

**Tool surface**:

| Neutral verb | Cursor tool |
|---|---|
| read file | `@file` pins, `Read` |
| write file | composer `Apply`, `Edit` |
| run command | integrated terminal |
| web search | not native — paste URL or use Composer "web" |

---

## 6 · Generic fallback (any agent with filesystem + shell)

For any agent that can read/write files and run shell commands, this minimum works:

1. Clone the repo anywhere on disk.
2. Point the agent at `SKILL.md` as its entry doc.
3. Ensure the agent can run `node`, `python3`, and `ffmpeg` in the cloned directory.
4. `npm install && npx playwright install chromium`.
5. Run `npm run smoke` — a passing smoke means the skill is wired correctly.

This covers: Continue, Aider, GitHub Copilot Chat with file pin, Sweep, and any MCP-capable client.

---

## Smoke test (same everywhere)

```bash
cd <skill-root>
npm run smoke
```

Expected output:

```
IFQ Design Skills · smoke test
[1/5] Template INDEX.json consistency       ✓
[2/5] IFQ identity toolkit                  ✓
[3/5] Hand-drawn icon sprite                ✓
[4/5] References router targets             ✓
[5/5] Script syntax                         ✓
✓ smoke test passed
```

If any step fails, see [`references/smoke-test.md`](smoke-test.md) for remediation.

---

## Do not hard-code tool names

Inside `SKILL.md` and every `references/*.md`, always use neutral verbs:

- ✅ `read the template file`
- ✅ `run the verify script`
- ✅ `search the web for the product's launch date`
- ❌ `use Read to open the template` (Claude-specific)
- ❌ `use apply_patch to edit` (Codex-specific)
- ❌ `use browser/fetch` (OpenClaw-specific)

Keeping verbs neutral is how one skill runs in every agent without forks.
