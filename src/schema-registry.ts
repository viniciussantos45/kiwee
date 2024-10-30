import Ajv, { JSONSchemaType } from "ajv";
import { readFileSync } from "fs";

const ajv = new Ajv();

interface Config {
  consumers: {
    [consumer: string]: {
      actions: {
        [action: string]: {
          schema: JSONSchemaType<any>;
        };
      };
    };
  };
}

class SchemaRegistry {
  private schemas: Record<string, Record<string, JSONSchemaType<any>>> = {};

  constructor(configPath: string) {
    const config: Config = JSON.parse(readFileSync(configPath, "utf-8"));
    this.loadSchemas(config);
  }

  private loadSchemas(config: Config) {
    for (const consumer in config.consumers) {
      this.schemas[consumer] = {};
      for (const action in config.consumers[consumer].actions) {
        const schema = config.consumers[consumer].actions[action].schema;
        this.schemas[consumer][action] = schema;
      }
    }
  }

  validate(consumer: string, action: string, payload: any) {
    const schema = this.schemas[consumer]?.[action];
    if (!schema) {
      throw new Error(
        `Schema não registrado para ação ${action} do consumidor ${consumer}`
      );
    }

    const validate = ajv.compile(schema);
    if (!validate(payload)) {
      throw new Error(`Payload inválido: ${ajv.errorsText(validate.errors)}`);
    }
  }
}

// Exemplo de inicialização
export const schemaRegistry = new SchemaRegistry("./config.json");

export default SchemaRegistry;
