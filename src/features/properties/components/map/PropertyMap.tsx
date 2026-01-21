import { memo } from "react";

const PropertyMap = memo(() => {
  return (
    <div className="flex h-full w-full items-center justify-center border rounded-4xl">
      <p className="font-semibold">Map Interactive</p>
    </div>
  );
});

PropertyMap.displayName = "PropertyMap";
export { PropertyMap };
