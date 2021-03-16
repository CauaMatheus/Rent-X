import { Request, Response } from 'express';

import { ListSpecificationUseCases } from './ListSpecificationUseCases';

class ListSpecificationController {
  constructor(private listSpecificationUseCases:ListSpecificationUseCases) {}

  handle(request:Request, response:Response):Response {
    const list = this.listSpecificationUseCases.execute();
    return response.json(list);
  }
}
export { ListSpecificationController };
