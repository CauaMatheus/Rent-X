import { ICategoryRepository, ICreateCategoryDTO } from '../../repositories/ICategoriesRepository';

class CreateCategoryUseCase {
  constructor(private categoriesRepository:ICategoryRepository) { }

  execute({ name, description }:ICreateCategoryDTO):void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }
    this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };
