import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../types/role.enum';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    role?: Role;
}
