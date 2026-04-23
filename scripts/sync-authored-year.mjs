import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const yearArg = args.find((arg) => arg.startsWith('--year='));
const dateArg = args.find((arg) => arg.startsWith('--date='));

function resolveYear() {
  if (yearArg) {
    const explicitYear = Number.parseInt(yearArg.slice('--year='.length), 10);
    if (!Number.isInteger(explicitYear) || explicitYear < 2000 || explicitYear > 9999) {
      throw new Error(`Invalid --year value: ${yearArg}`);
    }
    return String(explicitYear);
  }

  if (dateArg) {
    const explicitDate = new Date(dateArg.slice('--date='.length));
    if (Number.isNaN(explicitDate.getTime())) {
      throw new Error(`Invalid --date value: ${dateArg}`);
    }
    return String(explicitDate.getFullYear());
  }

  return String(new Date().getFullYear());
}

const currentYear = resolveYear();
const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const targetFiles = ['README.md', 'README.en.md'];

const replacements = [
  {
    pattern: /ifq\.ai \/ field note \/ (?:\d{4}|YYYY|<year>)/g,
    replacement: `ifq.ai / ${currentYear}`,
  },
  {
    pattern: /ifq\.ai \/ (?:\d{4}|YYYY|<year>)/g,
    replacement: `ifq.ai / ${currentYear}`,
  },
  {
    pattern: /compiled by ifq\.ai(&nbsp;&nbsp;·&nbsp;&nbsp;| · )(?:\d{4}|YYYY|<year>)/g,
    replacement: (_match, separator) => `compiled by ifq.ai${separator}${currentYear}`,
  },
];

const changedFiles = [];

for (const relativePath of targetFiles) {
  const absolutePath = resolve(repoRoot, relativePath);
  const source = await readFile(absolutePath, 'utf8');
  let updated = source;

  for (const { pattern, replacement } of replacements) {
    updated = updated.replace(pattern, replacement);
  }

  if (updated === source) {
    continue;
  }

  changedFiles.push(relativePath);

  if (!checkOnly) {
    await writeFile(absolutePath, updated, 'utf8');
  }
}

if (checkOnly && changedFiles.length > 0) {
  console.error(`Authored year is out of sync in: ${changedFiles.join(', ')}`);
  process.exit(1);
}

if (changedFiles.length > 0) {
  console.log(`${checkOnly ? 'Would update' : 'Updated'} authored year in: ${changedFiles.join(', ')}`);
} else {
  console.log(`Authored year already synced for ${currentYear}.`);
}