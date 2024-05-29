"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema_1 = __importDefault(require("./userSchema"));
const User = (0, mongoose_1.model)("User", userSchema_1.default);
exports.default = User;
