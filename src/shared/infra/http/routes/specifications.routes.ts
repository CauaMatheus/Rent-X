import { Router } from 'express';

import { CreateSpecificationController } from '@cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@cars/useCases/listSpecification/ListSpecificationController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.get('/', listSpecificationController.handle);
specificationsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle);

export { specificationsRoutes };
