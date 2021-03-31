import { Router } from 'express';

import { CreateCarsController } from '@cars/useCases/createCars/CreateCarsController';
import { ListAvailableCarsUseCaseController } from '@cars/useCases/listAvailableCars/ListAvailableCarsUseCaseController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsUseCaseController = new ListAvailableCarsUseCaseController();

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle);

carsRoutes.get('/available', listAvailableCarsUseCaseController.handle);

export { carsRoutes };
