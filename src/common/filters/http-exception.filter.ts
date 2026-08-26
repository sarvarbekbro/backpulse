
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
const exceptionResponse = exception.getResponse()

let message: string | string[]
if(typeof exceptionResponse === 'string'){
  message = exceptionResponse
} else {
  message = (exceptionResponse as {message: string | string []}).message
}
    response
      .status(status)
      .json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
