import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename?: string
  mimetype: string
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as IFiles[];
    const images_properties = images.map((image) => ({
      name: image.filename,
      mimetype: image.mimetype,
    }));

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);
    await uploadCarImageUseCase.execute({ car_id, images_properties });

    return response.status(201).send();
  }
}
export { UploadCarImagesController };
