import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@/core/ui/button";
import { PreferenceHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { propertyFiltersStore } from "@/core/stores";
import PropertyFiltersDialog from "../properties/components/PropertyFiltersDialog";

const Search = observer(() => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          className="p-4 rounded-2xl border border-black"
          onClick={() => setIsDialogOpen(true)}
        >
          {propertyFiltersStore.filters.city || "Localisation"}
        </Button>

        <Button
          variant="outline"
          className="p-4 rounded-2xl border"
          onClick={() => setIsDialogOpen(true)}
        >
          Acheter Appartement ou maison
        </Button>
        <Button
          variant="outline"
          className="p-4 rounded-2xl border"
          onClick={() => setIsDialogOpen(true)}
        >
          Budget
        </Button>
        <Button
          variant="outline"
          className="p-4 rounded-2xl border"
          onClick={() => setIsDialogOpen(true)}
        >
          Pièces
        </Button>
        <Button
          variant="outline"
          className="p-4 rounded-2xl border"
          onClick={() => setIsDialogOpen(true)}
        >
          Surfaces
        </Button>

        <Button
          variant="outline"
          className="p-4 rounded-2xl border"
          onClick={() => setIsDialogOpen(true)}
        >
          <HugeiconsIcon
            icon={PreferenceHorizontalIcon}
            className="mr-2 h-5 w-5"
          />
          Filtres
        </Button>
      </div>
      <PropertyFiltersDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialFilters={propertyFiltersStore.filters}
        onApply={(newFilters) => {
          propertyFiltersStore.setFilters({ ...newFilters, page: 1 });
        }}
      />
    </div>
  );
});

export default Search;
