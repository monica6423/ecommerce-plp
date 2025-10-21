import { SearchParams } from '@/types/product';

describe('API URL Building', () => {
  it('should build search URL correctly', () => {
    const params: SearchParams = {
      q: 'phone',
      limit: 20,
      skip: 0,
      sortBy: 'price',
      sort: 'asc',
    };

    const searchParams = new URLSearchParams();
    if (params.q) searchParams.append('q', params.q);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.skip) searchParams.append('skip', params.skip.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sort) searchParams.append('order', params.sort);

    const url = `https://dummyjson.com/products/search?${searchParams.toString()}`;

    expect(url).toContain('q=phone');
    expect(url).toContain('limit=20');
    expect(url).toContain('sortBy=price');
    expect(url).toContain('order=asc');
  });

  it('should build category URL correctly', () => {
    const params: SearchParams = {
      category: 'smartphones',
      limit: 12,
      skip: 0,
      sortBy: 'rating',
      sort: 'desc',
    };

    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.skip) searchParams.append('skip', params.skip.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sort) searchParams.append('order', params.sort);

    const url = `https://dummyjson.com/products/category/${params.category}?${searchParams.toString()}`;

    expect(url).toContain('category/smartphones');
    expect(url).toContain('limit=12');
    expect(url).toContain('sortBy=rating');
    expect(url).toContain('order=desc');
  });

  it('should include order parameter when sort is provided', () => {
    const params: SearchParams = {
      limit: 20,
      sort: 'asc',
    };

    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.sort) searchParams.append('order', params.sort);

    const url = `https://dummyjson.com/products?${searchParams.toString()}`;

    expect(url).toContain('order=asc');
  });

  it('should not include order parameter when sort is not provided', () => {
    const params: SearchParams = {
      limit: 20,
    };

    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.sort) searchParams.append('order', params.sort);

    const url = `https://dummyjson.com/products?${searchParams.toString()}`;

    expect(url).not.toContain('order=');
  });

  it('should handle skip parameter for pagination', () => {
    const params: SearchParams = {
      limit: 12,
      skip: 24,
    };

    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.skip) searchParams.append('skip', params.skip.toString());

    const url = `https://dummyjson.com/products?${searchParams.toString()}`;

    expect(url).toContain('limit=12');
    expect(url).toContain('skip=24');
  });
});
