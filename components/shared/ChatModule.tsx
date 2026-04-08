"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot, Shield, Clock, Smile, Paperclip, MoreHorizontal, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSocket } from "@/hooks/useSocket"
import { Message, useChatStore } from "@/store/chatStore"

interface Props {
    user: { id?: string; name: string; email: string; role?: string } | null
}

export default function ChatModule({ user }: Props) {
    const { messages, sendMessage, isTyping, sendTypingStatus } = useSocket(user ? { id: user.id || user.email, name: user.name, role: user.role } : null)
    const { sessions } = useChatStore()
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const handleSend = () => {
        if (!input.trim()) return
        sendMessage(input)
        setInput("")
        sendTypingStatus(false)
    }

    const onInputChange = (val: string) => {
        setInput(val)
        sendTypingStatus(val.length > 0)
    }

    return (
        <div className="flex h-full bg-white dark:bg-zinc-950 rounded-[2rem] border border-border overflow-hidden shadow-2xl relative">
            {/* Admin Session Sidebar */}
            {user?.role === "ADMIN" && (
                <div className="hidden lg:flex w-72 flex-col border-r border-border bg-muted/20">
                    <div className="p-6 border-b border-border">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Active Sessions</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {sessions.length === 0 && (
                            <div className="p-8 text-center opacity-20 mt-10">
                                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting connections...</p>
                            </div>
                        )}
                        {sessions.map((session) => (
                            <button key={session.id} className={cn(
                                "w-full p-4 rounded-2xl flex flex-col gap-1 text-left transition-all bg-card border border-border/50 shadow-sm"
                            )}>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-foreground">{session.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{session.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">{session.lastMsg}</p>
                            </button>
                        ))}
                    </div>
                    <div className="p-4 bg-muted/30 border-t border-border">
                         <Button variant="outline" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest bg-white dark:bg-zinc-900 shadow-sm">
                            Clear History
                         </Button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-8 py-5 bg-muted/10 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                            {user?.role === "ADMIN" ? <Shield className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-zinc-950" />
                        </div>
                        <div>
                            <h3 className="font-black text-foreground dark:text-white leading-none mb-1 text-lg">
                                {user?.role === "ADMIN" ? "Member Support Hub" : "GreenLive Assistance"}
                            </h3>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                                    {user?.role === "ADMIN" ? "Live Agent Console" : "Experts are online"}
                                </p>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                <span className="text-[10px] font-bold text-primary">v2.0 ACTIVE</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 px-4 border-r border-border">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-black text-primary/60">Latency</span>
                                <span className="text-xs font-bold text-foreground">14ms</span>
                            </div>
                            <div className="h-8 w-1px bg-border" />
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-black text-amber-600/60">Priority</span>
                                <span className="text-xs font-bold text-foreground">High</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted text-muted-foreground transition-all">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Content area */}
                <div ref={scrollRef} className="flex-1 space-y-8 overflow-y-auto p-8 scroll-smooth scrollbar-thin scrollbar-thumb-primary/10">
                    {messages.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center text-center opacity-40 py-20 animate-in fade-in zoom-in duration-500">
                            <div className="h-24 w-24 rounded-[3rem] bg-muted/50 flex items-center justify-center mb-8 border border-border">
                                <Sparkles className="h-12 w-12 text-primary/40" />
                            </div>
                            <h4 className="text-2xl font-black text-foreground mb-3">Bridge Established</h4>
                            <p className="text-sm max-w-sm text-balance">Your connection is secured with end-to-end encryption. All interactions are logged for quality assurance.</p>
                            <div className="mt-8 flex gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-6">
                        {messages.map((msg, idx) => {
                            const isMe = msg.senderId === (user?.id || user?.email)
                            return (
                                <div key={idx} className={cn("flex flex-col", isMe ? "items-end" : "items-start animate-in slide-in-from-left-4")}>
                                    <div className={cn(
                                        "flex items-center gap-3 mb-2 px-1",
                                        isMe ? "flex-row-reverse" : "flex-row"
                                    )}>
                                        <div className="h-5 w-5 rounded-lg bg-muted flex items-center justify-center text-[9px] font-black border border-border">
                                            {msg.senderName[0]}
                                        </div>
                                        <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/50">{msg.senderName}</span>
                                        {msg.role === "ADMIN" && <Shield className="h-3 w-3 text-amber-500" />}
                                    </div>
                                    <div className={cn(
                                        "max-w-[80%] md:max-w-md rounded-[2rem] px-6 py-4 text-sm leading-relaxed shadow-sm transform transition-all hover:scale-[1.01] border",
                                        isMe 
                                            ? "bg-primary text-white border-primary/50 rounded-tr-none shadow-lg shadow-primary/10" 
                                            : "bg-card dark:bg-zinc-900/50 text-foreground dark:text-gray-200 rounded-tl-none border-border"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] text-muted-foreground/30 font-black mt-2 px-2 uppercase tracking-tighter">
                                        SENT • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {isTyping && (
                        <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="h-8 w-8 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
                                <Bot className="h-4 w-4 text-primary/40" />
                            </div>
                            <div className="bg-muted/30 rounded-full px-5 py-3 border border-border flex gap-1.5 items-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Footer */}
                <div className="border-t border-border p-8 bg-muted/5">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            {(user?.role === "ADMIN" ? ["Resolving now", "Check logs", "Account fixed"] : ["Hello!", "Need help", "Upgrade me"]).map(t => (
                                <button 
                                    key={t} 
                                    onClick={() => sendMessage(t)}
                                    className="text-[9px] h-8 px-4 rounded-full border border-border bg-white dark:bg-zinc-900 hover:border-primary hover:text-primary transition-all font-black uppercase tracking-widest shadow-sm"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 border border-border p-2 focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-inner">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted hover:text-primary transition-all rounded-xl">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <input
                                value={input}
                                onChange={(e) => onInputChange(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Secure production channel..."
                                className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground/30 placeholder:font-normal px-2"
                            />
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-muted hover:text-primary transition-all rounded-xl">
                                <Smile className="h-5 w-5" />
                            </Button>
                            <Button
                                onClick={handleSend} 
                                disabled={!input.trim()}
                                className="bg-primary hover:bg-green-700 text-white h-10 w-10 p-0 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:shadow-none shrink-0"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
