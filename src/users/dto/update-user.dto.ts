import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly fullName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly email?: string;
}
