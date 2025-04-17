import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUserId } from './decorators/get-user-id.decorator';
import { ForbiddenException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }


    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@GetUserId() userId: string) {
        return this.authService.logout(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@GetUserId() userId: string) {
        return this.authService.getMe(userId);
    }

    @Post('refresh')
    refreshTokens(@Body() dto: RefreshTokenDto) {
        const payload = this.authService['jwtService'].verify(dto.refreshToken);
        if (!payload) throw new ForbiddenException('Invalid refresh token');

        return this.authService.refreshTokens(payload.sub, dto.refreshToken);
    }
}
