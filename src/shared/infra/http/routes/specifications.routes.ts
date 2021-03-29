import { Router } from 'express';

import { CreateSpecificationController } from '@cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@cars/useCases/listSpecification/ListSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.get('/', listSpecificationController.handle);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
