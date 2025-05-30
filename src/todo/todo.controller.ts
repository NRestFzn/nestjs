import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [TodoDto] })
  findAll(@Req() request: Request): Promise<TodoDto[]> {
    return this.todosService.findAll((request.user as UserDto).id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [TodoDto] })
  createTodo(
    @Body() formData: { todo: string },
    @Req() request: Request,
  ): Promise<TodoDto> {
    return this.todosService.create({
      ...formData,
      user_id: (request.user as UserDto).id,
    });
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [TodoDto] })
  updateTodo(
    @Param() id: number,
    @Body() formData: { todo: string },
    @Req() request: Request,
  ): Promise<TodoDto> {
    return this.todosService.update(request.params.id as unknown as number, {
      ...formData,
      user_id: (request.user as UserDto).id,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [TodoDto] })
  deleteTodo(@Req() request: Request): Promise<TodoDto> {
    return this.todosService.delete(
      request.params.id as unknown as number,
      (request.user as UserDto).id,
    );
  }
}
