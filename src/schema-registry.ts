import Ajv, { JSONSchemaType } from "ajv";
import { readFileSync } from "fs";
import path from "path";

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

  validate<TConsumer extends string, TAction extends string, TPayload>(
    consumer: TConsumer,
    action: TAction,
    payload: TPayload
  ) {
    const schema = this.schemas[consumer]?.[action];
    if (!schema) {
      throw new Error(
        `Schema not registered for action ${action} of consumer ${consumer}`
      );
    }

    const validate = ajv.compile(schema);
    if (!validate(payload)) {
      throw new Error(`Invalid payload: ${ajv.errorsText(validate.errors)}`);
    }
  }

  deserialize<TConsumer extends string, TAction extends string, TPayload>(
    message: string
  ) {
    return JSON.parse(message) as {
      consumer: TConsumer;
      action: TAction;
      payload: TPayload;
    };
  }
}

export const schemaRegistry = new SchemaRegistry(
  path.join(process.cwd(), "kiwee-config.json")
);
