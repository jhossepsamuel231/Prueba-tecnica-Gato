import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (Array.isArray((responseBody as any).message)) {
        // class-validator: mensajes de validación múltiples
        message = (responseBody as any).message.join(', ');
      } else {
        message =
          (responseBody as any).message ||
          (responseBody as any).error ||
          message;
      }
    } else if (exception instanceof Error) {
      const pgError = exception as any;

      // PostgreSQL/TypeORM errors
      if (pgError.code === '22P02') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Valor inválido en el tipo de dato (ej. enum incorrecto)';
      } else if (pgError.code === '23505') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Ya existe un registro con esos datos únicos';
      } else if (pgError.code === '23503') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Referencia inválida a otra entidad (clave foránea)';
      } else {
        message = pgError.message;
      }
    }

    response.status(status).json({
      status: 'error',
      code: status,
      message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
