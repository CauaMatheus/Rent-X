import { getRepository, Repository } from 'typeorm';

import { ICreateCarsDTO } from '@cars/dtos/ICreateCarsDTO';
import { ICarsRepository } from '@cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository:Repository<Car>

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    fine_amount,
    daily_rate,
    description,
    name,
    license_plate,
  }:ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      description,
      license_plate,
      fine_amount,
      daily_rate,
    });

    const createdCar = await this.repository.save(car);
    return createdCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(
    brand?:string,
    category_id?:string,
    name?:string,
  ): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('c')
      .where('c.available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }
    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }
}

export { CarsRepository };
