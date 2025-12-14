'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'
import AgentHeader from './AgentHeader'

const ChatArea = () => {
  return (
    <main className="relative m-1.5 flex flex-grow flex-col rounded-xl bg-background">
      <AgentHeader />
      <MessageArea />
      <div className="sticky bottom-0 mx-auto w-full max-w-[750px] px-4 pb-2">
        <ChatInput />
      </div>
    </main>
  )
}

export default ChatArea
