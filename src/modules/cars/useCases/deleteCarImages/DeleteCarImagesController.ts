import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase';

class DeleteCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { image_id } = request.params;
    const deleteCarImagesUseCase = container.resolve(DeleteCarImagesUseCase);

    await deleteCarImagesUseCase.execute(image_id as string);

    return response.send();
  }
}
export { DeleteCarImagesController };
