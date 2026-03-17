import { createClient } from '@/lib/supabase/server'
import { Users, Video, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch basic stats
  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: reelsCount } = await supabase
    .from('reels')
    .select('*', { count: 'exact', head: true })

  const { count: likesCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Platform Overview</h2>
        <p className="mt-1 text-sm text-slate-500">Quick stats and metrics for your application.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-2xl font-bold text-zinc-900">{usersCount || 0}</p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Reels</p>
            <p className="text-2xl font-bold text-zinc-900">{reelsCount || 0}</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Engagements</p>
            <p className="text-2xl font-bold text-zinc-900">{likesCount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
