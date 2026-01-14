import * as React from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => {
    const breakpointSm = getComputedStyle(document.documentElement)
      .getPropertyValue("--breakpoint-sm")
      .trim();
    const breakpointValue = parseInt(breakpointSm, 10);
    return window.innerWidth < breakpointValue;
  });

  React.useEffect(() => {
    const breakpointSm = getComputedStyle(document.documentElement)
      .getPropertyValue("--breakpoint-sm")
      .trim();
    const breakpointValue = parseInt(breakpointSm, 10);
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointValue);
    };

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
