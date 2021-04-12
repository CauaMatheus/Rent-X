import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';

interface ITokenPayload {
  name: string
  iat: number
  exp: number
  sub: string
}

export async function ensureAuthenticated(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const { secret_token } = auth;
  const { authorization } = request.headers;
  if (!authorization) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(token, secret_token) as ITokenPayload;

    request.user = { id: user_id };

    return next();
  } catch (err) {
    throw new AppError('Invalid Token', 401);
  }
}
