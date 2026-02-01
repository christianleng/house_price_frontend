import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export const PropertyCarouselSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="h-6 w-48 bg-gray-200 rounded-md" />
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="h-5 w-5 text-gray-100"
          />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 rounded-full bg-gray-100" />
          <div className="h-10 w-10 rounded-full bg-gray-100" />
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="min-w-70 md:min-w-[320px] lg:min-w-87.5 shrink-0"
          >
            <div className="aspect-4/3 w-full bg-gray-100 rounded-2xl mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-1/2 bg-gray-50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PropertyCarouselSkeleton.displayName = "PropertyCarouselSkeleton";
export default PropertyCarouselSkeleton;
