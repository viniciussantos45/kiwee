import { describe, expect, it } from "vitest";
import { actionToClassName, actionToKebabCase } from "../src/utils/index";

describe("Utils Functions", () => {
  describe("actionToClassName", () => {
    it("should convert consumer and action to PascalCase", () => {
      const result = actionToClassName("my_consumer", "my-action");
      expect(result).toBe("MyConsumerMyAction");
    });

    // ...other tests...
  });

  describe("actionToKebabCase", () => {
    it("should convert action to kebab-case", () => {
      const result = actionToKebabCase("myActionName");
      expect(result).toBe("my-action-name");
    });

    // ...other tests...
  });
});
