import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as path from 'path';
import * as dotenv from 'dotenv';

const envPath = path.join(
  process.cwd(),
  process.env.NODE_ENV ? `envs/.env.${process.env.NODE_ENV}` : `/.env`,
);
dotenv.config({
  path: envPath,
});

export const postGresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: +process.env.DB_PORT,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  synchronize: false,
  entities: [join(__dirname, '..', '**', '**', '*.entity.{js,ts}')],
};
