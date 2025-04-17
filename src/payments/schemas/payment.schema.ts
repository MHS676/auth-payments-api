import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop()
    userId: string;

    @Prop()
    amount: number;

    @Prop()
    currency: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop()
    stripeId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
