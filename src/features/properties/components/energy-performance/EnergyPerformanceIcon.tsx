import type { EnergyRating } from "../../types/property.types";

interface EnergyPerformanceProps {
  value: EnergyRating;
}

const DPE_COLORS: Record<EnergyRating, string> = {
  A: "#008D36",
  B: "#4BBE2C",
  C: "#C8D400",
  D: "#F5E500",
  E: "#F9B000",
  F: "#EF7D00",
  G: "#E30613",
};

const EnergyPerformance = ({ value }: EnergyPerformanceProps) => {
  const backgroundColor = DPE_COLORS[value];

  return (
    <div
      className="inline-flex items-center justify-center w-8 h-6 text-slate-800 shadow-sm"
      style={{
        backgroundColor: backgroundColor,
        clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
      }}
    >
      <span className="mr-2">{value}</span>
    </div>
  );
};

export default EnergyPerformance;
