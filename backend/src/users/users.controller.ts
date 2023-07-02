import { Model } from "mongoose";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { NotFoudException, UnAuthorizedException } from "../errors";
import jwt from "jsonwebtoken";

export class UserController {
  userModel: Model<User>;

  constructor(UserModel: Model<User>) {
    this.userModel = UserModel;
  }

  async createUser(email: string, password: string) {
    const newUser = new this.userModel({ email, password });
    newUser.password = await this.hashPassword(password);
    await newUser.save();
    return newUser;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw NotFoudException({ message: "User not foud" });
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw UnAuthorizedException({ message: "Invalid Credentials" });
    }
    const serializedUser = user.toJSON()
    delete (serializedUser as any).password
    return {
      token: this.signToken(serializedUser),
      refreshToken: this.signToken(serializedUser, true),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  private signToken(payload: User, isRefresh = false): string {
    return jwt.sign(payload, "my-secret", {
      expiresIn: isRefresh ? "14d" : "7d",
    });
  }
}
