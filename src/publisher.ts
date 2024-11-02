import { schemaRegistry } from "./schema-registry";

export class Publisher {
  static prepareMessageToPublish<
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
  }): string {
    try {
      schemaRegistry.validate(consumer, action, payload);

      const message = schemaRegistry.serialize({ consumer, action, payload });

      return message;
    } catch (error: any) {
      console.error(
        `Error preparing message for publication: ${error.message}`
      );
      throw error;
    }
  }
}
