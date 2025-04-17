import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    ) {
        this.stripe = new Stripe('your_stripe_secret_key', {
            apiVersion: '2025-03-31.basil' as any,
        });
    }

    async create(userId: string, dto: CreatePaymentDto) {
        const charge = await this.stripe.paymentIntents.create({
            amount: dto.amount,
            currency: dto.currency,
            description: dto.description,
            payment_method_types: ['card'],
        });

        const payment = new this.paymentModel({
            userId,
            amount: dto.amount,
            currency: dto.currency,
            description: dto.description,
            status: charge.status,
            stripeId: charge.id,
        });

        await payment.save();

        return { message: 'Payment successful (simulated)', payment };
    }
}
