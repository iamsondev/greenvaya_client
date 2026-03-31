"use client"

import { Quote, Star, ThumbsUp, Leaf } from "lucide-react"

interface Idea {
    id: string
    title: string
    description: string
    author: { name: string }
    category: { name: string }
    _count: { votes: number }
}

interface Props {
    ideas: Idea[]
}

export default function Testimonials({ ideas }: Props) {
    if (!ideas || ideas.length === 0) return null

    // Requirement: Top 3 Ideas based on vote count
    const top3 = [...ideas].sort((a, b) => (b._count?.votes || 0) - (a._count?.votes || 0)).slice(0, 3)

    return (
        <section className="relative bg-green-50 py-24 overflow-hidden">
            {/* Background design elements */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-green-400 blur-[100px]" />
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500 blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/50 px-4 py-1.5 shadow-sm">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-semibold tracking-wide text-green-700 uppercase">
                            High Impact Projects
                        </span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                        Community <span className="text-green-600">Favorites</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-gray-500 font-light">
                        Discover the sustainability ideas that have gained the most traction and inspired our members worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {top3.map((idea, i) => (
                        <div key={idea.id} className="group relative rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50">
                            <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white shadow-lg shadow-green-600/20">
                                <Quote className="h-4 w-4" />
                            </div>

                            {/* Top row with category */}
                            <div className="mb-6 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600/80 bg-green-100/50 px-2 py-0.5 rounded-full">
                                    {idea.category?.name}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <ThumbsUp className="h-3.5 w-3.5 text-amber-500" />
                                    <span className="text-xs font-bold text-gray-900">{idea._count?.votes || 0}</span>
                                </div>
                            </div>

                            {/* Main content */}
                            <h3 className="mb-4 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                                {idea.title}
                            </h3>
                            <p className="mb-8 line-clamp-4 text-sm leading-relaxed text-gray-500 italic font-light">
                                &ldquo;{idea.description}&rdquo;
                            </p>

                            {/* Author info */}
                            <div className="mt-auto flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 font-black text-white text-sm shadow-md">
                                    {idea.author?.name?.[0]?.toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900">{idea.author?.name}</span>
                                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Top Contributor</span>
                                </div>
                            </div>

                            {/* Ranking Badge */}
                            <div className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-6xl font-black text-green-950">#{i + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex items-center justify-center gap-8 opacity-40">
                  <Leaf className="h-6 w-6 text-green-400" />
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
                  <Leaf className="h-6 w-6 text-green-400" />
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
                  <Leaf className="h-6 w-6 text-green-400" />
                </div>
            </div>
        </section>
    )
}
