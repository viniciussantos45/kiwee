import Ajv, { JSONSchemaType } from "ajv";
import { readFileSync } from "fs";

const ajv = new Ajv();

class SchemaRegistry {
  private schemas: Record<string, Record<string, JSONSchemaType<any>>> = {};

  constructor(configPath: string) {
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    this.loadSchemas(config);
  }

  private loadSchemas(config: Record<string, any>) {
    for (const consumer in config) {
      this.schemas[consumer] = {};
      for (const action in config[consumer].actions) {
        const schema = config[consumer].actions[action].schema;
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
