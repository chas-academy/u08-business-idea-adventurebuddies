import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";

export const registerUser = async (user: Partial<IUser>) => {
  const { name, userName, email, password } = user;
  if (!name || !userName || !email || !password) {
    return {
      error: "Please provide all the required fields",
    };
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      error: "User with that email already exists.",
    };
  }
  const newUser = new User({ name, userName, email, password });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return {
    user: newUser,
    token,
  };
};

export const loginUser = async (user: Partial<IUser>) => {
  const { email, password } = user;
  if (!email || !password) {
    return {
      error: "Please provide all the required fields",
    };
  }
  const existingUser = await User.findByCredentials(email, password);
  if (!existingUser) {
    return null;
  }
  const token = await existingUser.generateAuthToken();
  return {
    user: existingUser,
    token,
  };
};

// Add these functions to your controller
export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export const getUser = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const logoutUser = async (req: any) => {
  req.user.tokens = req.user.tokens.filter((token: any) => {
    return token.token !== req.token;
  });
  await req.user.save();
  return { message: "User logged out successfully." };
};
