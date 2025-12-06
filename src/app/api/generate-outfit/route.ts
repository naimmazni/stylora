import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { GenerateOutfitRequest, GenerateOutfitResponse, OutfitRecommendation, ClothingItem, ColorPalette, EventType, StylePreference } from '@/types';
import { generateId } from '@/lib/utils';
import { generateShopeeProductPreview } from '@/lib/shopee';
import { POINTS_CONFIG } from '@/lib/constants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  let skinTone = '';
  let eventType = '';
  let stylePreferences: string[] = [];
  
  try {
    const body: GenerateOutfitRequest = await request.json();
    skinTone = body.skinTone;
    eventType = body.eventType;
    stylePreferences = body.stylePreferences;

    if (!skinTone || !eventType || !stylePreferences || stylePreferences.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY not set, using mock data');
      throw new Error('API key not configured');
    }

    // Create the prompt for Claude
    const prompt = `You are a professional fashion stylist AI. Generate a complete outfit recommendation based on the following criteria:

Skin Tone: ${skinTone}
Event Type: ${eventType}
Style Preferences: ${stylePreferences.join(', ')}

Please provide a detailed outfit recommendation in the following JSON format:
{
  "items": [
    {
      "category": "top" | "bottom" | "footwear" | "accessory",
      "name": "Item name",
      "description": "Detailed description",
      "color": "#hexcode"
    }
  ],
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode",
    "neutral": "#hexcode"
  },
  "styleTips": ["tip1", "tip2", "tip3"]
}

Requirements:
- Include at least 1 top, 1 bottom, 1 footwear, and 2 accessories
- Colors should complement the ${skinTone} skin tone
- Style should match ${eventType} event and ${stylePreferences.join(', ')} aesthetic
- Provide 3-5 actionable style tips
- Use specific color names and hex codes
- Be creative but practical

Return ONLY the JSON object, no additional text.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse Claude's response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    let outfitData;

    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      outfitData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      // Fallback to mock data if parsing fails
      outfitData = generateMockOutfit(skinTone, eventType, stylePreferences[0]);
    }

    // Process the outfit data and add Shopee links
    const processedItems: ClothingItem[] = outfitData.items.map((item: any) => {
      const clothingItem: ClothingItem = {
        id: generateId(),
        category: item.category,
        name: item.name,
        description: item.description,
        color: item.color,
      };

      // Add Shopee product preview
      const shopeeProduct = generateShopeeProductPreview(clothingItem);
      clothingItem.shopeeLink = shopeeProduct.shopeeUrl;
      clothingItem.shopeeImageUrl = shopeeProduct.imageUrl;
      clothingItem.price = shopeeProduct.price;

      return clothingItem;
    });

    const outfit: OutfitRecommendation = {
      id: generateId(),
      items: processedItems,
      colorPalette: outfitData.colorPalette,
      styleTips: outfitData.styleTips,
      occasionMatch: eventType as EventType,
      styleMatch: stylePreferences[0] as StylePreference,
      createdAt: new Date(),
    };

    const response: GenerateOutfitResponse = {
      outfit,
      pointsEarned: POINTS_CONFIG.CREATE_OUTFIT,
      levelUp: false, // This would be calculated based on user stats
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating outfit:', error);
    
    // Return mock data on error
    // Note: body was already parsed above, so we use the parsed values
    const mockOutfit = generateMockOutfit(skinTone, eventType, stylePreferences[0]);
    
    const processedItems: ClothingItem[] = mockOutfit.items.map((item: any) => {
      const clothingItem: ClothingItem = {
        id: generateId(),
        category: item.category,
        name: item.name,
        description: item.description,
        color: item.color,
      };

      const shopeeProduct = generateShopeeProductPreview(clothingItem);
      clothingItem.shopeeLink = shopeeProduct.shopeeUrl;
      clothingItem.shopeeImageUrl = shopeeProduct.imageUrl;
      clothingItem.price = shopeeProduct.price;

      return clothingItem;
    });

    const outfit: OutfitRecommendation = {
      id: generateId(),
      items: processedItems,
      colorPalette: mockOutfit.colorPalette,
      styleTips: mockOutfit.styleTips,
      occasionMatch: eventType as EventType,
      styleMatch: stylePreferences[0] as StylePreference,
      createdAt: new Date(),
    };

    return NextResponse.json({
      outfit,
      pointsEarned: POINTS_CONFIG.CREATE_OUTFIT,
      levelUp: false,
    });
  }
}

// Mock outfit generator for fallback
function generateMockOutfit(skinTone: string, eventType: string, style: string): any {
  const colorPalettes: Record<string, ColorPalette> = {
    casual: { primary: '#4a90e2', secondary: '#ffffff', accent: '#f5a623', neutral: '#9b9b9b' },
    work: { primary: '#2c3e50', secondary: '#ecf0f1', accent: '#3498db', neutral: '#95a5a6' },
    party: { primary: '#e74c3c', secondary: '#000000', accent: '#f39c12', neutral: '#bdc3c7' },
    formal: { primary: '#1a1a1a', secondary: '#ffffff', accent: '#c0392b', neutral: '#7f8c8d' },
    date: { primary: '#ff6b9d', secondary: '#ffeef8', accent: '#c44569', neutral: '#f8b500' },
    wedding: { primary: '#d4af37', secondary: '#ffffff', accent: '#c9a661', neutral: '#e8e8e8' },
    sporty: { primary: '#27ae60', secondary: '#34495e', accent: '#e67e22', neutral: '#95a5a6' },
  };

  return {
    items: [
      {
        category: 'top',
        name: 'Classic Cotton Shirt',
        description: `Perfect ${style} top for ${eventType} occasions`,
        color: colorPalettes[eventType]?.primary || '#4a90e2',
      },
      {
        category: 'bottom',
        name: 'Tailored Trousers',
        description: `Comfortable and stylish ${style} pants`,
        color: colorPalettes[eventType]?.neutral || '#2c3e50',
      },
      {
        category: 'footwear',
        name: 'Leather Shoes',
        description: `Elegant footwear matching ${eventType} style`,
        color: colorPalettes[eventType]?.secondary || '#000000',
      },
      {
        category: 'accessory',
        name: 'Designer Watch',
        description: 'Sophisticated timepiece',
        color: colorPalettes[eventType]?.accent || '#c0392b',
      },
      {
        category: 'accessory',
        name: 'Leather Belt',
        description: 'Completes the outfit perfectly',
        color: colorPalettes[eventType]?.neutral || '#7f8c8d',
      },
    ],
    colorPalette: colorPalettes[eventType] || colorPalettes.casual,
    styleTips: [
      `This outfit complements ${skinTone} skin tone beautifully`,
      `Perfect for ${eventType} occasions with a ${style} aesthetic`,
      'Accessorize minimally to let the outfit speak for itself',
      'Consider the weather and adjust layers accordingly',
    ],
  };
}
