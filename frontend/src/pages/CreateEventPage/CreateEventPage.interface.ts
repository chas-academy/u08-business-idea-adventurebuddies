export interface IEvent2 {
  activity: string;
  location: string;
  start_time: Date;
  participantsMin: number;
  participantsMax: number;
  equipment: string;
  age: string;
  lat: string;
  lon: string;
  // Venue ska vara en opten med dessa tre nedan som val
  venue: string;
  // Inomhus;
  // Utomhus;
  // Online;
  gender: string;
  // female;
  // male;
  // other;
  language: string;
  // svenska;
  // engelska;
  price: number;
  experience: string;
  // nybörjare;
  // mellanliggande;
  // avancerad;
  totalParticipants: number;
}
