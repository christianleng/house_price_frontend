import { useState, useEffect, useRef } from "react";

export const useLazyCitiesRender = (
  totalCities: number,
  chunkSize: number = 2
) => {
  const [visibleCount, setVisibleCount] = useState(chunkSize);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < totalCities) {
          setVisibleCount((prev) => Math.min(prev + chunkSize, totalCities));
        }
      },
      { rootMargin: "200px" }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleCount, totalCities, chunkSize]);

  return { visibleCount, sentinelRef };
};
