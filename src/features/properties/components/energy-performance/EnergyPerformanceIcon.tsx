import { cn } from "@/core/lib/utils";
import type { EnergyRating } from "../../types/property.types";

interface EnergyPerformanceProps {
  value: EnergyRating;
  className?: string;
}

const DPE_CONFIG: Record<EnergyRating, { bg: string }> = {
  A: { bg: "bg-[#008D36]" },
  B: { bg: "bg-[#4BBE2C]" },
  C: { bg: "bg-[#C8D400]" },
  D: { bg: "bg-[#F5E500]" },
  E: { bg: "bg-[#F9B000]" },
  F: { bg: "bg-[#EF7D00]" },
  G: { bg: "bg-[#E30613]" },
};

export const EnergyPerformanceIcon = ({
  value,
  className,
}: EnergyPerformanceProps) => {
  const config = DPE_CONFIG[value];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center w-8 h-6 text-xs font-bold shadow-xs",
        "rounded-l-sm",
        config.bg,
        className,
      )}
      style={{
        clipPath: "polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%)",
      }}
    >
      <span className="pr-1.5">{value}</span>
    </div>
  );
};
