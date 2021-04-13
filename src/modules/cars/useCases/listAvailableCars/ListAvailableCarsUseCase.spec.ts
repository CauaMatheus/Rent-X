import { CarsRepositoryInMemory } from '@cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description example',
      daily_rate: 140,
      license_plate: 'DEF-1234',
      fine_amount: 100,
      brand: 'Car brand example',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all cars by name', async () => {
    const expectedCar = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 140,
      license_plate: 'DEF-1235',
      fine_amount: 100,
      brand: 'Audi',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ name: 'Car2' });
    expect(cars).toEqual([expectedCar]);
  });

  it('should be able to list all cars by brand', async () => {
    const expectedCar = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 140,
      license_plate: 'DEF-1235',
      fine_amount: 100,
      brand: 'Augi',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ brand: 'Augi' });
    expect(cars).toEqual([expectedCar]);
  });

  it('should be able to list all cars by category_id', async () => {
    const expectedCar = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 140,
      license_plate: 'DEF-1235',
      fine_amount: 100,
      brand: 'brand',
      category_id: '1234',
    });

    const cars = await listCarsUseCase.execute({ category_id: '1234' });
    expect(cars).toEqual([expectedCar]);
  });
});
