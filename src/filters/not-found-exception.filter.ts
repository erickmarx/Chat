import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'NotFoundError') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      response.status(404).json({
        statusCode: 404,
        message: exception.message,
      });
    }
  }
}
