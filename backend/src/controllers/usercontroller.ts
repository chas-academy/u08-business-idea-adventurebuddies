import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";
import Event from "../models/eventModel";

export const registerUser = async (user: Partial<IUser>) => {
  const {
    name,
    userName,
    email,
    password,
    dateOfBirth,
    gender,
    description,
    phoneNumber,
    profileImageUrl,
  } = user;
  if (
    !name ||
    !userName ||
    !email ||
    !password ||
    !dateOfBirth ||
    !gender ||
    !phoneNumber
    // !description
  ) {
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

  if (phoneNumber) {
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return {
        error: "User with that phone number already exists.",
      };
    }
  }

  const newUser = new User({
    name,
    userName,
    email,
    password,
    dateOfBirth,
    gender,
    description,
    phoneNumber,
    profileImageUrl,
    role: user.role,
  });

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
  try {
    if (data.phoneNumber) {
      const existingPhone = await User.findOne({
        phoneNumber: data.phoneNumber,
      });
      if (existingPhone && existingPhone._id.toString() !== id) {
        return {
          error: "User with that phone number already exists.",
        };
      }
    }

    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    return { error: error };
  }
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

export const getUserEvents = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    return { error: "User not found." };
  }
  const events = await Event.find({
    _id: { $in: user.events },
  });

  return events;
};
