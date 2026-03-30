"use client"

import { useState } from "react"
import {
    LogOut,
    Menu,
    X,
    Leaf,
    Sparkles,
    LayoutDashboard,
    LightbulbIcon,
    PlusCircle,
    ShoppingBag,
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import Overview from "./(memberDashboard)/member-dashboard/Overview"
import MyIdeas from "./(memberDashboard)/member-dashboard/MyIdeas"
import CreateIdea from "./(memberDashboard)/member-dashboard/Createida"
import PurchasedIdeas from "./(memberDashboard)/member-dashboard/PurchasedIdea"

interface Idea {
    id: string
    title: string
    category: { id: string; name: string }
    status: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
    isPaid: boolean
    price: number
    createdAt: string
    upvotes?: number
    feedback?: string
}

const MOCK_IDEAS: Idea[] = []

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "my-ideas", label: "My Ideas", icon: LightbulbIcon },
    { id: "create", label: "Create Idea", icon: PlusCircle },
    { id: "purchased", label: "Purchased Ideas", icon: ShoppingBag },
]

export default function MemberDashboard() {
    const [activeSection, setActiveSection] = useState("overview")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS)
    const { user, logout, token } = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const handleSubmit = async (id: string) => {
        setIdeas((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, status: "UNDER_REVIEW" as const } : i
            )
        )
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this idea?")) return
        setIdeas((prev) => prev.filter((i) => i.id !== id))
    }
    const handleIdeaCreated = () => { }

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <Overview ideas={ideas} />
            case "my-ideas":
                return <MyIdeas ideas={ideas} onSubmit={handleSubmit} onDelete={handleDelete} />
            case "create":
                return (
                    <CreateIdea
                        accessToken={token || ""}
                        onCreated={handleIdeaCreated}
                    />
                )
            case "purchased":
                return <PurchasedIdeas ideas={[]} />
            default:
                return <Overview ideas={ideas} />
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">
            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-green-400/8 blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-[100px]" />
            </div>
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 flex h-full w-64 flex-col border-r border-white/10 bg-green-950/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                        <Leaf className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="font-black tracking-tight text-white">GreenVaya</span>
                    <button
                        className="ml-auto text-green-200/40 hover:text-white lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* User info */}
                <div className="border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-black text-green-950">
                            {user?.name?.[0]?.toUpperCase() || "M"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">
                                {user?.name || "Member"}
                            </p>
                            <p className="text-xs text-green-200/40">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const active = activeSection === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id)
                                    setSidebarOpen(false)
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active
                                    ? "bg-green-500/20 text-green-400"
                                    : "text-green-200/50 hover:bg-white/5 hover:text-green-200"
                                    }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                {item.label}
                                {active && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400" />
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

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-green-950/60 px-6 py-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <button
                            className="rounded-lg p-1.5 text-green-200/40 hover:bg-white/10 hover:text-white lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-base font-bold text-white">
                                {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
                            </h1>
                            <p className="text-xs text-green-200/40">Member Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1">
                            <Sparkles className="h-3 w-3 text-green-400" />
                            <span className="text-xs font-semibold text-green-400">Member</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="relative z-10 p-6 lg:p-8">{renderSection()}</main>
            </div>
        </div>
    )
}