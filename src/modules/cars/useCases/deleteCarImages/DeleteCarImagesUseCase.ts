import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  async execute(image_id: string): Promise<void> {
    const image = await this.carsImagesRepository.findById(image_id);
    await this.carsImagesRepository.delete(image.id);
    await this.storageProvider.delete(image.image_name, 'cars');
  }
}
export { DeleteCarImagesUseCase };
