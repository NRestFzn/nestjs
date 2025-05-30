import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly todo?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly user_id?: number;
}
