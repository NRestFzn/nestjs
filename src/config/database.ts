import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

require('dotenv').config();

export const DatabaseConfig: SequelizeOptions = {
  dialect: process.env.SEQUELIZE_DIALECT as Dialect,
  host: process.env.SEQUELIZE_HOST,
  port: Number(process.env.SEQUELIZE_PORT),
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
};
