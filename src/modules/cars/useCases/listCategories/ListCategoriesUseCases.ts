import { inject, injectable } from 'tsyringe';

import { Category } from '@cars/infra/typeorm/entities/Category';
import { CategoriesRepository } from '@cars/infra/typeorm/repositories/CategoriesRepository';

@injectable()
class ListCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
export { ListCategoriesUseCases };
