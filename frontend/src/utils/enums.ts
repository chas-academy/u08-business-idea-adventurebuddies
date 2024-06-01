export const VENUES = ["Inomhus", "Utomhus", "Online"] as const;
export type Venue = typeof VENUES[number];

export const GENDERS = ["Female", "Male", "Other"] as const;
export type Gender = typeof GENDERS[number];

export const LANGUAGES = ["Svenska", "Engelska"] as const;
export type Language = typeof LANGUAGES[number];

export const PRICES = ["Gratis", "50", "100", "200 eller mer"] as const;
export type Price = typeof PRICES[number];

export const EXPERIENCES = ["Nybörjare", "Mellanliggande", "Avancerad"] as const;
export type Experience = typeof EXPERIENCES[number];