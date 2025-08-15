import { useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInfiniteCategories } from '@/hooks/useInfiniteCategories';
import { Loader2 } from 'lucide-react';

interface InfiniteCategoriesSelectProps {
  onValueChange: (value: string) => void;
}

export const InfiniteCategoriesSelect = ({ onValueChange }: InfiniteCategoriesSelectProps) => {
  const { categories, isLoading, isLoadingMore, hasMore, loadMore } = useInfiniteCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border shadow-lg">
        <div ref={scrollRef} onScroll={handleScroll} className="max-h-60 overflow-y-auto">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
          {isLoadingMore && (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Loading more...</span>
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};