import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';
import { AppError } from '@errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);
    const isBefore = this.dateProvider.CompareIfBefore(
      this.dateProvider.dateNow(),
      userToken.expires_date,
    );
    if (!userToken || !isBefore) {
      throw new AppError('Invalid Token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = await hash(password, 12);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}
export { ResetPasswordUserUseCase };
