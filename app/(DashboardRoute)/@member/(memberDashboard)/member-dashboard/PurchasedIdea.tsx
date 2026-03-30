import Link from "next/link"
import { ShoppingBag, ChevronRight } from "lucide-react"

interface PurchasedIdea {
    id: string
    title: string
    category: { name: string }
    price: number
    purchasedAt: string
}

interface Props {
    ideas: PurchasedIdea[]
}

export default function PurchasedIdeas({ ideas }: Props) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-white">Purchased Ideas</h2>
                <p className="mt-1 text-sm text-green-200/50">Paid ideas you&apos;ve unlocked</p>
            </div>

            {ideas.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 py-20 backdrop-blur-sm">
                    <ShoppingBag className="h-12 w-12 text-green-400/30" />
                    <p className="text-sm text-green-200/40">You haven&apos;t purchased any ideas yet.</p>
                    <Link
                        href="/ideas"
                        className="flex items-center gap-2 rounded-xl bg-green-500/20 px-5 py-2.5 text-sm font-semibold text-green-400 transition-all hover:bg-green-500 hover:text-green-950"
                    >
                        Browse Ideas <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="divide-y divide-white/5">
                        {ideas.map(idea => (
                            <div key={idea.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/5">
                                <div className="space-y-1">
                                    <p className="font-semibold text-white">{idea.title}</p>
                                    <div className="flex items-center gap-2 text-xs text-green-200/40">
                                        <span>{idea.category?.name}</span>
                                        <span>·</span>
                                        <span>{new Date(idea.purchasedAt).toLocaleDateString()}</span>
                                        <span>·</span>
                                        <span className="text-yellow-400">${idea.price}</span>
                                    </div>
                                </div>
                                <Link
                                    href={`/ideas/${idea.id}`}
                                    className="rounded-xl bg-green-500/20 px-4 py-2 text-xs font-semibold text-green-400 transition-all hover:bg-green-500 hover:text-green-950"
                                >
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}