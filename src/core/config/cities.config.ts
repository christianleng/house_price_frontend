export const FEATURED_CITIES = [
  "Paris",
  "Lyon",
  "Bordeaux",
  "Marseille",
] as const;

export type FeaturedCity = (typeof FEATURED_CITIES)[number];
