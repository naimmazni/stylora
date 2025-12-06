# Stylora - AI-Powered Fashion Styling Platform

![Stylora Logo](https://via.placeholder.com/800x200/667eea/ffffff?text=Stylora+-+AI-Powered+Fashion+Styling)

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Anthropic API key
- (Optional) Shopee affiliate account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd stylora
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Anthropic API
   ANTHROPIC_API_KEY=your_anthropic_api_key

   # Shopee Configuration (Optional)
   NEXT_PUBLIC_SHOPEE_AFFILIATE_ID=your_shopee_affiliate_id
   ```

4. **Set up Supabase database**

   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to SQL Editor
   - Run the SQL schema from `supabase-schema.sql`
   - This creates all necessary tables, policies, and triggers

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
stylora/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Landing page
│   │   ├── onboarding/           # Onboarding flow
│   │   ├── generate/             # Outfit generation
│   │   ├── dashboard/            # User dashboard
│   │   ├── challenges/           # Challenges page
│   │   └── api/                  # API routes
│   │       └── generate-outfit/  # AI outfit generation endpoint
│   ├── components/               # React components
│   │   └── ui/                   # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── ProgressBar.tsx
│   │       └── Badge.tsx
│   ├── lib/                      # Utility functions and configurations
│   │   ├── supabase.ts          # Supabase client
│   │   ├── constants.ts         # App constants
│   │   ├── shopee.ts            # Shopee integration
│   │   └── utils.ts             # Helper functions
│   ├── styles/                   # Global styles and Sass modules
│   │   ├── globals.scss         # Global styles
│   │   ├── _variables.scss      # Sass variables
│   │   └── _mixins.scss         # Sass mixins
│   └── types/                    # TypeScript type definitions
│       └── index.ts
├── public/                       # Static assets
├── supabase-schema.sql          # Database schema
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

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

## 🛠️ API Integration

### Anthropic Claude API

The outfit generation uses Claude 3.5 Sonnet to create personalized recommendations:

```typescript
// Example request
POST /api/generate-outfit
{
  "skinTone": "medium",
  "eventType": "party",
  "stylePreferences": ["bold", "trendy"]
}

// Example response
{
  "outfit": {
    "items": [...],
    "colorPalette": {...},
    "styleTips": [...]
  },
  "pointsEarned": 50
}
```

### Shopee Integration

Each clothing item includes Shopee product information:

- Product search URL
- Placeholder image (replace with actual API in production)
- Mock pricing (integrate real pricing in production)

## 🎨 Styling

### Sass Architecture

- **Variables** (`_variables.scss`): Colors, typography, spacing, shadows
- **Mixins** (`_mixins.scss`): Reusable style patterns
- **Global styles** (`globals.scss`): Base styles and utilities
- **Component modules**: Scoped styles for each component

### Design System

- **Primary Color**: Indigo (#6366f1)
- **Secondary Color**: Pink (#ec4899)
- **Accent Color**: Amber (#f59e0b)
- **Responsive Breakpoints**: 640px, 768px, 1024px, 1280px, 1536px

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. **New Page**: Create in `src/app/[page-name]/page.tsx`
2. **New Component**: Add to `src/components/`
3. **New API Route**: Create in `src/app/api/`
4. **New Styles**: Add module in same directory as component

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔐 Security Considerations

- Environment variables are never exposed to client
- Supabase RLS policies restrict data access
- API routes validate all inputs
- Authentication required for sensitive operations

## 🎯 Future Enhancements

- [ ] Implement actual Shopee API integration
- [ ] Add social sharing functionality
- [ ] Create community features and leaderboards
- [ ] Implement outfit rating system
- [ ] Add wardrobe management
- [ ] Create style inspiration feed
- [ ] Implement photo-based skin tone detection
- [ ] Add multi-language support
- [ ] Create mobile apps (React Native)

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
