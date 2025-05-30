import { Module } from '@nestjs/common';
import { TodosController } from './todo.controller';
import { DatabaseModule } from './../database/database.module';
import { TodosService } from './todo.service';
import { todosProviders } from './todo.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  providers: [TodosService, ...todosProviders],
  exports: [TodosService],
})
export class TodosModule {}
