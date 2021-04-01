import { Router } from 'express';
import multer from 'multer';

import { CreateCarsController } from '@cars/useCases/createCars/CreateCarsController';
import { CreateCarSpecificationController } from '@cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { DeleteCarImagesController } from '@cars/useCases/deleteCarImages/DeleteCarImagesController';
import { ListAvailableCarsUseCaseController } from '@cars/useCases/listAvailableCars/ListAvailableCarsUseCaseController';
import { UploadCarImagesController } from '@cars/useCases/uploadCarImages/UploadCarImagesController';
import uploadConfig from '@config/upload';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();
const uploadImages = multer(uploadConfig.upload('./temp/cars'));

const createCarsController = new CreateCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const listAvailableCarsUseCaseController = new ListAvailableCarsUseCaseController();
const deleteCarImagesController = new DeleteCarImagesController();

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle);

carsRoutes.post('/specifications/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle);

carsRoutes.post('/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle);

carsRoutes.delete('/images/:image_id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCarImagesController.handle);

carsRoutes.get('/available', listAvailableCarsUseCaseController.handle);

export { carsRoutes };
