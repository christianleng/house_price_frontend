import { Card } from "@/core/ui/card";

export const PropertyDetailSkeleton = () => {
  return (
    <div className="container max-w-4/5 m-auto p-4 animate-pulse">
      <div className="h-10 w-2/3 bg-gray-200 rounded-md mb-2" />
      <div className="h-5 w-1/2 bg-gray-100 rounded-md mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-96 bg-gray-200 rounded-xl" />

          <Card className="p-6">
            <div className="h-7 w-40 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="h-7 w-48 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-12 bg-gray-100 rounded" />
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-t-4 border-t-blue-100 shadow-lg">
            <div className="h-9 w-40 bg-gray-200 rounded mb-1" />
            <div className="h-4 w-24 bg-gray-100 rounded mb-6" />

            <div className="flex flex-col gap-3">
              <div className="w-full h-12 bg-gray-200 rounded-lg" />
              <div className="w-full h-10 bg-gray-100 rounded-lg" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

PropertyDetailSkeleton.displayName = "PropertyDetailSkeleton";
export default PropertyDetailSkeleton;
