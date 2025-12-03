import { Shield } from "lucide-react";

interface PixieLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function PixieLogo({ size = "md", showText = true }: PixieLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Shield className={`${sizeClasses[size]} text-primary`} />
        <div className="absolute inset-0 blur-lg bg-primary/30" />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <span className="text-foreground">Pixie</span>
          <span className="gradient-text">Guard</span>
        </span>
      )}
    </div>
  );
}
