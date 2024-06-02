import { Venue, Gender, Language, Price, Experience } from "./enums";

export interface ISelectedFilters {
  [key: string]: string[];
  venue: string[];
  gender: string[];
  language: string[];
  price: string[];
  experience: string[];
}

export interface IEvent {
  _id: string;
  activity: string;
  user_id: string;
  start_time: Date;
  location: string;
  equipment: string;
  age?: string;
  totalParticipant: number;
  participantsMin: number;
  participantsMax: number;
  participants: string[];
  lat: number;
  lon: number;
  message?: string;
  venue: Venue;
  gender: Gender;
  language: Language;
  price: Price;
  experience: Experience;
}
