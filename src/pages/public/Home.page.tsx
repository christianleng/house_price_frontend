import { PropertyCarouselSection } from "@/features/home/components/PropertyCarouselSection";
import { InfoCardSection } from "@/features/home/components/InfoCardSection";
import { CTASection } from "@/features/home/components/CTASection";
import PropertyCarouselSectionCity from "@/features/home/components/PropertyCarouselSectionCity";
import { LazySection } from "@/core/components/LazySection";

const HomePage = () => {
  return (
    <div className="container max-w-4/5 mx-auto px-4 py-16 flex flex-col gap-16">
      <PropertyCarouselSection
        title="Dernières propriétés à vendre"
        transactionType="sale"
      />

      <LazySection height="450px">
        <PropertyCarouselSection
          title="Dernières propriétés en location"
          transactionType="rent"
        />
      </LazySection>

      <InfoCardSection
        badge="Restez informé!"
        title="Découvrez les prix de l'immobilier en France"
        description="Utilisez la carte des prix de SeLoger pour obtenir facilement des informations sur le marché de l'immobilier. Découvrez le prix au mètre carré pour des adresses, des villes et des quartiers spécifiques. Informez-vous et découvrez les prix dans la région de votre choix dès aujourd'hui !"
        ctaText="Explorer la carte des prix"
        ctaLink="/price-map"
        imageSrc="/docs/istockphoto-1133446766-612x612.jpg"
        imageAlt="paris"
      />

      <InfoCardSection
        badge="Restez informé!"
        title="Estimez votre bien immobilier"
        description="Réalisez votre estimation maison ou appartement maintenant avec notre outil intelligent basé sur les données du marché."
        ctaText="Estimer mon bien"
        ctaLink="/estimate"
        reversed
        imageSrc="/docs/istockphoto-1940793176-612x612.jpg"
        imageAlt="Estimation house"
      />

      <LazySection height="600px">
        <PropertyCarouselSectionCity />
      </LazySection>

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

HomePage.displayName = "HomePage";
export default HomePage;
