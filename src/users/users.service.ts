import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(data: Partial<User>): Promise<UserDocument> {
        return this.userModel.create(data);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async update(id: string, update: UpdateQuery<UserDocument>): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(id, update, { new: true });
    }
}
