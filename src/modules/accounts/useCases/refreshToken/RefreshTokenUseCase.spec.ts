import { sign } from 'jsonwebtoken';

import { UsersRepositoryInMemory } from '@accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let usersTokenRepository: UsersTokenRepositoryInMemory;
let usersRepository: UsersRepositoryInMemory;
let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersTokenRepository = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepository = new UsersRepositoryInMemory();
    refreshTokenUseCase = new RefreshTokenUseCase(usersTokenRepository, dateProvider);
  });

  it('should be able to refresh token', async () => {
    const { secret_refresh_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;
    const user = await usersRepository.create({
      name: 'User Name',
      email: 'email@example.com',
      driver_license: 'X',
      password: 'password',
    });

    const refresh_token = sign({ email: user.email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: dateProvider.addDays(expires_in_refresh_token_days),
    });

    const newRefreshedToken = await refreshTokenUseCase.execute(refresh_token);
    expect(newRefreshedToken).not.toBeNull();
  });

  it('should not be able to refresh token if token does not exist', async () => {
    const { secret_refresh_token, expires_in_refresh_token } = auth;
    const user = await usersRepository.create({
      name: 'User Name',
      email: 'email@example.com',
      driver_license: 'X',
      password: 'password',
    });

    const refresh_token = sign({ email: user.email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await expect(
      refreshTokenUseCase.execute(refresh_token),
    ).rejects.toEqual(new AppError('Refresh token does not exist'));
  });
});
