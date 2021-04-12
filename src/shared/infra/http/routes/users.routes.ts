import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '@accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '@accounts/useCases/userProfile/UserProfileController';
import uploadConfig from '@config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/profile',
  ensureAuthenticated,
  userProfileController.handle);

usersRouter.patch('/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle);

export { usersRouter };
