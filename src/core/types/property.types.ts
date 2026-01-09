export const PROPERTY_TYPE = {
  HOUSE: "house",
  APARTMENT: "apartment",
  VILLA: "villa",
  STUDIO: "studio",
  LOFT: "loft",
} as const;

export type PropertyType = (typeof PROPERTY_TYPE)[keyof typeof PROPERTY_TYPE];

export const ENERGY_RATING = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
} as const;

export type EnergyRating = (typeof ENERGY_RATING)[keyof typeof ENERGY_RATING];

export const HEATING_TYPE = {
  INDIVIDUAL: "individual",
  COLLECTIVE: "collective",
  ELECTRIC: "electric",
  GAS: "gas",
  HEAT_PUMP: "heat_pump",
} as const;

export type HeatingType = (typeof HEATING_TYPE)[keyof typeof HEATING_TYPE];

export const TRANSACTION_TYPE = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export interface Property {
  id: string;
  agent_id: string;
  reference: string;
  title: string;
  description: string | null;

  address: string | null;
  neighborhood: string;
  city: string;
  district: string;
  postal_code: string;
  latitude: number;
  longitude: number;

  price: number;
  price_per_sqm: number;

  property_type: PropertyType;
  surface_area: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number | null;
  toilets: number | null;
  floors: number | null;
  floor_number: number | null;

  has_cave: boolean | null;
  has_elevator: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  has_garden: boolean;
  has_parking: boolean;
  parking_spaces: number | null;

  energy_rating: EnergyRating | null;
  heating_type: HeatingType;

  construction_year: number | null;
  available_from: string | null;
  is_furnished: boolean | null;

  created_at: string;
  updated_at: string | null;
  is_active: boolean;
  views_count: number;
}

export interface PropertySummary {
  id: string;
  reference: string;
  title: string;
  city: string;
  postal_code: string;
  price: number | null;
  price_per_sqm: number | null;
  property_type: PropertyType;
  surface_area: number;
  rooms: number;
  bedrooms: number;
  has_parking: boolean;
  has_garden: boolean;
  created_at: string;
  thumbnail_url: string | null;
  transaction_type: TransactionType;
  rent_price_monthly: number;
  energy_rating: EnergyRating;
  photos_count: number;
}

export interface PropertyFilters {
  // --------------------
  // Localisation
  // --------------------
  city?: string;
  postal_code?: string;
  district?: string;
  neighborhood?: string;

  // --------------------
  // Transaction
  // --------------------
  transaction_type?: TransactionType; // sale | rent

  // --------------------
  // Prix (vente)
  // --------------------
  price_min?: number;
  price_max?: number;
  price_per_sqm_min?: number;
  price_per_sqm_max?: number;

  // --------------------
  // Prix (location)
  // --------------------
  rent_price_min?: number;
  rent_price_max?: number;

  // --------------------
  // Surfaces & pièces
  // --------------------
  surface_min?: number;
  surface_max?: number;

  rooms_min?: number;
  rooms_max?: number;

  bedrooms_min?: number;
  bathrooms_min?: number;
  toilets_min?: number;

  floors_min?: number;
  floor_number_min?: number;

  // --------------------
  // Type de bien
  // --------------------
  property_type?: PropertyType;

  // --------------------
  // Équipements
  // --------------------
  has_garden?: boolean;
  has_terrace?: boolean;
  has_balcony?: boolean;
  has_parking?: boolean;
  has_cave?: boolean;
  has_elevator?: boolean;
  has_pool?: boolean;

  is_furnished?: boolean;
  is_quiet?: boolean;

  // --------------------
  // Parking / étage
  // --------------------
  parking_spaces_min?: number;

  // --------------------
  // Année / disponibilité
  // --------------------
  construction_year_min?: number;
  available_from?: string; // ISO date string

  // --------------------
  // Énergie
  // --------------------
  energy_rating?: EnergyRating;
  heating_type?: HeatingType;

  // --------------------
  // Métadonnées
  // --------------------
  is_active?: boolean;

  // --------------------
  // Tri & pagination
  // --------------------
  sort_by?: "created_at" | "price" | "surface_area" | "price_per_sqm" | "rooms";

  sort_order?: "asc" | "desc";

  page?: number;
  page_size?: number;
}

export interface PaginatedProperties {
  items: PropertySummary[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
