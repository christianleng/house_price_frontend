import { useState } from "react";
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
import type { PropertyType } from "../types/property.types";

const SearchBar = observer(() => {
  const [focused, setFocused] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { filters } = propertyFiltersStore;

  return (
    <>
      <div
        className={`
            flex flex-wrap items-center gap-3 rounded-2xl bg-white p-2
            border-2 transition-all duration-300
            ${
              focused
                ? "border-color-primary shadow-brand-lg"
                : "border-border shadow-sm"
            }
          `}
      >
        <SearchField label="Localisation" className="flex-[1.5] border-r">
          <input
            value={filters.city || ""}
            onChange={(e) =>
              propertyFiltersStore.setFilter("city", e.target.value)
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ville, quartier, code postal…"
            className="search-input"
          />
        </SearchField>

        <SearchField label="Type de bien" className="flex-1 border-r">
          <Select
            value={filters.property_type ?? "all"}
            onValueChange={(v) =>
              propertyFiltersStore.setFilter(
                "property_type",
                v === "all" ? undefined : (v as PropertyType),
              )
            }
          >
            <SelectTrigger className="search-input">
              <SelectValue placeholder="Appartement ou maison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Appartement ou maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <SearchField label="Budget max" className="flex-1 border-r">
          <Select
            value={filters.max_price?.toString() ?? "all"}
            onValueChange={(v) =>
              propertyFiltersStore.setFilter(
                "max_price",
                v === "all" ? undefined : Number(v),
              )
            }
          >
            <SelectTrigger className="search-input">
              <SelectValue placeholder="Pas de maximum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Pas de maximum</SelectItem>
              <SelectItem value="200000">200 000 €</SelectItem>
              <SelectItem value="300000">300 000 €</SelectItem>
              <SelectItem value="500000">500 000 €</SelectItem>
              <SelectItem value="750000">750 000 €</SelectItem>
              <SelectItem value="1000000">1 000 000 €</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <SearchField label="Surface min" className="flex-[0.8]">
          <Select
            value={filters.min_surface?.toString() ?? "all"}
            onValueChange={(v) =>
              propertyFiltersStore.setFilter(
                "min_surface",
                v === "all" ? undefined : Number(v),
              )
            }
          >
            <SelectTrigger className="search-input">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="20">20 m²</SelectItem>
              <SelectItem value="40">40 m²</SelectItem>
              <SelectItem value="60">60 m²</SelectItem>
              <SelectItem value="80">80 m²</SelectItem>
              <SelectItem value="100">100 m²</SelectItem>
            </SelectContent>
          </Select>
        </SearchField>

        <div className="flex items-center gap-2 pl-2">
          <Button
            onClick={() => propertyFiltersStore.setFilters({ page: 1 })}
            className="h-12 rounded-xl bg-linear-to-br from-brand-400 to-brand-700 px-6 font-semibold shadow-brand"
          >
            Rechercher
          </Button>

          <Button
            variant="outline"
            className="h-12 rounded-xl"
            onClick={() => setIsDialogOpen(true)}
          >
            <HugeiconsIcon icon={PreferenceHorizontalIcon} className="mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "🏡 Avec jardin",
          "🅿️ Parking inclus",
          "🆕 Neuf",
          "📸 Visite virtuelle",
          "⚡ Coup de cœur",
        ].map((label) => (
          <button
            key={label}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted"
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-1 rounded-full border border-dashed px-4 py-2 text-sm text-muted-foreground"
        >
          + Plus de filtres
        </button>
      </div>
      {isDialogOpen && (
        <PropertyFiltersDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          initialFilters={filters}
          onApply={(newFilters) =>
            propertyFiltersStore.setFilters({ ...newFilters, page: 1 })
          }
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
    <div className={`px-4 py-3 ${className}`}>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

SearchBar.displayName = "SearchBar";
export default SearchBar;
