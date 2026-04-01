import { Menu, Shield } from "lucide-react"
import { ModeToggle } from "@/components/shared/ModeToggle"

const NAV_ITEMS = [
    { id: "overview", label: "Overview" },
    { id: "members",  label: "Members Management" },
    { id: "ideas",    label: "Ideas Management" },
]

interface AdminTopbarProps {
    active: string
    onMenuOpen: () => void
}

export default function AdminTopbar({ active, onMenuOpen }: AdminTopbarProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-green-950/60 px-6 py-4 backdrop-blur-xl transition-colors">
            <div className="flex items-center gap-3">
                <button
                    className="rounded-lg p-1.5 text-gray-500 dark:text-green-200/40 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white lg:hidden"
                    onClick={onMenuOpen}
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-base font-bold text-gray-900 dark:text-white">
                        {NAV_ITEMS.find((n) => n.id === active)?.label || "Overview"}
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-green-200/40">Admin Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1">
                    <Shield className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Admin</span>
                </div>
                <div className="ml-2 border-l border-gray-200 dark:border-white/10 pl-3">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
