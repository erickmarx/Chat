export type BaseResponse<T> = {
  type: TypeBaseResponse;
  data: T;
  message: string;
  code: string;
};

export enum TypeBaseResponse {
  success = 'success',
  error = 'error',
}
