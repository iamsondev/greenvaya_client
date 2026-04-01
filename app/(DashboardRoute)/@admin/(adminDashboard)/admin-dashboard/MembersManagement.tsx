"use client"

import { useCallback, useEffect, useState } from "react"
import { Shield, User, Power, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { API_URL } from "@/lib/api-config"

interface Member {
    id: string
    name: string
    email: string
    role: "MEMBER" | "ADMIN"
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
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Members Management</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-green-200/50">View all users, edit roles and activate/deactivate accounts.</p>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm overflow-hidden shadow-sm dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-green-100">
                        <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase text-gray-500 dark:text-green-200/60">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {members.map(member => (
                                <tr key={member.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-bold text-green-950">
                                                {member.name?.[0]?.toUpperCase() || "M"}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-green-200/50">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                            member.role === "ADMIN" 
                                            ? "border-amber-400/20 bg-amber-400/10 text-amber-600 dark:text-amber-400"
                                            : "border-green-400/20 bg-green-400/10 text-green-600 dark:text-green-400"
                                        }`}>
                                            {member.role === "ADMIN" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                            (member.isActive !== false)
                                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400"
                                            : "border-red-400/20 bg-red-400/10 text-red-600 dark:text-red-400"
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
                                                    ? "border-red-400/20 text-red-400/60 hover:bg-red-400/10 hover:text-red-400"
                                                    : "border-emerald-400/20 text-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-400"
                                                }`}
                                                title={(member.isActive !== false) ? "Deactivate User" : "Activate User"}
                                            >
                                                <Power className="h-4 w-4" />
                                            </button>
                                            
                                            <select
                                                value={member.role}
                                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                                className="rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-green-950/50 px-3 py-1.5 text-xs text-gray-900 dark:text-white outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50"
                                            >
                                                <option value="MEMBER">Member</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-green-200/50">
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
