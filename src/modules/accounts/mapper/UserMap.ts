import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '@accounts/dtos/IUserResponseDTO';
import { User } from '@accounts/infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    driver_license,
    email,
    name,
    avatar,
    avatar_url,
    id,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      avatar_url,
      driver_license,
    });
    return user;
  }
}

export { UserMap };
