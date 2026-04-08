import { Menu, Shield } from "lucide-react"
import { ModeToggle } from "@/components/shared/ModeToggle"

const NAV_ITEMS = [
    { id: "overview", label: "Overview" },
    { id: "members",  label: "Members Management" },
    { id: "ideas",    label: "Ideas Management" },
    { id: "support",  label: "Real-time Support" },
    { id: "logs",     label: "System Logs" },
    { id: "settings", label: "Settings" },
]

interface AdminTopbarProps {
    active: string
    onMenuOpen: () => void
}

export default function AdminTopbar({ active, onMenuOpen }: AdminTopbarProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border dark:border-border bg-white/80 dark:bg-green-950/60 px-6 py-4 backdrop-blur-xl transition-colors">
            <div className="flex items-center gap-3">
                <button
                    className="rounded-lg p-1.5 text-muted-foreground dark:text-green-200/40 hover:bg-muted dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white lg:hidden"
                    onClick={onMenuOpen}
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-base font-bold text-foreground dark:text-white">
                        {NAV_ITEMS.find((n) => n.id === active)?.label || "Overview"}
                    </h1>
                    <p className="text-xs text-muted-foreground dark:text-green-200/40">Admin Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                    <Shield className="h-3 w-3 text-accent-foreground dark:text-accent-foreground" />
                    <span className="text-xs font-semibold text-accent-foreground dark:text-accent-foreground">Admin</span>
                </div>
                <div className="ml-2 border-l border-border dark:border-border pl-3">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
