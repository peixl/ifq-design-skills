# Agent Compatibility Matrix

> How to mount and run `ifq-design-skills` across every major agent runtime. The skill follows the **agentskills.io open standard** (Anthropic Agent Skills compatible) and adds Hermes and ClawHub metadata blocks without breaking any runtime.

The skill itself uses neutral verbs (`read file`, `write file`, `run command`, `web search`, `take screenshot`). This file maps those verbs to each runtime's actual tool surface and documents install paths, slash commands, and discovery endpoints.

## Universal prerequisites — tiered, default is ZERO install

The skill is designed so the **core design loop costs nothing to install**. Heavier tooling is pulled in on demand only when the user actually asks for an export or CI-grade verification.

```
Tier 0 · CORE LOOP (zero-install)
  Node ≥ 18.17             # scripts/preview.mjs, scripts/verify-lite.mjs, scripts/smoke-test.mjs
  a default system browser # preview uses `open` / `xdg-open` / `start`

Tier 1 · DEEP VERIFY (optional, on demand)
  Python ≥ 3.9             # scripts/verify.py
  pip install playwright && python -m playwright install chromium

Tier 2 · EXPORT PIPELINE (optional, on demand)
  npm run install:export   # pulls playwright + pdf-lib + pptxgenjs + sharp + Chromium in one shot
  ffmpeg (brew / apt)      # only for MP4/GIF via scripts/render-video.js + scripts/add-music.sh
```

`playwright`, `pdf-lib`, `pptxgenjs`, `sharp` are all declared under `optionalDependencies` in `package.json` — `npm install --omit=optional` succeeds and keeps the skill lightweight. Never push Tier 1 or Tier 2 onto users whose task only needs HTML.

## Recommended install path — shared across every agent

Hermes documents `~/.agents/skills/` as the cross-tool shared external directory. Install there once and every agent below can point at the same copy.

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/peixl/ifq-design-skills ~/.agents/skills/ifq-design-skills

# or the skills CLI shorthand (symlinks into every agent automatically)
npx skills add peixl/ifq-design-skills -g -y
```

Each agent's section below shows how to register that shared path or install an independent copy.

---

## 1 · Claude Code (Anthropic)

Claude Code honors the Anthropic Agent Skills spec natively. Mount at either path:

```bash
# Personal (visible only to you)
ln -s ~/.agents/skills/ifq-design-skills ~/.claude/skills/ifq-design-skills

# Project-scoped (checked into the repo)
ln -s ~/.agents/skills/ifq-design-skills .claude/skills/ifq-design-skills
```

**Discovery** is automatic. Claude Code scans `~/.claude/skills/` and `.claude/skills/`, loads the frontmatter (`name`, `description`) into the system prompt, and reads `SKILL.md` only when the description matches the user request.

| Neutral verb | Claude Code tool |
|---|---|
| read file | `Read` |
| write file | `Write`, `Edit` |
| run command | `Bash` |
| web search | `WebSearch`, `WebFetch` |
| preview (default) | `Bash` → `npm run preview -- <file>` |
| verify (default) | `Bash` → `npm run verify:lite -- <file>` |
| verify (deep, optional) | `Bash` → `python scripts/verify.py <file>` |

No config changes required.

---

## 2 · Hermes (Nous Research)

Hermes is the most feature-rich runtime. It understands the extended frontmatter (`platforms`, `metadata.hermes`, `fallback_for_toolsets`, `required_environment_variables`, `config`) and ships a fully integrated skills hub.

### Install — three equivalent routes

```bash
# Route A — direct GitHub install via the Hermes skills hub
hermes skills install github:peixl/ifq-design-skills

# Route B — via ClawHub marketplace
hermes skills install clawhub:peixl/ifq-design-skills

