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
    DRAFT: "text-muted-foreground bg-muted/20 border-muted/30",
    UNDER_REVIEW: "text-accent bg-accent/10 border-accent/20",
    APPROVED: "text-primary bg-primary/10 border-primary/20",
    REJECTED: "text-destructive bg-destructive/10 border-destructive/20",
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
        { v: ideas.length, label: "Total Ideas", icon: Lightbulb, a: "bg-primary/10 text-primary" },
        { v: ideas.filter(i => i.status === "APPROVED").length, label: "Approved", icon: CheckCircle, a: "bg-primary/10 text-primary" },
        { v: ideas.filter(i => i.status === "UNDER_REVIEW").length, label: "Under Review", icon: Clock, a: "bg-accent/10 text-accent" },
        { v: ideas.reduce((s, i) => s + (i.upvotes ?? 0), 0), label: "Total Votes", icon: TrendingUp, a: "bg-secondary text-secondary-foreground" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-foreground dark:text-white">Overview</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your sustainability impact at a glance</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map(({ v, label, icon: Icon, a }) => (
                    <div
                        key={label}
                        className="relative overflow-hidden rounded-2xl border border-border dark:border-border bg-white dark:bg-muted p-6 backdrop-blur-sm shadow-sm dark:shadow-none transition-all hover:border-primary/30 hover:bg-muted dark:hover:bg-white/8"
                    >
                        <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${a}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-3xl font-black text-foreground dark:text-white">{v}</div>
                        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-green-200/50">{label}</div>
                        <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />
                    </div>
                ))}
            </div>

            {/* Recent ideas */}
            <div className="rounded-2xl border border-border dark:border-border bg-white dark:bg-muted p-6 backdrop-blur-sm shadow-sm dark:shadow-none">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary/70">
                    Recent Ideas
                </h3>
                {ideas.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground dark:text-green-200/40">
                        No ideas yet. Create your first one!
                    </p>
                ) : (
                    <div className="space-y-3">
                        {ideas.slice(0, 5).map(idea => {
                            const Icon = STATUS_ICON[idea.status]
                            return (
                                <div
                                    key={idea.id}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-border bg-muted dark:bg-muted px-4 py-3 transition-colors hover:border-primary/20 hover:bg-muted dark:hover:bg-white/8"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-primary dark:bg-primary" />
                                        <span className="text-sm font-medium text-foreground dark:text-white">{idea.title}</span>
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