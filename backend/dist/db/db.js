"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectSportDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URL || "";
        await (0, mongoose_1.connect)(mongoURI);
        console.log("MongoDB Connected...");
    }
    catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};
// Om vi vill connecta till mer än en databas behöver vi egna funktioner för dem.
// export { connectSportDB, connectUserDB };
exports.default = connectSportDB();
