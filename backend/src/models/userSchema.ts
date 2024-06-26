import { Schema, Types } from "mongoose";
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
      enum: ["male", "female", "other", "non-binary"],
      required: true,
    },
    description: { type: String, required: false },
    password: { type: String, required: true },
    tokens: [{ token: { type: String, required: false } }],
    role: { type: Number, default: 1 },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v: string) {
          // Regex to validate phone number format
          var re = /^(\+\d{1,3}[- ]?)?\d{10}$/; // The output should be something like +46 1234567890
          return re.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
    },
    createdEvents: [{ type: Types.ObjectId, ref: "Event" }],
    attendingEvents: [{ type: Types.ObjectId, ref: "Event" }],
    savedEvents: [{ type: Types.ObjectId, ref: "Event" }],
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
    process.env.JWT_KEY as string,
    {
      expiresIn: "1h",
    }
  );
  user.tokens = [{ token }]; // Will replace the existing token with a new one
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

userSchema.statics.findByCredentials = async function (email, password) {
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
