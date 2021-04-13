import { ICreateCarsImagesDTO } from '@cars/dtos/ICreateCarsImagesDTO';
import { CarImages } from '@cars/infra/typeorm/entities/CarImages';

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarsImagesDTO): Promise<void>
  findById(id: string): Promise<CarImages>
  delete(id: string): Promise<void>
}
export { ICarsImagesRepository };
