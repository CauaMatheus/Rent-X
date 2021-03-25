import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
      private usersRepository:IUsersRepository,
  ) { }

  async execute({
    name, password, email, driver_license,
  }:ICreateUserDTO):Promise<void> {
    const userAlreadyExists = this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('User already Exists');
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