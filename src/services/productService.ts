import { 
  Product, 
  ProductsResponse, 
  CreateProductRequest, 
  UpdateProductRequest,
  ProductFilters 
} from '@/types/product';
import { config } from '@/config/env';

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const { search, category, limit = 30, skip = 0 } = filters;
    
    let url = `${config.productsBaseUrl}/products`;
    
    if (search) {
      url = `${config.productsBaseUrl}/products/search?q=${encodeURIComponent(search)}`;
    } else if (category) {
      url = `${config.productsBaseUrl}/products/category/${encodeURIComponent(category)}`;
    }
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    
    const separator = url.includes('?') ? '&' : '?';
    const response = await fetch(`${url}${separator}${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${config.productsBaseUrl}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return response.json();
  },

  async createProduct(product: CreateProductRequest): Promise<Product> {
    const response = await fetch(`${config.productsBaseUrl}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    const response = await fetch(`${config.productsBaseUrl}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    return response.json();
  },

  async deleteProduct(id: number): Promise<{ isDeleted: boolean; id: number }> {
    const response = await fetch(`${config.productsBaseUrl}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
    return response.json();
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${config.productsBaseUrl}/products/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories: unknown = await response.json();
    
    // DummyJSON returns an array of objects with {slug, name, url}
    if (Array.isArray(categories) && categories.length > 0 && typeof categories[0] === 'object') {
      return (categories as Array<{ slug?: string; name?: string } | string>).map((category) => {
        if (typeof category === 'string') return category;
        return category.slug || category.name || '';
      }).filter(Boolean) as string[];
    }
    
    return categories as string[];
  },
};