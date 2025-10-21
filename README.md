# Momo Store - E-Commerce Product Listing Page

A modern e-commerce Product Listing Page deployed on https://ecommerce-plp-two.vercel.app/.

### Installation & Running

1. **Clone the repository:**
```bash
git clone <repository-url>
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint
```

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main product listing page
│   ├── products/[id]/       # Product detail page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ProductCard.tsx
│   ├── SearchAndFilters.tsx
│   ├── ProductsLoadMore.tsx
│   ├── ProductImageCarousel.tsx
│   └── Logo.tsx
├── lib/                     # Utility functions
│   ├── api.ts              # API integration
│   ├── actions.ts          # Server actions
│   └── util.ts             # Helper functions
├── types/                   # TypeScript types
│   └── product.ts          # Product interfaces
└── __tests__/              # Unit tests
```

## How to Use

1. **Search for products**: Type in the search box to find products
2. **Filter by category**: Select a category from the dropdown
3. **Sort products**: Click "Sort by" and choose Price, Rating, or Name
4. **View product details**: Click on any product card to see full details
5. **Load more**: Click "See more products" button to load additional items

## API Integration

Data is fetched from [DummyJSON.com](https://dummyjson.com) API:
- Fetch all products
- Search products by query
- Filter by category
- Sort by various fields
