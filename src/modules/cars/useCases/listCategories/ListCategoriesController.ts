import { Request, Response } from 'express';

import { ListCategoriesUseCases } from './ListCategoriesUseCases';

class ListCategoriesController {
  constructor(private listCategoryUseCases:ListCategoriesUseCases) {}

  handle(request:Request, response:Response):Response {
    const list = this.listCategoryUseCases.execute();
    return response.json(list);
  }
}
export { ListCategoriesController };
