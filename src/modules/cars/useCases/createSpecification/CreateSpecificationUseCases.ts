import { inject, injectable } from 'tsyringe';

import { SpecificationsRepository } from '@cars/repositories/implementations/SpecificationsRepository';
import { ICreateSpecificationsDTO } from '@cars/repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCases {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository,
  ) {}
  async execute({ name, description }:ICreateSpecificationsDTO):Promise<void> {
    await this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCases };
