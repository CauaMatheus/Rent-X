import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@errors/AppError';
import { RentalsRepositoryInMemory } from '@rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name Example',
      brand: 'Car Brand Example',
      category_id: '123456789',
      daily_rate: 123,
      description: 'Car Description Example',
      fine_amount: 123,
      license_plate: 'XXX-1234',
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when expected return date is invalid', () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: 'Car Name Example',
        brand: 'Car Brand Example',
        category_id: '123456789',
        daily_rate: 123,
        description: 'Car Description Example',
        fine_amount: 123,
        license_plate: 'XXX-1234',
      });
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental of an already rented car', () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: 'Car Name Example',
        brand: 'Car Brand Example',
        category_id: '123456789',
        daily_rate: 123,
        description: 'Car Description Example',
        fine_amount: 123,
        license_plate: 'XXX-1234',
      });
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12347',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if user is already renting other car', () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: 'Car Name Example',
        brand: 'Car Brand Example',
        category_id: '123456789',
        daily_rate: 123,
        description: 'Car Description Example',
        fine_amount: 123,
        license_plate: 'XXX-1234',
      });
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
