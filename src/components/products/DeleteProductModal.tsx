import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Product } from '@/types/product';
import { AlertTriangle } from 'lucide-react';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Product | null;
  isLoading?: boolean;
}

export const DeleteProductModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  isLoading,
}: DeleteProductModalProps) => {
  if (!product) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="pt-2">
            This action cannot be undone. The product will be permanently 
            removed from your inventory.
          </AlertDialogDescription>
          <div className="rounded-md bg-muted p-3 mt-4">
            <p className="text-sm font-medium">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-foreground">
                {product.title}
              </span>{' '}
              by {product.brand}?
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : 'Delete Product'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};