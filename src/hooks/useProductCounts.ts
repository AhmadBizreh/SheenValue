import { useMemo } from 'react';
import { ProductsResponse } from '@/types/product';

export const useProductCounts = (data: ProductsResponse | undefined) => {
  return useMemo(() => {
    if (!data) {
      return {
        totalProducts: 0,
        showingProducts: 0,
        lowStockProducts: 0,
        formatProductCount: (count: number) => count > 0 ? ` (${count} products)` : '',
      };
    }

    const formatProductCount = (count: number) => count > 0 ? ` (${count} products)` : '';

    return {
      totalProducts: data.total,
      showingProducts: data.products?.length || 0,
      lowStockProducts: data.products?.filter(p => p.stock < 10).length || 0,
      formatProductCount,
    };
  }, [data]);
};