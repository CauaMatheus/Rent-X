import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = hash('password', 12);
    await connection.query(`INSERT INTO users (id, name, email, password, driver_license)
    values ('${id}', 'NameExample', 'email@example.com', '${password}', 'X')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to refresh token', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'email@example.com',
      password: 'password',
    });
    expect(authResponse.body).toHaveProperty('refresh_token');

    const refreshTokenResponse = await request(app).post('/refresh-token').send({
      refresh_token: authResponse.body.refresh_token,
    });

    expect(refreshTokenResponse.status).toBe(200);
    expect(refreshTokenResponse.body).not.toBeNull();
  });
});
