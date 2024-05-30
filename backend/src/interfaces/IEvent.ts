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
  activity: string;
  user_id: ObjectId;
  userName?: string;
  userEmail?: string;
  start_time: Date;
  location: string;
  equipment: string;
  age: string;
  totalParticipant: number;
  participantsMin: number;
  participantsMax: number;
  participants: ObjectId[];
  message: string;
  lat: number;
  lon: number;
  venue: "Inomhus" | "Utomhus" | "Online";
  gender: "Female" | "Male" | "Other";
  language: "Svenska" | "Engelska";
  price: number;
  experience: "Nybörjare" | "Mellanliggande" | "Avancerad";
}
