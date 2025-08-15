import { useState, useEffect, useCallback } from 'react';
import { useCategories } from '@/hooks/useProducts';

export const useInfiniteCategories = () => {
  const { data: allCategories, isLoading } = useCategories();
  const [displayedCategories, setDisplayedCategories] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (allCategories) {
      const initialItems = allCategories.slice(0, ITEMS_PER_PAGE);
      setDisplayedCategories(initialItems);
      setHasMore(allCategories.length > ITEMS_PER_PAGE);
    }
  }, [allCategories]);

  const loadMore = useCallback(async () => {
    if (!allCategories || !hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const currentLength = displayedCategories.length;
    const nextItems = allCategories.slice(0, currentLength + ITEMS_PER_PAGE);
    
    setDisplayedCategories(nextItems);
    setHasMore(nextItems.length < allCategories.length);
    setIsLoadingMore(false);
  }, [allCategories, displayedCategories.length, hasMore, isLoadingMore]);

  return {
    categories: displayedCategories,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  };
};