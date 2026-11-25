// make.fun entry — "One-Line Laugh-Off"
// (u-zkhiel-one-line-laugh-off-714618ae)
//
// One funny line, written to /output/entry.txt. The joke turns on a cold
// read: a cosmic plea answered in the most mundane modern way possible.
import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY: string =
  "I asked the universe for a sign; it left me on read.";

const OUT = "/output/entry.txt";

function checkGate(text: string): number {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} chars, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  return Buffer.byteLength(text, "utf8");
}

const bytes = checkGate(ENTRY);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, ENTRY, "utf8");
// Read back immediately: the grader's gate reads this exact file.
const back = fs.readFileSync(OUT, "utf8");
if (back !== ENTRY) {
  throw new Error(`read-back mismatch: got ${JSON.stringify(back)}`);
}
console.log(`wrote ${ENTRY.length} chars (${bytes} bytes) to ${OUT}`);
