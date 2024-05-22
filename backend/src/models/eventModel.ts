import { Schema, model } from "mongoose";
import { IEvent } from "../interfaces/IEvent";
import { ObjectId } from "mongodb";
// import { IUser } from "../interfaces/IUser";

const locationSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const eventSchema = new Schema<IEvent>({
  activity: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "IUser", required: true },
  start_time: { type: Date, default: () => new Date(), required: true },
  end_time: { type: Date, default: () => new Date(), required: true },
  location: locationSchema,
  equipment: { type: String, required: true },
  age: { type: Number, required: false },
  totalParticipant: { type: Number, required: true },
  participants: [
    { type: Schema.Types.ObjectId, ref: "IUser", required: false },
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
});

const Event = model<IEvent>("Event", eventSchema);

export default Event;
