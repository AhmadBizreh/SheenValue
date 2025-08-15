import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useProduct } from '@/hooks/useProducts';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { ProductModal } from '@/components/products/ProductModal';
import { DeleteProductModal } from '@/components/products/DeleteProductModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductDetailSkeleton } from '@/components/ui/loading-skeleton';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { renderStars } from '@/utils/rating';
import { formatCurrencyUSD } from '@/utils/currency';
import { CreateProductRequest } from '@/types/product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(Number(id));
  const navigate = useNavigate();
  
  // Local modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Mutations
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  if (isLoading) {
    return (
      <DashboardLayout title="Product Details">
        <div className="p-4 sm:p-6">
          <ProductDetailSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout title="Product Details">
        <div className="text-center py-12 p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const formatPrice = (price: number) => formatCurrencyUSD(price);

  const handleEditSubmit = async (data: CreateProductRequest) => {
    try {
      await updateProduct.mutateAsync({ ...data, id: product.id });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct.mutateAsync(product.id);
      setIsDeleteModalOpen(false);
      // Navigate back to products list after successful deletion
      navigate('/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <DashboardLayout title="Product Details">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-muted-foreground">by {product.brand}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {product.images?.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-green-600">
                      {product.discountPercentage}% discount
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {product.category}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p className="text-lg font-semibold">{product.stock} units</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <div className="mt-1">{renderStars(product.rating)}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mock Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        U{review}
                      </div>
                      <span className="font-medium">User {review}</span>
                    </div>
                    {renderStars(5 - review + 3)}
                  </div>
                  <p className="text-muted-foreground">
                    Great product! Really satisfied with the quality and delivery time.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        product={product}
        isLoading={updateProduct.isPending}
      />

      {/* Delete Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={product}
        isLoading={deleteProduct.isPending}
      />
    </DashboardLayout>
  );
};

export default ProductDetail;