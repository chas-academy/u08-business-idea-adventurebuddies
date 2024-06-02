export const VENUES: string[] = ["Inomhus", "Utomhus", "Online"];
export type Venue = typeof VENUES[number];

export const GENDERS: string[] = ["Female", "Male", "Other"];
export type Gender = typeof GENDERS[number];

export const LANGUAGES: string[] = ["Svenska", "Engelska"];
export type Language = typeof LANGUAGES[number];

export const PRICES: string[] = ["Gratis", "50", "100", "200 eller mer"];
export type Price = typeof PRICES[number];

export const EXPERIENCES: string[] = ["Nybörjare", "Mellanliggande", "Avancerad"];
export type Experience = typeof EXPERIENCES[number];