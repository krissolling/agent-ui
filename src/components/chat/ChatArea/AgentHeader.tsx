'use client'

import { useStore } from '@/store'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'
import { getAgentIcon } from '@/lib/agentIcons'
import { motion, AnimatePresence } from 'framer-motion'

const AgentHeader = () => {
  const { agents, teams, mode } = useStore()
  const [agentId] = useQueryState('agent')
  const [teamId] = useQueryState('team')

  // Get the current entity based on mode
  const currentId = mode === 'team' ? teamId : agentId
  const currentEntities = mode === 'team' ? teams : agents
  const currentEntity = currentEntities.find((e) => e.id === currentId)

  if (!currentEntity) {
    return null
  }

  const iconType = getAgentIcon(
    currentEntity.name || currentEntity.id,
    currentEntity.avatar
  )

  // Check if agent is public (default true, only false if explicitly set)
  const isPublic = currentEntity.metadata?.public !== false

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentEntity.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-3 border-b border-border bg-background px-6 py-4"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background-subtle">
          <Icon type={iconType} size="sm" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="font-dmmono text-sm font-medium uppercase tracking-wider text-primary">
              {currentEntity.name || currentEntity.id}
            </h1>
            <span
              className={`size-2 rounded-full ${isPublic ? 'bg-positive' : 'bg-destructive'}`}
              title={isPublic ? 'Public' : 'Private (dev only)'}
            />
          </div>
          <p className="line-clamp-2 text-sm text-secondary">
            {currentEntity.description || (currentEntity.metadata?.description as string) || (
              <span className="italic text-muted">
                No description set. Add a description parameter to this {mode}.
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AgentHeader
