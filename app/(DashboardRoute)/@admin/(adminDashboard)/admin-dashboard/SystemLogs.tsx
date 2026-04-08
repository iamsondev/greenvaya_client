"use client"

import { useState, useEffect } from "react"
import { Activity, Shield, User, Lightbulb, AlertCircle, Clock, Search, Filter } from "lucide-react"

interface LogEntry {
    id: string
    type: "AUTH" | "IDEA" | "USER" | "SYSTEM"
    action: string
    user: string
    timestamp: string
    status: "SUCCESS" | "WARNING" | "CRITICAL"
    details: string
}

const MOCK_LOGS: LogEntry[] = [
    {
        id: "1",
        type: "AUTH",
        action: "Admin Login",
        user: "admin@greenvaya.com",
        timestamp: new Date().toISOString(),
        status: "SUCCESS",
        details: "Logged in via Chrome on macOS"
    },
    {
        id: "2",
        type: "IDEA",
        action: "Idea Approved",
        user: "admin@greenvaya.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        status: "SUCCESS",
        details: "Approved 'Solar Purification Tower' by member01"
    },
    {
        id: "3",
        type: "SYSTEM",
        action: "Backup Completed",
        user: "System",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: "SUCCESS",
        details: "Automated daily backup successful"
    },
    {
        id: "4",
        type: "USER",
        action: "Role Escalation",
        user: "admin@greenvaya.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        status: "WARNING",
        details: "User 'jane.doe@example.com' promoted to MODERATOR"
    },
    {
        id: "5",
        type: "IDEA",
        action: "Policy Violation",
        user: "System",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        status: "CRITICAL",
        details: "Multiple flagged words detected in idea ID #8829"
    }
]

export default function SystemLogs() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("ALL")

    const filteredLogs = MOCK_LOGS.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             log.details.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === "ALL" || log.type === filter
        return matchesSearch && matchesFilter
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "SUCCESS": return "text-green-500 bg-green-500/10 border-green-500/20"
            case "WARNING": return "text-amber-500 bg-amber-500/10 border-amber-500/20"
            case "CRITICAL": return "text-destructive bg-destructive/10 border-destructive/20"
            default: return "text-muted-foreground bg-muted border-border"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "AUTH": return Shield
            case "IDEA": return Lightbulb
            case "USER": return User
            case "SYSTEM": return Activity
            default: return AlertCircle
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-black text-foreground dark:text-white">System Access Logs</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Audit trail of all administrative and platform-wide events.</p>
                </div>
                <div className="flex items-center gap-3">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="h-10 w-64 rounded-xl border border-border bg-card pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {["ALL", "AUTH", "IDEA", "USER", "SYSTEM"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                            filter === t 
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                            : "bg-card text-muted-foreground border-border hover:border-primary/50"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status / Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User / Source</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Details</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredLogs.map((log) => {
                                const Icon = getTypeIcon(log.type)
                                return (
                                    <tr key={log.id} className="group hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                 <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${getStatusColor(log.status)}`}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <span className={`text-[9px] font-bold rounded-full px-2 py-0.5 border ${getStatusColor(log.status)}`}>
                                                    {log.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-foreground text-sm">{log.action}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                                    {log.user[0].toUpperCase()}
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-muted-foreground line-clamp-1">{log.details}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-bold text-foreground">
                                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {new Date(log.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredLogs.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-muted">
                            <Activity className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h4 className="text-xl font-black mb-2">No logs found</h4>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                )}

                <div className="border-t border-border px-6 py-4 bg-muted/30 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium">Showing {filteredLogs.length} events</p>
                    <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline transition-all">Export to CSV</button>
                </div>
            </div>
        </div>
    )
}
