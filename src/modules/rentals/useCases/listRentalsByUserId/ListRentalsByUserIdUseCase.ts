import { inject, injectable } from 'tsyringe';

import { Rental } from '@rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@rentals/repositories/IRentalsRepository';

interface IRequest {
  user_id: string
}

@injectable()
class ListRentalsByUserIdUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) { }

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);
    return rentals;
  }
}
export { ListRentalsByUserIdUseCase };
