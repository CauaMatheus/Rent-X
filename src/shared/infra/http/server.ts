import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import '../typeorm';
import '../../container';
import { AppError } from '@errors/AppError';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  (err:Error, request:Request, response:Response, next:NextFunction) => { // eslint-disable-line
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

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
