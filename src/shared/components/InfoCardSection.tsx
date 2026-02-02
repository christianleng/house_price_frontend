import { Button } from "@/core/ui/button";
import { Link } from "react-router";
import { useId } from "react";

interface InfoCardSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
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
  reversed = false,
}: InfoCardSectionProps) => {
  const id = useId();
  const titleId = `title-${id}`;

  return (
    <section
      className={`flex flex-col lg:flex-row gap-8 items-center ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
      aria-labelledby={titleId}
    >
      <div
        role="presentation"
        className="w-full lg:w-[50%] h-64 lg:h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400" aria-hidden="true">
            Image non disponible
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4 justify-center items-start">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          {badge}
        </span>

        <h2 id={titleId} className="text-3xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <Button variant="default" className="mt-2 w-fit">
          <Link to={ctaLink} aria-label={`${ctaText} concernant ${title}`}>
            {ctaText}
          </Link>
        </Button>
      </div>
    </section>
  );
};

InfoCardSection.displayName = "InfoCardSection";
export { InfoCardSection };
