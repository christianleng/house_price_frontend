import { useState, useEffect, type KeyboardEvent } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@/core/ui/button";
import { PreferenceHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PropertyFiltersDialog from "@/features/properties/components/PropertyFiltersDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/ui/select";
import { propertyFiltersStore } from "@/features/properties/store/property-filters-store";
import type {
  PropertyType,
  PropertySearchParams,
} from "../types/property.types";

const SearchBar = observer(() => {
  const [focused, setFocused] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState<PropertySearchParams>(
    propertyFiltersStore.filters,
  );

  useEffect(() => {
    setLocalFilters({ ...propertyFiltersStore.filters });
  }, []);

  const updateFilter = <K extends keyof PropertySearchParams>(
    key: K,
    value: PropertySearchParams[K],
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    propertyFiltersStore.setFilters({ ...localFilters, page: 1 });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div
        className={`
            flex flex-wrap items-center gap-0 rounded-2xl bg-white p-2
            border-2 transition-all duration-300
            ${
              focused
                ? "border-primary shadow-lg ring-1 ring-primary/20"
                : "border-border shadow-sm"
            }
          `}
      >
        <SearchField label="Localisation" className="flex-[1.5] border-r">
          <input
            value={localFilters.city || ""}
            onChange={(e) => updateFilter("city", e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ville, quartier, code postal…"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground/70"
          />
        </SearchField>

        <SearchField label="Type de bien" className="flex-1 border-r">
          <Select
            value={localFilters.property_type ?? "Appartement ou maison"}
            onValueChange={(v) =>
              updateFilter(
                "property_type",
                v === "Appartement ou maison" ? undefined : (v as PropertyType),
              )
            }
          >
            <SelectTrigger className="h-auto w-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Appartement">Appartement</SelectItem>
              <SelectItem value="Maison">Maison</SelectItem>
              <SelectItem value="Terrain">Terrain</SelectItem>
              <SelectItem value="Local commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <SearchField label="Budget max" className="flex-1 border-r">
          <Select
            value={localFilters.price_max?.toString() ?? "Pas de maximum"}
            onValueChange={(v) =>
              updateFilter(
                "price_max",
                v === "Pas de maximum" ? undefined : Number(v),
              )
            }
          >
            <SelectTrigger className="h-auto w-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="200000">200 000 €</SelectItem>
              <SelectItem value="300000">300 000 €</SelectItem>
              <SelectItem value="400000">400 000 €</SelectItem>
              <SelectItem value="500000">500 000 €</SelectItem>
              <SelectItem value="750000">750 000 €</SelectItem>
              <SelectItem value="1000000">1 000 000 €</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <SearchField label="Surface min" className="flex-[0.8]">
          <Select
            value={localFilters.surface_min?.toString() ?? "Surface"}
            onValueChange={(v) =>
              updateFilter(
                "surface_min",
                v === "Surface" ? undefined : Number(v),
              )
            }
          >
            <SelectTrigger className="h-auto w-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20 m²</SelectItem>
              <SelectItem value="40">40 m²</SelectItem>
              <SelectItem value="60">60 m²</SelectItem>
              <SelectItem value="80">80 m²</SelectItem>
              <SelectItem value="100">100 m²</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <div className="flex items-center gap-2 pl-3">
          <Button
            onClick={handleSearch}
            className="h-12 rounded-xl bg-primary px-6 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90 active:scale-95"
          >
            Rechercher
          </Button>

          <Button
            variant="outline"
            className="h-12 rounded-xl border-border/50 bg-gray-50 text-foreground hover:bg-gray-100"
            onClick={() => setIsDialogOpen(true)}
          >
            <HugeiconsIcon
              icon={PreferenceHorizontalIcon}
              className="mr-2 size-5"
            />
            Filtres
          </Button>
        </div>
      </div>

      {isDialogOpen && (
        <PropertyFiltersDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          initialFilters={localFilters}
          onApply={(newFilters) => {
            propertyFiltersStore.setFilters({ ...newFilters, page: 1 });
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
});

function SearchField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-center px-4 py-1.5 ${className}`}>
      <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
        {label}
      </div>
      <div className="relative flex h-6 items-center">{children}</div>
    </div>
  );
}

SearchBar.displayName = "SearchBar";
export default SearchBar;
