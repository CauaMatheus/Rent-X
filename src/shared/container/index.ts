import { container } from 'tsyringe';

import { UsersRepository } from '@accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { ICategoryRepository } from '@cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '@cars/repositories/ISpecificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository,
);
container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository', CategoriesRepository,
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository', SpecificationsRepository,
);
