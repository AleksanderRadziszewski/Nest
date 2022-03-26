import { Injectable } from '@nestjs/common';
import { User, UserDocument } from "./user.models"
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) { }
  // creating User
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user)
    return newUser.save()
  }
  //reading User
  async readUser() {
    return this.userModel.find({})
      .then(user => { return user })
      .catch(err => console.log(err))
  }
  //updating User
  async updateUser(id,data) {
    return this.userModel.findByIdAndUpdate(id, data, {new:true})
  }
  // deleting User
  async deleteUser(id) {
    return this.userModel.findByIdAndDelete(id)
  }
}
