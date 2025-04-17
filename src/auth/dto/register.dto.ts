import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    role?: Role;
}
