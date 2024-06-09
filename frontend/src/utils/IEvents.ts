import { ObjectId } from "mongodb";

export interface IEvent {
    activity: string;
    user_id: ObjectId;
    _id: ObjectId;
  
    start_time: number;
    // start_time: Date;
    //end_time: Date;
  
    userName?: string;
    userEmail?: string;
    profileImageUrl?: string;
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
    price: "Gratis" | "50" | "100" | "200 eller mer";
    experience: "Nybörjare" | "Mellanliggande" | "Avancerad";
  }
  