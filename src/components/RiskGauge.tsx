import { AlertTriangle } from "lucide-react";

interface RiskGaugeProps {
  score: number; // 0-10
  size?: number;
}

export const RiskGauge = ({ score, size = 100 }: RiskGaugeProps) => {
  const percentage = (score / 10) * 100;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = () => {
    if (score < 3) return "hsl(var(--secure))";
    if (score < 6) return "hsl(var(--warning))";
    return "hsl(var(--risk))";
  };

  const getTrend = () => {
    if (score < 3) return "Low Risk";
    if (score < 6) return "Medium";
    return "High Risk";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="transform -rotate-90 absolute inset-0" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="36"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="36"
          stroke={getColor()}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-smooth"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AlertTriangle className="h-5 w-5 mb-1" style={{ color: getColor() }} />
        <div className="text-2xl font-bold" style={{ color: getColor() }}>
          {score.toFixed(1)}
        </div>
        <div className="text-xs text-muted-foreground">{getTrend()}</div>
      </div>
    </div>
  );
};
