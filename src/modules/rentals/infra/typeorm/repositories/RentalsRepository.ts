import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '@rentals/dtos/ICreateRentalsDTO';
import { IRentalsRepository } from '@rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository:Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    updated_at,
  }:ICreateRentalsDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      end_date,
      expected_return_date,
      updated_at,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCarId(car_id:string):Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id:string):Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rental;
  }
}
export { RentalsRepository };
