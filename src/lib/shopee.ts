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
    imageUrl: generateMockImageUrl(item.category, item.color, item.name),
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
 * Generate product image URL using Unsplash for realistic fashion images
 * In production, this would return actual product images from Shopee API
 */
function generateMockImageUrl(category: string, color: string, itemName?: string): string {
  // Curated Unsplash images for specific clothing items
  const itemSpecificImages: Record<string, string> = {
    // Tops
    'shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    'blouse': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    'sweater': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    'cardigan': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
    't-shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    'blazer': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop',
    'hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    
    // Bottoms
    'jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    'denim': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    'pants': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
    'trousers': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
    'skirt': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop',
    'shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    
    // Footwear
    'sneakers': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    'trainers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    'boots': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop',
    'shoes': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop',
    'loafers': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop',
    'sandals': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
    'heels': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
    
    // Accessories
    'watch': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    'bag': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    'purse': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
    'jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    'necklace': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    'bracelet': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    'sunglasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    'glasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    'belt': 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop',
    'scarf': 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
    'hat': 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop',
    'cap': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
  };
  
  // Try to find a matching image based on item name
  if (itemName) {
    const nameLower = itemName.toLowerCase();
    
    // Check for exact matches in our curated list
    for (const [key, imageUrl] of Object.entries(itemSpecificImages)) {
      if (nameLower.includes(key)) {
        return imageUrl;
      }
    }
  }
  
  // Fallback to category-based images
  const categoryFallbacks: Record<string, string> = {
    top: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    bottom: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    accessory: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
  };
  
  return categoryFallbacks[category] || categoryFallbacks.top;
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
