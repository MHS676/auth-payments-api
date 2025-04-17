import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/types/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: Role, default: Role.User })
    role: Role;

    @Prop({ type: String, default: null })
    hashedRt: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
