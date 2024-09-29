import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();
const configPostgresDb: Partial<PostgresConnectionOptions> = {
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  schema: process.env.DB_SCHEMA ?? 'public',
  database: process.env.DB_NAME ?? 'maspikut',
  ssl: false,
};

export const dbConnection = new DataSource({
  type: 'postgres',
  entities: [`${__dirname}/resources/**/*entity{.ts,.js}`],
  ...configPostgresDb,
});

export const connectToPostgresDB = async () => {
  try {
    await dbConnection.initialize();
    console.log('Connected to postgres db!');
  } catch (error: any) {
    console.log(`There was an error connecting to db: ${error.stack}`);
    throw error;
  }
};
