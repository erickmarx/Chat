import { BaseResponse } from '../@types/helpers/response-factory';

export const responseFactory = <T>(
  data: T,
  code: string,
  message: string,
  type: string,
) => {
  return {
    type,
    code,
    data,
    message,
  } as BaseResponse<T>;
};
