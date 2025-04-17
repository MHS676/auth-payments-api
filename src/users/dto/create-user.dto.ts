import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    role?: Role;
}
