import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';
import { AppError } from '@errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = uuid();
    const viewPath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
    await this.mailProvider.sendMail({
      to: email,
      subject: 'Reset Password',
      variables: {
        name: user.name,
        link: `${process.env.FORGOT_MAIL_URL}${token}`,
      },
      path: viewPath,
    });

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addHours(3),
    });

    return token;
  }
}
export { SendForgotPasswordMailUseCase };
