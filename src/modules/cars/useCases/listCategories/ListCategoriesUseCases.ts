import { inject, injectable } from 'tsyringe';

import { Category } from '@cars/entities/Category';
import { CategoriesRepository } from '@cars/repositories/implementations/CategoriesRepository';

@injectable()
class ListCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository:CategoriesRepository,
  ) {}

  async execute():Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
export { ListCategoriesUseCases };
