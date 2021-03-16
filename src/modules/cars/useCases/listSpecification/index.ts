import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationController } from './ListSpecificationController';
import { ListSpecificationUseCases } from './ListSpecificationUseCases';

const specificationRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCases = new ListSpecificationUseCases(specificationRepository);
const listSpecificationController = new ListSpecificationController(listSpecificationUseCases);

export { listSpecificationController };
