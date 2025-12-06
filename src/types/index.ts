// User Types
export type SkinTone = 'very-light' | 'light' | 'medium' | 'tan' | 'dark';

export type EventType = 'casual' | 'work' | 'party' | 'formal' | 'date' | 'wedding' | 'sporty';

export type StylePreference = 'minimalist' | 'trendy' | 'bold' | 'chic' | 'sporty' | 'vintage';

export interface OnboardingData {
  skinTone: SkinTone;
  skinToneImage?: string;
  eventType: EventType;
  stylePreferences: StylePreference[];
}

// Outfit Types
export interface ClothingItem {
  id: string;
  category: 'top' | 'bottom' | 'footwear' | 'accessory';
  name: string;
  description: string;
  color: string;
  shopeeLink?: string;
  shopeeImageUrl?: string;
  price?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

export interface OutfitRecommendation {
  id: string;
  items: ClothingItem[];
  colorPalette: ColorPalette;
  styleTips: string[];
  occasionMatch: EventType;
  styleMatch: StylePreference;
  createdAt: Date;
}

// Gamification Types
export type BadgeType = 
  | 'first-outfit' 
  | 'fashionista' 
  | 'style-explorer' 
  | 'challenge-master' 
  | 'trend-setter'
  | 'color-guru'
  | 'week-warrior'
  | 'style-streak';

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  progress?: number;
  requirement: number;
}

export type ChallengeType = 'daily' | 'weekly' | 'mini';

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  expiresAt?: Date;
  progress?: number;
  requirement: number;
}

export interface UserProgress {
  userId: string;
  level: number;
  totalPoints: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  outfitsCreated: number;
  challengesCompleted: number;
  badges: Badge[];
  currentStreak: number;
}

// Database Types (Supabase)
export interface User {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  onboarding_completed: boolean;
  skin_tone?: SkinTone;
  preferred_styles: StylePreference[];
}

export interface OutfitHistory {
  id: string;
  user_id: string;
  outfit_data: OutfitRecommendation;
  created_at: Date;
  is_favorite: boolean;
}

export interface UserStats {
  id: string;
  user_id: string;
  level: number;
  total_points: number;
  outfits_created: number;
  challenges_completed: number;
  badges_earned: string[];
  current_streak: number;
  last_activity: Date;
}

export interface CompletedChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  completed_at: Date;
  points_earned: number;
}

// API Types
export interface GenerateOutfitRequest {
  skinTone: SkinTone;
  eventType: EventType;
  stylePreferences: StylePreference[];
  previousOutfits?: string[];
}

export interface GenerateOutfitResponse {
  outfit: OutfitRecommendation;
  pointsEarned: number;
  newBadges?: Badge[];
  levelUp?: boolean;
}

export interface ShopeeProduct {
  itemId: string;
  name: string;
  price: string;
  imageUrl: string;
  shopeeUrl: string;
  rating?: number;
  sold?: number;
}

export interface ShopeeSearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}
