import { ICreateCarsImagesDTO } from '@cars/dtos/ICreateCarsImagesDTO';

interface ICarsImagesRepository{
  create({ car_id, image_name }:ICreateCarsImagesDTO): Promise<void>
}
export { ICarsImagesRepository };
