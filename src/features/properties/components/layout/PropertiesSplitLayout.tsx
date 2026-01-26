import { type ReactNode } from "react";

interface PropertiesSplitLayoutProps {
  children: ReactNode;
  mapComponent: ReactNode;
}

export const PropertiesSplitLayout = ({
  children,
  mapComponent,
}: PropertiesSplitLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden gap-4">
      <div className="w-full xl:w-3/5 h-full overflow-y-auto scrollbar-hide">
        <div className="pb-20">{children}</div>
      </div>

      <aside className="hidden xl:block xl:w-2/5 h-full relative py-8">
        <div className="absolute h-full w-full">{mapComponent}</div>
      </aside>
    </div>
  );
};
