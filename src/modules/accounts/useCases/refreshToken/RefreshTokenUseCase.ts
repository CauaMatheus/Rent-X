import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';
import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface ITokenPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;
    const { sub: user_id, email } = verify(token, auth.secret_refresh_token) as ITokenPayload;
    const user_token = await this.usersTokenRepository.findByUserIdAndToken(user_id, token);

    if (!user_token) {
      throw new AppError('Refresh token does not exist');
    }

    await this.usersTokenRepository.deleteById(user_token.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dateProvider.addDays(expires_in_refresh_token_days),
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}
export { RefreshTokenUseCase };
