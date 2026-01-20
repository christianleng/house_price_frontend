const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const favoritesService = {
  async toggleFavorite(propertyId: string, isCurrentlyFavorite: boolean) {
    await delay(1000);

    console.log(`Server: Toggled ${propertyId} to ${!isCurrentlyFavorite}`);
    return !isCurrentlyFavorite;
  },
};
