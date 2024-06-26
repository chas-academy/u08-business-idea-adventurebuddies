import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";
import Event from "../models/eventModel";
import { Request, Response } from "express";
import { CustomRequest } from "middleware/auth";
import Friend from "../models/friendModel";

// Authentication
export const registerUser = async (user: Partial<IUser>) => {
  try {
    const {
      name,
      userName,
      email,
      password,
      confirmPassword,
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
      !confirmPassword ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber
      // !description
    ) {
      return {
        error: "Please provide all the required fields",
      };
    }
    if (password !== confirmPassword) {
      return {
        error: "Password and confirm password do not match",
      };
    }
    if (password.length < 8 || password.length > 10) {
      return {
        error: "Password should be between 8 and 10 characters",
      };
    }

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      return {
        error: "User must be at least 18 years old",
      };
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return {
        error: "User with that email already exists.",
      };
    }

    const existingUserName = await User.findOne({
      userName: userName.toLowerCase(),
    });
    if (existingUserName) {
      return {
        error: "User with that username already exists.",
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
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
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
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const loginUser = async (user: Partial<IUser>) => {
  const { email, password } = user;
  if (!email || !password) {
    return {
      error: "Please provide all the required fields",
    };
  }
  try {
    const existingUser = await User.findByCredentials(email, password);
    if (!existingUser) {
      return null;
    }
    const token = await existingUser.generateAuthToken();
    return {
      user: existingUser,
      token,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const logoutUser = async (req: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });
    await req.user.save();
    return { message: "User logged out successfully." };
  } catch (error) {
    return { error: error };
  }
};

// User Profile
export const getAllUsers = async () =>
  // req: Request, res: Response
  {
    try {
      // const { search } = req.query;
      // let query = {};

      // if (search) {
      //   query = {
      //     $or: [
      //       { name: { $regex: search, $options: "i" } },
      //       { email: { $regex: search, $options: "i" } },
      //     ],
      //   };
      // }

      const users = await User.find({});
      return users;
      // res.status(200).json(users);
    } catch (error) {
      // res.status(500).json({ error: error });

      return { error: error };
    }
  };

export const getUser = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return { error: error };
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { userName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
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

export const deleteOwnAccount = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user's account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    return { error: error };
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find events attended by the user
    const attendingEvents = await Event.find({ participants: userId });

    // Find events created by the user
    const createdEvents = await Event.find({ user_id: userId });

    return res.status(200).json({ attendingEvents, createdEvents });
  } catch (error) {
    console.error("Error fetching user's events:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriends = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const friends = await Friend.find({
      $or: [
        { requester: userId, status: "accepted" },
        { recipient: userId, status: "accepted" },
      ],
    }).populate("requester recipient", "name");

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
