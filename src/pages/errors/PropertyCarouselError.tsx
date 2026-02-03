import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, Refresh01Icon } from "@hugeicons/core-free-icons";

interface PropertyCarouselErrorProps {
  title: string;
  resetErrorBoundary: () => void;
}

export function PropertyCarouselError({
  title,
  resetErrorBoundary,
}: PropertyCarouselErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl bg-gray-50/50 border border-dashed border-gray-200 text-center">
      <div className="bg-red-50 p-3 rounded-full mb-3">
        <HugeiconsIcon icon={Alert02Icon} className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="font-bold text-gray-900">Impossible de charger {title}</h3>
      <p className="text-xs text-gray-500 mt-1 mb-4">
        Un problème technique est survenu.
      </p>

      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 transition shadow-sm"
      >
        <HugeiconsIcon icon={Refresh01Icon} className="w-4 h-4 text-gray-600" />
        Réessayer
      </button>
    </div>
  );
}

export default PropertyCarouselError;
