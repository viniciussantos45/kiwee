import ejs from "ejs";
import fs from "fs";
import path from "path";
import { actionToClassName, actionToKebabCase } from "./utils";

export class Generator {
  config: Record<string, any>;
  settings: Record<string, string>;
  outputDir: string;

  constructor(configPath: string) {
    const configContent = fs.readFileSync(configPath, "utf-8");
    this.config = JSON.parse(configContent);
    this.settings = this.config.settings || {};
    this.outputDir = path.join(
      process.cwd(),
      this.settings.baseDir,
      this.settings.handlersDir ?? "generated"
    );
  }

  generateFiles() {
    for (const consumer in this.config.consumers) {
      for (const action in this.config.consumers[consumer].actions) {
        const schema = this.config.consumers[consumer].actions[action].schema;

        const typeDefinitions = this.generateTypes(
          actionToClassName(consumer, action),
          schema
        );

        this.generateHandlerFile(consumer, action, typeDefinitions);
      }
    }

    this.generateMessageType(this.config.consumers);
  }

  generateMessageType(config: {
    [consumer: string]: {
      actions: string[];
    }[];
  }) {
    console.log(config);
    const consumers = Object.keys(config);
    const actions = Object.values(config).map((consumerValue, index) => {
      const consumer = Object.keys(config)[index];
      const [actions] = Object.values(consumerValue).map((action) =>
        Object.keys(action)
      );

      return {
        consumer,
        actions,
      };
    });

    const outputDir = path.join(this.outputDir, "types");

    fs.mkdirSync(outputDir, { recursive: true });

    const templateContent = fs.readFileSync(
      path.join(__dirname, "templates", "message-type-template.ejs"),
      "utf-8"
    );

    console.log(consumers, actions);
    const messageTypeContent = ejs.render(templateContent, {
      consumers,
      actions,
    });

    const outputPath = path.join(outputDir, `index.ts`);

    fs.writeFileSync(outputPath, `${messageTypeContent}`);
  }

  generateTypes(action: string, schema: any) {
    const properties = schema.properties || {};
    let typeDef = `export type ${action}Payload = {\n`;
    for (const key in properties) {
      typeDef += `  ${key}: ${properties[key].type};\n`;
    }
    typeDef += "};\n";
    return typeDef;
  }

  async generateHandlerFile(
    consumer: string,
    action: string,
    typeDefinitions: string
  ) {
    const actionClass = actionToClassName(consumer, action);
    const outputDir = path.join(this.outputDir, consumer);
    const kebabCaseAction = actionToKebabCase(action);
    const outputPath = path.join(outputDir, `${kebabCaseAction}.ts`);

    fs.mkdirSync(outputDir, { recursive: true });

    const templateContent = fs.readFileSync(
      path.join(__dirname, "templates", "handler-template.ejs"),
      "utf-8"
    );
    const handlerContent = ejs.render(templateContent, {
      consumer,
      action,
      actionClass,
    });

    fs.writeFileSync(outputPath, `${typeDefinitions}\n${handlerContent}`);
  }
}
