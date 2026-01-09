import { PropertyCarouselSection } from "@/features/home/components/PropertyCarouselSection";
import { InfoCardSection } from "@/features/home/components/InfoCardSection";
import { CTASection } from "@/features/home/components/CTASection";

const HomePage = () => {
  return (
    <div className="container max-w-4/5 mx-auto px-4 py-16 flex flex-col gap-16">
      <PropertyCarouselSection
        title="Dernières propriétés à vendre"
        transactionType="sale"
      />

      <PropertyCarouselSection
        title="Dernières propriétés en location"
        transactionType="rent"
      />

      <InfoCardSection
        badge="Restez informé!"
        title="Découvrez les prix de l'immobilier en France"
        description="Utilisez la carte des prix de SeLoger pour obtenir facilement des informations sur le marché de l'immobilier. Découvrez le prix au mètre carré pour des adresses, des villes et des quartiers spécifiques. Informez-vous et découvrez les prix dans la région de votre choix dès aujourd'hui !"
        ctaText="Explorer la carte des prix"
        ctaLink="/price-map"
      />

      <InfoCardSection
        badge="Restez informé!"
        title="Estimez votre bien immobilier"
        description="Réalisez votre estimation maison ou appartement maintenant avec notre outil intelligent basé sur les données du marché."
        ctaText="Estimer mon bien"
        ctaLink="/estimate"
        reversed
      />

      <CTASection
        badge="100% gratuit"
        title="Vendez vous-même un bien immobilier sur SeLoger"
        features={[
          "Présentez votre bien et ses caractéristiques",
          "Définissez le prix de vente de votre maison ou appartement",
          "Mettez en avant ce qui le rend unique",
        ]}
        ctaText="Déposer une annonce"
        ctaLink="/post-listing"
      />
    </div>
  );
};

export default HomePage;
