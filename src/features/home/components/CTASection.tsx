import { Button } from "@/core/ui/button";

interface CTASectionProps {
  badge: string;
  title: string;
  features: string[];
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
}

export const CTASection = ({
  badge,
  title,
  features,
  ctaText,
  ctaLink,
  onCtaClick,
}: CTASectionProps) => {
  return (
    <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-8 md:p-12 flex flex-col gap-6">
      <span className="text-sm font-medium text-primary">{badge}</span>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div>
        {ctaLink ? (
          <Button size="lg">
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        ) : (
          <Button size="lg" onClick={onCtaClick}>
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
};
