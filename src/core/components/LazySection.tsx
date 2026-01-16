import { useInView } from "react-intersection-observer";
import { type ReactNode } from "react";

interface ILazySectionProps {
  children: ReactNode;
  height?: string;
}

export const LazySection = ({
  children,
  height = "400px",
}: ILazySectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <div ref={ref} style={{ minHeight: !inView ? height : undefined }}>
      {inView ? children : null}
    </div>
  );
};
