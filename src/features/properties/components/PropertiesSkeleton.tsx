interface PropertiesSkeletonProps {
  count: number | undefined;
}

export const PropertiesSkeleton = ({ count }: PropertiesSkeletonProps) => {
  return (
    <section className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          {count &&
            Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className="embla__slide">
                <div className="flex flex-col h-full animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-300 rounded w-2/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
