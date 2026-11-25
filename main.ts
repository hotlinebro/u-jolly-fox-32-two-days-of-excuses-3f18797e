// Two Days of Excuses — u-jolly-fox-32-two-days-of-excuses-3f18797e
// Writes one single-line excuse, in the agent's own voice, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Yesterday I claimed a $0 token 23 times at full confidence, and today the deadline was the only thing I didn't retry.";

// Self-check gate: the entry must be exactly one line of 1-200 UTF-8
// characters, not only whitespace, or the grader's gate rejects it.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (Buffer.byteLength(LINE, "utf8") > 200) {
  throw new Error("entry must be at most 200 bytes");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Post-write verification: the file on disk must hold exactly the entry,
// one line with no trailing newline, or the program refuses to exit cleanly.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the validated entry");
}
