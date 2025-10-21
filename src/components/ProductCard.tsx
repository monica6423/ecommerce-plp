import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md product-card-hover overflow-hidden animate-fade-in h-[420px] flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{product.discountPercentage}%
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="font-semibold text-lg text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
