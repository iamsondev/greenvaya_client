import { useState, useEffect, useCallback } from "react"
import { Message, useChatStore } from "@/store/chatStore"

// Simulating a real-time bridge via BroadcastChannel (works across tabs)
// We keep the channel instance outside the hook to avoid recreating it
let chatChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined') {
    chatChannel = new BroadcastChannel('greenvaya_chat');
}

export function useSocket(user: { id: string; name: string; role?: string } | null) {
    const { messages, addMessage, isTyping, setTyping } = useChatStore()

    useEffect(() => {
        if (!chatChannel) return

        const handleMessage = (event: MessageEvent) => {
            const data = event.data
            if (data.type === 'message') {
                addMessage(data.message)
            } else if (data.type === 'typing') {
                if (data.senderId !== user?.id) {
                    setTyping(data.isTyping)
                }
            }
        }

        chatChannel.addEventListener('message', handleMessage)
        return () => chatChannel.removeEventListener('message', handleMessage)
    }, [user?.id, addMessage, setTyping])

    const sendMessage = useCallback((content: string) => {
        if (!user || !chatChannel) return

        const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: user.id,
            senderName: user.name,
            content,
            timestamp: new Date().toISOString(),
            role: user.role as any
        }

        // Add locally first
        addMessage(newMessage)
        // Then broadcast
        chatChannel.postMessage({ type: 'message', message: newMessage })
    }, [user, addMessage])

    const sendTypingStatus = useCallback((typing: boolean) => {
        if (!user || !chatChannel) return
        chatChannel.postMessage({ type: 'typing', senderId: user.id, isTyping: typing })
    }, [user])

    return {
        messages,
        sendMessage,
        isTyping,
        sendTypingStatus
    }
}
