import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 도큐먼트 생성
  // async create(name: string, age: number, email: string): Promise<User> {
  //   const createdUser = new this.userModel(name, age, email);
  //   return createdUser.save();
  // }

  // 모든 유저 정보 조회
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(name: string): Promise<User> {
    return this.userModel.findOne({ name: name });
  }
}
