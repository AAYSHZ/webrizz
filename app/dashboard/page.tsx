import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatReelRow } from '@/lib/utils'
import { REELS_PAGE_SIZE } from '@/lib/constants'
import ReelViewer from '@/components/ReelViewer'
import BottomNav from '@/components/BottomNav'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch current user's profile for avatar
  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user.id)
    .single()

  const currentUserAvatar = currentProfile?.avatar_url || user.user_metadata?.avatar_url || null

  // Fetch initial reels
  const { data: reelsData } = await supabase
    .from('reels')
    .select(`
      id,
      video_url,
      title,
      caption,
      category,
      created_at,
      user_id,
      profiles (
        username,
        full_name,
        avatar_url
      ),
      likes:likes(count),
      comments:comments(count)
    `)
    .order('created_at', { ascending: false })
    .range(0, REELS_PAGE_SIZE - 1)

  // Get likes for these reels
  const reelIds = reelsData?.map((r) => r.id) || []

  const { data: userLikes } = reelIds.length > 0
    ? await supabase
        .from('likes')
        .select('reel_id')
        .eq('user_id', user.id)
        .in('reel_id', reelIds)
    : { data: [] }

  const likedSet = new Set(userLikes?.map((l) => l.reel_id) || [])

  const initialReels = (reelsData || []).map((r) =>
    formatReelRow(r as unknown as Record<string, unknown>, likedSet)
  )

  return (
    <div className="relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-linear-to-b from-black/70 via-black/30 to-transparent sm:left-64">
        <h1 className="text-lg font-extrabold text-white tracking-tight drop-shadow-lg">WebRizz</h1>
      </div>

      <ReelViewer initialReels={initialReels} currentUserId={user.id} currentUserAvatar={currentUserAvatar} />
      <BottomNav />
    </div>
  )
}
