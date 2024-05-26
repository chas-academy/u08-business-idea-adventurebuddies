import mongoose, { Schema } from "mongoose";
import { IFriend } from "../interfaces/IFriend";

const friendSchema: Schema = new Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    required: true,
  },
});

const Friend = mongoose.model<IFriend>("Friend", friendSchema);

export default Friend;
