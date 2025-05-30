import { Injectable } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';
import { DatabaseConfig } from 'src/config/database';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig(): SequelizeOptions {
    return DatabaseConfig;
  }

  get jwtConfig() {
    return { privateKey: process.env.JWT_SECRET_KEY || 'yourprivatekey' };
  }
}
