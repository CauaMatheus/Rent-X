import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserIdUseCase } from './ListRentalsByUserIdUseCase';

class ListRentalsByUserIdController {
  async handle(request:Request, response:Response):Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsByUserIdUseCase = container.resolve(ListRentalsByUserIdUseCase);
    const rentals = await listRentalsByUserIdUseCase.execute({ user_id });

    return response.json(rentals);
  }
}
export { ListRentalsByUserIdController };
