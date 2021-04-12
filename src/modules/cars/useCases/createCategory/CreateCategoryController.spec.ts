import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 12);
    await connection.query(
      `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
      values('${id}', 'admin', '${password}', 'admin@rentx.com', 'D', true, 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseAuth = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseAuth.body;

    const response = await request(app).post('/categories').send({
      name: 'Category Name SuperTest',
      description: 'Category Description SuperTest',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category when the user is not admin', async () => {
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

    const response = await request(app).post('/categories').send({
      name: 'Category Name SuperTest',
      description: 'Category Description SuperTest',
    }).set({
      Authorization: `Bearer ${authResponse.body.token}`,
    });

    expect(response.status).toBe(400);
  });
});
