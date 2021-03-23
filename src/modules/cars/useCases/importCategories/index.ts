import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

export default (): ImportCategoriesController => {
  const categoriesRpository = new CategoriesRepository();
  const importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRpository);
  const importCategoriesController = new ImportCategoriesController(importCategoriesUseCase);
  return importCategoriesController;
};
