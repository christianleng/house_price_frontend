import { Button } from "@/core/ui/button";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const FavoriteButton = ({ propertyId }: { propertyId: string }) => {
  const handleToggle = () => {
    console.log(propertyId);
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={handleToggle}>
        <HugeiconsIcon icon={FavouriteIcon} />
      </Button>
    </div>
  );
};

export default FavoriteButton;
