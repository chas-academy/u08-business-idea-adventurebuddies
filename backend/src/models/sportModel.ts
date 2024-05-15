import { Schema, model } from "mongoose";
import { ISport } from "../interfaces/ISport";

const sportScema = new Schema<ISport> ({
    name: { type: String, required: true},
    rules: { type: String, required: true},
    time:  { type: String, required: true},
    player:  { type: String, required: true}
});

const Sport = model<ISport>('Sport', sportScema);

export default Sport;
