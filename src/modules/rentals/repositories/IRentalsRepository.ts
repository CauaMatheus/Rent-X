import { ICreateRentalsDTO } from '@rentals/dtos/ICreateRentalsDTO';

import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalsDTO): Promise<Rental>
  findOpenRentalByCarId(id: string): Promise<Rental>
  findOpenRentalByUserId(id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUserId(id: string): Promise<Rental[]>
}

export { IRentalsRepository };
