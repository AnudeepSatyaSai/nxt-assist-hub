import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  const { profile } = useAuth();
  const role = profile?.role || 'student';

  const roleStyles = {
    admin: "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-slate-100",
    faculty: "bg-gradient-to-br from-card to-muted/20 border-border",
    student: "bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30"
  };

  return (
    <Card className={cn(
      "p-6 hover-scale",
      roleStyles[role as keyof typeof roleStyles] || roleStyles.student,
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          role === 'admin' ? "bg-primary/20" : "bg-primary/10"
        )}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <p className={cn(
          "text-sm font-medium mb-1",
          role === 'admin' ? "text-slate-400" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </Card>
  );
};
