"use client"

import { useCallback, useEffect, useState } from "react"
import { Shield, User, UserCheck, Power, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { API_URL } from "@/lib/api-config"

interface Member {
    id: string
    name: string
    email: string
    role: "MEMBER" | "ADMIN" | "MODERATOR"
    isActive: boolean
}

export default function MembersManagement({ accessToken }: { accessToken: string }) {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMembers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            })
            const data = await res.json()
            setMembers(data?.data || [])
        } catch {
            setMembers([])
        } finally {
            setLoading(false)
        }
    }, [accessToken])

    useEffect(() => {
        fetchMembers()
    }, [fetchMembers])

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ role: newRole })
            })
            if (!res.ok) throw new Error()
            toast.success("Role updated successfully")
            fetchMembers()
        } catch {
            toast.error("Failed to update role")
        }
    }

    const handleStatusChange = async (id: string, currentIsActive: boolean | undefined) => {
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ isActive: !currentIsActive })
            })
            if (!res.ok) throw new Error()
            toast.success("Status updated successfully")
            fetchMembers()
        } catch {
            toast.error("Failed to update status")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent-foreground" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-foreground dark:text-white">Community Members</h2>
                <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">View all community members and manage account roles and status.</p>
            </div>

            <div className="rounded-2xl border border-border dark:border-border bg-white dark:bg-muted backdrop-blur-sm overflow-hidden shadow-sm dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-muted-foreground dark:text-green-100">
                        <thead className="bg-muted dark:bg-muted text-xs uppercase text-muted-foreground dark:text-green-200/60">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {members.map(member => (
                                <tr key={member.id} className="transition-colors hover:bg-muted dark:hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-bold text-primary-foreground">
                                                {member.name?.[0]?.toUpperCase() || "M"}
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground dark:text-white">{member.name}</div>
                                                <div className="text-xs text-muted-foreground dark:text-green-200/50">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={member.role}
                                            onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                            className={`rounded-full border px-2 py-1 text-[10px] font-black tracking-widest outline-none appearance-none cursor-pointer transition-all ${
                                                member.role === "ADMIN" 
                                                ? "border-accent/30 bg-accent/10 text-accent-foreground"
                                                : member.role === "MODERATOR"
                                                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                : "border-primary/30 bg-primary/10 text-primary dark:text-green-400"
                                            }`}
                                        >
                                            <option value="MEMBER" className="bg-card">MEMBER</option>
                                            <option value="MODERATOR" className="bg-card">MODERATOR</option>
                                            <option value="ADMIN" className="bg-card">ADMIN</option>
                                        </select>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                            (member.isActive !== false)
                                            ? "border-primary/20 bg-primary/10 text-primary dark:text-emerald-400"
                                            : "border-destructive/20 bg-destructive/10 text-destructive dark:text-destructive"
                                        }`}>
                                            <Power className="h-3 w-3" />
                                            {(member.isActive !== false) ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button 
                                                onClick={() => handleStatusChange(member.id, member.isActive !== false)}
                                                className={`rounded-lg p-2 transition-colors border ${
                                                    (member.isActive !== false)
                                                    ? "border-destructive/20 text-destructive/60 hover:bg-destructive/10 hover:text-destructive"
                                                    : "border-primary/20 text-emerald-400/60 hover:bg-primary/10 hover:text-emerald-400"
                                                }`}
                                                title={(member.isActive !== false) ? "Deactivate User" : "Activate User"}
                                            >
                                                <Power className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground dark:text-green-200/50">
                                        No members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
