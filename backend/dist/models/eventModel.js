"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// import { User } from "../models/User";
const locationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
const eventSchema = new mongoose_1.Schema({
    activity: { type: String, required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    start_time: { type: Date, default: () => new Date(), required: true },
    end_time: { type: Date, default: () => new Date(), required: true },
    location: locationSchema,
    equipment: { type: String, required: true },
    age: {
        type: String,
        enum: ["18-25", "25-35", "35-45", "45-55", "55-65", "65+", "18+"],
        required: false,
    },
    totalParticipant: { type: Number, required: true },
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false }],
    message: { type: String, required: false },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    venue: {
        type: String,
        enum: ["Inomhus", "Utomhus", "Online"],
        required: true,
    },
    gender: {
        type: String,
        enum: ["female", "male", "other"],
        required: true,
    },
    language: {
        type: String,
        enum: ["svenska", "engelska"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    experience: {
        type: String,
        enum: ["nybörjare", "mellanliggande", "avancerad"],
        required: true,
    },
});
const Event = (0, mongoose_1.model)("Event", eventSchema);
exports.default = Event;
