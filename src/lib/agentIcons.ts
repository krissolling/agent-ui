import { type IconType } from '@/components/ui/icon/types'

/**
 * Agent Icon Resolution System
 *
 * Icons are resolved in this priority:
 * 1. Explicit avatar field from backend (e.g., "figma", "slack")
 * 2. Keyword matching against agent name
 * 3. Default fallback icon
 */

// App-specific icons (must be added to ICONS constant)
export const APP_ICONS: Record<string, IconType> = {
  figma: 'figma',
  slack: 'slack',
  notion: 'notion',
  github: 'github',
  linear: 'linear',
}

// Keyword to icon mapping - order matters (first match wins)
// App-specific keywords should be first to take priority
const KEYWORD_ICON_MAP: Array<{ keywords: string[]; icon: IconType }> = [
  // App icons (highest priority)
  { keywords: ['figma'], icon: 'figma' },
  { keywords: ['slack'], icon: 'slack' },
  { keywords: ['notion'], icon: 'notion' },
  { keywords: ['github'], icon: 'github' },
  { keywords: ['linear'], icon: 'linear' },
  // Generic agent icons
  { keywords: ['brief', 'analyst'], icon: 'target' },
  { keywords: ['interview', 'guide'], icon: 'file-text' },
  { keywords: ['scout', 'competitor'], icon: 'search' },
  { keywords: ['hunter', 'reference'], icon: 'image' },
  { keywords: ['visual', 'design'], icon: 'palette' },
  { keywords: ['scraper', 'crawler'], icon: 'bug' },
  { keywords: ['web', 'search'], icon: 'globe' },
  { keywords: ['formatter', 'format'], icon: 'sparkles' },
  { keywords: ['slide', 'presentation'], icon: 'presentation' },
  { keywords: ['kickoff', 'start'], icon: 'rocket' },
  { keywords: ['intelligence', 'market'], icon: 'trending-up' },
  { keywords: ['case', 'study'], icon: 'book-open' },
  { keywords: ['assist', 'help'], icon: 'message-circle' },
]

// Default icon when no match is found
const DEFAULT_ICON: IconType = 'agent'

/**
 * Resolves the appropriate icon for an agent/team
 *
 * @param name - The agent/team name
 * @param avatar - Optional explicit avatar from backend
 * @returns IconType to use with the Icon component
 */
export function getAgentIcon(name: string, avatar?: string): IconType {
  // 1. Check for explicit avatar from backend
  if (avatar && avatar in APP_ICONS) {
    return APP_ICONS[avatar]
  }

  // Also check if avatar is already a valid IconType
  if (avatar) {
    return avatar as IconType
  }

  // 2. Match keywords in agent name
  const nameLower = name.toLowerCase()

  for (const { keywords, icon } of KEYWORD_ICON_MAP) {
    if (keywords.some(keyword => nameLower.includes(keyword))) {
      return icon
    }
  }

  // 3. Default fallback
  return DEFAULT_ICON
}

/**
 * Check if an icon type is an app icon (needs special rendering)
 */
export function isAppIcon(icon: IconType): boolean {
  return Object.values(APP_ICONS).includes(icon)
}
