import { injectable, inject } from 'tsyringe';

import { Specification } from '@cars/entities/Specification';
import { SpecificationsRepository } from '@cars/repositories/implementations/SpecificationsRepository';

@injectable()
class ListSpecificationUseCases {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository:SpecificationsRepository,
  ) {}

  async execute():Promise<Specification[]> {
    const list = await this.specificationRepository.list();
    return list;
  }
}
export { ListSpecificationUseCases };
