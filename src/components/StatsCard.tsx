import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "sacred" | "wisdom" | "devotional";
}

const variantStyles = {
  default: "bg-card",
  sacred: "bg-sunrise-gradient text-white",
  wisdom: "bg-consciousness-gradient text-white", 
  devotional: "bg-devotion-gradient text-white"
};

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default"
}: StatsCardProps) => {
  const isGradient = variant !== "default";
  
  return (
    <Card className={`hover-lift transition-sacred ${variantStyles[variant]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${isGradient ? "text-white/90" : "text-muted-foreground"}`}>
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${isGradient ? "text-white/80" : "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold font-crimson ${isGradient ? "text-white" : "text-foreground"}`}>
          {value}
        </div>
        {description && (
          <p className={`text-xs mt-1 ${isGradient ? "text-white/80" : "text-muted-foreground"}`}>
            {description}
          </p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${
            isGradient ? "text-white/80" : "text-muted-foreground"
          }`}>
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
            </span>
            <span>from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};