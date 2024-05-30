"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sportScema = new mongoose_1.Schema({
    name: { type: String, required: true },
    rules: { type: String, required: true },
    time: { type: String, required: true },
    player: { type: String, required: true }
});
const Sport = (0, mongoose_1.model)('Sport', sportScema);
exports.default = Sport;
