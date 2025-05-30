import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TodosRepository')
    private readonly todosRepository: typeof Todo,
  ) {}

  async findAll(user_id: number) {
    const todos = await this.todosRepository.findAll<Todo>({
      where: { user_id },
      include: [{ model: User }],
    });
    return todos;
  }

  async getTodo(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findByPk<Todo>(id);
    if (!todo) {
      throw new HttpException(
        'Todo with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  async create(formData: CreateTodoDto) {
    const todo = new Todo();
    todo.todo = formData.todo;
    todo.user_id = formData.user_id;

    const todoData = await todo.save();

    return new TodoDto(todoData);
  }

  async update(id: number, formData: UpdateTodoDto) {
    const todo = await this.todosRepository.findByPk<Todo>(id);
    if (!todo) {
      throw new HttpException('Todo not found.', HttpStatus.NOT_FOUND);
    }

    todo.todo = formData.todo || todo.todo;
    todo.user_id = formData.user_id || todo.user_id;

    try {
      const data = await todo.save();
      return new TodoDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number, user_id: number) {
    const todo = await this.getTodo(id);

    if (!todo) {
      throw new HttpException(
        'Todo with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await todo.destroy();
    return new TodoDto(todo);
  }
}
