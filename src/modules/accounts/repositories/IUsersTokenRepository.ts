import { ICreateUsersTokenDTO } from '@accounts/dtos/IUserCreateDTO';
import { UsersToken } from '@accounts/infra/typeorm/entities/UsersToken';

interface IUsersTokenRepository {
  create(data: ICreateUsersTokenDTO): Promise<UsersToken>
  findByUserIdAndToken(user_id: string, refresh_token: string): Promise<UsersToken>
  deleteById(id: string): Promise<void>
}
export { IUsersTokenRepository };
