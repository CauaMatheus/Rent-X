import { Request, Response } from 'express';

import { CreateSpecificationUseCases } from './CreateSpecificationUseCases';

class CreateSpecificationController {
  constructor(private specificationUseCases:CreateSpecificationUseCases) {}

  handle(request:Request, response:Response):Response {
    const { name, description } = request.body;
    this.specificationUseCases.execute({ name, description });

    return response.status(201).send();
  }
}
export { CreateSpecificationController };
