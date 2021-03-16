import { ICategoryRepository, ICreateCategoryDTO } from './ICategoriesRepository';

class PostgressCategoryRepository implements ICategoryRepository {
  findByName(name:string) {
    return null;
  }
  list() {
    return null;
  }
  create({ name, description }:ICreateCategoryDTO) {
    console.log(name, description);
  }
}

export { PostgressCategoryRepository };
