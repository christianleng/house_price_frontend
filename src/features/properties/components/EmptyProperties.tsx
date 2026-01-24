import { Home12Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface EmptyPropertiesProps {
  message?: string;
}

export const EmptyProperties = ({
  message = "Aucune propriété ne correspond à ces critères pour le moment.",
}: EmptyPropertiesProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 text-center">
      <div className="bg-white p-3 rounded-full shadow-sm mb-4">
        <HugeiconsIcon icon={Home12Icon} className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-gray-500 font-medium max-w-xs">{message}</p>
    </div>
  );
};
