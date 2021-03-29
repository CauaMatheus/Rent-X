import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
      private usersRepository:IUsersRepository,
  ) { }

  async execute({
    name, password, email, driver_license,
  }:ICreateUserDTO):Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('User already Exists');
    }

    const hashedPassword = await hash(password, 12);
    await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });
  }
}
