import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { User, UserSchema } from "./schemas/users.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel("User") private userModel: Model<User>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}