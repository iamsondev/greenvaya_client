"use client"

import Link from "next/link"
import {
    LogOut,
    X,
    Leaf,
    LayoutDashboard,
    LightbulbIcon,
    PlusCircle,
    ShoppingBag,
    MessageCircle,
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "my-ideas", label: "My Ideas", icon: LightbulbIcon },
    { id: "create", label: "Create Idea", icon: PlusCircle },
    { id: "purchased", label: "Purchased Ideas", icon: ShoppingBag },
    { id: "support", label: "Green Support", icon: MessageCircle },
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
                className={`fixed top-0 left-0 z-30 flex h-full w-64 flex-col border-r border-border bg-background/95 backdrop-blur-xl transition-all duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 border-b border-border dark:border-border px-6 py-5">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Leaf className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-black tracking-tight text-foreground dark:text-white">GreenVaya</span>
                    </Link>
                    <button
                        className="ml-auto text-muted-foreground hover:text-foreground lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* User info */}
                <div className="border-b border-border dark:border-border px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 overflow-hidden">
                            {user?.profileImage ? (
                                <img 
                                    src={user.profileImage} 
                                    alt={user.name} 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            ) : (
                                <span>{user?.name?.[0]?.toUpperCase() || "M"}</span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground dark:text-white">
                                {user?.name || "Member"}
                            </p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
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
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-border dark:border-border px-3 py-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground dark:text-green-200/40 transition-all hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    )
}
