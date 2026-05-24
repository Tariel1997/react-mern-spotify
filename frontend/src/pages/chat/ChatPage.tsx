import Topbar from '@/components/Topbar.tsx'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { formatMessageTime } from '@/lib/utils.ts'
import ChatHeader from '@/pages/chat/components/ChatHeader.tsx'
import MessageInput from '@/pages/chat/components/MessageInput.tsx'
import NoConversationPlaceholder from '@/pages/chat/components/NoConversationPlaceholder.tsx'
import UsersList from '@/pages/chat/components/UsersList.tsx'
import { useChatStore } from '@/stores/useChatStore.ts'
import { useUser } from '@clerk/react'
import { useEffect, useRef } from 'react'

const ChatPage = () => {
  const { user } = useUser()
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore()

  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) void fetchUsers()
  }, [fetchUsers, user])

  useEffect(() => {
    if (selectedUser?.clerkId) void fetchMessages(selectedUser?.clerkId)
  }, [selectedUser, fetchMessages])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main
      className={
        'h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'
      }
    >
      <Topbar />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

        {/* chat message */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? 'bg-green-500' : 'bg-zinc-800'}
												`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-zinc-300 mt-1 block">
                          {formatMessageTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div ref={messageEndRef} />
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  )
}

export default ChatPage
