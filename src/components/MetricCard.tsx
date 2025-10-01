import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: "good" | "warning" | "bad";
  gradient?: "primary" | "secure" | "warning" | "risk";
}

export const MetricCard = ({ icon: Icon, label, value, trend, gradient }: MetricCardProps) => {
  const getGradientClass = () => {
    if (gradient) return `bg-gradient-${gradient}`;
    if (!trend) return "bg-gradient-primary";
    switch (trend) {
      case "good":
        return "bg-gradient-secure";
      case "warning":
        return "bg-gradient-warning";
      case "bad":
        return "bg-gradient-risk";
      default:
        return "bg-gradient-primary";
    }
  };

  const getShadowClass = () => {
    if (gradient) return `shadow-glow-${gradient}`;
    if (!trend) return "shadow-glow";
    switch (trend) {
      case "good":
        return "shadow-glow-secure";
      case "warning":
        return "shadow-glow-warning";
      case "bad":
        return "shadow-glow-risk";
      default:
        return "shadow-glow";
    }
  };

  return (
    <div 
      className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ minHeight: "110px" }}
    >
      {/* Icon container with gradient */}
      <div className={`relative h-12 w-12 rounded-xl ${getGradientClass()} flex items-center justify-center shadow-md group-hover:${getShadowClass()} transition-all duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center text-center">
        <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};
