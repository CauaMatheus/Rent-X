import { getRepository, Repository } from 'typeorm';

import { ICreateCarsImagesDTO } from '@cars/dtos/ICreateCarsImagesDTO';
import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';

import { CarImages } from '../entities/CarImages';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository:Repository<CarImages>

  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create({ car_id, image_name }:ICreateCarsImagesDTO):Promise<void> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });
    await this.repository.save(carImage);
  }
  async findById(id: string):Promise<CarImages> {
    const image = await this.repository.findOne({ id });
    return image;
  }

  async delete(id:string):Promise<void> {
    await this.repository.delete({ id });
  }
}
export { CarsImagesRepository };
