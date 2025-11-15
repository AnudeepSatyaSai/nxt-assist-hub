import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoleBasedCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const RoleBasedCard = ({ 
  title, 
  description, 
  children, 
  className,
  icon 
}: RoleBasedCardProps) => {
  const { profile } = useAuth();
  const role = profile?.role || 'student';

  // Different card styles for each role
  const roleCardStyles = {
    admin: "bg-slate-800/90 border-slate-700 text-slate-100 backdrop-blur-sm",
    faculty: "bg-card border-border hover:shadow-lg transition-shadow",
    student: "bg-card border-primary/20 hover:border-primary/40 hover:shadow-md transition-all"
  };

  const roleHeaderStyles = {
    admin: "text-slate-100 border-b border-slate-700",
    faculty: "text-foreground",
    student: "text-foreground"
  };

  return (
    <Card className={cn(
      roleCardStyles[role as keyof typeof roleCardStyles] || roleCardStyles.student,
      "animate-fade-in",
      className
    )}>
      <CardHeader className={roleHeaderStyles[role as keyof typeof roleHeaderStyles]}>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription className={role === 'admin' ? 'text-slate-400' : ''}>
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
};
