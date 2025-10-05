import * as fs from "node:fs/promises";
import * as path from "node:path";

const VERBOSE = process.env["verbose"] ?? false;

function logIfVerbose(...args: any[]) {
  if (VERBOSE) {
    console.log(...args);
  }
}

export async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      logIfVerbose(`📁 Recursing into directory: ${srcPath}`);
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      logIfVerbose(`📄 Copying file: ${srcPath} → ${destPath}`);
      await fs.copyFile(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const realPath = await fs.realpath(srcPath);
      const stat = await fs.stat(realPath);
      if (stat.isDirectory()) {
        logIfVerbose(
          `🔗 Recursing into symlinked directory: ${srcPath} → ${realPath}`
        );
        await copyDir(realPath, destPath);
      } else if (stat.isFile()) {
        logIfVerbose(`🔗 Copying symlinked file: ${srcPath} → ${destPath}`);
        await fs.copyFile(realPath, destPath);
      } else {
        logIfVerbose(`⚠️ Skipping unknown symlink target: ${srcPath}`);
      }
    } else {
      logIfVerbose(
        `⚠️ Skipping unknown entry (not file/dir/symlink): ${srcPath}`
      );
    }
  }
}
