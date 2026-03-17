import { createClient } from '@/lib/supabase/server'
import DeleteButton from '../components/DeleteButton'
import { deleteReelAction } from '../actions'
import Avatar from '@/components/Avatar'
import { Video } from 'lucide-react'

export default async function AdminReelsPage() {
  const supabase = await createClient()

  const { data: reels } = await supabase
    .from('reels')
    .select(`
      id,
      video_url,
      caption,
      created_at,
      profiles (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Manage Reels</h2>
          <p className="mt-1 text-sm text-slate-500">View and remove reels across the platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reels?.map((reel) => {
          // profiles can be an array if it's a many-to-many, but in this schema it's an object. Handle accordingly.
          const profile = Array.isArray(reel.profiles) ? reel.profiles[0] : reel.profiles

          return (
            <div key={reel.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md">
              <div className="relative aspect-[9/16] w-full bg-slate-100">
                <video
                  src={reel.video_url}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Delete overlay button top right */}
                <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                  <div className="rounded-lg bg-white/90 p-1 shadow-sm backdrop-blur-xs">
                    <DeleteButton id={reel.id} action={deleteReelAction} type="reel" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="line-clamp-2 text-sm font-medium drop-shadow-md">
                    {reel.caption || 'No caption'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4">
                <Avatar
                  src={profile?.avatar_url}
                  fallbackText={profile?.full_name || profile?.username || '?'}
                  size="sm"
                  className="h-8 w-8 shrink-0 ring-1 ring-slate-100"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {profile?.full_name || 'Unknown User'}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    @{profile?.username || 'unknown'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {(!reels || reels.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <Video className="mb-3 h-10 w-10 text-slate-400" />
          <h3 className="text-lg font-medium text-zinc-900">No reels found</h3>
          <p className="mt-1 text-sm text-slate-500">Users haven't uploaded any reels yet.</p>
        </div>
      )}
    </div>
  )
}
