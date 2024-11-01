import { spawn } from "child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const cliPath = path.resolve(__dirname, "cli.ts");

describe("CLI", () => {
  it("should show an error when no command is provided", async () => {
    const cli = spawn("node", [cliPath]);
    let output = "";

    cli.stdout.on("data", (data) => {
      output += data.toString();
    });

    const code = await new Promise<number>((resolve) => {
      cli.on("close", resolve);
    });

    expect(code).toBe(1);
    expect(output).toMatch(/No command provided/);
  });

  it("should create a configuration file when init command is used", async () => {
    const configPath = path.resolve(process.cwd(), "kiwee-config.json");

    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }

    const cli = spawn("node", [cliPath, "init"]);

    const code = await new Promise<number>((resolve) => {
      cli.on("close", resolve);
    });

    expect(code).toBe(0);
    expect(fs.existsSync(configPath)).toBe(true);

    fs.unlinkSync(configPath);
  });

  // ...other tests...
});
