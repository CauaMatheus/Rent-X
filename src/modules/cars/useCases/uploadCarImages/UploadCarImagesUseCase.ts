import { promises } from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';
import upload from '@config/upload';
import { AppError } from '@errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

interface IFileProperties {
  filename?: string
  mimetype: string
}
interface IRequest {
  images_properties: IFileProperties[]
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
  async execute({ images_properties, car_id }: IRequest): Promise<void> {
    images_properties.map(async ({ filename, mimetype }) => {
      const typeRegex = /image/.test(mimetype);
      if (!typeRegex) {
        try {
          await promises.stat(`${upload.tempFolder}/${filename}`);
        } catch {
          return;
        }
        await promises.unlink(`${upload.tempFolder}/${filename}`);
        throw new AppError('File type not accepted', 400);
      }
      await this.storageProvider.save(filename, 'cars');
      await this.carsImagesRepository.create({ image_name: filename, car_id });
    });
  }
}
export { UploadCarImagesUseCase };
