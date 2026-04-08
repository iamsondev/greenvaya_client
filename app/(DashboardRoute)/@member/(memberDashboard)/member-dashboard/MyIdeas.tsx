"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Leaf, TrendingUp, Clock, CheckCircle, XCircle,
    FileEdit, Eye, Trash2, Send, AlertCircle, Loader2,
} from "lucide-react"
import { toast } from "sonner"

type IdeaStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"

interface Idea {
    id: string
    title: string
    category: { id: string; name: string }
    status: IdeaStatus
    isPaid: boolean
    price: number
    createdAt: string
    upvotes?: number
    feedback?: string
}

const STATUS: Record<IdeaStatus, { label: string; cls: string; icon: React.ElementType }> = {
    DRAFT: { label: "Draft", cls: "text-zinc-500 dark:text-zinc-400 bg-zinc-400/10 border-zinc-400/20", icon: FileEdit },
    UNDER_REVIEW: { label: "Under Review", cls: "text-accent-foreground dark:text-accent-foreground bg-accent/10 border-accent/20", icon: Clock },
    APPROVED: { label: "Approved", cls: "text-primary dark:text-green-400 bg-primary/10 border-primary/20", icon: CheckCircle },
    REJECTED: { label: "Rejected", cls: "text-destructive dark:text-destructive bg-destructive/10 border-destructive/20", icon: XCircle },
}

interface Props {
    ideas: Idea[]
    onSubmit: (id: string) => Promise<void>
    onDelete: (id: string) => Promise<void>
}

export default function MyIdeas({ ideas, onSubmit, onDelete }: Props) {
    const [filter, setFilter] = useState<IdeaStatus | "ALL">("ALL")
    const [acting, setActing] = useState<string | null>(null)

    const filtered = filter === "ALL" ? ideas : ideas.filter(i => i.status === filter)

    const handleDelete = (id: string) => {
        toast("Are you sure you want to delete this idea?", {
            action: {
                label: "Delete",
                onClick: async () => {
                    setActing(id)
                    try {
                        await onDelete(id)
                    } finally {
                        setActing(null)
                    }
                }
            },
            cancel: {
                label: "Cancel",
                onClick: () => {}
            }
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-foreground dark:text-white">My Ideas</h2>
                <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Manage and track your submitted ideas</p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {(["ALL", "DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED"] as const).map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${filter === s
                            ? "bg-primary dark:bg-primary text-white dark:text-primary-foreground shadow-md dark:shadow-none"
                            : "border border-border dark:border-border bg-white dark:bg-muted text-muted-foreground dark:text-green-200/60 hover:border-primary/30 hover:text-green-700 dark:hover:text-white"
                            }`}
                    >
                        {s === "ALL" ? "All" : STATUS[s].label}
                        <span className="ml-1.5 opacity-60">
                            ({s === "ALL" ? ideas.length : ideas.filter(i => i.status === s).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="overflow-hidden rounded-2xl border border-border dark:border-border bg-white dark:bg-muted backdrop-blur-sm shadow-sm dark:shadow-none">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16">
                        <Leaf className="h-10 w-10 text-primary/30 dark:text-green-400/30" />
                        <p className="text-sm text-muted-foreground dark:text-green-200/40">No ideas found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-white/5">
                        {filtered.map(idea => {
                            const S = STATUS[idea.status]
                            const Icon = S.icon
                            return (
                                <div key={idea.id} className="group px-6 py-4 transition-colors hover:bg-muted dark:hover:bg-white/5">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-semibold text-foreground dark:text-white">{idea.title}</span>
                                                {idea.isPaid && (
                                                    <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground dark:text-accent-foreground">
                                                        Paid · ৳{idea.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground dark:text-green-200/40">
                                                <span>{idea.category?.name}</span>
                                                <span>·</span>
                                                <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                                                {idea.status === "APPROVED" && (
                                                    <>
                                                        <span>·</span>
                                                        <span className="flex items-center gap-1 text-primary dark:text-green-400">
                                                            <TrendingUp className="h-3 w-3" />{idea.upvotes ?? 0} votes
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {idea.status === "REJECTED" && idea.feedback && (
                                                <div className="mt-2 flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2">
                                                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                                                    <p className="text-xs text-red-300/80">{idea.feedback}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {/* Status badge */}
                                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${S.cls}`}>
                                                <Icon className="h-3 w-3" />
                                                {S.label}
                                            </span>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Link
                                                    href={`/ideas/${idea.id}`}
                                                    className="rounded-lg p-1.5 text-muted-foreground dark:text-green-200/40 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-primary dark:hover:text-green-400"
                                                    title="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>

                                                {(idea.status === "DRAFT" || idea.status === "REJECTED") && (
                                                    <>
                                                        <Link
                                                            href={`/member-dashboard/edit/${idea.id}`}
                                                            className="rounded-lg p-1.5 text-muted-foreground dark:text-green-200/40 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-primary dark:hover:text-green-400"
                                                            title="Edit"
                                                        >
                                                            <FileEdit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            disabled={acting === idea.id}
                                                            onClick={() => handleDelete(idea.id)}
                                                            className="rounded-lg p-1.5 text-muted-foreground dark:text-green-200/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                                                            title="Delete"
                                                        >
                                                            {acting === idea.id
                                                                ? <Loader2 className="h-4 w-4 animate-spin" />
                                                                : <Trash2 className="h-4 w-4" />
                                                            }
                                                        </button>
                                                    </>
                                                )}

                                                {idea.status === "DRAFT" && (
                                                        <button
                                                            disabled={acting === idea.id}
                                                            onClick={async () => {
                                                                setActing(idea.id)
                                                                await onSubmit(idea.id)
                                                                setActing(null)
                                                            }}
                                                            className="ml-1 flex items-center gap-1.5 rounded-lg bg-green-100 dark:bg-primary/20 px-3 py-1.5 text-xs font-semibold text-green-700 dark:text-green-400 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-primary-foreground disabled:opacity-50 transition-all shadow-sm dark:shadow-none"
                                                        >
                                                        {acting === idea.id
                                                            ? <Loader2 className="h-3 w-3 animate-spin" />
                                                            : <Send className="h-3 w-3" />
                                                        }
                                                        Submit
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}