import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteUserAction(userId: string) {
  const supabase = await createClient()

  // 1. Verify caller is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) throw new Error('Not authorized')

  // 2. Delete user profile
  // Note: Because we set ON DELETE CASCADE, this will also delete reels, likes, comments, etc!
  // To delete a user completely from auth.users (if using Supabase Auth), 
  // you typically need to use the Supabase Admin API.
  // We'll delete their profile, which will cascade to their content.
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    console.error('Error deleting user:', error)
    throw new Error('Failed to delete user')
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function deleteReelAction(reelId: string) {
  const supabase = await createClient()

  // 1. Verify caller is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) throw new Error('Not authorized')

  // 2. Delete the reel
  const { error } = await supabase
    .from('reels')
    .delete()
    .eq('id', reelId)

  if (error) {
    console.error('Error deleting reel:', error)
    throw new Error('Failed to delete reel')
  }

  revalidatePath('/admin/reels')
  return { success: true }
}
