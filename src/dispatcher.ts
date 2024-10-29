import { schemaRegistry } from "./schema-registry";
import { actionToKebabCase } from "./utils";

class ConsumerDispatcher {
  static async dispatch({
    consumer,
    action,
    payload,
  }: {
    consumer: string;
    action: string;
    payload: unknown;
  }) {
    try {
      // Valida o schema da mensagem
      schemaRegistry.validate(consumer, action, payload);

      // Carrega o handler gerado
      const HandlerClass = require(`./generated/${consumer}/${actionToKebabCase(
        action
      )}`).default;
      const handler = new HandlerClass();

      // Executa a ação
      await handler.execute({ consumer, action, payload });
    } catch (error: any) {
      console.error(`Erro ao processar mensagem: ${error.message}`);
    }
  }
}

export default ConsumerDispatcher;
