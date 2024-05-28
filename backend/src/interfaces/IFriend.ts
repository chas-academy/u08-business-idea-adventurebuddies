import mongoose from "mongoose";

export interface IFriend extends mongoose.Document {
  requester: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  status: string;
}
