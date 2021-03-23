import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCases } from './ListCategoriesUseCases';

export default ():ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const listCategoryUseCases = new ListCategoriesUseCases(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(listCategoryUseCases);
  return listCategoriesController;
};
