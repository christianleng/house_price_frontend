import { PropertyCarouselSection } from "@/features/properties/components/PropertyCarouselSection";
import { InfoCardSection } from "@/shared/components/InfoCardSection";
import { CTASection } from "@/shared/components/CTASection";
import PropertyCarouselSectionCity from "@/features/properties/components/PropertyCarouselSectionCity";
import { LazySection } from "@/core/components/LazySection";
import PropertyCarouselError from "../errors/PropertyCarouselError";
import { PropertyCarouselSkeleton } from "@/features/properties/components/skeletons/PropertyCarouselSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = () => {
  return (
    <div className="py-16 flex flex-col gap-16">
      <ErrorBoundary
        fallbackRender={({ resetErrorBoundary }) => (
          <PropertyCarouselError
            title="les ventes"
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        <Suspense fallback={<PropertyCarouselSkeleton />}>
          <PropertyCarouselSection
            title="Dernières propriétés à vendre"
            transactionType="sale"
          />
        </Suspense>
      </ErrorBoundary>

      <LazySection height="450px">
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <PropertyCarouselError
              title="les locations"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<PropertyCarouselSkeleton />}>
            <PropertyCarouselSection
              title="Dernières propriétés en location"
              transactionType="rent"
            />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection>
        <InfoCardSection
          badge="Restez informé !"
          title="Découvrez les prix de l'immobilier en France"
          description="Utilisez la carte des prix de SeLoger pour obtenir facilement des informations sur le marché de l'immobilier. Découvrez le prix au mètre carré pour des adresses, des villes et des quartiers spécifiques. Informez-vous et découvrez les prix dans la région de votre choix dès aujourd'hui !"
          ctaText="Explorer la carte des prix"
          ctaLink="/price-map"
          imageSrc="/docs/istockphoto-1133446766-612x612.jpg"
          imageAlt="paris"
        />
      </LazySection>

      <LazySection>
        <InfoCardSection
          badge="Restez informé !"
          title="Estimez votre bien immobilier"
          description="Réalisez votre estimation maison ou appartement maintenant avec notre outil intelligent basé sur les données du marché."
          ctaText="Estimer mon bien"
          ctaLink="/estimate"
          reversed
          imageSrc="/docs/istockphoto-1940793176-612x612.jpg"
          imageAlt="Estimation house"
        />
      </LazySection>

      <LazySection height="600px">
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <PropertyCarouselError
              title="les villes"
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<PropertyCarouselSkeleton />}>
            <PropertyCarouselSectionCity />
          </Suspense>
        </ErrorBoundary>
      </LazySection>

      <LazySection>
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
      </LazySection>
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
