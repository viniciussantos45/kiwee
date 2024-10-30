export interface DispatchParams {
  consumer: string;
  action: string;
  payload: unknown;
}

export declare class ConsumerDispatcher {
  static dispatch({ consumer, action, payload }: DispatchParams): Promise<void>;
}
