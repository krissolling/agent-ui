'use client'

import { motion } from 'framer-motion'

const ChatBlankState = () => {
  return (
    <section
      className="flex flex-col items-center text-center font-geist"
      aria-label="Welcome message"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-display font-light tracking-tight text-secondary"
      >
        Start a conversation
      </motion.div>
    </section>
  )
}

export default ChatBlankState
