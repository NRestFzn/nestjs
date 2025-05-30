import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly fullName: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.fullName = user.fullName;
    }
}
