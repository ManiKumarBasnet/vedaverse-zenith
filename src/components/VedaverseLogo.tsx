import { Atom } from "lucide-react";

interface VedaverseLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const VedaverseLogo = ({ size = "md", showText = true, className = "" }: VedaverseLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Atom className={`${sizeClasses[size]} text-primary animate-glow`} />
        <div className="absolute inset-0 bg-sunrise-gradient rounded-full opacity-20 animate-pulse" />
      </div>
      {showText && (
        <span className={`font-crimson font-bold bg-sunrise-gradient bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          Vedaverse
        </span>
      )}
    </div>
  );
};