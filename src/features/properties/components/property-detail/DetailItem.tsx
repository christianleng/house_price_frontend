import type { ReactNode } from "react";

const DetailItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
      {value}
    </span>
  </div>
);

DetailItem.displayName = "DetailItem";
export default DetailItem;
