import { useState } from 'react';
import { useDeleteProduct, useUpdateProduct } from './useProducts';
import { Product } from '@/types/product';
import { useNavigate } from 'react-router-dom';

export const useProductActions = (productId?: number) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  
  const deleteProductMutation = useDeleteProduct();
  const updateProductMutation = useUpdateProduct();

  const deleteProduct = async (product: Product) => {
    if (!product.id) return;
    
    setIsDeleting(true);
    try {
      await deleteProductMutation.mutateAsync(product.id);
      navigate('/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateProduct = async (productData: Partial<Product>) => {
    if (!productId) return;
    setIsUpdating(true);
    try {
      await updateProductMutation.mutateAsync({ id: productId, ...(productData) });
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    deleteProduct,
    updateProduct,
    isDeleting: isDeleting || deleteProductMutation.isPending,
    isUpdating: isUpdating || updateProductMutation.isPending,
  };
};