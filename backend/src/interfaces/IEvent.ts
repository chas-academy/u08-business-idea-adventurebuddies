import { Date } from "mongoose";
import { ObjectId } from "mongodb";

interface Location {
    type: 'Point';
    coordinates: [string, string];
  }

export interface IEvent {
    activity: string;
    user_id: ObjectId;
    start_time: Date;
    location: Location;
    equipment: string;
    age: number;
    totalParticipant: number;
    participants: ObjectId[];
    message: string;
    created_at: Date;
    updated_at: Date;
}