import { CategoriesRepositoriesInMemory } from '@cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCases';

describe('Create Category', () => {
  let categoryRepositoryInMemory: CategoriesRepositoriesInMemory;
  let createUseCase: CreateCategoryUseCase;
  beforeAll(() => {
    categoryRepositoryInMemory = new CategoriesRepositoriesInMemory();
    createUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Description Test',
    };

    await createUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const createdCategory = await categoryRepositoryInMemory.findByName(category.name);

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory).toHaveProperty('created_at');
  });

  it('should not be able to create a category that already exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Description Test',
      };

      await createUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
