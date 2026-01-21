import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/core/ui/button";
import { useAuth } from "@/features/auth/providers/authProviders";

import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  useAddFavorite,
  useDeleteFavorite,
  useGetFavorites,
} from "../api/favorites.queries";
import { memo } from "react";
import type { FavoriteList } from "../types/favorite.types";

const FavoriteButton = memo(({ propertyId }: { propertyId: string }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: isFavorite } = useGetFavorites({
    select: (favorites: FavoriteList) =>
      !!favorites?.some((prop) => prop.id === propertyId),
  });
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: deleteFavorite, isPending: isDeleting } = useDeleteFavorite();

  const isPending = isAdding || isDeleting;
  const favoriteActive = !!isFavorite;

  const handleToggle = () => {
    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: location }, replace: true });
      return;
    }

    if (isFavorite) {
      deleteFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      aria-label={
        favoriteActive ? "Retirer des favoris" : "Ajouter aux favoris"
      }
      aria-pressed={favoriteActive}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
      className={
        favoriteActive ? "text-red-500 hover:text-red-600" : "text-slate-500"
      }
    >
      <HugeiconsIcon icon={FavouriteIcon} />
    </Button>
  );
});

FavoriteButton.displayName = "FavoriteButton";
export default FavoriteButton;
