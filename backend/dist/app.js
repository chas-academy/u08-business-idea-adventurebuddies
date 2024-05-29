"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const events_1 = __importDefault(require("./routes/events"));
const users_1 = __importDefault(require("./routes/users"));
const friends_1 = __importDefault(require("./routes/friends"));
const sport_1 = __importDefault(require("./routes/sport"));
const db_1 = __importDefault(require("./db/db"));
db_1.default;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", users_1.default);
app.use("/api/sports", sport_1.default);
app.use("/api/events", events_1.default);
app.use("/api/friends", friends_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.default = app;
