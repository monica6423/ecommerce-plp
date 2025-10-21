export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  tags?: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'price' | 'rating' | 'title';
  limit?: number;
  skip?: number;
}

export type SortOption = {
  value: string;
  label: string;
};

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

export interface Category {
  slug: string;
  name: string;
  url: string;
}