-- Stylora Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  skin_tone TEXT CHECK (skin_tone IN ('very-light', 'light', 'medium', 'tan', 'dark')),
  skin_tone_image TEXT,
  preferred_styles TEXT[] DEFAULT '{}',
  CONSTRAINT valid_styles CHECK (
    preferred_styles <@ ARRAY['minimalist', 'trendy', 'bold', 'chic', 'sporty', 'vintage']
  )
);

-- User Stats table
CREATE TABLE public.user_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  outfits_created INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  badges_earned TEXT[] DEFAULT '{}',
  current_streak INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Outfit History table
CREATE TABLE public.outfit_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  outfit_data JSONB NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('daily', 'weekly', 'mini')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER DEFAULT 10,
  requirement INTEGER DEFAULT 1,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Completed Challenges table
CREATE TABLE public.completed_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  UNIQUE(user_id, challenge_id)
);

-- Badges table
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Badges table (earned badges)
CREATE TABLE public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, badge_type)
);

-- Indexes for better performance
CREATE INDEX idx_outfit_history_user_id ON public.outfit_history(user_id);
CREATE INDEX idx_outfit_history_created_at ON public.outfit_history(created_at DESC);
CREATE INDEX idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX idx_completed_challenges_user_id ON public.completed_challenges(user_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_challenges_type ON public.challenges(type);
CREATE INDEX idx_challenges_expires_at ON public.challenges(expires_at);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only read/update their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User Stats policies
CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Outfit History policies
CREATE POLICY "Users can view own outfits" ON public.outfit_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own outfits" ON public.outfit_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own outfits" ON public.outfit_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own outfits" ON public.outfit_history
  FOR DELETE USING (auth.uid() = user_id);

-- Completed Challenges policies
CREATE POLICY "Users can view own completed challenges" ON public.completed_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed challenges" ON public.completed_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Badges policies
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Challenges are readable by everyone
CREATE POLICY "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (is_active = true);

-- Badges are readable by everyone
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user stats on user creation
CREATE OR REPLACE FUNCTION create_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-create user stats
CREATE TRIGGER on_user_created
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION create_user_stats();

-- Insert default badges
INSERT INTO public.badges (type, name, description, icon, requirement) VALUES
  ('first-outfit', 'Style Newbie', 'Created your first outfit', '👕', 1),
  ('fashionista', 'Fashionista', 'Created 10 outfits', '✨', 10),
  ('style-explorer', 'Style Explorer', 'Tried all 6 style preferences', '🌟', 6),
  ('challenge-master', 'Challenge Master', 'Completed 20 challenges', '🏆', 20),
  ('trend-setter', 'Trend Setter', 'Shared 5 outfits', '🎯', 5),
  ('color-guru', 'Color Guru', 'Matched 50 color palettes', '🎨', 50),
  ('week-warrior', 'Week Warrior', 'Active for 7 consecutive days', '⚡', 7),
  ('style-streak', 'Style Streak', 'Active for 30 consecutive days', '🔥', 30);

-- Insert default challenges
INSERT INTO public.challenges (type, title, description, points, requirement, expires_at) VALUES
  ('daily', 'Daily Style Quest', 'Create an outfit today', 50, 1, NOW() + INTERVAL '1 day'),
  ('daily', 'Color Master', 'Match colors perfectly in an outfit', 30, 1, NOW() + INTERVAL '1 day'),
  ('weekly', 'Style Explorer', 'Try 3 different styles this week', 100, 3, NOW() + INTERVAL '7 days'),
  ('mini', 'Fashion Quiz: Colors', 'What colors go well with navy blue?', 20, 1, NULL),
  ('mini', 'Fashion Quiz: Occasions', 'Best outfit for a job interview?', 20, 1, NULL);
