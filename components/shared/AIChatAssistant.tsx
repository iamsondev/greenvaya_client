"use client"

import { useState, useRef, useEffect } from "react"
import {
    MessageSquare, X, Send, Bot, User, Sparkles,
    Minus, BookOpen, TrendingUp, ShieldCheck,
    Zap, Cpu, Globe, Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"

interface AICard {
    title: string
    val: string
    growth: string
}

interface AIMessage {
    role: 'assistant' | 'user'
    content: string
    card?: AICard
    suggestions?: string[]
}

export default function AIChatAssistant() {
    const { user } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    const [messages, setMessages] = useState<AIMessage[]>([])
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    // Initialize greeting after hydration
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    role: 'assistant',
                    content: `Greetings${user?.name ? `, ${user.name}` : ''}! I am Vaya Intelligence v2.0. Your strategic guide to the world of sustainable innovation. How may I assist your mission today?`,
                    suggestions: ["How it works", "Browse Trending"]
                }
            ])
        }
    }, [user, messages.length])

    useEffect(() => {
        if (scrollRef.current) {
            // Use requestAnimationFrame for smoother scrolling after DOM updates
            requestAnimationFrame(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        top: scrollRef.current.scrollHeight,
                        behavior: 'smooth'
                    })
                }
            })
        }
    }, [messages, status])

    const getAIResponse = (query: string): Omit<AIMessage, 'role'> => {
        const q = query.toLowerCase()

        if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
            return {
                content: `Greetings! It is a pleasure to see you${user?.name ? `, ${user.name}` : ''}. I'm currently monitoring [3,452] active sustainable ideas. Should we explore what's new?`,
                suggestions: ["Browse Trending", "My Impact Score"]
            }
        }
        if (q.includes("idea") || q.includes("browse") || q.includes("trending")) {
            return {
                content: "Our neural engine identifies **Solar Infrastructure** and **Waste-to-Energy** as the most promising sectors this week. Would you like to see the top-rated proposals?",
                card: { title: "Current Market Trend", val: "Solar Energy", growth: "+18.2%" },
                suggestions: ["Show Top Solar", "Waste Solutions"]
            }
        }
        if (q.includes("verified") || q.includes("vaya verified") || q.includes("how to")) {
            return {
                content: "To receive the **Vaya Verified** badge, a project must undergo a 3-stage environmental impact audit. This ensures only high-feasibility, low-carbon solutions receive our seal of approval.",
                suggestions: ["Start Audit", "Help Center"]
            }
        }
        if (q.includes("stats") || q.includes("impact") || q.includes("score")) {
            return {
                content: user?.role === "ADMIN"
                    ? "Global platform health is at **98.4%**. We have observed a significant uptick in cross-border collaborations this quarter."
                    : "Your personal impact score is determined by your active contributions and validated ideas. You have successfully reduced [simulated] 1.2 tons of potential CO2.",
                suggestions: ["View Analytics", "Leaderboard"]
            }
        }
        if (q.includes("price") || q.includes("funding") || q.includes("money")) {
            return {
                content: "GreenVaya operates on a **Community Trust** model. High-impact 'Premium' ideas require a small contribution to support the thinkers. For funding, our secure gateway (SSL Commerz) supports global contributions.",
                suggestions: ["Payment Help", "Investor FAQ"]
            }
        }

        return {
            content: "That's an insightful perspective. While my core database is still indexing that specific topic, I can provide general guidance on sustainability frameworks or project scaling. Shall we try a different query?",
            suggestions: ["Platform FAQ", "Support Contact"]
        }
    }

    const processMessage = (text: string) => {
        if (!text.trim() || status) return

        const userMsg: AIMessage = { role: 'user', content: text }
        const newMessages = [...messages, userMsg]
        setMessages(newMessages)
        setInput("")

        // Multi-Stage Thinking Simulation
        const thinkingSteps = [
            "Consulting local project database...",
            "Analyzing environmental impact vectors...",
            "Generating strategic response..."
        ]

        let step = 0
        const interval = setInterval(() => {
            if (step < thinkingSteps.length) {
                setStatus(thinkingSteps[step])
                step++
            } else {
                clearInterval(interval)
                const result = getAIResponse(text)
                setMessages([...newMessages, {
                    role: 'assistant',
                    ...result
                }])
                setStatus(null)
            }
        }, 800)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 flex h-[640px] w-[420px] flex-col overflow-hidden rounded-[2.5rem] border border-primary/20 bg-white/95 dark:bg-zinc-900/95 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-10 duration-500 origin-bottom-right">
                    {/* Header */}
                    <div className="relative overflow-hidden bg-primary px-6 py-6 text-white shrink-0">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="group relative">
                                    <div className="absolute -inset-1 rounded-2xl bg-white/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                        <Cpu className="h-7 w-7" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black tracking-widest leading-none mb-1">VAYA INTEL v2.0</span>
                                    <span className="flex items-center gap-2 text-[10px] text-green-100/60 font-black uppercase tracking-tighter">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                                        Neural Core Active
                                    </span>
                                </div>
                            </div>
                            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10 text-white rounded-2xl transition-all">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/5 blur-3xl rounded-full" />
                    </div>

                    {/* Messages Body */}
                    <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto p-6 scrollbar-none">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={cn("flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                {msg.role === 'assistant' && (
                                    <div className="h-9 w-9 shrink-0 rounded-[14px] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm shadow-primary/10 hover:rotate-12 transition-transform">
                                        <Bot className="h-5 w-5 text-primary" />
                                    </div>
                                )}
                                <div className={cn("flex flex-col gap-2", msg.role === 'user' ? "max-w-[75%] items-end" : "max-w-[85%]")}>
                                    <div className={cn(
                                        "rounded-[22px] px-5 py-3.5 text-sm leading-[1.65] relative group overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                                        msg.role === 'user'
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-white dark:bg-zinc-800 text-foreground dark:text-gray-200 rounded-tl-none border border-border"
                                    )}>
                                        {msg.content}
                                        {msg.role === 'assistant' && (
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        )}
                                    </div>

                                    {/* Action Card */}
                                    {msg.card && (
                                        <div className="mt-2 p-5 rounded-[24px] bg-primary/5 border border-primary/10 animate-in zoom-in-95 duration-500 shadow-inner">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center">
                                                    <TrendingUp className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Trend Analysis</span>
                                            </div>
                                            <h4 className="font-black text-xs text-foreground/70 mb-1">{msg.card.title}</h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-black text-foreground tracking-tight">{msg.card.val}</span>
                                                <span className="text-xs font-black bg-green-500/20 text-green-600 px-2 py-1 rounded-lg">{msg.card.growth}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quick Suggestions */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className={cn("flex flex-wrap gap-2 mt-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                            {msg.suggestions.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => processMessage(s)}
                                                    className="px-4 py-2 rounded-full bg-muted/40 border border-border text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-sm"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Status Loading Section */}
                        {status && (
                            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                                <div className="h-9 w-9 shrink-0 rounded-[14px] bg-primary/10 flex items-center justify-center border border-primary/20 animate-spin-slow">
                                    <Cpu className="h-5 w-5 text-primary" />
                                </div>
                                <div className="bg-muted dark:bg-zinc-800 rounded-[22px] rounded-tl-none px-5 py-3 border border-border shadow-sm flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 italic">{status}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Launch Hub */}
                    <div className="px-6 py-5 border-t border-border bg-muted/20 shrink-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Quick Intelligence</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { t: "Support", i: BookOpen, c: "text-blue-500" },
                                { t: "Trending", i: Rocket, c: "text-primary" },
                                { t: "Global", i: Globe, c: "text-purple-500" }
                            ].map((hub, i) => (
                                <button
                                    key={i}
                                    onClick={() => processMessage(hub.t)}
                                    className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-border bg-white dark:bg-zinc-900/40 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm active:scale-95"
                                >
                                    <hub.i className={cn("h-4 w-4 transition-transform group-hover:scale-110", hub.c)} />
                                    <span className="text-[9px] font-black uppercase text-muted-foreground group-hover:text-foreground">{hub.t}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Integrated Input Section */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border-t border-border shrink-0">
                        <div className="flex items-center gap-3 rounded-[24px] bg-muted/50 dark:bg-muted/10 border border-border p-2 pr-4 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                            <div className="h-10 w-10 flex items-center justify-center text-muted-foreground/30">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && processMessage(input)}
                                disabled={!!status}
                                placeholder="Consult with AI Core..."
                                className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground/30 placeholder:font-normal"
                            />
                            <button
                                onClick={() => processMessage(input)}
                                disabled={!input.trim() || !!status}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-110 active:scale-90 transition-all disabled:opacity-30 disabled:scale-100"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bubble Launcher */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-[28px] bg-primary text-white shadow-[0_20px_50px_rgba(34,197,94,0.3)] transition-all hover:scale-110 active:scale-95 hover:-translate-y-2 animate-bounce-slow"
                >
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-black text-white ring-4 ring-background animate-pulse">!</div>
                    <Cpu className="h-8 w-8 transition-transform group-hover:scale-110" />
                    <div className="absolute -left-48 hidden group-hover:flex w-44 items-center justify-center rounded-2xl bg-zinc-900 p-3.5 text-xs font-black uppercase tracking-widest text-white after:absolute after:left-full after:border-y-[8px] after:border-y-transparent after:border-l-[12px] after:border-l-zinc-900 shadow-2xl">
                        <Sparkles className="mr-3 h-4 w-4 text-accent animate-spin-slow" />
                        AI CORE v2.0
                    </div>
                </button>
            )}
        </div>
    )
}
