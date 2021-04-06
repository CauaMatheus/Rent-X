import { CarsRepositoryInMemory } from '@cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should not be able to create a car specification for a nonexixting car', async () => {
    const car_id = '12345';
    const specifications_id = ['124563'];
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id }),
    ).rejects.toEqual(new AppError('Car not found', 404));
  });

  it('should be able to create a car specification', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Car Name Example',
      brand: 'Brand Car Example',
      category_id: 'category_id example',
      daily_rate: 100,
      description: 'Car Description Example',
      fine_amount: 300,
      license_plate: 'XXX-1234',
    });
    const createdSpecification = await specificationsRepositoryInMemory.create({
      name: 'Specification Name Example',
      description: 'Specification Description Example',
    });
    const carWithSpecification = await createCarSpecificationUseCase.execute({
      car_id: createdCar.id,
      specifications_id: [createdSpecification.id],
    });

    expect(carWithSpecification.specifications[0]).toHaveProperty('id');
  });
});
