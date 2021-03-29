import { Category } from '@cars/entities/Category';

import { ICategoryRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepositoriesInMemory implements ICategoryRepository {
  private categories:Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });
    this.categories.push(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
}

export { CategoriesRepositoriesInMemory };
