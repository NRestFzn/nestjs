import { Todo } from './todo.entity';

export const todosProviders = [{ provide: 'TodosRepository', useValue: Todo }];
