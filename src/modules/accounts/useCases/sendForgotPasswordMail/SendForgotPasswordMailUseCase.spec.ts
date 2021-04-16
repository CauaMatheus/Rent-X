import { UsersRepositoryInMemory } from '@accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/providers/MailProvider/in-memory/MailProviderInMemory';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send an email', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'User Name',
      email: 'email@example.com',
      password: 'password',
      driver_license: 'X',
    });
    await sendForgotPasswordMailUseCase.execute('email@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('email@example.com'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to create a new UserToken', async () => {
    const sendMail = spyOn(usersTokenRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'User Name',
      email: 'email@example.com',
      password: 'password',
      driver_license: 'X',
    });
    await sendForgotPasswordMailUseCase.execute('email@example.com');

    expect(sendMail).toHaveBeenCalled();
  });
});
