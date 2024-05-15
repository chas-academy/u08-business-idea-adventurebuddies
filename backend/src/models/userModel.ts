import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";


const userScema = new Schema<IUser> ({
    name: { type: String, required: true},
    userName: { type: String, required: true},
    email: { type: String, required: true},
    dateOfBirth: { type: Date, required: true},
    description: { type: String, required: false},
    password:  { type: String, required: true},
    confirmPassword:  { type: String, required: true}
});

const User = model<IUser>('User', userScema);

export default User;
