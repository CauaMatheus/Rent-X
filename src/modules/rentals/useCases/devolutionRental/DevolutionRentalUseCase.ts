import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@cars/repositories/ICarsRepository';
import { AppError } from '@errors/AppError';
import { Rental } from '@rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest{
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository:IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider:IDateProvider,

  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError('Rental not found', 404);
    }
    if (rental.user_id !== user_id) {
      throw new AppError('User is not the owner of rental');
    }

    const currentDate = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, currentDate);
    if (daily <= 0) {
      daily = minimumDaily;
    }

    let total = 0;

    const car = await this.carsRepository.findById(rental.car_id);
    const delay = this.dateProvider.compareInDays(rental.expected_return_date, currentDate);
    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += daily * car.daily_rate;

    rental.end_date = currentDate;
    rental.total = total;

    const endRental = await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailableById(rental.car_id, true);
    return endRental;
  }
}
export { DevolutionRentalUseCase };
