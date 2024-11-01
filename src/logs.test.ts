import chalk from "chalk";
import { describe, expect, it } from "vitest";
import { loggerPretty } from "./logs";

describe("LoggerPretty", () => {
  it("should apply blue style correctly", () => {
    const text = "Test";
    const expected = chalk.blue(text);
    const result = loggerPretty.blue(text);
    expect(result).toBe(expected);
  });

  it("should apply green style correctly", () => {
    const text = "Test";
    const expected = chalk.green(text);
    const result = loggerPretty.green(text);
    expect(result).toBe(expected);
  });

  it("should apply red style correctly", () => {
    const text = "Test";
    const expected = chalk.red(text);
    const result = loggerPretty.red(text);
    expect(result).toBe(expected);
  });

  // ...other tests...
});
