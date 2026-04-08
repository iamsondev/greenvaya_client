"use client"

import { useEffect, useState, useCallback } from "react"
import { Users, Lightbulb, Clock, CheckCircle, Sparkles, TrendingUp, AlertTriangle, Zap, Shield } from "lucide-react"
import { API_URL } from "@/lib/api-config"

interface Props {
    accessToken: string
}

export default function AdminOverview({ accessToken }: Props) {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalIdeas: 0,
        pendingIdeas: 0,
        approvedIdeas: 0,
    })

    const fetchStats = useCallback(async () => {
        try {
            // First get ideas
            const resIdeas = await fetch(`${API_URL}/ideas?limit=100`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            })
            const dataIdeas = await resIdeas.json()
            const ideas = dataIdeas?.data?.ideas ?? dataIdeas?.data ?? []

            // Then get users
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
        } catch (e) {
            console.error("Failed to fetch admin stats")
        }
    }, [accessToken])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    const statCards = [
        { v: stats.totalMembers, label: "Total Members", icon: Users, a: "bg-primary/10 text-primary" },
        { v: stats.totalIdeas, label: "Total Ideas", icon: Lightbulb, a: "bg-primary/10 text-primary" },
        { v: stats.pendingIdeas, label: "Pending Review", icon: Clock, a: "bg-accent/10 text-accent-foreground" },
        { v: stats.approvedIdeas, label: "Approved Ideas", icon: CheckCircle, a: "bg-primary/10 text-primary" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground dark:text-white">Platform Command Center</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Real-time health and mission metrics for GreenVaya.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    LIVE DATA STREAM ACTIVE
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {statCards.map(({ v, label, icon: Icon, a }) => (
                    <div
                        key={label}
                        className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                    >
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${a}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-4xl font-black text-foreground tabular-nums tracking-tight">{v}</div>
                        <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{label}</div>
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Growth Chart Mockup */}
                <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 flex flex-col gap-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-black text-foreground">Idea Submission Growth</h4>
                            <p className="text-xs text-muted-foreground">Volume of new submissions over the last 30 days</p>
                        </div>
                        <select className="bg-muted text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-border outline-none">
                            <option>Last 30 Days</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>

                    <div className="flex-1 flex items-end justify-between h-48 gap-2 pt-4">
                        {[40, 65, 45, 90, 55, 75, 40, 85, 60, 95, 70, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="hidden group-hover:block absolute -top-8 bg-black text-white text-[10px] px-2 py-1 rounded">
                                    {h} ideas
                                </div>
                                <div 
                                    style={{ height: `${h}%` }} 
                                    className="w-full bg-primary/20 group-hover:bg-primary rounded-t-lg transition-all duration-500 origin-bottom"
                                />
                                <span className="text-[8px] font-bold text-muted-foreground/40">W{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex-1 p-6 rounded-3xl border border-border bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                        <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-foreground mb-1">Impact Score</h4>
                        <p className="text-sm text-foreground/80 mb-4">Your platform has offset an estimated 1.2M tons of CO2 this month.</p>
                        <div className="w-full h-2 bg-green-200 dark:bg-green-900/50 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-green-500 rounded-full" />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] font-bold text-green-600">75% of Goal</span>
                            <span className="text-[10px] font-bold text-green-600">Goal: 1.5M</span>
                        </div>
                    </div>

                    <div className="flex-1 p-6 rounded-3xl border border-border bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                        <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-500/20">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-foreground mb-1">Review Backlog</h4>
                        <p className="text-sm text-foreground/80">There are {stats.pendingIdeas} ideas waiting for your moderation team.</p>
                        <button className="mt-4 text-xs font-black uppercase tracking-widest text-amber-600 hover:underline">Process Now</button>
                    </div>
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
