// Shared types used across the application

export interface Profile {
  id: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  bio?: string | null
}

export interface Reel {
  id: string
  video_url: string
  title: string | null
  caption: string
  category: string | null
  created_at: string
  user_id: string
  profiles: {
    username: string | null
    full_name: string | null
    avatar_url: string | null
  } | null
  likes_count: number
  is_liked: boolean
  comments_count: number
}

export interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    username: string | null
    avatar_url: string | null
    full_name: string | null
  } | null
}

export interface ConversationItem {
  id: string
  participant_one: string
  participant_two: string
  last_message_at: string
  last_message_text: string
  other_user: {
    id: string
    username: string | null
    full_name: string | null
    avatar_url: string | null
  }
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
  is_read: boolean
}

export interface LeaderboardEntry {
  userId: string
  username: string
  full_name: string | null
  avatar_url: string | null
  totalPoints: number
  badge: import('@/lib/points').BadgeTier
}
