interface PropertiesSkeletonProps {
  count: number | undefined;
}

const PropertiesSkeleton = ({ count = 4 }: PropertiesSkeletonProps) => {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="min-w-70 flex-1">
          <div className="flex flex-col h-full opacity-70">
            <div className="h-48 bg-gray-200 rounded-xl mb-4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

PropertiesSkeleton.displayName = "PropertiesSkeleton";
export { PropertiesSkeleton };
