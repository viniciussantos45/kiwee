export type Consumers = 'serviceA' | 'serviceB'

export type Actions = {
  serviceA: 'action1.monit' | 'action2',
serviceB: 'action3'
};

// Estrutura básica de uma mensagem
export type Message<T extends Consumers> = {
  consumer: T;
  action: Actions[T];
  payload: any;
};
