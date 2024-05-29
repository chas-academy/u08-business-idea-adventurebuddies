import { Date } from "mongoose";
import { ObjectId } from "mongodb";

// interface Location {
//   type: "Point";
//   coordinates: [number, number];
// }

// type AgeRange =
//   | "18-25"
//   | "25-35"
//   | "35-45"
//   | "45-55"
//   | "55-65"
//   | "65+"
//   | "18+"
//   | string;

export interface IEvent {
  _id: ObjectId;
  activity: string;
  user_id: ObjectId;
  start_time: Date;
  end_time: Date;
  location: string;
  equipment: string;
  age: string;
  totalParticipants: number;
  participantsMin: number;
  participantsMax: number;
  participants: ObjectId[];
  message: string;
  lat: string;
  lon: string;
  venue: "Inomhus" | "Utomhus" | "Online";
  gender: "Female" | "Male" | "Other";
  language: "Svenska" | "Engelska";
  price: number;
  experience: "Nybörjare" | "Mellanliggande" | "Avancerad";
}
