import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

const entries = await readdir(currentDir, { withFileTypes: true });
const testFiles = entries
  .filter((entry) => entry.isFile())
  .map((entry) => path.join(currentDir, entry.name))
  .filter((filePath) => filePath.endsWith('.test.mjs'))
  .filter((filePath) => filePath !== currentFile)
  .sort();

for (const testFile of testFiles) {
  await import(pathToFileURL(testFile).href);
}