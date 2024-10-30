export interface Config {
  consumers: {
    [consumer: string]: {
      actions: {
        [action: string]: {
          schema: any;
        };
      };
    };
  };
}

export declare class Generator {
  config: Config;

  constructor(configPath: string);

  generateFiles(): void;

  generateMessageType(config: {
    [consumer: string]: {
      actions: string[];
    }[];
  }): void;

  generateTypes(action: string, schema: any): string;

  generateHandlerFile(
    consumer: string,
    action: string,
    typeDefinitions: string
  ): Promise<void>;
}
