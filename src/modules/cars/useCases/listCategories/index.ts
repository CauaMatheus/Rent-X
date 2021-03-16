import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCases } from './ListCategoriesUseCases';

const categoriesRepository = new CategoriesRepository();
const listCategoryUseCases = new ListCategoriesUseCases(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoryUseCases);

export { listCategoriesController };
