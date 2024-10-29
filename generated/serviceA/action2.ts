export type serviceAAction2Payload = {
  productId: string;
  quantity: number;
};

import { Message } from '../types';
import { validateOrReject } from 'class-validator';

export default class serviceAAction2 {
  async execute(message: Message<'serviceA'>) {
    
    await validateOrReject(message.payload);

    // add your business logic here
    
    console.log(`Processando ação ${'action2'} para ${'serviceA'}:`, message.payload);
    
  }
}
