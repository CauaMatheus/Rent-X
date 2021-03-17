import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

const categoriesRpository = CategoriesRepository.getInstance();
const importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRpository);
const importCategoriesController = new ImportCategoriesController(importCategoriesUseCase);
export { importCategoriesController };
