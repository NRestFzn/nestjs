import { Todo } from './../todo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly todo: string;

  @ApiProperty()
  readonly user_id: number;

  constructor(user: Todo) {
    this.id = user.id;
    this.todo = user.todo;
    this.user_id = user.user_id;
  }
}
