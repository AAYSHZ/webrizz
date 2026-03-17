import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { record } = await req.json() // triggered on profiles update
    const profile = record

    // Level Formula: Level = floor(sqrt(XP / 10))
    const currentXp = profile.xp || 0
    const calculatedLevel = Math.floor(Math.sqrt(currentXp / 10))
    const newLevel = Math.max(1, calculatedLevel)

    // Badge Tiers: Beginner(1), Coder(5), Debugger(10), Architect(20), Code Master(50)
    let newBadge = 'Beginner'
    if (newLevel >= 50) newBadge = 'Code Master'
    else if (newLevel >= 20) newBadge = 'Architect'
    else if (newLevel >= 10) newBadge = 'Debugger'
    else if (newLevel >= 5) newBadge = 'Coder'

    // Streak logic (usually checked on daily login or upload)
    // If last_upload_date was yesterday, increment streak.
    // If earlier, reset to 0. (For simplicity here, assuming request provides a boolean "isNewUploadDaily")
    // Could also be handled directly in DB triggers

    // Update if changed
    if (newLevel !== profile.level || newBadge !== profile.current_badge) {
        await supabase.from('profiles').update({
            level: newLevel,
            current_badge: newBadge
        }).eq('id', profile.id)
    }

    return new Response(JSON.stringify({ success: true, newLevel, newBadge }), {
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
