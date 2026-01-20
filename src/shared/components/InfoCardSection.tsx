import { Button } from "@/core/ui/button";

interface InfoCardSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  reversed?: boolean;
}

const InfoCardSection = ({
  imageSrc,
  imageAlt = "",
  badge,
  title,
  description,
  ctaText,
  ctaLink,
  onCtaClick,
  reversed = false,
}: InfoCardSectionProps) => {
  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 items-center ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:w-[50%] h-64 lg:h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Image placeholder</span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4 justify-center">
        <span className="text-sm font-medium text-primary">{badge}</span>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div>
          {ctaLink ? (
            <Button>
              <a href={ctaLink}>{ctaText}</a>
            </Button>
          ) : (
            <Button onClick={onCtaClick}>{ctaText}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

InfoCardSection.displayName = "InfoCardSection";
export { InfoCardSection };
