'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SortAsc, SortDesc, ChevronDown } from 'lucide-react';
import { Category } from '@/types/product';

interface SearchAndFiltersProps {
  categories: Category[];
}

export default function SearchAndFilters({ categories }: SearchAndFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || '');

  // Custom dropdown state (Category)
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  // Sort dropdown state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortHighlightedIndex, setSortHighlightedIndex] = useState<number>(-1);

  const updateURL = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    startTransition(() => {
      router.push(`/?${newSearchParams.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ q: searchQuery });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category });
    setIsCatOpen(false);
  };

  const handleSortChange = (newSortBy: string) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    updateURL({ 
      sortBy: newSortBy,
      sort: newSortOrder,
    });
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy;
  return (
    <div className="bg-white bg-primary-grey rounded-lg p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Category Filter - Custom Dropdown */}
        <div className="min-w-3xs relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isCatOpen}
            onClick={() => setIsCatOpen((o) => !o)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIsCatOpen(true);
                setHighlightedIndex((i) => Math.min(i + 1, categories.length));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIsCatOpen(true);
                setHighlightedIndex((i) => Math.max(i - 1, -1));
              }
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span className="truncate text-left">
              {selectedCategory
                ? categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory
                : 'All Categories'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCatOpen && (
            <ul
              role="listbox"
              tabIndex={-1}
              className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden max-h-64 overflow-y-auto"
            >
              <li
                role="option"
                aria-selected={selectedCategory === ''}
                onMouseEnter={() => setHighlightedIndex(-1)}
                onClick={() => handleCategoryChange('')}
                className={`px-5 py-4 cursor-pointer ${selectedCategory === '' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                All Categories
              </li>
              {categories.map((category, idx) => {
                const active = category.slug === selectedCategory;
                const hovered = highlightedIndex === idx;
                return (
                  <li
                    key={category.slug}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-5 py-4 cursor-pointer ${active ? 'bg-gray-100' : hovered ? 'bg-gray-50' : ''}`}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Sort - Custom Dropdown */}
        <div className="flex gap-2 min-w-3xs">
          <div className="relative flex-1">
            <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            onClick={() => setIsSortOpen((o) => !o)}
            onKeyDown={(e) => {
              const options = ['price', 'rating', 'title'];
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIsSortOpen(true);
                setSortHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIsSortOpen(true);
                setSortHighlightedIndex((i) => Math.max(i - 1, 0));
              }
            }}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span className="truncate text-left">
              {sortBy ? `Sort: ${sortBy === 'title' ? 'Name' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : 'Sort by'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSortOpen && (
              <ul
                role="listbox"
                tabIndex={-1}
                className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden"
              >
                {['price', 'rating', 'title'].map((key, idx) => {
                  const active = key === sortBy;
                  const hovered = sortHighlightedIndex === idx;
                  return (
                    <li
                      key={key}
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setSortHighlightedIndex(idx)}
                      onClick={() => { handleSortChange(key); setIsSortOpen(false); }}
                      className={`px-5 py-4 cursor-pointer ${active ? 'bg-gray-100' : hovered ? 'bg-gray-50' : ''}`}
                    >
                      {key === 'title' ? 'Name' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {sortBy && (
            <button
              onClick={() => handleSortChange(sortBy)}
              className="border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-center min-w-[2rem]"
              title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
            >
              {sortOrder === 'asc' ? (
                <>
                  <SortAsc className="w-5 h-5" />
                </>
              ) : (
                <>
                  <SortDesc className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                 {`Search: "${searchQuery}"`}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    updateURL({ q: '' });
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Category: {String(selectedCategory).charAt(0).toUpperCase() + String(selectedCategory).slice(1)}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Sort: {sortBy} ({sortOrder})
                <button
                  onClick={() => {
                    setSortBy('');
                    setSortOrder('');
                    updateURL({ sortBy: '', sort: '' });
                  }}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {isPending && (
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          Updating results...
        </div>
      )}
    </div>
  );
}
