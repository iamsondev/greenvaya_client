import Link from "next/link"
import {
    LogOut,
    X,
    Leaf,
    LayoutDashboard,
    LightbulbIcon,
    PlusCircle,
    ShoppingBag,
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "my-ideas", label: "My Ideas", icon: LightbulbIcon },
    { id: "create", label: "Create Idea", icon: PlusCircle },
    { id: "purchased", label: "Purchased Ideas", icon: ShoppingBag },
]

export default function Sidebar({
    active,
    onNavigate,
    onClose,
    isOpen,
    user,
}: {
    active: string
    onNavigate: (id: string) => void
    onClose: () => void
    isOpen: boolean
    user: any
}) {
    const { logout } = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 flex h-full w-64 flex-col border-r border-gray-200 dark:border-white/10 bg-white/95 dark:bg-green-950/80 backdrop-blur-xl transition-all duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 border-b border-gray-200 dark:border-white/10 px-6 py-5">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                            <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-black tracking-tight text-gray-900 dark:text-white">GreenVaya</span>
                    </Link>
                    <button
                        className="ml-auto text-gray-400 dark:text-green-200/40 hover:text-gray-900 dark:hover:text-white lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* User info */}
                <div className="border-b border-gray-200 dark:border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-black text-green-950">
                            {user?.name?.[0]?.toUpperCase() || "M"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user?.name || "Member"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-green-200/40">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const isActive = active === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id)
                                    onClose()
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                                        : "text-gray-600 dark:text-green-200/50 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-green-200"
                                }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-200 dark:border-white/10 px-3 py-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-green-200/40 transition-all hover:bg-red-400/10 hover:text-red-400"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    )
}
