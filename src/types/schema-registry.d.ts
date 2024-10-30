import { JSONSchemaType } from "ajv";

export interface Config {
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

export declare class SchemaRegistry {
  private schemas: Record<string, Record<string, JSONSchemaType<any>>>;

  constructor(configPath: string);

  private loadSchemas(config: Config): void;

  validate(consumer: string, action: string, payload: any): void;
}

export const schemaRegistry: SchemaRegistry;
