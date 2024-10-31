const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

execSync("tsc", { stdio: "inherit" });

// Copy templates folder to dist
const source = path.resolve(__dirname, "./templates");
const destination = path.resolve(__dirname, "./dist/templates");

fs.cpSync(source, destination, { recursive: true });
