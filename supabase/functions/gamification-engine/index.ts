import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

// Environment variables for Supabase must be set in the Edge Function deployment
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { record, old_record } = await req.json() // Expected to be triggered by a webhook on interactions table (likes, comments, etc) or reels update
    // This is a complex logic that depends on the exact trigger.
    // Assuming the payload contains the interaction details or we fetch the reel
    const reelId = record.reel_id || record.id
    
    // Fetch reel stats
    const { data: reel, error: reelError } = await supabase.from('reels').select('*').eq('id', reelId).single()
    if (reelError) throw reelError
    
    // Fetch user profile
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', reel.user_id).single()
    if (profileError) throw profileError

    // Define points (mocking the fetching of interactions for this example, ideally passed in or aggregated)
    // In a real app, these would come from aggregations or the payload
    const likes = reel.likes_count || 0
    const shares = reel.shares_count || 0
    const saves = reel.saves_count || 0
    const comments = reel.comments_count || 0
    const watchTimePercent = reel.average_watch_time_percent || 0 // 0-100
    const bestReplies = reel.best_replies_count || 0

    // Master Score: TS = XP + RS + CS
    // Layer 1 (Engagement): ER = (Likes x 2) + (Shares x 4) + (Saves x 3) + (Comments x 3) + (BestReply x 50) + WatchTimeScore
    
    // Layer 2 (Watch Time Score): 1pt for 25%, 3pts for 50%, 6pts for 75%, 10pts for 100%
    let watchTimeScore = 0
    if (watchTimePercent >= 100) watchTimeScore = 10
    else if (watchTimePercent >= 75) watchTimeScore = 6
    else if (watchTimePercent >= 50) watchTimeScore = 3
    else if (watchTimePercent >= 25) watchTimeScore = 1

    const engagementRate = (likes * 2) + (shares * 4) + (saves * 3) + (comments * 3) + (bestReplies * 50) + watchTimeScore

    // Layer 3 (Difficulty Multiplier): Apply a 1.0x multiplier for Easy, 1.5x for Medium, and 2.5x for Hard.
    const difficultyMultiplier = reel.vq_multiplier || 1.0

    // Layer 4 (Authenticity Factor): Apply 1.0 for normal, 0.6 for suspicious, 0.3 for confirmed spam.
    const authenticityFactor = reel.authenticity_factor || 1.0

    // Layer 5 (Reputation Multiplier): RM = 1 + (RS / 10000)
    let reputationScore = profile.reputation_score || 0
    const reputationMultiplier = 1 + (reputationScore / 10000)

    // Final Points Awarded: FPA = (ER x DM x AF) x RM
    const finalPointsAwarded = (engagementRate * difficultyMultiplier * authenticityFactor) * reputationMultiplier

    // Coin Economy: Coins = floor(FPA / 10)
    const coinsEarned = Math.floor(finalPointsAwarded / 10)
    
    // XP is usually equivalent to some logic or final points. We'll use FPA.
    const xpEarned = Math.floor(finalPointsAwarded)
    
    // Update Reel
    await supabase.from('reels').update({
       engagement_score: engagementRate,
       final_points: finalPointsAwarded
    }).eq('id', reelId)

    // Update Profile
    await supabase.rpc('increment_gamification_stats', {
      user_id: profile.id,
      xp_add: xpEarned,
      coins_add: coinsEarned,
      total_score_add: xpEarned // Assuming total score grows identically
    })

    return new Response(JSON.stringify({ success: true, finalPointsAwarded, coinsEarned }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
