import { Specification } from '../../models/Specification';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

class ListSpecificationUseCases {
  constructor(private specificationRepository:SpecificationsRepository) {}

  execute():Specification[] {
    const list = this.specificationRepository.list();
    return list;
  }
}
export { ListSpecificationUseCases };
