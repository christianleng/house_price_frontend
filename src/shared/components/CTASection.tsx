import { Button } from "@/core/ui/button";
import { Link } from "react-router";
import { useId } from "react";

interface CTASectionProps {
  badge: string;
  title: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const CTASection = ({
  badge,
  title,
  features,
  ctaText,
  ctaLink,
}: CTASectionProps) => {
  const sectionId = useId();

  return (
    <section
      className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-8 md:p-12 flex flex-col gap-6"
      aria-labelledby={`cta-title-${sectionId}`}
    >
      <span className="text-sm font-bold uppercase tracking-wide text-primary">
        {badge}
      </span>

      <h2
        id={`cta-title-${sectionId}`}
        className="text-3xl md:text-4xl font-bold"
      >
        {title}
      </h2>

      <ul className="space-y-3" role="list">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-primary mt-1 font-bold" aria-hidden="true">
              ✓
            </span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex">
        <Button variant="default" className="w-fit">
          <Link to={ctaLink} aria-label={`${ctaText} : ${title}`}>
            {ctaText}
          </Link>
        </Button>
      </div>
    </section>
  );
};

CTASection.displayName = "CTASection";
export { CTASection };
