import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Generator } from "../src/generator";

describe("Generator", () => {
  const testConfigPath = path.resolve(__dirname, "test-config.json");
  const testOutputDir = path.resolve(process.cwd(), "test-output");
  let generator: Generator;

  beforeAll(() => {
    const testConfig = {
      settings: {
        baseDir: "test-output",
        handlersDir: "handlers",
      },
      consumers: {
        testConsumer: {
          actions: {
            testAction: {
              schema: {
                properties: {
                  field: { type: "string" },
                },
              },
            },
          },
        },
      },
    };
    fs.writeFileSync(testConfigPath, JSON.stringify(testConfig));
    generator = new Generator(testConfigPath);
  });

  afterAll(() => {
    fs.rmSync(testOutputDir, { recursive: true, force: true });
    fs.unlinkSync(testConfigPath);
  });

  it("should generate handler files", () => {
    generator.generateFiles();

    const handlerPath = path.join(
      testOutputDir,
      "handlers",
      "testConsumer",
      "test-action.ts"
    );
    expect(fs.existsSync(handlerPath)).toBe(true);
  });

  it("should generate type definitions", () => {
    const typeDef = generator.generateTypes("TestAction", {
      properties: {
        field: { type: "string" },
      },
    });
    expect(typeDef).toMatch(/export type TestActionPayload/);
  });

  // ...other tests...
});
