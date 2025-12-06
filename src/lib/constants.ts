import { SkinTone, EventType, StylePreference, BadgeType } from '@/types';

export const SKIN_TONES: { value: SkinTone; label: string; color: string }[] = [
  { value: 'very-light', label: 'Very Light', color: '#fde4d0' },
  { value: 'light', label: 'Light', color: '#f4c7a0' },
  { value: 'medium', label: 'Medium', color: '#d4a574' },
  { value: 'tan', label: 'Tan', color: '#b68556' },
  { value: 'dark', label: 'Dark', color: '#8d5524' },
];

export const EVENT_TYPES: { value: EventType; label: string; icon: string; description: string }[] = [
  { value: 'casual', label: 'Casual', icon: '👕', description: 'Everyday comfort and style' },
  { value: 'work', label: 'Work', icon: '💼', description: 'Professional and polished' },
  { value: 'party', label: 'Party', icon: '🎉', description: 'Fun and festive vibes' },
  { value: 'formal', label: 'Formal', icon: '🎩', description: 'Elegant and sophisticated' },
  { value: 'date', label: 'Date', icon: '💕', description: 'Romantic and charming' },
  { value: 'wedding', label: 'Wedding', icon: '💒', description: 'Celebration ready' },
  { value: 'sporty', label: 'Sporty', icon: '⚽', description: 'Active and athletic' },
];

export const STYLE_PREFERENCES: { value: StylePreference; label: string; description: string }[] = [
  { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple, timeless' },
  { value: 'trendy', label: 'Trendy', description: 'Modern, current, fashionable' },
  { value: 'bold', label: 'Bold', description: 'Eye-catching, confident, daring' },
  { value: 'chic', label: 'Chic', description: 'Elegant, stylish, refined' },
  { value: 'sporty', label: 'Sporty', description: 'Athletic, casual, comfortable' },
  { value: 'vintage', label: 'Vintage', description: 'Classic, retro, nostalgic' },
];

export const BADGE_INFO: Record<BadgeType, { name: string; description: string; icon: string }> = {
  'first-outfit': {
    name: 'Style Newbie',
    description: 'Created your first outfit',
    icon: '👕',
  },
  'fashionista': {
    name: 'Fashionista',
    description: 'Created 10 outfits',
    icon: '✨',
  },
  'style-explorer': {
    name: 'Style Explorer',
    description: 'Tried all 6 style preferences',
    icon: '🌟',
  },
  'challenge-master': {
    name: 'Challenge Master',
    description: 'Completed 20 challenges',
    icon: '🏆',
  },
  'trend-setter': {
    name: 'Trend Setter',
    description: 'Shared 5 outfits',
    icon: '🎯',
  },
  'color-guru': {
    name: 'Color Guru',
    description: 'Matched 50 color palettes',
    icon: '🎨',
  },
  'week-warrior': {
    name: 'Week Warrior',
    description: 'Active for 7 consecutive days',
    icon: '⚡',
  },
  'style-streak': {
    name: 'Style Streak',
    description: 'Active for 30 consecutive days',
    icon: '🔥',
  },
};

export const POINTS_CONFIG = {
  CREATE_OUTFIT: 50,
  COMPLETE_DAILY_CHALLENGE: 50,
  COMPLETE_WEEKLY_CHALLENGE: 100,
  COMPLETE_MINI_CHALLENGE: 20,
  SHARE_OUTFIT: 30,
  FAVORITE_OUTFIT: 10,
};

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5500,   // Level 8
  8000,   // Level 9
  12000,  // Level 10
];

export const calculateLevel = (totalPoints: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const getNextLevelPoints = (currentLevel: number): number => {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  }
  return LEVEL_THRESHOLDS[currentLevel];
};

export const getCurrentLevelPoints = (currentLevel: number): number => {
  if (currentLevel <= 1) return 0;
  return LEVEL_THRESHOLDS[currentLevel - 2];
};
