import { ICreateCarsDTO } from '@cars/dtos/ICreateCarsDTO';
import { Car } from '@cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private repository: Car[] = []

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand,
  }:ICreateCarsDTO):Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
    });

    this.repository.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
