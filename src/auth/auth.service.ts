import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.interface';
import { UsersService } from '../users/users.service';
import { Role } from './types/role.enum';
import { UserDocument } from '../users/schemas/user.schema';
import { UpdateQuery } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async signup(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password);
        const user = await this.usersService.create({
            email: dto.email,
            password: hash,
            role: dto.role ?? Role.User,
        });

        const tokens = await this.getTokens(user.id.toString(), user.email, user.role);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
        return tokens;
    }

    async signin(dto: AuthDto): Promise<Tokens> {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id.toString(), user.email, user.role);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string) {
        return this.usersService.update(userId, { hashedRt: null });
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
        const user = await this.usersService.findById(userId);
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

        const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id.toString(), user.email, user.role);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: string, email: string, role: Role): Promise<Tokens> {
        const payload = {
            sub: userId,
            email,
            role,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hash = await this.hashData(refreshToken);
        await this.usersService.update(userId, { hashedRt: hash });
    }

    hashData(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    decodeRefreshToken(token: string) {
        return this.jwtService.decode(token) as { sub: string; email: string; role: Role } | null;
    }

    async getMe(userId: string) {
        return this.usersService.findById(userId);
    }
}
