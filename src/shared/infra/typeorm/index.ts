import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  if (process.env.NODE_ENV === 'prod') {
    Object.assign(defaultOptions, {
      migrations: [
        './dist/shared/infra/typeorm/migrations/*.js',
      ],
      entities: [
        './dist/modules/**/infra/typeorm/entities/*.js',
      ],
      cli: {
        migrationsDir: './dist/shared/infra/typeorm/migrations',
      },
    });
  }

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'dev'
        ? 'database_ignite' : host,
      database: process.env.NODE_ENV === 'test'
        ? 'rentx_test'
        : defaultOptions.database,
    }),
  );
};
