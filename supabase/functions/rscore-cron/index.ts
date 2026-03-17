import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  // This would be triggered periodically (e.g. pg_cron or Supabase scheduled functions)
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Fetch recent reels to update RSCORE
    const { data: reels, error: reelsError } = await supabase.from('reels').select('*, profiles(reputation_score)').limit(100)
    if (reelsError) throw reelsError

    for (const reel of reels) {
        // Calculate the Engagement Rate (ERATE) and Retention (RET)
        // Assume basic calculation based on available data 
        const views = reel.views_count || 1; // avoid div 0
        const interactions = (reel.likes_count || 0) + (reel.comments_count || 0) + (reel.saves_count || 0)
        
        const erate = Math.min(interactions / views, 1) // 0 to 1
        const ret = (reel.average_watch_time_percent || 0) / 100 // 0 to 1
        const sharesPerView = (reel.shares_count || 0) / views;

        // RSCORE Formula: RSCORE = (ERATE * 0.4) + (RET * 0.4) + ((Shares / Views) * 0.2)
        let rscore = (erate * 0.4) + (ret * 0.4) + (sharesPerView * 0.2)

        // Apply an Authority Boost multiplier of 1.2 for users with a Reputation Score over 5,000, and 1.5 for over 20,000.
        // @ts-ignore
        const repScore = reel.profiles?.reputation_score || 0
        let authorityBoost = 1.0
        if (repScore > 20000) authorityBoost = 1.5
        else if (repScore > 5000) authorityBoost = 1.2
        
        rscore = rscore * authorityBoost

        await supabase.from('reels').update({
            rscore: rscore * 100 // maybe scale to 0-100 logically
        }).eq('id', reel.id)
    }

    return new Response(JSON.stringify({ success: true, processed: reels.length }), {
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
