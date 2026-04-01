import { Menu, Sparkles } from "lucide-react"
import { ModeToggle } from "@/components/shared/ModeToggle"

const NAV_ITEMS = [
    { id: "overview", label: "Overview" },
    { id: "my-ideas", label: "My Ideas" },
    { id: "create", label: "Create Idea" },
    { id: "purchased", label: "Purchased Ideas" },
]

interface TopbarProps {
    active: string
    onMenuOpen: () => void
}

export default function Topbar({ active, onMenuOpen }: TopbarProps) {
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
                    <p className="text-xs text-gray-500 dark:text-green-200/40">Member Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1">
                    <Sparkles className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">Member</span>
                </div>
                <div className="ml-2 border-l border-gray-200 dark:border-white/10 pl-3">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
