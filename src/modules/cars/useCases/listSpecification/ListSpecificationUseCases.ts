import { injectable, inject } from 'tsyringe';

import { Specification } from '@cars/infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '@cars/infra/typeorm/repositories/SpecificationsRepository';

@injectable()
class ListSpecificationUseCases {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository,
  ) { }

  async execute(): Promise<Specification[]> {
    const list = await this.specificationRepository.list();
    return list;
  }
}
export { ListSpecificationUseCases };
