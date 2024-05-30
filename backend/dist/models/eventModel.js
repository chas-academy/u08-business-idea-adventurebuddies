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
    end_time: { type: Date, default: () => new Date(), required: false },
    location: { type: String, required: true },
    equipment: { type: String, required: true },
    age: { type: String, required: false },
    totalParticipants: { type: Number, required: true },
    participantsMin: { type: Number, required: true },
    participantsMax: { type: Number, required: true },
    participants: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false },
    ],
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    message: { type: String, required: false },
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
}, {
    timestamps: true,
});
const Event = (0, mongoose_1.model)("Event", eventSchema);
exports.default = Event;
