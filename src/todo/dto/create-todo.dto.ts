import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  readonly todo: string;

  @ApiProperty()
  @IsNumber()
  readonly user_id: number;
}
