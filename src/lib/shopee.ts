import { ClothingItem, ShopeeProduct, ShopeeSearchParams } from '@/types';

/**
 * Generate Shopee search URL for a clothing item
 * This creates a search query that users can use to find similar items
 */
export function generateShopeeSearchUrl(query: string, category?: string): string {
  const baseUrl = 'https://shopee.com/search';
  const searchParams = new URLSearchParams();
  
  searchParams.append('keyword', query);
  if (category) {
    searchParams.append('category', category);
  }
  
  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate a mock Shopee product preview
 * In production, this would call the actual Shopee API
 */
export function generateShopeeProductPreview(item: ClothingItem): ShopeeProduct {
  // Mock product data - in production, replace with actual API call
  const mockProduct: ShopeeProduct = {
    itemId: `shopee_${item.id}`,
    name: item.name,
    price: item.price || generateMockPrice(item.category),
    imageUrl: generateMockImageUrl(item.category, item.color),
    shopeeUrl: generateShopeeSearchUrl(`${item.name} ${item.color}`, getCategoryMapping(item.category)),
    rating: 4.5 + Math.random() * 0.5,
    sold: Math.floor(Math.random() * 1000) + 100,
  };
  
  return mockProduct;
}

/**
 * Generate mock price based on category
 */
function generateMockPrice(category: string): string {
  const priceRanges: Record<string, [number, number]> = {
    top: [15, 50],
    bottom: [20, 60],
    footwear: [30, 100],
    accessory: [10, 40],
  };
  
  const [min, max] = priceRanges[category] || [15, 50];
  const price = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return `$${price}.99`;
}

/**
 * Generate placeholder image URL
 * In production, this would return actual product images from Shopee API
 */
function generateMockImageUrl(category: string, color: string): string {
  // Using placeholder service - replace with actual Shopee images in production
  const width = 400;
  const height = 400;
  const colorHex = encodeURIComponent(color.replace('#', ''));
  
  return `https://placehold.co/${width}x${height}/${colorHex}/white?text=${category}`;
}

/**
 * Map clothing categories to Shopee categories
 */
function getCategoryMapping(category: string): string {
  const mapping: Record<string, string> = {
    top: 'tops',
    bottom: 'bottoms',
    footwear: 'shoes',
    accessory: 'accessories',
  };
  
  return mapping[category] || 'fashion';
}

/**
 * Search Shopee products (mock implementation)
 * In production, implement actual Shopee API integration
 */
export async function searchShopeeProducts(params: ShopeeSearchParams): Promise<ShopeeProduct[]> {
  // TODO: Implement actual Shopee API call
  // For now, return mock data
  
  const mockProducts: ShopeeProduct[] = Array.from({ length: params.limit || 5 }, (_, i) => ({
    itemId: `shopee_${i}`,
    name: `${params.query} - Item ${i + 1}`,
    price: generateMockPrice(params.category || 'top'),
    imageUrl: generateMockImageUrl(params.category || 'top', '#000000'),
    shopeeUrl: generateShopeeSearchUrl(params.query, params.category),
    rating: 4.0 + Math.random(),
    sold: Math.floor(Math.random() * 2000),
  }));
  
  return mockProducts;
}

/**
 * Format Shopee price for display
 */
export function formatShopeePrice(price: string | number): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  return price;
}

/**
 * Check if Shopee product is available
 */
export function isShopeeProductAvailable(product: ShopeeProduct): boolean {
  return !!product.shopeeUrl && !!product.itemId;
}
