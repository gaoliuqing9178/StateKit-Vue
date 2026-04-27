import { rm } from "node:fs/promises";
import path from "node:path";

const targetArg = process.argv[2];

if (!targetArg) {
  console.error("[StateKit] Missing dist path for cleanup.");
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), targetArg);

await rm(targetPath, { recursive: true, force: true });
