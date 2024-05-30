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

const eventSchema = new Schema<IEvent>(
  {
    activity: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // start_time: { type: Date, default: () => new Date(), required: true },
    // end_time: { type: Date, default: () => new Date(), required: true },


    location: { type: String, required: true },
    equipment: { type: String, required: true },
    age: { type: String, required: false },
    totalParticipant: { type: Number, required: true },
    participantsMin: { type: Number, required: true },
    participantsMax: { type: Number, required: true },
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: false },
    ],
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    message: { type: String, required: false },
    venue: {
      type: String,
      enum: ["Inomhus", "Utomhus", "Online"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other"],
      required: true,
    },
    language: {
      type: String,
      enum: ["Svenska", "Engelska"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      enum: ["Nybörjare", "Mellanliggande", "Avancerad"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
