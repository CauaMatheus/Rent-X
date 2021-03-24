import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', (request, response) => {
  listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoriesController().handle(request, response);
});

export { categoriesRoutes };
