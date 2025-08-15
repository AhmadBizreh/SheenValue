import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductModal } from '@/components/products/ProductModal';
import { DeleteProductModal } from '@/components/products/DeleteProductModal';
import { ProductPagination } from '@/components/products/ProductPagination';
import { InfiniteCategoriesSelect } from '@/components/products/InfiniteCategoriesSelect';
import { StatisticsCards } from '@/components/products/StatisticsCards';
import { ProductTableSkeleton } from '@/components/ui/loading-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useStatistics } from '@/hooks/useStatistics';
import { Product, CreateProductRequest } from '@/types/product';
import { Plus, Search, Filter } from 'lucide-react';

const Products = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const {
    filters,
    searchInput,
    viewMode,
    setViewMode,
    handleSearch,
    handleCategoryFilter,
    handlePageChange,
    handlePageSizeChange,
  } = useProductFilters();

  const { data: productsData, isLoading } = useProducts(filters);
  const statistics = useStatistics(productsData);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();


  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleProductSubmit = async (data: CreateProductRequest) => {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ ...data, id: editingProduct.id });
      } else {
        await createProduct.mutateAsync(data);
      }
    } finally {
      setIsProductModalOpen(false);
      setEditingProduct(null);
    }
  };

  const confirmDelete = async () => {
    if (deletingProduct) {
      try {
        await deleteProduct.mutateAsync(deletingProduct.id);
      } finally {
        setIsDeleteModalOpen(false);
        setDeletingProduct(null);
      }
    }
  };

  // Open edit modal if navigated from ProductDetail with state
  const location = useLocation() as { state?: { editProduct?: Product; deleteProduct?: Product } };
  useEffect(() => {
    if (location.state?.editProduct) {
      setEditingProduct(location.state.editProduct);
      setIsProductModalOpen(true);
    }
    if (location.state?.deleteProduct) {
      setDeletingProduct(location.state.deleteProduct);
      setIsDeleteModalOpen(true);
    }
  }, [location.state?.editProduct, location.state?.deleteProduct]);

  return (
    <DashboardLayout 
      title="Products" 
      viewMode={viewMode} 
      onViewModeChange={setViewMode}
      showViewMode={true}
      productFilters={filters}
    >
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products by title or brand..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <InfiniteCategoriesSelect onValueChange={handleCategoryFilter} />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button onClick={() => setIsProductModalOpen(true)} className="flex-1 sm:flex-none">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatisticsCards
          totalProducts={statistics.totalProducts}
          showingProducts={statistics.showingProducts}
          lowStockProducts={statistics.lowStockProducts}
          isLoading={isLoading}
        />

        {/* Products Table */}
        {isLoading ? (
          <ProductTableSkeleton />
        ) : (
          <ProductTable
            products={productsData?.products || []}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}

        {/* Pagination */}
        {productsData && (
          <ProductPagination
            data={productsData}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}

        {/* Modals */}
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleProductSubmit}
          product={editingProduct}
          isLoading={createProduct.isPending || updateProduct.isPending}
        />

        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingProduct(null);
          }}
          onConfirm={confirmDelete}
          product={deletingProduct}
          isLoading={deleteProduct.isPending}
        />
      </div>
    </DashboardLayout>
  );
};

export default Products;