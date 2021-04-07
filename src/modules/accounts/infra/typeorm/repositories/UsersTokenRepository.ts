import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokenDTO } from '@accounts/dtos/IUserCreateDTO';
import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';

import { UsersToken } from '../entities/UsersToken';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>

  constructor() {
    this.repository = getRepository(UsersToken);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    const token = await this.repository.findOne({ user_id, refresh_token });
    return token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findByRefreshToken(token: string): Promise<UsersToken> {
    const userToken = await this.repository.findOne({ refresh_token: token });
    return userToken;
  }
}

export { UsersTokenRepository };
