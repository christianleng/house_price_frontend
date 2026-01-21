import { ENERGY_RATINGS, type EnergyRating } from "../../types/property.types";

interface EnergyPerformanceProps {
  value: EnergyRating;
}

const DPE_LEVELS = Object.values(ENERGY_RATINGS);

const DPE_COLORS: Record<EnergyRating, string> = {
  A: "#008D36",
  B: "#4BBE2C",
  C: "#C8D400",
  D: "#F5E500",
  E: "#F9B000",
  F: "#EF7D00",
  G: "#E30613",
};

export const EnergyPerformance = ({ value }: EnergyPerformanceProps) => {
  const activeIndex = DPE_LEVELS.indexOf(value);
  const activeColor = DPE_COLORS[value];

  return (
    <div className="w-full max-w-xl">
      <h3 className="text-lg font-semibold">Performance énergétique</h3>
      <p className="mb-4 text-sm text-gray-600">
        Diagnostic de performance énergétique (DPE)
      </p>

      <div className="relative">
        <div
          className="absolute -top-8 flex flex-col items-center"
          style={{
            left: `${(activeIndex / (DPE_LEVELS.length - 1)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-black"
            style={{ backgroundColor: activeColor }}
          >
            {value}
          </div>
          <div
            className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-transparent"
            style={{ borderTopColor: activeColor }}
          />
        </div>

        <div className="flex h-3 overflow-hidden rounded-sm">
          {DPE_LEVELS.map((level) => (
            <div
              key={level}
              className="flex-1"
              style={{ backgroundColor: DPE_COLORS[level] }}
            />
          ))}
        </div>

        <div className="mt-2 flex justify-between text-xs font-medium text-gray-700">
          {DPE_LEVELS.map((level) => (
            <span key={level}>{level}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
