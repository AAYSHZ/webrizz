-- 1. Database Schema Additions
-- Gamification updates for CodeReels

-- Enable checking for profiles and reels to exist first if needed, though usually migrations just run
-- on top of existing ones.

-- Add gamification columns to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS xp integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS coins integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS reputation_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS level integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS current_badge text DEFAULT 'Beginner',
ADD COLUMN IF NOT EXISTS is_verified_creator boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_elite_creator boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS streak_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_upload_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS skill_points jsonb DEFAULT '{"DSA": 0, "WebDev": 0, "AI-ML": 0, "Hardware": 0}'::jsonb;

-- Add gamification columns to reels 
ALTER TABLE public.reels
ADD COLUMN IF NOT EXISTS engagement_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS final_points numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS rscore numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS authenticity_factor numeric DEFAULT 1.0,
ADD COLUMN IF NOT EXISTS vq_multiplier numeric DEFAULT 1.0, -- Default difficulty multiplier
ADD COLUMN IF NOT EXISTS validation_votes jsonb DEFAULT '{"upvotes": 0, "downvotes": 0}'::jsonb;

-- Create indexes for leaderboard querying performance
CREATE INDEX IF NOT EXISTS idx_profiles_total_score ON public.profiles (total_score DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles (xp DESC);
CREATE INDEX IF NOT EXISTS idx_reels_rscore ON public.reels (rscore DESC);

-- RPC for Gamification Engine to safely increment profile stats
CREATE OR REPLACE FUNCTION public.increment_gamification_stats(
  user_id uuid,
  xp_add integer,
  coins_add integer,
  total_score_add integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    xp = xp + xp_add,
    coins = coins + coins_add,
    total_score = total_score + total_score_add
  WHERE id = user_id;
END;
$$;
