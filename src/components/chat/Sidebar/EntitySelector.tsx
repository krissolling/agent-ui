'use client'

import * as React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { useStore } from '@/store'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'
import { useEffect } from 'react'
import useChatActions from '@/hooks/useChatActions'
import { getAgentIcon } from '@/lib/agentIcons'
import { cn } from '@/lib/utils'

// Change this to 'list' or 'dropdown' to switch view mode
const VIEW_MODE: 'list' | 'dropdown' = 'dropdown'

export function EntitySelector() {
  const { mode, agents, teams, setMessages, setSelectedModel } = useStore()

  const { focusChatInput } = useChatActions()
  const [agentId, setAgentId] = useQueryState('agent', {
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [teamId, setTeamId] = useQueryState('team', {
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [, setSessionId] = useQueryState('session')

  const currentEntities = mode === 'team' ? teams : agents
  const currentValue = mode === 'team' ? teamId : agentId
  const placeholder = mode === 'team' ? 'Select Team' : 'Select Agent'

  useEffect(() => {
    if (currentValue && currentEntities.length > 0) {
      const entity = currentEntities.find((item) => item.id === currentValue)
      if (entity) {
        setSelectedModel(entity.model?.model || '')
        if (mode === 'team') {
          setTeamId(entity.id)
        }
        if (entity.model?.model) {
          focusChatInput()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, currentEntities, setSelectedModel, mode])

  const handleSelect = (value: string) => {
    const newValue = value === currentValue ? null : value
    const selectedEntity = currentEntities.find((item) => item.id === newValue)

    setSelectedModel(selectedEntity?.model?.provider || '')

    if (mode === 'team') {
      setTeamId(newValue)
      setAgentId(null)
    } else {
      setAgentId(newValue)
      setTeamId(null)
    }

    setMessages([])
    setSessionId(null)

    if (selectedEntity?.model?.provider) {
      focusChatInput()
    }
  }

  if (currentEntities.length === 0) {
    return (
      <div className="flex h-9 w-full items-center rounded-sm border border-border bg-white px-3 text-xs font-medium uppercase tracking-wider text-secondary opacity-50">
        No {mode}s Available
      </div>
    )
  }

  // List View
  if (VIEW_MODE === 'list') {
    return (
      <div className="flex flex-col gap-1">
        {currentEntities.map((entity, index) => {
          const iconType = getAgentIcon(entity.name || entity.id, entity.avatar)
          const isSelected = entity.id === currentValue
          return (
            <button
              key={`${entity.id}-${index}`}
              onClick={() => handleSelect(entity.id)}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm border px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider transition-colors',
                isSelected
                  ? 'border-border-strong bg-background-subtle text-primary'
                  : 'border-border bg-white text-secondary hover:border-border-strong hover:text-primary'
              )}
            >
              <Icon type={iconType} size="sm" className="shrink-0" />
              <span className="truncate">{entity.name || entity.id}</span>
              <span
                className={cn(
                  'ml-auto h-2 w-2 shrink-0 rounded-full',
                  entity.metadata?.public === false ? 'bg-destructive' : 'bg-positive'
                )}
                title={entity.metadata?.public === false ? 'Private (dev only)' : 'Public'}
              />
            </button>
          )
        })}
      </div>
    )
  }

  // Dropdown View
  return (
    <Select
      value={currentValue || ''}
      onValueChange={(value) => handleSelect(value)}
    >
      <SelectTrigger className="h-[40px] w-full min-w-0 rounded-sm border border-border bg-white !px-3 !py-0 text-xs font-medium uppercase tracking-wider">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border border-border bg-white font-dmmono shadow-sm">
        {currentEntities.map((entity, index) => {
          const iconType = getAgentIcon(entity.name || entity.id, entity.avatar)
          return (
            <SelectItem
              className="w-full cursor-pointer px-3 py-2.5"
              key={`${entity.id}-${index}`}
              value={entity.id}
            >
              <div className="flex w-full items-center gap-2 text-xs font-medium uppercase tracking-wider">
                <Icon type={iconType} size="sm" className="shrink-0" />
                <span className="truncate">{entity.name || entity.id}</span>
                <span
                  className={cn(
                    'ml-auto h-2 w-2 shrink-0 rounded-full',
                    entity.metadata?.public === false ? 'bg-destructive' : 'bg-positive'
                  )}
                  title={entity.metadata?.public === false ? 'Private (dev only)' : 'Public'}
                />
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
