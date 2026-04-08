"use client"

import { useEffect, useState, useCallback } from "react"
import { Users, Lightbulb, Clock, CheckCircle, Sparkles, TrendingUp, AlertTriangle, Zap, Shield } from "lucide-react"
import { API_URL } from "@/lib/api-config"

interface Props {
    accessToken: string
}

export default function ModeratorOverview({ accessToken }: Props) {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalIdeas: 0,
        pendingIdeas: 0,
        approvedIdeas: 0,
    })
    const [personalIdeas, setPersonalIdeas] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        setLoading(true)
        try {
            // Platform Stats
            const resIdeas = await fetch(`${API_URL}/ideas?limit=100`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            })
            const dataIdeas = await resIdeas.json()
            const ideas = dataIdeas?.data?.ideas ?? dataIdeas?.data ?? []

            let mCount = 0
            try {
                const resUsers = await fetch(`${API_URL}/users`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    cache: "no-store",
                })
                const dataUsers = await resUsers.json()
                mCount = (dataUsers?.data ?? []).length
            } catch (e) {
                console.log("Could not fetch users, ignoring for stats.")
            }

            setStats({
                totalMembers: mCount,
                totalIdeas: ideas.length,
                pendingIdeas: ideas.filter((i: any) => i.status === "UNDER_REVIEW").length,
                approvedIdeas: ideas.filter((i: any) => i.status === "APPROVED").length,
            })

            // Personal Stats (using current user ID from token)
            const payload = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64").toString())
            const resPersonal = await fetch(`${API_URL}/ideas?authorId=${payload.id}&limit=100`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            })
            const dataPersonal = await resPersonal.json()
            setPersonalIdeas(dataPersonal?.data?.ideas ?? dataPersonal?.data ?? [])

        } catch (e) {
            console.error("Failed to fetch moderator stats")
        } finally {
            setLoading(false)
        }
    }, [accessToken])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    const platformCards = [
        { v: stats.totalMembers, label: "Platform Members", icon: Users, a: "bg-primary/20 text-primary" },
        { v: stats.totalIdeas, label: "Total Platform Ideas", icon: Lightbulb, a: "bg-primary/20 text-primary" },
        { v: stats.pendingIdeas, label: "Pending Moderation", icon: Clock, a: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
        { v: stats.approvedIdeas, label: "Total Approved", icon: CheckCircle, a: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
    ]

    const personalCards = [
        { v: personalIdeas.length, label: "My Total Ideas", icon: Lightbulb, a: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
        { v: personalIdeas.filter(i => i.status === "APPROVED").length, label: "My Approved", icon: CheckCircle, a: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
        { v: personalIdeas.filter(i => i.status === "UNDER_REVIEW").length, label: "My Pending", icon: Clock, a: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
        { v: personalIdeas.reduce((s, i) => s + (i.upvotes ?? 0), 0), label: "My Total Votes", icon: TrendingUp, a: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
    ]


    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground dark:text-white">Moderator Dashboard</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Combined personal impact and platform control center.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    MODERATOR MODE ACTIVE
                </div>
            </div>

            {/* Personal Sustainability Metrics */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground/70">Personal Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {personalCards.map(({ v, label, icon: Icon, a }) => (
                        <div
                            key={label}
                            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${a}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="text-4xl font-black text-foreground tabular-nums tracking-tight">{v}</div>
                            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{label}</div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground px-1">Your sustainability impact at a glance.</p>
            </div>

            {/* Platform Metrics */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground/70">Platform Metrics</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {platformCards.map(({ v, label, icon: Icon, a }) => (
                        <div
                            key={label}
                            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${a}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="text-4xl font-black text-foreground tabular-nums tracking-tight">{v}</div>
                            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{label}</div>
                        </div>
                    ))}
                </div>
            </div>


            {/* AI Insights Section */}
            <div className="rounded-[2.5rem] border border-primary/20 bg-primary/5 p-10 relative overflow-hidden backdrop-blur-sm border-dashed">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                    <div className="space-y-6 max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 border border-primary/30 shadow-inner">
                            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Strategic Analysis Engine</span>
                        </div>
                        <h3 className="text-3xl font-black text-foreground">AI Powered Intelligence</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Leverage our proprietary machine learning models to identify emerging green trends before they go mainstream. Our analysis suggests a massive shift towards decentralized energy solutions.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="h-10 px-6 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">View Report</button>
                            <button className="h-10 px-6 rounded-xl border border-primary/30 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/10 transition-all">Configure Model</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Annual Run-rate</p>
                                <p className="text-xl font-black text-foreground">$4.2M <span className="text-[10px] font-medium text-green-500 ml-1">+12%</span></p>
                            </div>
                        </div>
                         <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Zap className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Energy Efficiency</p>
                                <p className="text-xl font-black text-foreground">98.4% <span className="text-[10px] font-medium text-blue-500 ml-1">OPT</span></p>
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Network Density</p>
                                <p className="text-xl font-black text-foreground">Dense <span className="text-[10px] font-medium text-purple-500 ml-1">+8k nodes</span></p>
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-border shadow-sm flex items-center gap-4 group hover:border-primary/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Security Score</p>
                                <p className="text-xl font-black text-foreground">99.9% <span className="text-[10px] font-medium text-amber-500 ml-1">LOCKED</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background glow */}
                <div className="absolute -top-32 -right-32 h-80 w-80 bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-32 -left-32 h-80 w-80 bg-primary/20 blur-[120px] rounded-full" />
            </div>
        </div>
    )
}
