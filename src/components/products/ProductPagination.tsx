import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsResponse } from "@/types/product";

interface ProductPaginationProps {
  data: ProductsResponse;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const ProductPagination = ({
  data,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) => {
  const totalPages = data.limit > 0 ? Math.ceil(data.total / data.limit) : 0;
  const hasResults = data.total > 0 && totalPages > 0;
  const currentPage = hasResults ? Math.floor(data.skip / data.limit) + 1 : 0;
  const isFirstPage = !hasResults || currentPage <= 1;
  const isLastPage = !hasResults || currentPage >= totalPages;
  const startItem = hasResults ? data.skip + 1 : 0;
  const endItem = hasResults ? Math.min(data.skip + data.limit, data.total) : 0;

  const handlePageClick = (page: number) => {
    if (!hasResults) return;
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-6">
        {hasResults ? (
          <p className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {data.total} results
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Showing 0 results</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select
            value={data.limit.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-16 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageClick(1)}
            disabled={isFirstPage}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              isFirstPage
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-accent cursor-pointer"
            }`}
          >
            First
          </button>

          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={isFirstPage}
            className={`p-1 rounded transition-colors ${
              isFirstPage
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-accent cursor-pointer"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center">
            <span className="min-w-[32px] h-8 flex items-center justify-center text-sm font-medium rounded bg-orange-500 text-white mx-1">
              {currentPage}
            </span>
          </div>

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={isLastPage}
            className={`p-1 rounded transition-colors ${
              isLastPage
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-accent cursor-pointer"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={isLastPage}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              isLastPage
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-accent cursor-pointer"
            }`}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};
