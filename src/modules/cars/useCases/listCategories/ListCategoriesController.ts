import { Request, Response } from 'express';

import { ListCategoriesUseCases } from './ListCategoriesUseCases';

class ListCategoriesController {
  constructor(private listCategoryUseCases:ListCategoriesUseCases) {}

  async handle(request:Request, response:Response):Promise<Response> {
    const list = await this.listCategoryUseCases.execute();
    return response.json(list);
  }
}
export { ListCategoriesController };
