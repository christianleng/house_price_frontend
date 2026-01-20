import type { PropertySummary } from "@/core/types";

export interface Favorite {
  id: string;
  property_id: string;
  user_id: string;
  created_at: string;
}

export type FavoriteList = PropertySummary[];

export interface FavoriteError {
  detail: string;
}
