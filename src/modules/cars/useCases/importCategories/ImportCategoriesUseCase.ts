import csvParse from 'csv-parse';
import fs from 'fs';

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategories{
  name: string,
  description: string
}

class ImportCategoriesUseCase {
  constructor(private categoriesRpository: CategoriesRepository) {}

  loadCategories(file:Express.Multer.File):Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const fileParser = csvParse();
      const categories:IImportCategories[] = [];

      const stream = fs.createReadStream(file.path);
      stream.pipe(fileParser);

      fileParser
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => resolve(categories))
        .on('error', (err) => reject(err));
    });
  }

  async execute(file:Express.Multer.File):Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach((category) => {
      const { name } = category;
      const alreadyExists = this.categoriesRpository.findByName(name);

      if (!alreadyExists) {
        this.categoriesRpository.create(category);
      }
    });
  }
}
export { ImportCategoriesUseCase };
