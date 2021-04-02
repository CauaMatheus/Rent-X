import dayjs from 'dayjs';

import { AppError } from '@errors/AppError';
import { RentalsRepositoryInMemory } from '@rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1214',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental when expected return date is invalid', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1214',
        user_id: '12345',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental of an already rented car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1214',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '1214',
        user_id: '12347',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if user is already renting other car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1214',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '1215',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
