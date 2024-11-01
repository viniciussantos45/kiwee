import path from "node:path";
import { schemaRegistry } from "./schema-registry";
import { actionToKebabCase } from "./utils";

const config = JSON.parse(
  require("fs").readFileSync(
    path.join(process.cwd(), "kiwee-config.json"),
    "utf-8"
  )
);

const handlersPath = path.join(
  process.cwd(),
  config.settings.baseDir,
  config.settings.handlersDir ?? "generated"
);

export class ConsumerDispatcher {
  static async dispatchMessage<
    TConsumer extends string,
    TAction extends string,
    TPayload
  >(message: string) {
    const { consumer, action, payload } = schemaRegistry.deserialize(
      message
    ) as {
      consumer: TConsumer;
      action: TAction;
      payload: TPayload;
    };
    await this.dispatch({ consumer, action, payload });
  }

  private static async dispatch<
    TConsumer extends string,
    TAction extends string,
    TPayload
  >({
    consumer,
    action,
    payload,
  }: {
    consumer: TConsumer;
    action: TAction;
    payload: TPayload;
  }) {
    try {
      schemaRegistry.validate(consumer, action, payload);

      const HandlerClass =
        require(`${handlersPath}/${consumer}/${actionToKebabCase(
          action
        )}`).default;
      const handler = new HandlerClass();

      await handler.execute({ consumer, action, payload });
    } catch (error: any) {
      console.error(`Erro ao processar mensagem: ${error.message}`);
    }
  }
}
