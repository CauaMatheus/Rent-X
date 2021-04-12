import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@accounts/dtos/IUserResponseDTO';
import { UserMap } from '@accounts/mapper/UserMap';
import { IUsersRepository } from '@accounts/repositories/IUsersRepository';

@injectable()
class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
