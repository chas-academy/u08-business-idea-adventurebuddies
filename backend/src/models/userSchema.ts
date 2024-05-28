import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./userModel";
import { IUser, IUserMethods, UserModel } from "../interfaces/IUser";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    description: { type: String, required: false },
    password: { type: String, required: true },
    tokens: [{ token: { type: String, required: false } }],
    role: { type: Number, default: 1 },
    phoneNumber: { type: String, required: false },
    profileImageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_KEY as string
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this as IUser;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.confirmPassword;
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
    // return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // return null;
    throw new Error("Unable to login");
  }
  return user;
};

export default userSchema;
