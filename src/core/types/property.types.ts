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
  heating_type: HeatingType | null;

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
}

export interface PropertyFilters {
  city?: string;
  postal_code?: string;
  district?: string;
  neighborhood?: string;

  price_min?: number;
  price_max?: number;

  surface_min?: number;
  surface_max?: number;

  rooms_min?: number;
  rooms_max?: number;
  bedrooms_min?: number;

  property_type?: PropertyType;

  has_garden?: boolean;
  has_parking?: boolean;
  has_balcony?: boolean;
  has_terrace?: boolean;
  has_elevator?: boolean;
  is_furnished?: boolean;

  energy_rating?: EnergyRating;
  transaction_type?: TransactionType;

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
