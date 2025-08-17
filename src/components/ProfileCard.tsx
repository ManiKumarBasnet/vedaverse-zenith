import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ProfileCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  isSelected?: boolean;
  onSelect: () => void;
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800", 
  Advanced: "bg-orange-100 text-orange-800",
  Expert: "bg-red-100 text-red-800"
};

export const ProfileCard = ({
  title,
  description,
  icon: Icon,
  features,
  duration,
  difficulty,
  isSelected = false,
  onSelect
}: ProfileCardProps) => {
  return (
    <Card className={`hover-lift cursor-pointer transition-sacred ${
      isSelected ? "ring-2 ring-primary shadow-sacred" : ""
    }`} onClick={onSelect}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-sunrise-gradient">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl font-crimson">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Button 
          variant={isSelected ? "sacred" : "outline"} 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? "Selected" : "Choose This Path"}
        </Button>
      </CardContent>
    </Card>
  );
};