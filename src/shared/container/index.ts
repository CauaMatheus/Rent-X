import { container } from 'tsyringe';

import { UsersRepository } from '@accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@accounts/repositories/IUsersRepository';
import { CategoriesRepository } from '@cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICategoryRepository } from '@cars/repositories/ICategoriesRepository';
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
