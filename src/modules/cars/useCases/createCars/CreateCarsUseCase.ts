// import { inject, injectable } from 'tsyringe';

import { ICreateCarsDTO } from '@cars/dtos/ICreateCarsDTO';
import { Car } from '@cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@cars/repositories/ICarsRepository';
import { AppError } from '@errors/AppError';

// @injectable()
class CreateCarsUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository:ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }:ICreateCarsDTO): Promise<Car> {
    const CarAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate);
    if (CarAlreadyExist) {
      throw new AppError('Car already exists');
    }

    const createdUser = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return createdUser;
  }
}
export { CreateCarsUseCase };
