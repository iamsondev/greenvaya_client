"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Search,
    ThumbsUp,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    Lock,
    Leaf,
    Filter,
} from "lucide-react"

interface Idea {
    id: string
    title: string
    description: string
    isPaid: boolean
    price: number
    status: string
    images: { url: string }[]
    category: { id: string; name: string }
    author: { name: string }
    _count: { votes: number; comments: number }
    createdAt: string
}

interface Meta {
    page: number
    limit: number
    total: number
    totalPage: number
}

interface Category {
    id: string
    name: string
}

interface Props {
    ideas: Idea[]
    meta: Meta
    categories: Category[]
    currentPage: number
    currentSort: string
    currentCategory: string
    currentSearch: string
    currentStatus: string
}

export default function IdeasClient({
    ideas,
    meta,
    categories,
    currentPage,
    currentSort,
    currentCategory,
    currentSearch,
    currentStatus,
}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [search, setSearch] = useState(currentSearch)

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams()
        const current = {
            page: String(currentPage),
            sort: currentSort,
            category: currentCategory,
            q: currentSearch,
            status: currentStatus,
            ...updates,
        }
        Object.entries(current).forEach(([k, v]) => {
            if (v) params.set(k, v)
        })
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleSearch = () => {
        updateParams({ q: search, page: "1" })
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 pt-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-4 py-14 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/15 px-4 py-1.5 mb-4">
                    <Leaf className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-xs font-medium text-green-300 tracking-wide">
                        Community Ideas
                    </span>
                </div>
                <h1 className="text-4xl font-black text-white mb-3">
                    All Sustainability Ideas
                </h1>
                <p className="text-green-200/70 max-w-xl mx-auto text-sm">
                    Discover, vote, and discuss ideas that are shaping a greener future.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Filters Bar */}
                <div className="mb-8 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-2">
                            <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search ideas..."
                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            />
                            <Button
                                onClick={handleSearch}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs px-3"
                            >
                                Search
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Category Filter */}
                            <Select
                                value={currentCategory || "all"}
                                onValueChange={(v) =>
                                    updateParams({ category: v === "all" ? "" : v, page: "1" })
                                }
                            >
                                <SelectTrigger className="w-40 rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-gray-200">
                                    <Filter className="mr-2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select
                                value={currentSort}
                                onValueChange={(v) => updateParams({ sort: v, page: "1" })}
                            >
                                <SelectTrigger className="w-36 rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-gray-200">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">🕐 Recent</SelectItem>
                                    <SelectItem value="top">🔥 Top Voted</SelectItem>
                                    <SelectItem value="commented">💬 Most Commented</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Free/Paid Filter */}
                            <Select
                                value={currentStatus || "all"}
                                onValueChange={(v) =>
                                    updateParams({ status: v === "all" ? "" : v, page: "1" })
                                }
                            >
                                <SelectTrigger className="w-32 rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-gray-200">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="free">🆓 Free</SelectItem>
                                    <SelectItem value="paid">💎 Paid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(currentCategory || currentSearch) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-500">Active:</span>
                            {currentSearch && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                    Search: {currentSearch}
                                    <button
                                        onClick={() => updateParams({ q: "", page: "1" })}
                                        className="ml-1 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            )}
                            {currentCategory && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                    {currentCategory}
                                    <button
                                        onClick={() => updateParams({ category: "", page: "1" })}
                                        className="ml-1 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{ideas.length}</span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{meta.total}</span>{" "}
                        ideas
                    </p>
                </div>

                {/* Ideas Grid */}
                {ideas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Leaf className="mb-4 h-12 w-12 text-green-200 dark:text-green-900" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            No ideas found
                        </h3>
                        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                            Try adjusting your filters or search
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {ideas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {meta.totalPage > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage <= 1}
                            onClick={() => updateParams({ page: String(currentPage - 1) })}
                            className="rounded-xl"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Prev
                        </Button>

                        {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(
                            (p) => (
                                <Button
                                    key={p}
                                    size="sm"
                                    variant={p === currentPage ? "default" : "outline"}
                                    onClick={() => updateParams({ page: String(p) })}
                                    className={`w-9 rounded-xl ${p === currentPage
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : ""
                                        }`}
                                >
                                    {p}
                                </Button>
                            )
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage >= meta.totalPage}
                            onClick={() => updateParams({ page: String(currentPage + 1) })}
                            className="rounded-xl"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

// Idea Card Component
function IdeaCard({ idea }: { idea: Idea }) {
    const imageUrl =
        idea.images?.[0]?.url && !idea.images[0].url.includes("example.com")
            ? idea.images[0].url
            : null

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-green-900/10">
            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={idea.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Leaf className="h-12 w-12 text-green-300" />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {idea.category?.name}
                    </Badge>
                </div>
                {idea.isPaid && (
                    <div className="absolute top-3 right-3">
                        <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Paid
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {idea.title}
                </h3>
                <p className="mb-4 line-clamp-2 flex-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {idea.description}
                </p>

                {/* Author */}
                <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-xs font-bold text-green-700 dark:text-green-400">
                        {idea.author?.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{idea.author?.name}</span>
                </div>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{idea._count?.votes ?? 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-400">{idea._count?.comments ?? 0}</span>
                    </span>
                    {idea.isPaid && idea.price > 0 && (
                        <span className="ml-auto font-semibold text-amber-600 dark:text-amber-500">
                            ৳{idea.price}
                        </span>
                    )}
                </div>

                {/* Button */}
                <Link href={`/ideas/${idea.id}`}>
                    <Button
                        size="sm"
                        className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                    >
                        View Idea →
                    </Button>
                </Link>
            </div>
        </div>
    )
}