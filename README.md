
# Kiwee

![Kiwee Logo](https://raw.githubusercontent.com/viniciussantos45/kiwee/refs/heads/main/docs/KIWEE.png)

Kiwee is a TypeScript library for handling message serialization, validation, and dispatching between consumers and actions based on predefined schemas.

## Installation

```bash
npm install kiwee
```

## Usage

### Initialize Configuration

Create a `kiwee-config.json` file in your project root:

```bash
npx kiwee init
```

Customize the configuration file as needed.

### Generate Files

Generate the necessary handler files and types based on the configuration:

```bash
npx kiwee generator
```

### Publishing Messages

Use the `Publisher` class to prepare messages for publication:

```typescript
import { Publisher } from 'kiwee';

const message = Publisher.prepareMessageToPublish({
  consumer: 'ConsumerName',
  action: 'ActionName',
  payload: { /* your payload */ },
});

// Publish the message using your preferred messaging system
```

### Consuming Messages

Use the `ConsumerDispatcher` to dispatch incoming messages to the appropriate handlers:

```typescript
import { ConsumerDispatcher } from 'kiwee';

// On message received
ConsumerDispatcher.dispatchMessage(receivedMessage);
```

### Schema Registry

Access the schema registry to validate, serialize, or deserialize messages:

```typescript
import { schemaRegistry } from 'kiwee';

schemaRegistry.validate('ConsumerName', 'ActionName', payload);

const serializedMessage = schemaRegistry.serialize({
  consumer: 'ConsumerName',
  action: 'ActionName',
  payload,
});

const deserializedMessage = schemaRegistry.deserialize(serializedMessage);
```

## License

[MIT](LICENSE)
