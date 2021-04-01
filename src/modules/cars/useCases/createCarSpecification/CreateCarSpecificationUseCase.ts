import { inject, injectable } from 'tsyringe';

import { Car } from '@cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@cars/repositories/ISpecificationsRepository';
import { AppError } from '@errors/AppError';

interface IRequest{
  specifications_id: string[]
  car_id: string
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ specifications_id, car_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);
    if (!car) {
      throw new AppError('Car not found', 404);
    }
    const specifications = await this.specificationsRepository.findByIds(specifications_id);
    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}
export { CreateCarSpecificationUseCase };
