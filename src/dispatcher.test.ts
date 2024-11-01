import path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { ConsumerDispatcher } from "./dispatcher";

describe("ConsumerDispatcher", () => {
  let handlerExecuteMock: jest.Mock;

  beforeAll(() => {
    handlerExecuteMock = vi.fn();
    const handlerPath = path.join(
      process.cwd(),
      "test-output",
      "handlers",
      "testConsumer",
      "test-action.ts"
    );
    vi.mock(handlerPath, () => ({
      default: class {
        execute = handlerExecuteMock;
      },
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should dispatch message and call handler execute", async () => {
    const message = JSON.stringify({
      consumer: "testConsumer",
      action: "testAction",
      payload: { field: "value" },
    });

    await ConsumerDispatcher.dispatchMessage(message);
    expect(handlerExecuteMock).toHaveBeenCalledOnce();
  });

  it("should throw error for invalid message", async () => {
    const invalidMessage = "Invalid message";

    await expect(
      ConsumerDispatcher.dispatchMessage(invalidMessage)
    ).rejects.toThrow(/Unexpected token/);
  });

  // ...other tests...
});
