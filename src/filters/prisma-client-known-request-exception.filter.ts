import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorExceptionFilter
  implements ExceptionFilter
{
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception.meta?.target) {
      response.status(400).json({
        statusCode: 400,
        message: PrismaExceptions[exception.code as 'P2002' | 'P2011'](
          exception.meta['target'] as string[][0],
        ),
      });
    }
  }
}
const PrismaExceptions = {
  P2002: (field: string) => `${field} already exists`,

  P2011: (field: string) => `Null constraint violation on the ${field}`,
};
