import { Card, CardContent } from '@/components/ui/card';
import { StatisticsSkeleton } from '@/components/ui/loading-skeleton';

interface StatisticsCardsProps {
  totalProducts: number;
  showingProducts: number;
  lowStockProducts: number;
  isLoading?: boolean;
}

export const StatisticsCards = ({ 
  totalProducts, 
  showingProducts, 
  lowStockProducts, 
  isLoading = false 
}: StatisticsCardsProps) => {
  if (isLoading) {
    return <StatisticsSkeleton />;
  }

  const formatCount = (count: number) => count > 0 ? ` (${count} products)` : '';

  const statistics = [
    {
      label: `Total Products${formatCount(totalProducts)}`,
      value: totalProducts,
      className: "text-primary",
      icon: "📊"
    },
    {
      label: `Showing${formatCount(showingProducts)}`,
      value: showingProducts,
      className: "text-foreground",
      icon: "👁️"
    },
    {
      label: `Low Stock${formatCount(lowStockProducts)}`,
      value: lowStockProducts,
      className: "text-destructive",
      icon: "⚠️"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statistics.map((stat, index) => (
        <Card key={stat.label} className={index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className={`text-xl lg:text-2xl font-bold ${stat.className}`}>
                  {stat.value}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};