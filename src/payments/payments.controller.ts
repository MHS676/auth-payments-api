import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('checkout')
    async checkout(@Request() req, @Body() dto: CreatePaymentDto) {
        return this.paymentsService.create(req.user.userId, dto);
    }
}
