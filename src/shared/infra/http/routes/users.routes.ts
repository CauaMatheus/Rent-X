import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '@accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/', createUserController.handle);

usersRouter.patch('/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle);

export { usersRouter };
