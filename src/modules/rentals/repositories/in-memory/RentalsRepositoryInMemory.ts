import { ICreateRentalsDTO } from '@rentals/dtos/ICreateRentalsDTO';
import { Rental } from '@rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private repository:Rental[] = []

  async create({
    id,
    car_id,
    user_id,
    end_date,
    expected_return_date,
    total,
  }:ICreateRentalsDTO):Promise<Rental> {
    if (!id) {
      const rental = new Rental();
      Object.assign(rental, {
        car_id,
        expected_return_date,
        user_id,
        start_date: new Date(),
      });

      this.repository.push(rental);
      return rental;
    }

    const rentalIndex = this.repository.findIndex((rental) => rental.id === id);
    this.repository[rentalIndex].end_date = end_date;
    this.repository[rentalIndex].total = total;
    return this.repository[rentalIndex];
  }

  async findOpenRentalByCarId(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => !rental.end_date
    && rental.car_id === id);
    return rental;
  }

  async findOpenRentalByUserId(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => !rental.end_date
    && rental.user_id === id);
    return rental;
  }

  async findById(id:string): Promise<Rental> {
    const rental = this.repository.find((rental) => rental.id === id);
    return rental;
  }

  async findByUserId(id:string): Promise<Rental[]> {
    const rentals = this.repository.filter((rental) => rental.user_id === id);
    return rentals;
  }
}

export { RentalsRepositoryInMemory };
