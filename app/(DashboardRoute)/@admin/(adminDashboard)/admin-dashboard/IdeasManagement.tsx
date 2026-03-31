"use client"

import { useCallback, useEffect, useState } from "react"
import { Shield, FileEdit, Clock, CheckCircle, XCircle, Trash2, Eye, MessageSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const BASE = process.env.NEXT_PUBLIC_API_URL

interface Idea {
    id: string
    title: string
    category: { id: string; name: string }
    status: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
    author: { id: string; name: string }
    createdAt: string
}

export default function IdeasManagement({ accessToken }: { accessToken: string }) {
    const [ideas, setIdeas] = useState<Idea[]>([])
    const [loading, setLoading] = useState(true)

    // Modal state for rejection feedback
    const [rejectId, setRejectId] = useState<string | null>(null)
    const [feedback, setFeedback] = useState("")

    const fetchIdeas = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`${BASE}/ideas?limit=100`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            })
            const data = await res.json()
            setIdeas(data?.data?.ideas || data?.data || [])
        } catch {
            setIdeas([])
        } finally {
            setLoading(false)
        }
    }, [accessToken])

    useEffect(() => {
        fetchIdeas()
    }, [fetchIdeas])

    const handleStatusChange = async (id: string, status: string, feedbackMsg?: string) => {
        try {
            const body: any = { status }
            if (feedbackMsg) body.feedback = feedbackMsg

            const res = await fetch(`${BASE}/ideas/${id}/admin-action`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}` 
                },
                body: JSON.stringify(body)
            })
            if (!res.ok) throw new Error()
            toast.success(`Idea ${status.toLowerCase()} successfully`)
            fetchIdeas()
            setRejectId(null)
            setFeedback("")
        } catch {
            toast.error(`Failed to update idea status`)
        }
    }

    const handleDelete = (id: string) => {
        toast("Delete Idea?", {
            description: "Are you sure you want to delete this idea permanently?",
            action: {
                label: "Delete",
                onClick: async () => {
                    try {
                        const res = await fetch(`${BASE}/ideas/${id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        })
                        if (!res.ok) throw new Error()
                        toast.success("Idea deleted permanently")
                        fetchIdeas()
                    } catch {
                        toast.error("Failed to delete idea")
                    }
                }
            },
        })
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
                <h2 className="text-2xl font-black text-white">Ideas Management</h2>
                <p className="mt-1 text-sm text-green-200/50">Oversee all platform ideas, approve submissions, or provide rejection feedback.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-green-100">
                        <thead className="bg-white/5 text-xs uppercase text-green-200/60">
                            <tr>
                                <th className="px-6 py-4 font-medium">Idea Title</th>
                                <th className="px-6 py-4 font-medium">Author</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {ideas.map(idea => (
                                <tr key={idea.id} className="transition-colors hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white line-clamp-1">{idea.title}</div>
                                        <div className="mt-0.5 text-xs text-green-200/50">
                                            {idea.category?.name || "Uncategorized"} • {new Date(idea.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                                                {idea.author?.name?.[0]?.toUpperCase() || "A"}
                                            </div>
                                            <span className="text-sm font-medium">{idea.author?.name || "Unknown"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                            idea.status === "APPROVED" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400" :
                                            idea.status === "REJECTED" ? "border-red-400/20 bg-red-400/10 text-red-400" :
                                            idea.status === "UNDER_REVIEW" ? "border-amber-400/20 bg-amber-400/10 text-amber-400" :
                                            "border-zinc-400/20 bg-zinc-400/10 text-zinc-400"
                                        }`}>
                                            {idea.status === "APPROVED" && <CheckCircle className="h-3 w-3" />}
                                            {idea.status === "REJECTED" && <XCircle className="h-3 w-3" />}
                                            {idea.status === "UNDER_REVIEW" && <Clock className="h-3 w-3" />}
                                            {idea.status === "DRAFT" && <FileEdit className="h-3 w-3" />}
                                            {idea.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link 
                                                href={`/ideas/${idea.id}`}
                                                className="rounded-lg p-2 text-green-200/50 hover:bg-white/10 hover:text-white transition-colors"
                                                title="View Idea"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>

                                            {idea.status === "UNDER_REVIEW" && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusChange(idea.id, "APPROVED")}
                                                        className="rounded-lg p-2 text-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-400 transition-colors"
                                                        title="Approve Idea"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setRejectId(idea.id)}
                                                        className="rounded-lg p-2 text-red-400/60 hover:bg-red-400/10 hover:text-red-400 transition-colors"
                                                        title="Reject Idea"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                            
                                            <button 
                                                onClick={() => handleDelete(idea.id)}
                                                className="rounded-lg p-2 text-red-400/60 hover:bg-red-400/10 hover:text-red-400 transition-colors"
                                                title="Delete Idea"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {ideas.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-green-200/50">
                                        No ideas found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reject Modal */}
            {rejectId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-green-950 p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-amber-400" />
                                Rejection Feedback
                            </h3>
                            <button onClick={() => setRejectId(null)} className="text-green-200/50 hover:text-white">
                                <XCircle className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mb-4 text-sm text-green-200/60">
                            Provide a reason for rejecting this idea. This feedback will be visible to the author.
                        </p>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Explain why this idea cannot be approved at this time..."
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-green-200/30 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                            rows={4}
                        />
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setRejectId(null)}
                                className="rounded-xl px-4 py-2 text-sm font-semibold text-green-200/60 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStatusChange(rejectId, "REJECTED", feedback)}
                                disabled={!feedback.trim()}
                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Reject Idea
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
