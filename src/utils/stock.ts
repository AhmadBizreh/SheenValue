export type StockStatusVariant = 'default' | 'secondary' | 'destructive';

export function getStockStatus(stock: number): { text: string; variant: StockStatusVariant } {
  if (stock === 0) return { text: 'Out of Stock', variant: 'secondary' };
  if (stock < 10) return { text: 'Low Stock', variant: 'destructive' };
  return { text: 'In Stock', variant: 'default' };
}


