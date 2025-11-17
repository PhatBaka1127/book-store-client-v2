export interface ResponseMessage<T> {
  message?: string;
  result?: boolean;
  value?: T;
}