export type serviceBAction3Payload = {
  paymentId: string;
  amount: number;
};

import { Message } from '../types';
import { validateOrReject } from 'class-validator';

export default class serviceBAction3 {
  async execute(message: Message<'serviceB'>) {
    
    await validateOrReject(message.payload);

    // add your business logic here
    
    console.log(`Processando ação ${'action3'} para ${'serviceB'}:`, message.payload);
    
  }
}
