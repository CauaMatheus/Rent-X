import { Router } from 'express';

import { CreateRentalController } from '@rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserIdController } from '@rentals/useCases/listRentalsByUserId/ListRentalsByUserIdController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserIdController = new ListRentalsByUserIdController();

rentalRoutes.post('/',
  ensureAuthenticated,
  createRentalController.handle);

rentalRoutes.get('/user',
  ensureAuthenticated,
  listRentalsByUserIdController.handle);

rentalRoutes.post('/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle);

export { rentalRoutes };
