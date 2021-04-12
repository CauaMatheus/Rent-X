import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

interface IRequest {
  images_name: string[]
  car_id: string
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }
  async execute({ images_name, car_id }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.storageProvider.save(image_name, 'cars');
      await this.carsImagesRepository.create({ image_name, car_id });
    });
  }
}
export { UploadCarImagesUseCase };
