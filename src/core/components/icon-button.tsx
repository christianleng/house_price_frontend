import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/core/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSvgElement;
}

export function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "p-2 rounded-full hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={icon} />
    </button>
  );
}
