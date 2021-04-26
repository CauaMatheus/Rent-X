import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@errors/AppError';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import swaggerFile from '../../../swagger.json';
import createConnection from '../typeorm';
import '@shared/container';
import rateLimiter, { redisClient } from './middlewares/rateLimiter';
import { router } from './routes';

createConnection();

const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(rateLimiter);
} else {
  redisClient.quit();
}

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tempFolder}/avatar`));
app.use('/cars', express.static(`${upload.tempFolder}/cars`));

app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => { // eslint-disable-line
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
