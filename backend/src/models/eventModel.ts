import mongoose, { Schema, model } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

// const locationSchema = new Schema({
//   type: {
//     type: String,
//     enum: ["Point"],
//     required: true,
//   },
//   coordinates: {
//     type: [String],
//     required: true,
//   },
// });

const eventSchema = new Schema<IEvent>(
  {
    activity: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

    start_time: { type: Date, default: () => new Date(), required: true },
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
      enum: ["Inomhus", "Utomhus", "Online", ""],
      required: false,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other", ""],
      required: false,
    },
    language: {
      type: String,
      enum: ["Svenska", "Engelska", ""],
      required: false,
    },
    price: {
      type: String,
      enum: ["Gratis", "50", "100", "200 eller mer", ""],
      required: false,
    },
    experience: {
      type: String,
      enum: ["Nybörjare", "Mellanliggande", "Avancerad", ""],
      required: false,
    },
    userName: { type: String }, 
    userEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre<IEvent>("save", async function (next) {
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
