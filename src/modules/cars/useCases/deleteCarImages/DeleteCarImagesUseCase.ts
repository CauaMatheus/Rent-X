import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';
import { deleteFile } from '@utils/file';

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository:ICarsImagesRepository,
  ) {}

  async execute(image_id: string):Promise<void> {
    const image = await this.carsImagesRepository.findById(image_id);
    await this.carsImagesRepository.delete(image.id);
    deleteFile(`./temp/cars/${image.image_name}`);
  }
}
export { DeleteCarImagesUseCase };
