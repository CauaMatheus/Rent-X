import { Router } from 'express';

import { CreateCarsController } from '@cars/useCases/createCars/CreateCarsController';
import { CreateCarSpecificationController } from '@cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsUseCaseController } from '@cars/useCases/listAvailableCars/ListAvailableCarsUseCaseController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsUseCaseController = new ListAvailableCarsUseCaseController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle);

carsRoutes.post('/specifications/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle);

carsRoutes.get('/available', listAvailableCarsUseCaseController.handle);

export { carsRoutes };
