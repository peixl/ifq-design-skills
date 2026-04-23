#!/usr/bin/env node
/**
 * preview.mjs — resolve an HTML file to a file:// URL and print it.
 *
 * Zero dependencies. Zero child processes. Zero network I/O.
 *
 * Why not auto-launch the browser?
 *   Earlier versions shelled out to `open` / `xdg-open` / `cmd start`. That
 *   required a Node sub-process API that static security scanners
 *   (ClawHub, etc.) reasonably flag as a "suspicious pattern" even though
 *   the payload is trivially safe. For an agent-facing skill the browser
 *   launch is redundant: agents have their own browser-automation tools and
 *   can consume the file:// URL directly; humans can ⌘-click the URL in a
 *   modern terminal. Making this script pure Node keeps the skill clean for
 *   every static analysis pipeline.
 *
 * Usage:
 *   node scripts/preview.mjs path/to/design.html
 *   npm run preview -- path/to/design.html
 *
 * Exit codes:
 *   0  URL resolved and printed
 *   1  file not found or bad argument
 */

import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const arg = process.argv[2];
if (!arg || arg === '--help' || arg === '-h') {
  console.error('Usage: node scripts/preview.mjs <file.html | url>');
  console.error('Prints a file:// (or passthrough) URL you can open in any browser.');
  process.exit(arg ? 0 : 1);
}

// Allow a raw URL too — useful for previewing a remote reference.
let target = arg;
const isUrl = /^[a-z][a-z0-9+.-]*:\/\//i.test(arg);
if (!isUrl) {
  const abs = resolve(process.cwd(), arg);
  if (!existsSync(abs)) {
    console.error(`ERROR: file not found: ${abs}`);
    process.exit(1);
  }
  if (!statSync(abs).isFile()) {
    console.error(`ERROR: not a regular file: ${abs}`);
    process.exit(1);
  }
  target = pathToFileURL(abs).href;
}

console.log('');
console.log('  Preview URL:');
console.log(`    ${target}`);
console.log('');
console.log('  ▸ Agents: open this URL with your browser tool.');
console.log('  ▸ Humans: ⌘-click / Ctrl-click the URL in your terminal, or paste it into a browser tab.');
console.log('');