# Route C — point Hermes at the shared external dir
# edit ~/.hermes/config.yaml:
#   skills:
#     external_dirs:
#       - ~/.agents/skills
```

### Slash commands (CLI and every messaging surface)

```
/ifq-design-skills make a 12-slide editorial keynote about AI agents
/ifq-design-skills design a dashboard for the quarterly launch review
/ifq-design-skills critique this landing page and propose 3 directions
/ifq-design-skills                                    # loads the skill, asks what you need
```

### Progressive disclosure (native)

Hermes loads this skill in three levels, matching the agentskills.io standard:

- **Level 0** — `skills_list()` returns `{name, description, category}` (~3 k tokens total)
- **Level 1** — `skill_view("ifq-design-skills")` returns the full `SKILL.md`
- **Level 2** — `skill_view("ifq-design-skills", "references/modes.md")` pulls one reference on demand

### Tool mapping

| Neutral verb | Hermes tool |
|---|---|
| read file | `file.read`, `skill_view` |
| write file | `file.write` |
| run command | `terminal.run`, `execute_code` |
| web search | `web.search`, `web.fetch` (or `duckduckgo_search` fallback) |
| preview (default) | `terminal.run` → `npm run preview -- <file>` |
| verify (default) | `terminal.run` → `npm run verify:lite -- <file>` |
| verify (deep, optional) | `terminal.run` → `python scripts/verify.py <file>` |

### Conditional activation

This skill does not declare `fallback_for_toolsets` because design output is its primary job, not a fallback. If `ffmpeg` or `chromium` is missing, motion export and verification are auto-skipped and the skill falls back to HTML-only output.

### Agent-managed patches

When the Hermes agent discovers a non-trivial workflow while using this skill, it can patch the skill via the `skill_manage` tool:

```
skill_manage action=patch name=ifq-design-skills \
  old_string="..." new_string="..."
```

Prefer `patch` over `edit` for small fixes — it is more token-efficient.

### Reset after manual edits

If you hand-edit the installed copy and later want to restore the pristine version:

```bash
hermes skills reset ifq-design-skills --restore
```

---

## 3 · OpenClaw + ClawHub

OpenClaw has a first-class plugin system; [ClawHub](https://clawhub.ai) is its marketplace. Hermes also integrates ClawHub as a source.

### Install

```bash
# Route A — via ClawHub
openclaw skills install ifq-design-skills

# Route B — symlink the shared dir
ln -s ~/.agents/skills/ifq-design-skills ~/.openclaw/skills/ifq-design-skills
```

### Config — `~/.openclaw/openclaw.json`

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
  "gateway": { "mode": "local" }
}
```

Then:

```bash
openclaw config reload
openclaw gateway restart
openclaw gateway status   # expect: ok, mode=local
```

### Tool mapping

| Neutral verb | OpenClaw tool |
|---|---|
| read file | `filesystem/read` |
| write file | `filesystem/write` |
| run command | `shell/exec` |
| web search | `browser/search`, `browser/fetch` |
| preview (default) | `shell/exec` → `npm run preview -- <file>` |
| verify (default) | `shell/exec` → `npm run verify:lite -- <file>` |
| verify (deep, optional) | `shell/exec` → `scripts/verify.py` |

### Known issues and fixes

- `gateway status` reports `missing gateway.mode` → set `gateway.mode: "local"` and restart.
- A tool returns `unavailable` → add its plugin id to `plugins.allow` and set `entries.<id>.enabled: true`.

### Publishing to ClawHub

```bash
hermes skills publish ~/.agents/skills/ifq-design-skills --to clawhub
# or use the ClawHub web publisher at https://clawhub.ai/publish/skill
```

---

## 4 · Codex CLI (OpenAI)

Codex has no native skill concept but honors `AGENTS.md` plus any markdown the user points it at.

```bash
ln -s ~/.agents/skills/ifq-design-skills ~/.codex/skills/ifq-design-skills
```

Add to your project or global `AGENTS.md`:

