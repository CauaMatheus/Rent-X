import { UsersRepositoryInMemory } from '@accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
    );
  });
  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@test.com',
      password: '1234',
      driver_license: 'D',
    });

    const authResponse = await authenticateUserUseCase.execute({
      email: 'user@test.com',
      password: '1234',
    });

    expect(authResponse).toHaveProperty('token');
    expect(authResponse).toHaveProperty('refresh_token');
    expect(authResponse).toHaveProperty('user');
    expect(authResponse.user).toHaveProperty('id');
    expect(authResponse.user).toHaveProperty('name');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user@teste.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@test.com',
      password: '1234',
      driver_license: 'D',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: '12345',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
