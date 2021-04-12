import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to refresh token', async () => {
    await request(app).post('/users').send({
      name: 'User Name',
      email: 'email@example.com',
      password: 'password',
      driver_license: 'X',
    });

    const authResponse = await request(app).post('/sessions').send({
      email: 'email@example.com',
      password: 'password',
    });
    expect(authResponse.body).toHaveProperty('refresh_token');

    const refreshTokenResponse = await request(app).post('/refresh-token').send({
      token: authResponse.body.refresh_token,
    });

    expect(refreshTokenResponse.status).toBe(200);
    expect(refreshTokenResponse.body).not.toBeNull();
  });
});