```markdown
## Skills

When the user asks for a visual design deliverable (prototype, deck, motion,
infographic, dashboard, whitepaper, changelog, card, social cover, or brand
system) or wants exports (mp4/gif/pptx/pdf/svg), read
`~/.codex/skills/ifq-design-skills/SKILL.md` first and follow its routing.
```

| Neutral verb | Codex CLI tool |
|---|---|
| read file | `apply_patch` read / `shell` → `cat` |
| write file | `apply_patch` |
| run command | `shell` |
| web search | not native — user supplies URLs |
| preview (default) | `shell` → `npm run preview -- <file>` |
| verify (default) | `shell` → `npm run verify:lite -- <file>` |
| verify (deep, optional) | `shell` → `python scripts/verify.py <file>` |

Optional env hint so Codex finds the skill quickly:

```bash
export CODEX_SKILLS_PATH="$HOME/.codex/skills"
```

---

## 5 · OpenCode (sst/opencode)

OpenCode is an AGENTS.md-native terminal agent. It reads the repo's root `AGENTS.md` automatically on every session, so no per-runtime config is required — **this repo ships `AGENTS.md` at root**, pointing OpenCode straight at `SKILL.md`.

### Install

```bash
# Route A — per-project: clone directly into your workspace, opencode finds AGENTS.md on open
git clone https://github.com/peixl/ifq-design-skills

# Route B — globally shared: symlink into the cross-agent shared dir
git clone https://github.com/peixl/ifq-design-skills ~/.agents/skills/ifq-design-skills
ln -s ~/.agents/skills/ifq-design-skills ~/.config/opencode/skills/ifq-design-skills
```

### Slash-style prompts

OpenCode does not have slash commands, but because `AGENTS.md` is loaded into the system prompt, you can just say:

```
make a 12-slide editorial keynote about AI agents
critique this landing page and propose 3 directions
export the current deck to PPTX
```

and the agent routes through this skill.

### Tool mapping

| Neutral verb | OpenCode tool |
|---|---|
| read file | `read` |
| write file | `write`, `edit` |
| run command | `bash` |
| web search | `webfetch` (or MCP search server) |
| preview (default) | `bash` → `npm run preview -- <file>` |
| verify (default) | `bash` → `npm run verify:lite -- <file>` |
| verify (deep, optional) | `bash` → `python scripts/verify.py <file>` |

OpenCode works zero-install for the core loop — it never prompts the user to install Playwright unless an export task actually triggers Tier 2.

---

## 6 · Cursor

Cursor does not load skills automatically but honors `@file` pins in chat.

```bash
git clone https://github.com/peixl/ifq-design-skills
# or use the shared path
npx skills add peixl/ifq-design-skills -g -y
```

In Cursor chat, pin the skill at the start of the conversation:

```
@ifq-design-skills/SKILL.md

I need a 12-slide editorial keynote for tomorrow's AI agents talk.
```

| Neutral verb | Cursor tool |
|---|---|
| read file | `@file` pins, `Read` |
| write file | composer `Apply`, `Edit` |
| run command | integrated terminal |
| web search | paste URL or Composer "web" |

---

## 7 · CodeBuddy (Tencent)

CodeBuddy is Tencent's in-IDE coding assistant (VS Code / JetBrains plug-in). It does not have a native skill registry, but every chat turn injects the workspace's `AGENTS.md` and any explicitly pinned markdown into the system prompt — exactly the surface this skill targets.

```bash
# Per-project — clone or symlink into the workspace; CodeBuddy auto-reads AGENTS.md
git clone https://github.com/peixl/ifq-design-skills

# Globally shared — link the cross-agent dir into your workspace once
ln -s ~/.agents/skills/ifq-design-skills .codebuddy/skills/ifq-design-skills
```

In CodeBuddy chat, pin the entry doc at the start of a design conversation:

```
@SKILL.md
做一个 12 页的 editorial 风 keynote，主题「AI agents 这一年」
```

