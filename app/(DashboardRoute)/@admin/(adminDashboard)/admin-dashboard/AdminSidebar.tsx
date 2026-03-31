"use client"

import Link from "next/link"
import {
    LogOut, X, Leaf, LayoutDashboard,
    Users, LightbulbIcon, Shield,
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const NAV_ITEMS = [
    { id: "overview",       label: "Overview",           icon: LayoutDashboard },
    { id: "members",        label: "Members Management", icon: Users },
    { id: "ideas",          label: "Ideas Management",   icon: LightbulbIcon },
]

export default function AdminSidebar({
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
    user: { name: string; email: string } | null
}) {
    const { logout } = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-30 flex h-full w-64 flex-col border-r border-white/10 bg-green-950/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                            <Leaf className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="font-black tracking-tight text-white">GreenVaya</span>
                    </Link>
                    <button
                        className="ml-auto text-green-200/40 hover:text-white lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Admin badge + user */}
                <div className="border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-black text-green-950">
                            {user?.name?.[0]?.toUpperCase() || "A"}
                            <Shield className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-950 text-amber-400 p-0.5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{user?.name || "Admin"}</p>
                            <p className="text-xs text-green-200/40">{user?.email}</p>
                        </div>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5">
                        <Shield className="h-3 w-3 text-amber-400" />
                        <span className="text-xs font-semibold text-amber-400">Administrator</span>
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
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "text-green-200/50 hover:bg-white/5 hover:text-green-200"
                                }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-white/10 px-3 py-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-green-200/40 transition-all hover:bg-red-400/10 hover:text-red-400"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    )
}
