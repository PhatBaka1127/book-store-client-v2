export interface ResponseMessage<T> {
  message: string;
  result: boolean;
  value: T;
}

export interface ErrorResponse {
  code: string;
  message: string;
  result: boolean;
}

export interface DynamicResponseModel<T> {
  metaData: MetaData;
  results: T[];
}

export interface MetaData {
  page: number;
  size: number;
  total: number;
}