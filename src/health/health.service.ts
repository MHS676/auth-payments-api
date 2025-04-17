// src/health/health.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import Stripe from 'stripe';

@Injectable()
export class HealthService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-10-16' as any,
    });

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async checkDatabase(): Promise<boolean> {
        try {
            await this.userModel.findOne();
            return true;
        } catch {
            return false;
        }
    }

    async checkStripe(): Promise<boolean> {
        try {
            await this.stripe.balance.retrieve();
            return true;
        } catch {
            return false;
        }
    }

    async checkJwtSecrets(): Promise<boolean> {
        return !!process.env.JWT_SECRET && !!process.env.JWT_REFRESH_SECRET;
    }

    async getAppHealth() {
        const [db, stripe, jwt] = await Promise.all([
            this.checkDatabase(),
            this.checkStripe(),
            this.checkJwtSecrets(),
        ]);

        return {
            app: 'ok',
            database: db ? 'connected' : 'error',
            stripe: stripe ? 'connected' : 'error',
            jwt: jwt ? 'ok' : 'missing',
        };
    }
}
