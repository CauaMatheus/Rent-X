import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';
import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  token: string
  user: {
    id: string,
    name: string,
  }
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({ name: user.name }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(expires_in_refresh_token_days),
    });

    const tokenReturn = {
      token,
      user: {
        id: user.id,
        name: user.name,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}
