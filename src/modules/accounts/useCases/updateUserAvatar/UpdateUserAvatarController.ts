import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;
    const fileType = request.file.mimetype;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({ id, avatar_file, fileType });

    return response.status(204).send();
  }
}
