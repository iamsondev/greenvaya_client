"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ThumbsUp,
    MessageCircle,
    Lock,
    Leaf,
    ArrowRight,
    Sparkles,
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

interface Category {
    id: string
    name: string
}

interface Props {
    ideas: Idea[]
    categories: Category[]
}

export default function FeaturedIdeas({ ideas, categories }: Props) {
    if (!ideas || ideas.length === 0) return null

    return (
        <section className="relative overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500 py-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-[80px]" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-[80px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-14 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                            Featured Ideas
                        </span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-foreground dark:text-white sm:text-5xl">
                        Community&apos;s{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                            Best Ideas
                        </span>
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground dark:text-muted-foreground">
                        Explore top-voted sustainability ideas shared by our community
                        members from around the world.
                    </p>
                </div>

                {/* Categories Pills */}
                {categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap justify-center gap-2">
                        <Link
                            href="/ideas"
                            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/95"
                        >
                            All
                        </Link>
                        {categories.slice(0, 6).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/ideas?category=${cat.name}`}
                                className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Ideas Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ideas.slice(0, 6).map((idea, index) => (
                        <FeaturedIdeaCard key={idea.id} idea={idea} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-14 flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl bg-primary px-10 py-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all hover:scale-[1.02]"
                    >
                        <Link href="/ideas" className="flex items-center gap-2">
                            View All Ideas
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

function FeaturedIdeaCard({
    idea,
    index,
}: {
    idea: Idea
    index: number
}) {
    const imageUrl =
        idea.images?.[0]?.url && !idea.images[0].url.includes("example.com")
            ? idea.images[0].url
            : null

    const gradients = [
        "from-primary/20 to-primary/5",
        "from-primary/10 to-primary/25",
        "from-primary/15 to-primary/10",
        "from-primary/5 to-primary/20",
        "from-primary/25 to-primary/15",
        "from-primary/20 to-primary/20",
    ]

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5">
            {/* Image */}
            <div
                className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={idea.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Leaf className="h-14 w-14 text-green-400/50" />
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-green-950/0 transition-all duration-300 group-hover:bg-green-950/10" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                        {idea.category?.name}
                    </Badge>
                </div>

                {idea.isPaid && (
                    <div className="absolute top-3 right-3">
                        <Badge className="flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                            <Lock className="h-3 w-3" />
                            Paid
                        </Badge>
                    </div>
                )}

                {/* Index number */}
                <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-xs font-black text-white">
                    #{index + 1}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-foreground dark:text-white transition-colors group-hover:text-green-700 dark:group-hover:text-green-400">
                    {idea.title}
                </h3>

                {/* Description */}
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground">
                    {idea.description}
                </p>

                {/* Author */}
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-xs font-bold text-white shadow-sm">
                        {idea.author?.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground dark:text-muted-foreground">
                        {idea.author?.name}
                    </span>
                </div>

                {/* Stats + Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5 text-primary" />
                            <span className="font-semibold text-muted-foreground dark:text-muted-foreground">
                                {idea._count?.votes ?? 0}
                            </span>
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle className="h-3.5 w-3.5 text-blue-400" />
                            <span className="font-semibold text-muted-foreground dark:text-muted-foreground">
                                {idea._count?.comments ?? 0}
                            </span>
                        </span>
                        {idea.isPaid && idea.price > 0 && (
                            <span className="font-bold text-accent-foreground dark:text-accent-foreground">৳{idea.price}</span>
                        )}
                    </div>

                    <Link href={`/ideas/${idea.id}`}>
                        <Button
                            size="sm"
                            className="rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all group-hover:shadow-md group-hover:shadow-primary/20"
                        >
                            View →
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}