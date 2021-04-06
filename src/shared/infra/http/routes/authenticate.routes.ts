import { Router } from 'express';

import { AuthenticateUserController } from '@accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/sessions', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export { authenticateRouter };
