import { ICreateCarsDTO } from '@cars/dtos/ICreateCarsDTO';
import { CarsRepositoryInMemory } from '@cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@errors/AppError';

import { CreateCarsUseCase } from './CreateCarsUseCase';

let createCarsUseCase: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car: ICreateCarsDTO = {
      name: 'Car Name',
      brand: 'Car brand',
      category_id: '',
      daily_rate: 100,
      description: 'Car Description',
      fine_amount: 60,
      license_plate: 'Plate',
    };
    const createdCar = await createCarsUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a car with existing license plate', () => {
    expect(async () => {
      await createCarsUseCase.execute({
        name: 'Car1',
        brand: 'Car brand',
        category_id: '',
        daily_rate: 100,
        description: 'Car Description',
        fine_amount: 60,
        license_plate: 'Plate',
      });

      await createCarsUseCase.execute({
        name: 'Car2',
        brand: 'Car brand',
        category_id: '',
        daily_rate: 100,
        description: 'Car Description',
        fine_amount: 60,
        license_plate: 'Plate',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should have avaiable property as true by default', async () => {
    const createdCar = await createCarsUseCase.execute({
      name: 'Car1',
      brand: 'Car brand',
      category_id: '',
      daily_rate: 100,
      description: 'Car Description',
      fine_amount: 60,
      license_plate: 'Plate',
    });

    expect(createdCar.available).toBe(true);
  });
});
