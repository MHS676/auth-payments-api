import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not defined in the environment variables.');
        }

        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16' as any,
        });
    }

    async checkConnection() {
        const balance = await this.stripe.balance.retrieve();
        return balance;
    }


}
