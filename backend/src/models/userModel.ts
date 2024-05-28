import { model } from "mongoose";
import userSchema from "./userSchema";
import { IUser, UserModel } from "../interfaces/IUser";

const User = model<IUser, UserModel>("User", userSchema);

export default User;
