import { makeAutoObservable } from "mobx";
import type { PropertyFilters } from "../types/property.types";

class PropertyFiltersStore {
  filters: PropertyFilters = {
    page: 1,
    page_size: 20,
    sort_by: "created_at",
    sort_order: "desc",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) => {
    this.filters = { ...this.filters, [key]: value };
  };

  setFilters = (filters: Partial<PropertyFilters>) => {
    this.filters = { ...this.filters, ...filters };
  };

  resetFilters = () => {
    this.filters = {
      page: 1,
      page_size: 20,
      sort_by: "created_at",
      sort_order: "desc",
    };
  };

  setPage = (page: number) => {
    this.filters.page = page;
  };

  nextPage = () => {
    this.filters.page = (this.filters.page || 1) + 1;
  };

  prevPage = () => {
    if (this.filters.page && this.filters.page > 1) {
      this.filters.page -= 1;
    }
  };
}

export const propertyFiltersStore = new PropertyFiltersStore();
