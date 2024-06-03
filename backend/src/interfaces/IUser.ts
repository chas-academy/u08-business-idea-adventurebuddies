import { ObjectId } from "mongodb";
import { HydratedDocument, Model } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  description?: string;
  password: string;
  confirmPassword?: string;
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
  role: number;
  phoneNumber?: string;
  createdEvents: ObjectId[];
  attendingEvents: ObjectId[];
  savedEvents: ObjectId[];
  profileImageUrl?: string;
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}

export interface UserModel extends Model<IUser, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}
