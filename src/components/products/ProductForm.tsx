import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateProductRequest } from '@/types/product';
import { useCategories } from '@/hooks/useProducts';

const productSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  thumbnail: yup.string().url('Must be a valid URL').required('Image URL is required'),
}).required();

interface ProductFormProps {
  onSubmit: (data: CreateProductRequest) => void;
  initialData?: Partial<CreateProductRequest>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const ProductForm = ({ onSubmit, initialData, isLoading, onCancel }: ProductFormProps) => {
  const { data: categories } = useCategories();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductRequest>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      brand: initialData?.brand || '',
      category: initialData?.category || '',
      thumbnail: initialData?.thumbnail || '',
    },
  });

  const isEditing = Boolean(initialData && Object.keys(initialData).length > 0);

  const handleFormSubmit = (data: CreateProductRequest) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            placeholder="Enter product title"
            {...register('title')}
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            placeholder="Enter brand name"
            {...register('brand')}
            className={errors.brand ? 'border-destructive' : ''}
          />
          {errors.brand && (
            <p className="text-sm text-destructive">{errors.brand.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          rows={3}
          {...register('description')}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0"
            {...register('price', { valueAsNumber: true })}
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Product Image URL</Label>
        <Input
          id="thumbnail"
          placeholder="https://example.com/image.jpg"
          {...register('thumbnail')}
          className={errors.thumbnail ? 'border-destructive' : ''}
        />
        {errors.thumbnail && (
          <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEditing ? 'Saving...' : 'Adding Product...') : (isEditing ? 'Save Changes' : 'Add Product')}
        </Button>
      </div>
    </form>
  );
}