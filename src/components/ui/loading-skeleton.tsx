import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface StatisticsSkeletonProps {
  count?: number;
}

export const StatisticsSkeleton = ({ count = 3 }: StatisticsSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const DashboardStatisticsSkeleton = ({ count = 4 }: StatisticsSkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Card key={i}>
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-9 w-36" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="w-full h-96 rounded-lg" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-20 rounded" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-14" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5" />
                  ))}
                  <Skeleton className="h-6 w-8 ml-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-5 w-20 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2 pb-4 border-b last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ProductTableSkeleton = () => {
  return (
    <div className="rounded-md border bg-card">
      <div className="p-4 space-y-4">
        {/* Table Header Skeleton */}
        <div className="grid grid-cols-9 gap-4 pb-2 border-b">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        {/* Table Rows Skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-9 gap-4 py-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-12" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="h-3 w-3 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};