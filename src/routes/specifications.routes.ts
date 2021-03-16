import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationController } from '../modules/cars/useCases/listSpecification';

const specificationsRoutes = Router();

specificationsRoutes.get('/', (request, response) => {
  listSpecificationController.handle(request, response);
});

specificationsRoutes.post('/', (request, response) => {
  createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
