import { Suspense } from 'react';
import { fetchCategories } from '@/lib/api';
import { fetchProductsAction } from '@/lib/actions';
import Logo from '@/components/Logo';
import ProductsLoadMore from '@/components/ProductsLoadMore';
import SearchAndFilters from '@/components/SearchAndFilters';
import { Product, SearchParams } from '@/types/product';

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    sortBy?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const awaitedSearchParams = await searchParams;

  const params: SearchParams = {
    q: awaitedSearchParams.q,
    category: awaitedSearchParams.category,
    sort: awaitedSearchParams.sort as 'asc' | 'desc' | undefined,
    sortBy: awaitedSearchParams.sortBy as 'price' | 'rating' | 'title' | undefined,
    limit: 12,
  };

  // Fetch initial products using server action
  const productsResult = await fetchProductsAction(params, 0, 12);
  const productsData = { 
    products: productsResult.products, 
    total: productsResult.total, 
    skip: 0, 
    limit: 12 
  };

  const categories = await fetchCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Logo />
        </div>

        <Suspense fallback={<div>Loading filters...</div>}>
          <SearchAndFilters categories={categories} />
        </Suspense>

        <div className="mt-8">
          <ProductsLoadMore
            initialProducts={productsData.products}
            total={productsData.total}
            searchParams={awaitedSearchParams as SearchParams}
            pageSize={12}
          />

          {productsData.products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
