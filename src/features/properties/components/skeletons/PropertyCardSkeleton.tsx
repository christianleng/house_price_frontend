export const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="relative h-48 bg-gray-200 rounded-xl overflow-hidden">
        <div className="absolute bottom-3 left-3 h-7 w-7 rounded bg-gray-300/50" />
        <div className="absolute bottom-3 right-3 h-5 w-10 rounded-full bg-gray-300/50" />
      </div>

      <div className="flex flex-col gap-1.5 py-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-1">
            <div className="h-6 w-24 bg-blue-100 rounded-md" />
            <div className="h-3 w-12 bg-gray-100 rounded" />
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-100" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="h-5 w-full bg-gray-200 rounded" />
          <div className="h-5 w-[85%] bg-gray-100 rounded" />
          <div className="h-4 w-1/2 bg-gray-50 rounded" />
        </div>
      </div>
    </div>
  );
};
