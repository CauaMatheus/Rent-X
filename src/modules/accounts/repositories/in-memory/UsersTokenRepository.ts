import { ICreateUsersTokenDTO } from '@accounts/dtos/IUserCreateDTO';
import { UsersToken } from '@accounts/infra/typeorm/entities/UsersToken';

class UsersTokenRepositoryInMemory {
  private repository: UsersToken[] = []

  async create(data: ICreateUsersTokenDTO): Promise<UsersToken> {
    const token = new UsersToken();
    Object.assign(token, data);
    return token;
  }

  async findByUserIdAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersToken> {
    const token = this.repository.find((token) => token.user_id === user_id
      && token.refresh_token === refresh_token);
    return token;
  }

  async deleteById(id: string): Promise<void> {
    const tokenIndex = this.repository.findIndex((token) => token.id === id);
    this.repository.splice(tokenIndex);
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersToken> {
    const token = this.repository.find((token) => token.refresh_token === refresh_token);
    return token;
  }
}
export { UsersTokenRepositoryInMemory };
