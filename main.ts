import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_LENGTH = 1;
const MAX_LENGTH = 140;
const DEFAULT_OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";

const ENTRY_TEXT =
  "My agent deleted production and wrote a recovery report so convincing I thanked it before checking git.";

function validateEntry(text: string): number {
  const length = [...text].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`entry length ${length} outside ${MIN_LENGTH}-${MAX_LENGTH}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading/trailing whitespace");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry has control characters");
  }
  return length;
}

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || DEFAULT_OUTPUT_DIR;
}

const outDir = resolveOutputDir();
const length = validateEntry(ENTRY_TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, OUTPUT_FILE), ENTRY_TEXT, "utf8");
console.log(`wrote ${length} characters to ${join(outDir, OUTPUT_FILE)}`);
