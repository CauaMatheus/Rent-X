import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ICreateSpecificationsDTO } from '../../repositories/ISpecificationsRepository';

class CreateSpecificationUseCases {
  constructor(private specificationRepository: SpecificationsRepository) {}
  execute({ name, description }:ICreateSpecificationsDTO):void {
    this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCases };
