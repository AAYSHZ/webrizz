// ── Upload Limits ──
export const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024 // 50MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

// ── Pagination ──
export const REELS_PAGE_SIZE = 5
export const MESSAGES_LIMIT = 200
export const COMMENTS_LIMIT = 50
export const SEARCH_RESULTS_LIMIT = 20
export const SEARCH_PROFILE_LIMIT = 10

// ── Validation ──
export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 30
export const USERNAME_REGEX = /^[a-z0-9_]+$/
export const BIO_MAX_LENGTH = 160
export const TITLE_MAX_LENGTH = 60
export const CAPTION_MAX_LENGTH = 300
export const COMMENT_MAX_LENGTH = 500
export const MESSAGE_MAX_LENGTH = 2000
export const DISPLAY_NAME_MAX_LENGTH = 50

// ── UI ──
export const DOUBLE_TAP_THRESHOLD_MS = 300
export const LIKE_ANIMATION_DURATION_MS = 800
export const TIMEUPDATE_THROTTLE_MS = 500
export const SUCCESS_BANNER_DURATION_MS = 3000
export const DEBOUNCE_DELAY_MS = 400

// ── Reel Categories ──
export const DEFAULT_CATEGORIES = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Other']
