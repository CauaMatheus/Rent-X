import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('password', 12);
    await connection.query(
      `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
      values('${id}', 'User Name Example', '${password}', 'email@example.com', 'X', true, 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate an user', async () => {
    const authResponse = await request(app)
      .post('/sessions').send({
        email: 'email@example.com',
        password: 'password',
      });
    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty('token');
    expect(authResponse.body).toHaveProperty('user');
    expect(authResponse.body).toHaveProperty('refresh_token');
  });

  it('should not be able to authenticate an user if password does not match', async () => {
    const authResponse = await request(app)
      .post('/sessions').send({
        email: 'email@example.com',
        password: 'incorrectpassword',
      });
    expect(authResponse.status).toBe(400);
    expect(authResponse.body.message).toBe('Email or password incorrect');
  });
});
