import { useState, useLayoutEffect } from "react";

export function usePriorityCount() {
  const [priorityCount, setPriorityCount] = useState(1);

  useLayoutEffect(() => {
    const breakpoints = [
      { query: "(min-width: 2560px)", count: 8 },
      { query: "(min-width: 1920px)", count: 7 },
      { query: "(min-width: 1536px)", count: 6 },
      { query: "(min-width: 1280px)", count: 5 },
      { query: "(min-width: 1024px)", count: 4 },
      { query: "(min-width: 768px)", count: 3 },
      { query: "(min-width: 640px)", count: 2 },
    ];

    const mqls = breakpoints.map((bp) => ({
      mql: window.matchMedia(bp.query),
      count: bp.count,
    }));

    const updateCount = () => {
      const match = mqls.find((item) => item.mql.matches);

      setPriorityCount(match ? match.count : 1);
    };

    updateCount();

    mqls.forEach((item) => item.mql.addEventListener("change", updateCount));

    return () => {
      mqls.forEach((item) =>
        item.mql.removeEventListener("change", updateCount),
      );
    };
  }, []);

  return priorityCount;
}