| Neutral verb | CodeBuddy tool |
|---|---|
| read file | `@file` pin · "Read file" |
| write file | "Apply" / "Edit file" |
| run command | integrated terminal |
| web search | "Search the web" / paste URL |
| preview (default) | terminal → `npm run preview -- <file>` |
| verify (default) | terminal → `npm run verify:lite -- <file>` |
| verify (deep, optional) | terminal → `python scripts/verify.py <file>` |

CodeBuddy stays inside Tier 0 by default. Tier 1 / Tier 2 only when the user explicitly asks for headless screenshots or MP4/PDF/PPTX export.

---

## 8 · Generic fallback — any agent with filesystem + shell

Minimum steps for any runtime with file read/write and shell:

1. Clone the repo (or symlink `~/.agents/skills/ifq-design-skills`).
2. Point the agent at `SKILL.md` as its entry doc. The root `AGENTS.md` also points here, which most AGENTS.md-aware tools (Codex CLI, OpenCode, sst) pick up automatically.
3. Ensure the agent can run `node` in the cloned directory. The default design loop needs nothing else.
4. Run `npm run smoke` — a passing smoke means the skill is wired correctly.
5. **Only when the user asks to export** MP4 / GIF / PDF / PPTX, run `npm run install:export` once.

Covers Continue, Aider, GitHub Copilot Chat with `@workspace`, Sweep, sst/OpenCode, and any MCP-capable client.

---

## 9 · Web discovery via `/.well-known/skills/`

For any Hermes instance (or compatible client) to discover this skill from its homepage, publish a static manifest at:

```
https://<your-domain>/.well-known/skills/index.json
https://<your-domain>/.well-known/skills/ifq-design-skills
```

See [`../.well-known/skills/index.json`](../.well-known/skills/index.json) in this repo for the reference manifest. Agents install with:

```bash
hermes skills install well-known:https://<your-domain>/.well-known/skills/ifq-design-skills
```

---

## Frontmatter extension reference

This skill's frontmatter is strictly additive: runtimes that do not understand an extra key ignore it.

| Key | Required by | Status |
|---|---|---|
| `name` | Anthropic, Hermes, ClawHub, agentskills.io | **required** |
| `description` | same (≤ 1024 chars, third-person, what + when) | **required** |
| `version` | Hermes, ClawHub | recommended |
| `license` | ClawHub publish | recommended |
| `platforms: [macos, linux, windows]` | Hermes | recommended |
| `metadata.hermes.category` | Hermes | recommended |
| `metadata.hermes.tags` | Hermes | recommended |
| `metadata.clawhub.*` | ClawHub | recommended |
| `metadata.agentskills.standard` | agentskills.io | informational |
| `required_environment_variables` | Hermes | only for skills that truly need runtime environment values |
| `fallback_for_toolsets`, `requires_toolsets` | Hermes | optional |

This skill declares none of those fields because it runs on local files only.

---

## Smoke test — same everywhere

```bash
cd <skill-root>
npm run smoke
```

Expected:

```
IFQ Design Skills · smoke test
[1/5] Template INDEX.json consistency       ✓
[2/5] IFQ identity toolkit                  ✓
[3/5] Hand-drawn icon sprite                ✓
[4/5] References router targets             ✓
[5/5] Script syntax                         ✓
✓ smoke test passed
```

See [`smoke-test.md`](smoke-test.md) for remediation.

---

## Do not hard-code tool names

Inside `SKILL.md` and every `references/*.md`, always use neutral verbs:

- ✅ `read the template file`
- ✅ `run the verify script`
- ✅ `search the web for the product's launch date`
- ❌ `use Read to open the template` (Claude-specific)
- ❌ `use apply_patch to edit` (Codex-specific)
- ❌ `use browser/fetch` (OpenClaw-specific)
- ❌ `call skill_view` (Hermes-specific)

Neutral verbs are how one skill runs unmodified in every agent that implements the agentskills.io standard.
