import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@cars/repositories/ICarsRepository';
import { AppError } from '@errors/AppError';
import { Rental } from '@rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const unavailableRentalCar = await this.rentalsRepository.findOpenRentalByCarId(car_id);
    if (unavailableRentalCar) {
      throw new AppError('This car is already being rented');
    }
    const unavaiableRentalUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);
    if (unavaiableRentalUser) {
      throw new AppError('This user is already renting a car');
    }

    const currentDate = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(currentDate, expected_return_date);
    if (compare < minimumHour) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({ car_id, user_id, expected_return_date });
    await this.carsRepository.updateAvailableById(car_id, false);
    return rental;
  }
}
export { CreateRentalUseCase };
