import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const prodPaths = {
    migrations: [
      './dist/shared/infra/typeorm/migrations/*.js',
    ],
    entities: [
      './dist/modules/**/infra/typeorm/entities/*.js',
    ],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  };

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'dev'
        ? 'database_ignite' : host,
      database: process.env.NODE_ENV === 'test'
        ? 'rentx_test'
        : defaultOptions.database,

      migrations: process.env.NODE_ENV === 'prod'
        ? prodPaths.migrations
        : defaultOptions.migrations,

      entities: process.env.NODE_ENV === 'prod'
        ? prodPaths.entities
        : defaultOptions.entities,

      cli: process.env.NODE_ENV === 'prod'
        ? prodPaths.cli
        : defaultOptions.cli,
    }),
  );
};
