export const SearchBarSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-2 border-2 border-border shadow-sm">
        <div className="flex-[1.5] border-r border-border px-4 py-3">
          <div className="mb-1 h-3 w-20 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-50 rounded" />
        </div>

        <div className="flex-1 border-r border-border px-4 py-3">
          <div className="mb-1 h-3 w-24 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-50 rounded" />
        </div>

        <div className="flex-1 border-r border-border px-4 py-3">
          <div className="mb-1 h-3 w-20 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-50 rounded" />
        </div>

        <div className="flex-[0.8] px-4 py-3">
          <div className="mb-1 h-3 w-20 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-50 rounded" />
        </div>

        <div className="flex items-center gap-2 pl-2">
          <div className="h-12 w-32 bg-gray-200 rounded-xl" />
          <div className="h-12 w-24 bg-gray-100 rounded-xl" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-28 bg-gray-100 rounded-full" />
        ))}
      </div>
    </div>
  );
};

SearchBarSkeleton.displayName = "SearchBarSkeleton";
export default SearchBarSkeleton;
