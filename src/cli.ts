#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { Generator } from "./generator";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("No command provided.");
  process.exit(1);
}
if (args[0] === "init") {
  const configPath = path.resolve(process.cwd(), "kiwee.json");
  if (fs.existsSync(configPath)) {
    console.log(
      `Configuration file already exists at ${configPath}. Please remove it and try again.`
    );
    process.exit(1);
  }
  fs.copyFileSync(
    path.resolve(__dirname, "templates", "kiwee-example.json"),
    configPath
  );
  console.log(`Configuration file created at ${configPath}.`);
} else if (args[0] === "generator") {
  const configPath = path.resolve(process.cwd(), args[1] ?? "kiwee.json");
  if (!fs.existsSync(configPath)) {
    console.log(
      `Configuration file not found at ${configPath}. Please execute the npx kiwee init command.`
    );
    process.exit(1);
  }
  const generator = new Generator(configPath);
  generator.generateFiles();
  // Place generator logic here
} else {
  console.log("Unknown command:", args[0]);
}
