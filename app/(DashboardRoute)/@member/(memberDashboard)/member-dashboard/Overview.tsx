import {
    Lightbulb, CheckCircle, Clock,
    TrendingUp, FileEdit, XCircle,
} from "lucide-react"

type IdeaStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"

interface Idea {
    id: string
    title: string
    status: IdeaStatus
    upvotes?: number
}

const STATUS_ICON: Record<IdeaStatus, React.ElementType> = {
    DRAFT: FileEdit,
    UNDER_REVIEW: Clock,
    APPROVED: CheckCircle,
    REJECTED: XCircle,
}

const STATUS_COLOR: Record<IdeaStatus, string> = {
    DRAFT: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
    UNDER_REVIEW: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    APPROVED: "text-green-400 bg-green-400/10 border-green-400/20",
    REJECTED: "text-red-400 bg-red-400/10 border-red-400/20",
}

const STATUS_LABEL: Record<IdeaStatus, string> = {
    DRAFT: "Draft",
    UNDER_REVIEW: "Under Review",
    APPROVED: "Approved",
    REJECTED: "Rejected",
}

interface Props {
    ideas: Idea[]
}

export default function Overview({ ideas }: Props) {
    const stats = [
        { v: ideas.length, label: "Total Ideas", icon: Lightbulb, a: "bg-green-500/20 text-green-400" },
        { v: ideas.filter(i => i.status === "APPROVED").length, label: "Approved", icon: CheckCircle, a: "bg-emerald-500/20 text-emerald-400" },
        { v: ideas.filter(i => i.status === "UNDER_REVIEW").length, label: "Under Review", icon: Clock, a: "bg-yellow-500/20 text-yellow-400" },
        { v: ideas.reduce((s, i) => s + (i.upvotes ?? 0), 0), label: "Total Votes", icon: TrendingUp, a: "bg-teal-500/20 text-teal-400" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-white">Overview</h2>
                <p className="mt-1 text-sm text-green-200/50">Your sustainability impact at a glance</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map(({ v, label, icon: Icon, a }) => (
                    <div
                        key={label}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-green-400/30 hover:bg-white/8"
                    >
                        <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${a}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-3xl font-black text-white">{v}</div>
                        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-green-200/50">{label}</div>
                        <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-green-400/5 blur-2xl" />
                    </div>
                ))}
            </div>

            {/* Recent ideas */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-green-400/70">
                    Recent Ideas
                </h3>
                {ideas.length === 0 ? (
                    <p className="py-8 text-center text-sm text-green-200/40">
                        No ideas yet. Create your first one!
                    </p>
                ) : (
                    <div className="space-y-3">
                        {ideas.slice(0, 5).map(idea => {
                            const Icon = STATUS_ICON[idea.status]
                            return (
                                <div
                                    key={idea.id}
                                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 px-4 py-3 transition-colors hover:border-green-400/20 hover:bg-white/8"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-400" />
                                        <span className="text-sm font-medium text-white">{idea.title}</span>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLOR[idea.status]}`}>
                                        <Icon className="h-3 w-3" />
                                        {STATUS_LABEL[idea.status]}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}