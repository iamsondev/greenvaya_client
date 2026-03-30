"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Calendar,
    User,
    Tag,
    Lock,
    ArrowLeft,
    Leaf,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react"

interface Idea {
    id: string
    title: string
    description: string
    problemStatement: string
    proposedSolution: string
    isPaid: boolean
    price: number
    status: string
    images: { id: string; url: string }[]
    category: { id: string; name: string }
    author: { name: string; email: string }
    _count: { votes: number; comments: number }
    createdAt: string
}

const statusConfig: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
> = {
    APPROVED: {
        label: "Approved",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: <CheckCircle className="h-3.5 w-3.5" />,
    },
    UNDER_REVIEW: {
        label: "Under Review",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: <Clock className="h-3.5 w-3.5" />,
    },
    REJECTED: {
        label: "Rejected",
        color: "bg-red-100 text-red-700 border-red-200",
        icon: <XCircle className="h-3.5 w-3.5" />,
    },
    DRAFT: {
        label: "Draft",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: <Clock className="h-3.5 w-3.5" />,
    },
}

export default function IdeaDetailClient({ idea }: { idea: Idea }) {
    const status = statusConfig[idea.status] || statusConfig["DRAFT"]
    const imageUrl =
        idea.images?.[0]?.url && !idea.images[0].url.includes("example.com")
            ? idea.images[0].url
            : null

    const formattedDate = new Date(idea.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    // isLoggedIn + hasPurchased — পরে Zustand থেকে আসবে
    const isLoggedIn = false
    const hasPurchased = false
    const isContentLocked = idea.isPaid && !hasPurchased

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Top Banner */}
            <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    {/* Back button */}
                    <Link
                        href="/ideas"
                        className="mb-6 inline-flex items-center gap-2 text-green-300/80 hover:text-green-300 text-sm transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Ideas
                    </Link>

                    {/* Badges Row */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <Badge className="bg-green-500/20 border border-green-400/30 text-green-300 text-xs px-3 py-1 rounded-full">
                            <Tag className="mr-1.5 h-3 w-3" />
                            {idea.category?.name}
                        </Badge>
                        <Badge
                            className={`border text-xs px-3 py-1 rounded-full flex items-center gap-1.5 ${status.color}`}
                        >
                            {status.icon}
                            {status.label}
                        </Badge>
                        {idea.isPaid ? (
                            <Badge className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                                <Lock className="h-3 w-3" />
                                Paid · ৳{idea.price}
                            </Badge>
                        ) : (
                            <Badge className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs px-3 py-1 rounded-full">
                                Free
                            </Badge>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-black text-white leading-snug mb-4 sm:text-4xl">
                        {idea.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-green-200/60">
                        <span className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            {idea.author?.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ThumbsUp className="h-4 w-4" />
                            {idea._count?.votes ?? 0} votes
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageCircle className="h-4 w-4" />
                            {idea._count?.comments ?? 0} comments
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left — Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image */}
                        {imageUrl && (
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <img
                                    src={imageUrl}
                                    alt={idea.title}
                                    className="h-72 w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Paid Gate */}
                        {isContentLocked ? (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-10 text-center shadow-sm">
                                <Lock className="mx-auto mb-4 h-10 w-10 text-amber-400" />
                                <h3 className="mb-2 text-lg font-bold text-gray-800">
                                    This is a Premium Idea
                                </h3>
                                <p className="mb-6 text-sm text-gray-500">
                                    Purchase this idea to unlock the full problem statement,
                                    proposed solution, and detailed description.
                                </p>
                                <div className="text-2xl font-black text-amber-600 mb-6">
                                    ৳{idea.price}
                                </div>
                                {isLoggedIn ? (
                                    <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8">
                                        Purchase to Unlock
                                    </Button>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <p className="text-xs text-gray-400">
                                            You must be logged in to purchase
                                        </p>
                                        <div className="flex gap-3">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="rounded-xl border-green-600 text-green-700"
                                            >
                                                <Link href="/login">Login</Link>
                                            </Button>
                                            <Button
                                                asChild
                                                className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <Link href="/signup">Register</Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Problem Statement */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 text-sm">
                                            ⚠️
                                        </span>
                                        Problem Statement
                                    </h2>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {idea.problemStatement}
                                    </p>
                                </div>

                                {/* Proposed Solution */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 text-green-600 text-sm">
                                            💡
                                        </span>
                                        Proposed Solution
                                    </h2>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {idea.proposedSolution}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-sm">
                                            📄
                                        </span>
                                        Detailed Description
                                    </h2>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {idea.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Comments Section placeholder */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
                                <MessageCircle className="h-5 w-5 text-blue-500" />
                                Comments ({idea._count?.comments ?? 0})
                            </h2>
                            {isLoggedIn ? (
                                <div className="flex gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                        U
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            placeholder="Share your thoughts..."
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 resize-none"
                                            rows={3}
                                        />
                                        <Button
                                            size="sm"
                                            className="mt-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                                        >
                                            Post Comment
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-4">
                                    <Link href="/login" className="text-green-600 hover:underline">
                                        Login
                                    </Link>{" "}
                                    to leave a comment.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right — Sidebar */}
                    <div className="space-y-4">
                        {/* Vote Card */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center">
                            <p className="mb-4 text-sm font-semibold text-gray-700">
                                Community Votes
                            </p>
                            <div className="text-4xl font-black text-green-600 mb-4">
                                {idea._count?.votes ?? 0}
                            </div>
                            {isLoggedIn ? (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 rounded-xl border-green-200 text-green-700 hover:bg-green-50 gap-1.5"
                                    >
                                        <ThumbsUp className="h-4 w-4" />
                                        Upvote
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 rounded-xl border-red-200 text-red-500 hover:bg-red-50 gap-1.5"
                                    >
                                        <ThumbsDown className="h-4 w-4" />
                                        Down
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400">
                                    <Link href="/login" className="text-green-600 hover:underline">
                                        Login
                                    </Link>{" "}
                                    to vote
                                </p>
                            )}
                        </div>

                        {/* Idea Info Card */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="mb-4 text-sm font-bold text-gray-700">
                                Idea Details
                            </p>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Author</span>
                                    <span className="font-medium text-gray-700">
                                        {idea.author?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Category</span>
                                    <span className="font-medium text-gray-700">
                                        {idea.category?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status</span>
                                    <span className={`font-medium`}>{status.label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Type</span>
                                    <span className="font-medium text-gray-700">
                                        {idea.isPaid ? `Paid · ৳${idea.price}` : "Free"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Submitted</span>
                                    <span className="font-medium text-gray-700">
                                        {formattedDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-xl border-green-200 text-green-700 hover:bg-green-50"
                        >
                            <Link href="/ideas" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                All Ideas
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}