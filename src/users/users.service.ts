import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createUser(userObj: CreateUserDto): Promise<any>{
    const newUser = new this.userModel({
        username: userObj.username,
        fullName: userObj.fullName,
        email: userObj.email,
        password: userObj.password,
        isadmin: userObj?.isadmin,
        role: userObj?.role
    });
    const user = await this.findUser(userObj.username, userObj.email);
    if (user) {
      return { id: null, msg:'UserId or Email already registered'};
    }else{
      const result = await newUser.save();
      return { id: result.id as string, msg:'User registered successfully!' };
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(usr => <User>({
        username: usr.username,
        fullName: usr.fullName,
        email: usr.email,
        created: usr.created,
        isadmin: usr.isadmin,
        role: usr.role,
        isactive: usr.isactive
    }));
  }

  // async getSingleUser(userId: string) {
  //   const user = await this.findUser(userId);
  //   if (user) {
  //   return {
  //     id: user.id,
  //     title: user.title,
  //     description: user.description,
  //     price: user.price,
  //   };
  // }

//   async updateProduct(
//     productId: string,
//     title: string,
//     desc: string,
//     price: number,
//   ) {
//     const updatedProduct = await this.findProduct(productId);
//     if (title) {
//       updatedProduct.title = title;
//     }
//     if (desc) {
//       updatedProduct.description = desc;
//     }
//     if (price) {
//       updatedProduct.price = price;
//     }
//     updatedProduct.save();
//   }

//   async deleteProduct(prodId: string) {
//     const result = await this.userModel.deleteOne({_id: prodId}).exec();
//     if (result.n === 0) {
//       throw new NotFoundException('Could not find product.');
//     }
//   }

  private async findUser(usrname: string, eml: string): Promise<User> {
    let user = await this.userModel.findOne().or([{ username: usrname }, { email: eml }]).exec();
    return user;
  }
}
