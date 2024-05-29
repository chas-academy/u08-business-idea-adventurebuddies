import mongoose, { Schema, model } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [String],
    required: true,
  },
});

const eventSchema = new Schema<IEvent>({
  activity: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  start_time: { type: Date, default: () => new Date(), required: true },
  location: locationSchema,
  equipment: { type: String, required: true },
  age: { type: Number, required: false },
  totalParticipant: { type: Number, required: true },
  participants: [
    { type: Schema.Types.ObjectId, ref: 'User', required: false },
  ],
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

eventSchema.pre("save", async function (next) {
  try {
    // Use Mongoose model to find and populate user information
    const user = await mongoose.model("User").findById(this.user_id);
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const Event = model<IEvent>("Event", eventSchema);

export default Event;