"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const registerUser = async (user) => {
    const { name, userName, email, password, dateOfBirth, gender, description, phoneNumber, profileImageUrl, } = user;
    if (!name ||
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
    const existingUser = await userModel_1.default.findOne({ email });
    if (existingUser) {
        return {
            error: "User with that email already exists.",
        };
    }
    if (phoneNumber) {
        const existingPhone = await userModel_1.default.findOne({ phoneNumber });
        if (existingPhone) {
            return {
                error: "User with that phone number already exists.",
            };
        }
    }
    const newUser = new userModel_1.default({
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
exports.registerUser = registerUser;
const loginUser = async (user) => {
    const { email, password } = user;
    if (!email || !password) {
        return {
            error: "Please provide all the required fields",
        };
    }
    const existingUser = await userModel_1.default.findByCredentials(email, password);
    if (!existingUser) {
        return null;
    }
    const token = await existingUser.generateAuthToken();
    return {
        user: existingUser,
        token,
    };
};
exports.loginUser = loginUser;
// Add these functions to your controller
const getAllUsers = async () => {
    const users = await userModel_1.default.find({});
    return users;
};
exports.getAllUsers = getAllUsers;
const getUser = async (id) => {
    return await userModel_1.default.findById(id);
};
exports.getUser = getUser;
const updateUser = async (id, data) => {
    try {
        if (data.phoneNumber) {
            const existingPhone = await userModel_1.default.findOne({
                phoneNumber: data.phoneNumber,
            });
            if (existingPhone && existingPhone._id.toString() !== id) {
                return {
                    error: "User with that phone number already exists.",
                };
            }
        }
        return await userModel_1.default.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    catch (error) {
        return { error: error };
    }
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await userModel_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
const logoutUser = async (req) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
    });
    await req.user.save();
    return { message: "User logged out successfully." };
};
exports.logoutUser = logoutUser;
