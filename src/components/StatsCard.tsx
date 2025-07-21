import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

export function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
  const isPositive = change && change >= 0;
  
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center mt-2 space-x-2">
            <Badge 
              variant={isPositive ? "default" : "destructive"}
              className={isPositive ? "bg-success text-success-foreground" : ""}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change).toFixed(2)}%
            </Badge>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}