import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: "good" | "warning" | "bad";
  subtitle?: string;
}

export const StatCard = ({ icon: Icon, label, value, trend, subtitle }: StatCardProps) => {
  const getTrendColor = () => {
    if (!trend) return "text-foreground";
    switch (trend) {
      case "good":
        return "text-secure";
      case "warning":
        return "text-warning";
      case "bad":
        return "text-risk";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:shadow-sm hover:bg-secondary/80">
      <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className={`text-lg font-bold ${getTrendColor()}`}>{value}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
};
