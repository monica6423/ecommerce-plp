import { Category, Product, ProductsResponse, SearchParams } from '@/types/product';

const BASE_URL = 'https://dummyjson.com/products';

async function safeFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${url} (${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export async function fetchProducts(params: SearchParams = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.append('q', params.q);
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.skip) searchParams.append('skip', params.skip.toString());
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sort) searchParams.append('order', params.sort);

  // Build API URL based on search type
  const url =
    params.q
      ? `${BASE_URL}/search?${searchParams.toString()}`
      : params.category
      ? `${BASE_URL}/category/${params.category}?${searchParams.toString()}`
      : `${BASE_URL}?${searchParams.toString()}`;

  console.log('fetchProducts →', url);

  return await safeFetch<ProductsResponse>(url);
}

export async function fetchProduct(id: number): Promise<Product> {
  return safeFetch<Product>(`${BASE_URL}/${id}`);
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await safeFetch<Category[] | { categories: Category[] }>(`${BASE_URL}/categories`);
  return Array.isArray(data) ? data : data.categories || [];
}

