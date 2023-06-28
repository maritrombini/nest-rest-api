import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionHttpFilter implements ExceptionHttpFilter {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timeStamp: new Date().toISOString(),
              message: exception.message,
              path: request.path,
            },
          };

    this.httpAdapter.reply(response, body, status);
  }
}
