'use client';

import { useEffect, useState, useTransition } from 'react';
import ProductCard from './ProductCard';
import { Product, SearchParams } from '@/types/product';
import { loadMoreProducts } from '@/lib/actions';
import { ShoppingCart } from 'lucide-react';

interface ProductsLoadMoreProps {
  initialProducts: Product[];
  total: number;
  searchParams: SearchParams;
  pageSize: number;
}

export default function ProductsLoadMore({ initialProducts, total, searchParams, pageSize }: ProductsLoadMoreProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(pageSize);
  const [done, setDone] = useState(initialProducts.length >= total);
  const [viewed, setViewed] = useState(initialProducts.length);
  const [isPending, startTransition] = useTransition();
  const isLoading = isPending;

  // Reset state when initial data or search params change
  useEffect(() => {
    setProducts(initialProducts);
    setSkip(pageSize);
    setDone(initialProducts.length >= total);
    setViewed(initialProducts.length);
  }, [initialProducts, total, searchParams, pageSize]);

  const fetchMore = () => {
    if (done || isLoading) return;

    startTransition(async () => {
      try {
        const result = await loadMoreProducts(searchParams, skip, pageSize);
        const fetched = result.products;

        if (!fetched.length) {
          setDone(true);
          return;
        }

        setProducts((prev) => [...prev, ...fetched]);
        setSkip(skip + fetched.length);
        setViewed(viewed + fetched.length);

        if (!result.hasMore) setDone(true);
      } catch (error) {
        console.error('Failed to fetch more products:', error);
      }
    });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!done && (
        <div className="flex flex-col items-center justify-between mt-14">
          <p className="text-sm text-gray-600">
            You have viewed {viewed} / {total} products
          </p>
          <button
            onClick={fetchMore}
            disabled={isLoading}
            className="w-full sm:w-auto h-14 mt-3 border-2 border-primary text-primary bg-primary-tint hover:bg-primary-tint-hover rounded-lg flex items-center justify-center px-6 gap-3 text-lg font-medium transition-colors disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>See more products</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
