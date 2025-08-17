import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award } from "lucide-react";

interface ScriptureCardProps {
  title: string;
  description: string;
  verses: number;
  estimatedTime: string;
  difficulty: number; // 1-5 stars
  progress?: number; // 0-100 percentage
  category: "Vedas" | "Upanishads" | "Epics" | "Puranas";
  onStart: () => void;
  onContinue?: () => void;
}

const categoryColors = {
  Vedas: "bg-orange-100 text-orange-800",
  Upanishads: "bg-purple-100 text-purple-800", 
  Epics: "bg-blue-100 text-blue-800",
  Puranas: "bg-green-100 text-green-800"
};

export const ScriptureCard = ({
  title,
  description,
  verses,
  estimatedTime,
  difficulty,
  progress = 0,
  category,
  onStart,
  onContinue
}: ScriptureCardProps) => {
  const hasStarted = progress > 0;
  
  return (
    <Card className="hover-lift transition-sacred">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge className={categoryColors[category]}>{category}</Badge>
            <CardTitle className="text-lg font-crimson">{title}</CardTitle>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Award
                key={i}
                className={`h-4 w-4 ${
                  i < difficulty ? "text-secondary fill-secondary" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{verses.toLocaleString()} verses</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        {hasStarted && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="flex gap-2">
          {hasStarted ? (
            <>
              <Button variant="sacred" className="flex-1" onClick={onContinue}>
                Continue Reading
              </Button>
              <Button variant="outline" onClick={onStart}>
                Restart
              </Button>
            </>
          ) : (
            <Button variant="sacred" className="w-full" onClick={onStart}>
              Start Reading
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};