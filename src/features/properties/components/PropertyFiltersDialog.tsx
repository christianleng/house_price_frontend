import { useState, useEffect } from "react";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/ui/select";
import { Checkbox } from "@/core/ui/checkbox";
import { observer } from "mobx-react-lite";
import { useCountProperties } from "../api/properties.queries";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PrisonGuardIcon,
  CarParking01Icon,
  // BalconyIcon,
  // ElevatorIcon,
  FireIcon,
  EnergyIcon,
} from "@hugeicons/core-free-icons";
import type {
  PropertySearchParams,
  TransactionType,
  PropertyType,
  EnergyRating,
  HeatingType,
} from "../types/property.types";

interface IPropertyFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: PropertySearchParams;
  onApply: (filters: PropertySearchParams) => void;
}

const PropertyFiltersDialog = observer(
  ({
    open,
    onOpenChange,
    initialFilters,
    onApply,
  }: IPropertyFiltersDialogProps) => {
    const [localFilters, setLocalFilters] =
      useState<PropertySearchParams>(initialFilters);

    const debouncedFilters = useDebounce(localFilters, 400);
    // const { data: totalCount } = useCountProperties(debouncedFilters);
    const { data: totalCount } = useCountProperties(debouncedFilters, {
      enabled: open,
    });
    useEffect(() => {
      if (open) setLocalFilters(initialFilters);
    }, [open, initialFilters]);
    type BooleanFilterKeys =
      | "has_garden"
      | "has_parking"
      | "has_balcony"
      | "has_elevator";

    const updateFilter = <K extends keyof PropertySearchParams>(
      key: K,
      value: PropertySearchParams[K] | "",
    ) => {
      setLocalFilters((prev) => ({
        ...prev,
        [key]: value === "" ? undefined : value,
      }));
    };

    const handleApply = () => {
      onApply(localFilters);
      onOpenChange(false);
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filtres avancés</DialogTitle>
            <DialogDescription>
              Affinez votre recherche immobilière
            </DialogDescription>
          </DialogHeader>

          <div className="flex bg-gray-100 p-1 rounded-lg">
            {["sale", "rent"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  updateFilter("transaction_type", type as TransactionType)
                }
                className={`flex-1 py-2 rounded-md text-sm font-medium ${
                  localFilters.transaction_type === type
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {type === "sale" ? "Acheter" : "Louer"}
              </button>
            ))}
          </div>

          <section className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Ville"
              value={localFilters.city ?? ""}
              onChange={(e) => updateFilter("city", e.target.value)}
            />
            <Input
              placeholder="Code postal"
              value={localFilters.postal_code ?? ""}
              onChange={(e) => updateFilter("postal_code", e.target.value)}
            />
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Prix min (€)"
              value={localFilters.price_min ?? ""}
              onChange={(e) =>
                updateFilter(
                  "price_min",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
            <Input
              type="number"
              placeholder="Prix max (€)"
              value={localFilters.price_max ?? ""}
              onChange={(e) =>
                updateFilter(
                  "price_max",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              type="number"
              placeholder="Surface min (m²)"
              value={localFilters.surface_min ?? ""}
              onChange={(e) =>
                updateFilter(
                  "surface_min",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
            <Input
              type="number"
              placeholder="Pièces min"
              value={localFilters.rooms_min ?? ""}
              onChange={(e) =>
                updateFilter(
                  "rooms_min",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
            <Input
              type="number"
              placeholder="Chambres min"
              value={localFilters.bedrooms_min ?? ""}
              onChange={(e) =>
                updateFilter(
                  "bedrooms_min",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
            <Input
              type="number"
              placeholder="SDB min"
              value={localFilters.bathrooms_min ?? ""}
              onChange={(e) =>
                updateFilter(
                  "bathrooms_min",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
          </section>

          <Select
            value={localFilters.property_type ?? "all"}
            onValueChange={(v) =>
              updateFilter(
                "property_type",
                v === "all" ? undefined : (v as PropertyType),
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
            </SelectContent>
          </Select>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t pt-4">
            {[
              { key: "has_garden", label: "Jardin", icon: PrisonGuardIcon },
              { key: "has_parking", label: "Parking", icon: CarParking01Icon },
              { key: "has_balcony", label: "Balcon", icon: CarParking01Icon },
              {
                key: "has_elevator",
                label: "Ascenseur",
                icon: CarParking01Icon,
              },
            ].map(({ key, label, icon }) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  checked={Boolean(localFilters[key as BooleanFilterKeys])}
                  onCheckedChange={(checked) =>
                    updateFilter(
                      key as BooleanFilterKeys,
                      checked === true ? true : undefined,
                    )
                  }
                />
                <HugeiconsIcon icon={icon} size={18} />
                <Label>{label}</Label>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Select
              value={localFilters.energy_rating ?? "all"}
              onValueChange={(v) =>
                updateFilter(
                  "energy_rating",
                  v === "all" ? undefined : (v as EnergyRating),
                )
              }
            >
              <SelectTrigger>
                <HugeiconsIcon icon={EnergyIcon} size={16} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {["A", "B", "C", "D", "E", "F", "G"].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={localFilters.heating_type ?? "all"}
              onValueChange={(v) =>
                updateFilter(
                  "heating_type",
                  v === "all" ? undefined : (v as HeatingType),
                )
              }
            >
              <SelectTrigger>
                <HugeiconsIcon icon={FireIcon} size={16} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="electric">Électrique</SelectItem>
                <SelectItem value="gas">Gaz</SelectItem>
                <SelectItem value="wood">Bois</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setLocalFilters({})}>
              Réinitialiser
            </Button>
            <Button onClick={handleApply}>{totalCount ?? 0} résultats</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

PropertyFiltersDialog.displayName = "PropertyFiltersDialog";
export default PropertyFiltersDialog;
