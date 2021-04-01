import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';

interface IRequest{
  images_name: string[]
  car_id: string
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository:ICarsImagesRepository,
  ) {}
  async execute({ images_name, car_id }:IRequest):Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create({ image_name, car_id });
    });
  }
}
export { UploadCarImagesUseCase };
