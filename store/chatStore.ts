import { create } from 'zustand'

export interface Message {
    id: string
    senderId: string
    senderName: string
    content: string
    timestamp: string
    role: "ADMIN" | "MEMBER"
}

interface Session {
    id: string
    name: string
    lastMsg: string
    time: string
    role: "ADMIN" | "MEMBER"
}

interface ChatStore {
    messages: Message[]
    sessions: Session[]
    isTyping: boolean
    addMessage: (msg: Message) => void
    setTyping: (typing: boolean) => void
    clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    sessions: [],
    isTyping: false,
    addMessage: (msg) => set((state) => {
        const isDuplicate = state.messages.some(m => m.id === msg.id)
        if (isDuplicate) return state

        // Update sessions list if it's a member message
        let newSessions = [...state.sessions]
        if (msg.role === "MEMBER") {
            const existingIdx = newSessions.findIndex(s => s.id === msg.senderId)
            const sessionData: Session = {
                id: msg.senderId,
                name: msg.senderName,
                lastMsg: msg.content,
                time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                role: msg.role
            }
            if (existingIdx > -1) {
                newSessions[existingIdx] = sessionData
            } else {
                newSessions.unshift(sessionData)
            }
        }

        return { 
            messages: [...state.messages, msg],
            sessions: newSessions
        }
    }),
    setTyping: (typing) => set({ isTyping: typing }),
    clearMessages: () => set({ messages: [], sessions: [] })
}))
