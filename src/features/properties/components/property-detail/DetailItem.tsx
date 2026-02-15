import type { ReactNode } from "react";

interface IDetailItemProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  highlight?: boolean;
}

const DetailItem = ({
  label,
  value,
  icon,
  highlight = false,
}: IDetailItemProps) => (
  <div className="flex items-start gap-3">
    {icon && <div className="mt-1 text-gray-400">{icon}</div>}

    <div className="flex flex-col">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span
        className={`text-base font-semibold ${highlight ? "text-emerald-600" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  </div>
);

DetailItem.displayName = "DetailItem";
export default DetailItem;
