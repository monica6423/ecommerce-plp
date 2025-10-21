import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchProduct } from '@/lib/api';
import { Star, ArrowLeft, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductImageCarousel from '@/components/ProductImageCarousel';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id);
  
  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await fetchProduct(productId);
  } catch (error) {
    notFound();
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-[var(--color-primary)] hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <ProductImageCarousel 
                images={[...product.images]} 
                title={product.title}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">({product.rating})</span>
                <span className="text-gray-500">• {product.stock} in stock</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      -{product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                <div>
                  <span className="text-sm font-medium text-gray-500">Brand</span>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{product.brand}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{product.category}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 h-14 border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-tint)] hover:bg-[var(--color-primary-tint-hover)] rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold">
                  <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Stock Status */}
              <div className="text-sm text-gray-600">
                {product.stock > 10 ? (
                  <span className="text-green-600 font-medium">✓ In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-yellow-600 font-medium">⚠ Only {product.stock} left</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
