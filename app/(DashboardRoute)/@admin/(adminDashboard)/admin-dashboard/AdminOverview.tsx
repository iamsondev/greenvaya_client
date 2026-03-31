"use client"

import { useEffect, useState, useCallback } from "react"
import { Users, Lightbulb, Clock, CheckCircle } from "lucide-react"
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
        { v: stats.totalMembers, label: "Total Members", icon: Users, a: "bg-blue-500/20 text-blue-400" },
        { v: stats.totalIdeas, label: "Total Ideas", icon: Lightbulb, a: "bg-green-500/20 text-green-400" },
        { v: stats.pendingIdeas, label: "Pending Review", icon: Clock, a: "bg-amber-500/20 text-amber-400" },
        { v: stats.approvedIdeas, label: "Approved Ideas", icon: CheckCircle, a: "bg-emerald-500/20 text-emerald-400" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-white">Platform Overview</h2>
                <p className="mt-1 text-sm text-green-200/50">Manage the GreenVaya platform from bird's eye view.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {statCards.map(({ v, label, icon: Icon, a }) => (
                    <div
                        key={label}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-amber-400/30 hover:bg-white/8"
                    >
                        <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${a}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-3xl font-black text-white">{v}</div>
                        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-green-200/50">{label}</div>
                        <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-amber-400/5 blur-2xl" />
                    </div>
                ))}
            </div>
        </div>
    )
}
