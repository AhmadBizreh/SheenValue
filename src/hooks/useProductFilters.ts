import { useState, useCallback, useEffect } from 'react';
import { ProductFilters } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';

export const useProductFilters = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    limit: 10,
    skip: 0,
  });
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const debouncedSearch = useDebounce(searchInput, 500);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchInput(search);
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    updateFilters({ 
      category: category === 'all' ? undefined : category, 
      skip: 0 
    });
  }, [updateFilters]);

  const handlePageChange = useCallback((page: number) => {
    updateFilters({ skip: (page - 1) * (filters.limit || 10) });
  }, [filters.limit, updateFilters]);

  const handlePageSizeChange = useCallback((limit: number) => {
    updateFilters({ limit, skip: 0 });
  }, [updateFilters]);

  // Update filters when debounced search changes
  useEffect(() => {
    updateFilters({ search: debouncedSearch || undefined, skip: 0 });
  }, [debouncedSearch, updateFilters]);

  return {
    filters: { ...filters, search: debouncedSearch || undefined },
    searchInput,
    viewMode,
    setViewMode,
    handleSearch,
    handleCategoryFilter,
    handlePageChange,
    handlePageSizeChange,
    updateFilters,
  };
};