import { Schema, model } from "mongoose";
import { IEvent } from "../interfaces/IEvent";
import { ObjectId } from "mongodb";
// import { User } from "../models/User";

const locationSchema = new Schema({
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

const eventSchema = new Schema<IEvent>(
  {
    activity: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start_time: { type: Date, default: () => new Date(), required: true },
    end_time: { type: Date, default: () => new Date(), required: true },
    location: { type: String, required: true },
    equipment: { type: String, required: true },
    age: { type: Number, required: false },
    totalParticipant: { type: Number, required: true },
    participantsMin: { type: Number, required: true },
    participantsMax: { type: Number, required: true },
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: false },
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
  },
  {
    timestamps: true,
  }
);

const Event = model<IEvent>("Event", eventSchema);

export default Event;
