import type { Reel } from '@/lib/types'

/**
 * Converts a date string to a human-readable relative time string.
 * e.g. "just now", "5m", "2h", "3d", "1w"
 */
export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  const weeks = Math.floor(days / 7)
  return `${weeks}w`
}

/**
 * Formats a raw Supabase reel row into the standardized Reel shape.
 * Handles the array-vs-object ambiguity from Supabase joins.
 */
export function formatReelRow(
  row: Record<string, unknown>,
  likedReelIds: Set<string> = new Set()
): Reel {
  const profiles = Array.isArray(row.profiles)
    ? (row.profiles as Record<string, unknown>[])[0]
    : row.profiles
  const likes = row.likes as { count: number }[] | { count: number } | undefined
  const comments = row.comments as { count: number }[] | { count: number } | undefined

  return {
    id: row.id as string,
    video_url: row.video_url as string,
    title: (row.title as string) || null,
    caption: (row.caption as string) || '',
    category: (row.category as string) || null,
    created_at: row.created_at as string,
    user_id: row.user_id as string,
    profiles: profiles as Reel['profiles'],
    likes_count: Array.isArray(likes)
      ? likes[0]?.count || 0
      : (likes as { count: number })?.count || 0,
    is_liked: likedReelIds.has(row.id as string),
    comments_count: Array.isArray(comments)
      ? comments[0]?.count || 0
      : (comments as { count: number })?.count || 0,
  }
}

/**
 * Sanitizes a string for safe display — strips HTML tags.
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

/**
 * Validates and sanitizes a username input.
 */
export function sanitizeUsername(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9_]/g, '')
}

/**
 * Formats a date string as a human-readable date label.
 */
export function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  })
}
