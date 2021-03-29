import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '@cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoriesController.handle);

export { categoriesRoutes };
