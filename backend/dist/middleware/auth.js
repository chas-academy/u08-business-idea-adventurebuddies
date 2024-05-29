"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Authentication failed. Token missing.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        const user = await userModel_1.default.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error("Authentication failed. User not found.");
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Authentication failed." });
    }
};
exports.auth = auth;
const admin = async (req, res, next) => {
    try {
        await (0, exports.auth)(req, res, async () => {
            if (req.user && req.user.role === 0) {
                next();
            }
            else {
                res.status(403).send({ error: "Access denied. User is not an admin." });
            }
        });
    }
    catch (error) {
        res.status(401).send({ error: "Authentication failed." });
    }
};
exports.admin = admin;
