import { container } from 'tsyringe';

import '../providers';
import { UsersRepository } from '@accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokenRepository } from '@accounts/infra/typeorm/repositories/UsersTokenRepository';
import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@accounts/repositories/IUsersTokenRepository';
import { CarsImagesRepository } from '@cars/infra/typeorm/repositories/CarsImages';
import { CarsRepository } from '@cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '@cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@cars/repositories/ICarsRepository';
import { ICategoryRepository } from '@cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@rentals/repositories/IRentalsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository,
);
container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository', CategoriesRepository,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository', SpecificationsRepository,
);
container.registerSingleton<ICarsRepository>(
  'CarsRepository', CarsRepository,
);
container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository', CarsImagesRepository,
);
container.registerSingleton<IRentalsRepository>(
  'RentalsRepository', RentalsRepository,
);
container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository', UsersTokenRepository,
);
