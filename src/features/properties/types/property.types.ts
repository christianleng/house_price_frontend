export const PROPERTY_TYPES = {
  HOUSE: "house",
  APARTMENT: "apartment",
  VILLA: "villa",
  STUDIO: "studio",
  LOFT: "loft",
} as const;
export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

export const ENERGY_RATINGS = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
} as const;
export type EnergyRating = (typeof ENERGY_RATINGS)[keyof typeof ENERGY_RATINGS];

export const HEATING_TYPES = {
  INDIVIDUAL: "individual",
  COLLECTIVE: "collective",
  ELECTRIC: "electric",
  GAS: "gas",
  HEAT_PUMP: "heat_pump",
} as const;
export type HeatingType = (typeof HEATING_TYPES)[keyof typeof HEATING_TYPES];

export const TRANSACTION_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;
export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const SORT_BY = {
  CREATED_AT: "created_at",
  PRICE: "price",
  SURFACE_AREA: "surface_area",
  PRICE_PER_SQM: "price_per_sqm",
  ROOMS: "rooms",
} as const;

export type sort_by = (typeof SORT_BY)[keyof typeof SORT_BY];

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type sort_order = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

type Brand<K, T> = K & { __brand: T };

export type PropertyId = Brand<string, "PropertyId">;
export type AgentId = Brand<string, "AgentId">;
export type PropertyReference = Brand<string, "PropertyReference">;

interface PropertyPhoto {
  id: string;
  url: string | null;
  url_thumbnail: string | null;
  is_primary: boolean;
  order: number;
}

interface BaseProperty {
  id: PropertyId;
  agent_id: AgentId;
  reference: PropertyReference;
  title: string;
  description: string | null;
  address: string | null;
  neighborhood: string;
  city: string;
  district: string;
  postal_code: string;
  latitude: number;
  longitude: number;
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
  energy_rating: EnergyRating;
  heating_type: HeatingType | null;
  construction_year: number | null;
  available_from: string | null;
  is_furnished: boolean | null;
  created_at: string;
  updated_at: string | null;
  is_active: boolean;
  views_count: number;

  photos: PropertyPhoto[];
  thumbnail_url: string | null;
}

export interface SaleProperty extends BaseProperty {
  transaction_type: typeof TRANSACTION_TYPES.SALE;
  price: number;
  price_per_sqm: number;
}

export interface RentProperty extends BaseProperty {
  transaction_type: typeof TRANSACTION_TYPES.RENT;
  rent_price_monthly: number;
  deposit: number | null;
  charges_included: boolean;
}

export type Property = SaleProperty | RentProperty;

interface BasePropertyPreview extends Pick<
  BaseProperty,
  | "id"
  | "reference"
  | "title"
  | "city"
  | "postal_code"
  | "property_type"
  | "surface_area"
  | "rooms"
  | "bedrooms"
  | "latitude"
  | "longitude"
  | "created_at"
> {
  thumbnail_url: string | null;
  photos_count: number;
  energy_rating: EnergyRating;
}

export interface SalePropertyPreview extends BasePropertyPreview {
  transaction_type: typeof TRANSACTION_TYPES.SALE;
  price: number;
  price_per_sqm: number;
}

export interface RentPropertyPreview extends BasePropertyPreview {
  transaction_type: typeof TRANSACTION_TYPES.RENT;
  rent_price_monthly: number;
}

export type PropertyPreview = SalePropertyPreview | RentPropertyPreview;

export type PropertySearchParams = {
  city?: string;
  postal_code?: string;
  district?: string;
  neighborhood?: string;

  transaction_type?: TransactionType;

  max_price?: number;
  min_surface?: number;

  price_min?: number;
  price_max?: number;
  price_per_sqm_min?: number;
  price_per_sqm_max?: number;

  rent_price_min?: number;
  rent_price_max?: number;

  surface_min?: number;
  surface_max?: number;
  rooms_min?: number;
  bedrooms_min?: number;
  bathrooms_min?: number;
  toilets_min?: number;
  floors_min?: number;
  floor_number_min?: number;

  property_type?: PropertyType;
  energy_rating?: EnergyRating;
  heating_type?: HeatingType;
  construction_year_min?: number;

  has_garden?: boolean;
  has_terrace?: boolean;
  has_balcony?: boolean;
  has_parking?: boolean;
  has_cave?: boolean;
  has_elevator?: boolean;
  has_pool?: boolean;
  is_furnished?: boolean;
  is_quiet?: boolean;

  is_active?: boolean;
  available_from?: string;

  sort_by?: sort_by;
  sort_order?: sort_order;
  page?: number;
  page_size?: number;
};

export interface CityPropertyCollection {
  city: string;
  properties: PropertyPreview[];
  total: number;
}

export interface CitiesPropertiesResponse {
  data: Record<string, CityPropertyCollection>;
  transaction_type: TransactionType;
}
