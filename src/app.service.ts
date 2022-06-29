import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "./user.models"
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) { }
  
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user)
    return newUser.save()
  }
  
  async readUser() {
    return this.userModel.find({})
      .then(user => { return user })
      .catch(err => console.log(err))
  }
  
  async updateUser(id,data) {
    return this.userModel.findByIdAndUpdate(id, data, {new:true})
  }
  
  async deleteUser(id) {
    return this.userModel.findByIdAndDelete(id)
  }
}
