import type { PropertyPreview } from "@/features/properties/types/property.types";

export interface Favorite {
  id: string;
  property_id: string;
  user_id: string;
  created_at: string;
}

export type FavoriteList = PropertyPreview[];

export interface FavoriteError {
  detail: string;
}
