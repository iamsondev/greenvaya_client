import { Menu, Shield } from "lucide-react"

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
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-green-950/60 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <button
                    className="rounded-lg p-1.5 text-green-200/40 hover:bg-white/10 hover:text-white lg:hidden"
                    onClick={onMenuOpen}
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-base font-bold text-white">
                        {NAV_ITEMS.find((n) => n.id === active)?.label || "Overview"}
                    </h1>
                    <p className="text-xs text-green-200/40">Admin Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1">
                    <Shield className="h-3 w-3 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">Admin</span>
                </div>
            </div>
        </header>
    )
}
