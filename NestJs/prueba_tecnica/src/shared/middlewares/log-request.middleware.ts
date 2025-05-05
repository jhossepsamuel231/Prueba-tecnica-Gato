import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();

    console.log(
      `[Middleware] ${method} ${url} | UA: ${userAgent} | Time: ${timestamp}`,
    );
    next();
  }
}
