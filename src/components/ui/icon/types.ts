import { type ElementType } from 'react'

export type IconType =
  // Provider icons
  | 'mistral'
  | 'gemini'
  | 'aws'
  | 'azure'
  | 'anthropic'
  | 'groq'
  | 'fireworks'
  | 'deepseek'
  | 'cohere'
  | 'ollama'
  | 'xai'
  | 'agno'
  | 'rp-logo'
  | 'user'
  | 'agent'
  | 'open-ai'
  | 'sheet'
  | 'nextjs'
  | 'shadcn'
  | 'tailwind'
  | 'reasoning'
  | 'agno-tag'
  | 'refresh'
  | 'edit'
  | 'save'
  | 'x'
  | 'arrow-down'
  | 'send'
  | 'download'
  | 'hammer'
  | 'check'
  | 'chevron-down'
  | 'chevron-up'
  | 'plus-icon'
  | 'references'
  | 'trash'
  // App icons
  | 'figma'
  | 'slack'
  | 'notion'
  | 'github'
  | 'linear'
  // Agent keyword icons
  | 'target'
  | 'file-text'
  | 'search'
  | 'image'
  | 'palette'
  | 'bug'
  | 'globe'
  | 'sparkles'
  | 'presentation'
  | 'rocket'
  | 'trending-up'
  | 'book-open'
  | 'message-circle'
  | 'users'

export interface IconProps {
  type: IconType
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'dot' | 'xxs' | 'default'
  className?: string
  color?: string
  disabled?: boolean
}

export type IconTypeMap = {
  [key in IconType]: ElementType
}
