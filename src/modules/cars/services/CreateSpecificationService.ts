import { ICreateSpecificationsDTO, ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }:ICreateSpecificationsDTO):void {
    const specificationAlreadyExists = this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }
    this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationService };
