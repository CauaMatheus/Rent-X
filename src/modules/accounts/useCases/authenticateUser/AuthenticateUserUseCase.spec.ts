import { verify } from 'jsonwebtoken';

import { ICreateUserDTO } from '@accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@errors/AppError';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user:ICreateUserDTO = {
      name: 'User Test',
      email: 'user@test.com',
      password: '1234',
      driver_license: 'D',
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_license,
    });

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const result = verify(token, '4b28691d69f6698455001cedba8a7c91');

    expect(result).toHaveProperty('sub');
    expect(result).toHaveProperty('name');
  });

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@teste.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user:ICreateUserDTO = {
      name: 'User Test',
      email: 'user@test.com',
      password: '1234',
      driver_license: 'D',
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      driver_license: user.driver_license,
    });

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
