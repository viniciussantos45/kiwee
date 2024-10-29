export type serviceAAction1MonitPayload = {
  orderId: string;
  customerId: string;
};

import { Message } from '../types';
import { validateOrReject } from 'class-validator';

export default class serviceAAction1Monit {
  async execute(message: Message<'serviceA'>) {
    
    await validateOrReject(message.payload);

    // add your business logic here
    
    console.log(`Processando ação ${'action1.monit'} para ${'serviceA'}:`, message.payload);
    
  }
}
