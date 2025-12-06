# Stylora - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Get your API keys:

   **Anthropic API Key:**

   - Visit https://console.anthropic.com/
   - Sign up or log in
   - Go to API Keys section
   - Create a new key
   - Copy and paste into `.env.local` as `ANTHROPIC_API_KEY`

   **Supabase Setup:**

   - Visit https://supabase.com
   - Create a new project
   - Wait for project initialization (~2 minutes)
   - Go to Settings > API
   - Copy `Project URL` to `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Database Setup

1. Open your Supabase project
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire contents of `supabase-schema.sql`
5. Paste into the SQL editor
6. Click "Run" to execute

This creates:

- ✅ All database tables
- ✅ Row Level Security policies
- ✅ Triggers and functions
- ✅ Default badges and challenges

### Step 3: Install & Run

```bash
# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 and you're ready! 🎉

## 📋 Project Checklist

Before you start developing, make sure:

- [ ] Node.js 18+ is installed
- [ ] `.env.local` file exists with all required keys
- [ ] Supabase database schema is executed
- [ ] `npm install` completed successfully
- [ ] Development server starts without errors

## 🎨 Testing the Application

### Test the Onboarding Flow:

1. Go to http://localhost:3000
2. Click "Get Started"
3. Select skin tone
4. Choose event type
5. Pick style preferences
6. Click "Complete"

### Test Outfit Generation:

1. After onboarding, you'll be redirected to generation page
2. AI will generate a personalized outfit
3. View color palette, clothing items, and style tips
4. Click Shopee links to see product searches

### Test Dashboard:

1. Click "View Dashboard" from landing page
2. View your stats, level, and progress
3. Check badges (some should be locked)
4. View recent outfits

### Test Challenges:

1. Go to dashboard
2. Click "View Challenges"
3. Toggle between Daily, Weekly, and Mini tabs
4. Try starting a challenge

## 🔧 Common Issues

### Issue: "Missing environment variables"

**Solution:** Make sure `.env.local` exists and contains all required variables

### Issue: Database errors

**Solution:** Verify you ran the entire `supabase-schema.sql` file in Supabase SQL Editor

### Issue: API errors when generating outfits

**Solution:** Check that your Anthropic API key is valid and has credits

### Issue: Styles not loading

**Solution:** Clear Next.js cache and restart:

```bash
rm -rf .next
npm run dev
```

## 📚 Key Files to Know

- `src/app/page.tsx` - Landing page
- `src/app/onboarding/page.tsx` - Onboarding flow
- `src/app/generate/page.tsx` - Outfit generation
- `src/app/dashboard/page.tsx` - User dashboard
- `src/app/challenges/page.tsx` - Challenges system
- `src/app/api/generate-outfit/route.ts` - AI outfit generation API
- `src/lib/constants.ts` - Gamification rules and data
- `src/types/index.ts` - TypeScript types

## 🎯 Next Steps

1. **Customize the design**: Edit Sass variables in `src/styles/_variables.scss`
2. **Add authentication**: Implement Supabase Auth in layouts
3. **Enhance AI prompts**: Modify the prompt in `src/app/api/generate-outfit/route.ts`
4. **Integrate real Shopee API**: Update `src/lib/shopee.ts`
5. **Add more challenges**: Insert new challenges in Supabase
6. **Create more badges**: Define new badges in database

## 💡 Tips

- Use mock data during development to save API credits
- Test responsive design with browser DevTools
- Check browser console for any errors
- Use Supabase dashboard to view database records
- Reference the main README.md for detailed documentation

## 🆘 Need Help?

- Check the main [README.md](./README.md) for comprehensive documentation
- Review [Next.js documentation](https://nextjs.org/docs)
- Visit [Supabase docs](https://supabase.com/docs)
- Check [Anthropic API docs](https://docs.anthropic.com/)

---

Happy coding! 🚀
