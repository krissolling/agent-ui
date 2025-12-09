'use client'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Icon from '@/components/ui/icon'

const AuthToken = ({
  hasEnvToken,
  envToken
}: {
  hasEnvToken?: boolean
  envToken?: string
}) => {
  const { authToken, setAuthToken } = useStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tokenValue, setTokenValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Initialize with environment variable if available and no token is set
    if (hasEnvToken && envToken && !authToken) {
      setAuthToken(envToken)
      setTokenValue(envToken)
    } else {
      setTokenValue(authToken)
    }
    setIsMounted(true)
  }, [authToken, setAuthToken, hasEnvToken, envToken])

  const handleSave = () => {
    const cleanToken = tokenValue.trim()
    setAuthToken(cleanToken)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTokenValue(authToken)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleClear = () => {
    setAuthToken('')
    setTokenValue('')
  }

  const displayValue = authToken
    ? `${'*'.repeat(Math.min(authToken.length, 20))}${authToken.length > 20 ? '...' : ''}`
    : 'No token set'

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between py-2 text-xs font-medium uppercase tracking-wider text-secondary hover:text-primary"
      >
        <span>Auth Token</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon type="chevron-down" size="xs" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full overflow-hidden"
          >
            <div className="flex flex-col gap-2 pb-2">
              {isEditing ? (
                <div className="flex w-full items-center gap-1">
                  <input
                    type="password"
                    value={tokenValue}
                    onChange={(e) => setTokenValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter token..."
                    className="flex h-9 w-full items-center text-ellipsis rounded-sm border border-border bg-white p-3 text-xs text-primary placeholder:text-secondary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
                    className="shrink-0 hover:cursor-pointer hover:bg-transparent"
                  >
                    <Icon type="save" size="xs" />
                  </Button>
                </div>
              ) : (
                <div className="flex w-full items-center gap-1">
                  <div
                    onClick={() => setIsEditing(true)}
                    className="flex h-9 w-full cursor-pointer items-center rounded-sm border border-border bg-white p-3 text-xs text-secondary hover:border-border-strong"
                  >
                    {isMounted ? displayValue : 'No token set'}
                  </div>
                  {authToken && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClear}
                      className="shrink-0 hover:cursor-pointer hover:bg-transparent"
                      title="Clear token"
                    >
                      <Icon type="x" size="xs" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AuthToken
