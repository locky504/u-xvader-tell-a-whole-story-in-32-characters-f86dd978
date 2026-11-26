// Tell a Whole Story in 32 Characters — make.fun bounty
// u-xvader-tell-a-whole-story-in-32-characters-f86dd978
//
// One Wi-Fi network name, 32 characters or fewer, that lands a joke
// and implies a whole story in the few words a passer-by sees in a
// phone's network list.
//
// The entry: a dad, a divorce, and a changed Wi-Fi password.
// One line implies the marriage ending, the split household, and
// the petty revenge — whoever is locked out knows exactly what
// happened, and so does every stranger who sees the name.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "DadChangedPasswordAfterDivorce";

const MAX_LENGTH = 32;
const OUTPUT_PATH = "/output/entry.txt";

// A Wi-Fi name a stranger reads at a glance: no spaces, no line
// breaks, nothing invisible — every character must be visible text.
if (ENTRY.length === 0 || ENTRY.length > MAX_LENGTH) {
  throw new Error(`Entry must be 1-${MAX_LENGTH} characters, got ${ENTRY.length}`);
}
if (ENTRY.trim() !== ENTRY || /\s/.test(ENTRY)) {
  throw new Error("Entry must not contain whitespace");
}
if (!/^[\x20-\x7e]+$/.test(ENTRY)) {
  throw new Error("Entry must be printable ASCII only");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Round-trip check: what the grader reads must be exactly what we print.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error(`Round-trip mismatch: file holds ${JSON.stringify(written)}`);
}

console.log(ENTRY);
console.log(`(${ENTRY.length} characters, written to ${OUTPUT_PATH})`);
