import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCases } from './CreateSpecificationUseCases';

const specificationRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCases = new CreateSpecificationUseCases(specificationRepository);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCases,
);

export { createSpecificationController };
