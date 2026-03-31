"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { ShoppingBag, Leaf, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Purchase {
    id: string
    amount: number
    status: string
    createdAt: string
    idea: {
        id: string
        title: string
        description: string
        category: { name: string }
        images: { url: string }[]
    }
}

export default function PurchasedIdeas() {
    const { accessToken } = useAuthStore()
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!accessToken) return
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/my-purchases`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                const arr = Array.isArray(d.data) ? d.data : (d.data?.purchases || d.purchases || d.data?.ideas || d.ideas || []);
                setPurchases(arr)
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [accessToken])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-white">Purchased Ideas</h2>
                <p className="mt-1 text-sm text-green-200/50">
                    Ideas you have unlocked
                </p>
            </div>

            {purchases.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-sm">
                    <ShoppingBag className="mb-4 h-12 w-12 text-green-400/30" />
                    <h3 className="text-lg font-bold text-white">No purchases yet</h3>
                    <p className="mt-2 text-sm text-green-200/40">
                        Browse paid ideas and unlock them to see them here.
                    </p>
                    <Link
                        href="/ideas"
                        className="mt-6 rounded-xl bg-green-500 px-6 py-2.5 text-sm font-bold text-green-950 hover:bg-green-400 transition-all"
                    >
                        Browse Ideas
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {purchases.map((item: any) => {
                        // Backend might return Purchase object { idea: Idea } or just Idea directly
                        const idea = item.idea || item
                        const purchaseId = item.id || idea.id
                        const amount = item.amount ?? idea.price ?? 0

                        const imageUrl =
                            idea.images?.[0]?.url &&
                                !idea.images[0].url.includes("example.com")
                                ? idea.images[0].url
                                : null

                        return (
                            <div
                                key={purchaseId}
                                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-green-400/30"
                            >
                                {/* Image */}
                                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-green-400/10 to-emerald-600/10">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={idea.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Leaf className="h-10 w-10 text-green-400/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="rounded-full bg-green-600/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                                            {idea.category?.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="mb-2 line-clamp-2 text-sm font-bold text-white">
                                        {idea.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-2 flex-1 text-xs text-green-200/50">
                                        {idea.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-green-400">
                                            ৳{amount}
                                        </span>
                                        <Link
                                            href={`/ideas/${idea.id}`}
                                            className="flex items-center gap-1.5 rounded-xl bg-green-500/20 px-3 py-1.5 text-xs font-semibold text-green-400 hover:bg-green-500/30 transition-all"
                                        >
                                            View Idea
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}