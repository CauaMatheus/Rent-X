import { ICreateRentalsDTO } from '@rentals/dtos/ICreateRentalsDTO';
import { Rental } from '@rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private repository:Rental[] = []

  async create({
    car_id,
    end_date,
    expected_return_date,
    user_id,
    id,
    total,
    updated_at,
  }:ICreateRentalsDTO):Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      end_date,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.repository.push(rental);
    return rental;
  }

  async findOpenRentalByCarId(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => rental.end_date === null
    && rental.car_id === id);
    return rental;
  }

  async findOpenRentalByUserId(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => rental.end_date === null
    && rental.user_id === id);
    return rental;
  }

  async findById(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => rental.id === id);
    return rental;
  }
}

export { RentalsRepositoryInMemory };
