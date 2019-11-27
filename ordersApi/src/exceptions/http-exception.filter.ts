import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const fieldValidation =
        exception instanceof BadRequestException
        ? exception.getResponse():null;

    response.status(status).json({
    //   statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: fieldValidation,
      message:exception.message
    });
  }
}