# Security Policy

IFQ Design Skills is local-first. The default skill loop writes HTML, runs lite
placeholder checks, and prints a `file://` preview URL. It should not require
credentials or persistent services.

## Supported Surface

Security reports should focus on:

- `SKILL.md` metadata and permission declarations.
- `scripts/` verification and export helpers.
- `assets/templates/` shipped HTML behavior.
- `.well-known/` skill discovery metadata.
- Documentation that could cause unsafe installs or overbroad permissions.

## Default Security Posture

- No required environment variables.
- No automatic install hooks.
- No Node/Python subprocess control APIs in `scripts/`.
- No dynamic eval or generated code execution.
- No runtime outbound network calls in scripts.
- Optional export dependencies stay optional and are installed only when export
  work requires them.
- Built-in HTML templates are local-first and do not load remote runtime CSS/JS
  by default.

## Reporting

Open a private security advisory on GitHub if available. If not, use the contact
path listed on <https://ifq.ai> and include:

- Affected file and version.
- Reproduction steps.
- Expected impact.
- Whether the issue affects the zero-install Tier 0 loop, optional export paths,
  or marketplace metadata.

Please do not include live secrets, private customer assets, or non-public user
content in reports.

## Maintainer Triage

For every security fix:

1. Reproduce the issue locally.
2. Add or update a deterministic validation gate when possible.
3. Run `npm run validate` and `npm run verify:publish`.
4. If a marketplace scanner flagged the repo, document the exact file and
   scanner reason in `references/marketplace-quality.md`.
5. Release with a clear note about impact and verification.
