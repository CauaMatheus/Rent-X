import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@errors/AppError';

const redisClient = redis.createClient({
  host: process.env.NODE_ENV === 'dev'
    ? 'redis' : process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  enable_offline_queue: false,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rentx',
  points: 10,
  duration: 15,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  nextFunction: NextFunction,
): Promise<void | NextFunction> {
  try {
    await limiter.consume(request.ip);
    nextFunction();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}

export { redisClient };
