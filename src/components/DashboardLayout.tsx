import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const { profile } = useAuth();
  const role = profile?.role || 'student';

  // Different background styles for each role
  const roleStyles = {
    admin: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    faculty: "bg-gradient-to-br from-background via-muted/20 to-background",
    student: "bg-gradient-to-br from-primary/5 via-background to-accent/5"
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-300",
      roleStyles[role as keyof typeof roleStyles] || roleStyles.student,
      className
    )}>
      {children}
    </div>
  );
};
