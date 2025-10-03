#!/usr/bin/env node

async function main() {
  console.log(process.versions);
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
