import fs from 'fs';

import { CategoriesRepositoriesInMemory } from '@cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

let file: Express.Multer.File;
let importCategoriesUseCase: ImportCategoriesUseCase;
let categoriesRepository: CategoriesRepositoriesInMemory;

describe('Import Categories', () => {
  beforeAll(() => {
    file = {
      fieldname: 'file',
      originalname: '1615818549022-attachment.csv',
      encoding: '7bit',
      mimetype: 'text/csv',
      destination: './temp',
      filename: 'csvFileTest',
      path: './temp/csvFileTest',
      size: 78,
    } as Express.Multer.File;
  });

  beforeEach(() => {
    fs.writeFileSync(file.path, 'SUV,Utilitário esportivo\nSedan,Automóvel de três volumes\nHatch,Carro curto\n');

    categoriesRepository = new CategoriesRepositoriesInMemory();
    importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRepository);
  });

  it('should be able to import categories from a csv multer file', async () => {
    await importCategoriesUseCase.execute(file);
    const categories = await categoriesRepository.list();

    expect(categories.length).toBe(3);
  });

  it('should not be able to import same categories from a csv multer file', async () => {
    await importCategoriesUseCase.execute(file);
    fs.writeFileSync(file.path, 'SUV,Utilitário esportivo\nSedan,Automóvel de três volumes\nHatch,Carro curto\n');
    await importCategoriesUseCase.execute(file);
    const categories = await categoriesRepository.list();

    expect(categories.length).toBe(3);
  });
});
