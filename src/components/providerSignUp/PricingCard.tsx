import { type FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string | number;
  period?: string;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  className?: string;
}

const PricingCard: FC<PricingCardProps> = ({
  title,
  price,
  period = "/per month",
  description,
  features,
  badge,
  highlighted = false,
  className = "",
}) => {
  const cardClasses = highlighted
    ? "border-2 border-[#60A5FA]"
    : "border border-border";

  return (
    <Card className={`${cardClasses} ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          {badge && (
            <Badge className="bg-primary text-primary-foreground">
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
