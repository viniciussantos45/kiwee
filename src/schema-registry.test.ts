import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { SchemaRegistry } from "./schema-registry";

describe("SchemaRegistry", () => {
  const testConfigPath = path.resolve(__dirname, "test-config.json");
  let schemaRegistry: SchemaRegistry;

  beforeAll(() => {
    const testConfig = {
      consumers: {
        testConsumer: {
          actions: {
            testAction: {
              schema: {
                type: "object",
                properties: {
                  field: { type: "string" },
                },
                required: ["field"],
              },
            },
          },
        },
      },
    };
    fs.writeFileSync(testConfigPath, JSON.stringify(testConfig));
    schemaRegistry = new SchemaRegistry(testConfigPath);
  });

  afterAll(() => {
    fs.unlinkSync(testConfigPath);
  });

  it("should validate a valid payload", () => {
    const payload = { field: "value" };
    expect(() => {
      schemaRegistry.validate("testConsumer", "testAction", payload);
    }).not.toThrow();
  });

  it("should throw an error for invalid payload", () => {
    const payload = { wrongField: 123 };
    expect(() => {
      schemaRegistry.validate("testConsumer", "testAction", payload);
    }).toThrow(/Invalid payload/);
  });

  it("should deserialize a valid message", () => {
    const message = JSON.stringify({
      consumer: "testConsumer",
      action: "testAction",
      payload: { field: "value" },
    });
    const result = schemaRegistry.deserialize(message);
    expect(result).toEqual({
      consumer: "testConsumer",
      action: "testAction",
      payload: { field: "value" },
    });
  });

  // ...other tests...
});
