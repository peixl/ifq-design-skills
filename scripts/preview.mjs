#!/usr/bin/env node
/**
 * preview.mjs — open an HTML file in the user's system default browser.
 *
 * Zero dependencies. Works on macOS / Linux / Windows without any install.
 * This is the DEFAULT preview path for the skill; use the heavier
 * `scripts/verify.py` (Playwright) only when you need headless screenshots
 * or automated console-error capture.
 *
 * Usage:
 *   node scripts/preview.mjs path/to/design.html
 *   npm run preview -- path/to/design.html
 *
 * Exit codes:
 *   0  opened successfully
 *   1  file not found or spawn failed
 */

import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { platform } from 'node:os';
import { pathToFileURL } from 'node:url';

const arg = process.argv[2];
if (!arg || arg === '--help' || arg === '-h') {
  console.error('Usage: node scripts/preview.mjs <file.html | url>');
  console.error('Opens the target in your system default browser. No Playwright, no Chromium install.');
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

const os = platform();
let cmd, args;
if (os === 'darwin') {
  cmd = 'open';
  args = [target];
} else if (os === 'win32') {
  // `start` is a cmd builtin; must go through cmd /c.
  cmd = 'cmd';
  args = ['/c', 'start', '""', target];
} else {
  cmd = 'xdg-open';
  args = [target];
}

const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
child.on('error', (err) => {
  console.error(`ERROR: could not launch system browser via \`${cmd}\`: ${err.message}`);
  if (os !== 'darwin' && os !== 'win32') {
    console.error('Hint: on minimal Linux images install `xdg-utils` (provides xdg-open).');
  }
  process.exit(1);
});
child.unref();
console.log(`→ opened in system default browser: ${target}`);
