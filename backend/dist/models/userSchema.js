"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("./userModel"));
const userSchema = new mongoose_1.Schema({
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
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        validate: {
            validator: function (v) {
                // Regex to validate phone number format
                var re = /^(\+\d{1,3}[- ]?)?\d{10}$/; // The output should be something like +46 1234567890
                return re.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    profileImageUrl: { type: String, required: false },
}, {
    timestamps: true,
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs_1.default.hash(this.password, 8);
    }
    next();
});
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.confirmPassword;
    return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel_1.default.findOne({ email });
    if (!user) {
        throw new Error("Unable to login");
        // return null;
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        // return null;
        throw new Error("Unable to login");
    }
    return user;
};
exports.default = userSchema;
