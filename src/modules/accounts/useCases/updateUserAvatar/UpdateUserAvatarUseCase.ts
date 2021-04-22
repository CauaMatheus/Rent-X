import { promises } from 'fs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

import upload from '../../../../config/upload';

interface IRequest {
  id: string
  avatar_file: string
  fileType: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

  ) { }
  async execute({ id, avatar_file, fileType }: IRequest): Promise<void> {
    const typeRegex = /image/.test(fileType);
    if (!typeRegex) {
      try {
        await promises.stat(`${upload.tempFolder}/${avatar_file}`);
      } catch {
        return;
      }
      await promises.unlink(`${upload.tempFolder}/${avatar_file}`);
      throw new AppError('File type not accepted', 400);
    }
    const user = await this.usersRepository.findById(id);
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }
    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
