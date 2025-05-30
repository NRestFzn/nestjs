import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { Todo } from 'src/todo/todo.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('SEQUELIZE_DIALECT') as Dialect,
        host: configService.get('SEQUELIZE_HOST'),
        port: Number(configService.get('SEQUELIZE_PORT')),
        username: configService.get('SEQUELIZE_USERNAME'),
        password: configService.get('SEQUELIZE_PASSWORD'),
        database: configService.get('SEQUELIZE_DATABASE'),
      });
      sequelize.addModels([User, Todo]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
