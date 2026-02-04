import { makeAutoObservable } from "mobx";
import type { PropertyPreview, PropertyId } from "../types/property.types";

class PropertiesSyncStore {
  currentProperties: PropertyPreview[] = [];
  hoveredPropertyId: PropertyId | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProperties(properties: PropertyPreview[]) {
    this.currentProperties = properties;
  }

  setHoveredPropertyId(id: PropertyId | null) {
    this.hoveredPropertyId = id;
  }
}

export const propertiesSyncStore = new PropertiesSyncStore();
