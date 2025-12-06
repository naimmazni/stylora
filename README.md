# Stylora - AI-Powered Fashion Styling Platform

Stylora is a comprehensive, gamified fashion styling platform that uses AI to provide personalized outfit recommendations. Built with Next.js 15, TypeScript, and powered by Anthropic Claude API, it offers an engaging user experience with challenges, badges, and shopping integration.

## ✨ Features

### Core Functionality

- **🎨 AI-Powered Outfit Generation**: Personalized recommendations using Anthropic Claude API
- **👤 Smart Onboarding**: Three-step process collecting skin tone, event type, and style preferences
- **🛍️ Shopee Integration**: Direct product links and previews for recommended items
- **🎯 Gamification System**: Points, levels, badges, and challenges to keep users engaged
- **📊 Progress Dashboard**: Track outfits created, challenges completed, and achievements
- **🏆 Badge System**: Unlock exclusive badges for various milestones
- **⚡ Daily & Weekly Challenges**: Engaging tasks to earn points and improve style

### Technical Features

- **⚛️ Next.js 15** with App Router for optimal performance
- **📘 TypeScript** for type safety and better developer experience
- **🎭 Framer Motion** for smooth, engaging animations
- **💅 Sass (SCSS)** for modular and maintainable styling
- **🗄️ Supabase** for authentication and data persistence
- **🔐 Row Level Security** for secure data access
- **📱 Fully Responsive** mobile-first design
- **♿ Accessibility** with ARIA labels and keyboard navigation

## 🎨 User Flow

### 1. Landing Page

- Eye-catching hero section with animated elements
- Feature highlights
- Call-to-action buttons

### 2. Onboarding (3 Steps)

- **Step 1**: Skin tone selection (5 options + photo upload)
- **Step 2**: Event type selection (7 occasions)
- **Step 3**: Style preferences (6 styles, multiple selection)

### 3. Outfit Generation

- AI analyzes user preferences
- Generates complete outfit with:
  - Individual clothing items (tops, bottoms, footwear, accessories)
  - Complementary color palette
  - Personalized style tips
  - Shopee product links for each item

### 4. Dashboard

- View level and progress
- Track earned badges
- See outfit history
- Monitor challenge completion

### 5. Challenges

- Daily challenges (expire in 24h)
- Weekly challenges (expire in 7 days)
- Mini challenges (fashion quizzes)
- Earn points and unlock badges

## 🗃️ Database Schema

### Tables

- **users**: User profiles and preferences
- **user_stats**: Points, levels, and statistics
- **outfit_history**: Saved outfit recommendations
- **challenges**: Available challenges
- **completed_challenges**: User challenge completion records
- **badges**: Badge definitions
- **user_badges**: Earned badges with progress

### Security

All tables implement Row Level Security (RLS) policies ensuring users can only access their own data.

## 🎮 Gamification System

### Points

- Create outfit: **50 points**
- Complete daily challenge: **50 points**
- Complete weekly challenge: **100 points**
- Complete mini challenge: **20 points**
- Share outfit: **30 points**

### Levels

Progressive level system with thresholds:

- Level 1: 0 points
- Level 2: 100 points
- Level 3: 250 points
- Level 4: 500 points
- Level 5: 1,000 points
- ... (up to Level 10)

### Badges

- 👕 **Style Newbie**: Created first outfit
- ✨ **Fashionista**: Created 10 outfits
- 🌟 **Style Explorer**: Tried all 6 styles
- 🏆 **Challenge Master**: Completed 20 challenges
- 🎯 **Trend Setter**: Shared 5 outfits
- 🎨 **Color Guru**: Matched 50 color palettes
- ⚡ **Week Warrior**: Active for 7 consecutive days
- 🔥 **Style Streak**: Active for 30 consecutive days

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Anthropic** - AI-powered outfit generation
- **Supabase** - Backend infrastructure
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Shopee** - E-commerce integration

---

Built with ❤️ using Next.js, TypeScript, and AI
