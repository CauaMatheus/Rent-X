import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsUseCase } from './CreateCarsUseCase';

class CreateCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    } = request.body;

    const createCarsUseCase = container.resolve(CreateCarsUseCase);
    const car = await createCarsUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };
