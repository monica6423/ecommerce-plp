'use server';

import { fetchProducts } from './api';
import { Product, SearchParams } from '@/types/product';

export async function fetchProductsAction(
  searchParams: SearchParams,
  currentSkip: number = 0,
  pageSize: number = 12
): Promise<{ products: Product[]; total: number; hasMore: boolean }> {
  try {
    console.log('server action fetchProductsAction', { currentSkip, pageSize });

    let productsData: { products: Product[]; total: number };

    if (searchParams.q) {
      // Search path: fetch all matching products, then filter locally
      const searchResp = await fetchProducts({ 
        q: searchParams.q, 
        limit: 200,
        sortBy: searchParams.sortBy,
        sort: searchParams.sort
      });
      let list = searchResp.products;
      
      if (searchParams.category) {
        list = list.filter((p) => p.category === searchParams.category);
      }
      
      // For search, we slice the results based on currentSkip and pageSize
      const endIndex = Math.min(currentSkip + pageSize, list.length);
      productsData = {
        products: list.slice(currentSkip, endIndex),
        total: list.length
      };
    } else {
      // Category path: use API pagination and sorting directly
      const resp = await fetchProducts({
        category: searchParams.category,
        limit: pageSize,
        skip: currentSkip,
        sortBy: searchParams.sortBy,
        sort: searchParams.sort
      });
      
      productsData = {
        products: resp.products,
        total: resp.total ?? resp.products.length
      };
    }

    const hasMore = currentSkip + pageSize < productsData.total;
    return { ...productsData, hasMore };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0, hasMore: false };
  }
}

// Alias for backward compatibility
export const loadMoreProducts = fetchProductsAction;
