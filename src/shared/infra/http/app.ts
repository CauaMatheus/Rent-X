import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@errors/AppError';

import swaggerFile from '../../../swagger.json';
import createConnection from '../typeorm';
import '@shared/container';
import { router } from './routes';

const app = express();
createConnection();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => { // eslint-disable-line
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
