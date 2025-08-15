import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductForm } from './ProductForm';
import { CreateProductRequest, Product } from '@/types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductRequest) => void;
  product?: Product | null;
  isLoading?: boolean;
}

export const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  isLoading,
}: ProductModalProps) => {
  const isEditing = !!product;

  const handleSubmit = (data: CreateProductRequest) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details to {isEditing ? 'update' : 'create'} a new product.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          onSubmit={handleSubmit}
          initialData={product || undefined}
          isLoading={isLoading}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};