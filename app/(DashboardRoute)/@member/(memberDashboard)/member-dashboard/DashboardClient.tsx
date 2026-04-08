"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import MyIdeas from "./MyIdeas"
import PurchasedIdeas from "./PurchasedIdea"
import Overview from "./Overview"
import Sidebar from "./Slidebar"
import Topbar from "./Topbar"
import CreateIdea from "@/components/shared/CreateIdea"
import { API_URL } from "@/lib/api-config"
import ChatModule from "@/components/shared/ChatModule"

type IdeaStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"

interface Idea {
  id: string
  title: string
  category: { id: string; name: string }
  status: IdeaStatus
  isPaid: boolean
  price: number
  createdAt: string
  upvotes?: number
  feedback?: string
}

interface Props {
  user: { id?: string; name: string; email: string; profileImage?: string } | null
  accessToken: string
}

export default function DashboardClient({ user, accessToken }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // ✅ URL থেকে active tab নাও — refresh এও টিকে থাকবে
  const active = searchParams.get("tab") || "overview"

  const setActive = (tab: string) => {
    router.push(`${pathname}?tab=${tab}`)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIdeas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/ideas?authorId=${user?.id}&limit=100`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      })
      const data = await res.json()
      setIdeas(data?.data?.ideas ?? data?.data ?? [])
    } catch {
      setIdeas([])
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => { fetchIdeas() }, [fetchIdeas])

  const handleSubmit = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/ideas/${id}/submit`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error()
      toast.success("Idea submitted for review!")
      await fetchIdeas()
    } catch {
      toast.error("Failed to submit idea.")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/ideas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) throw new Error()
      setIdeas((prev) => prev.filter((i) => i.id !== id))
      toast.success("Idea deleted successfully!")
    } catch {
      toast.error("Failed to delete idea.")
    }
  }

  const renderSection = () => {
    if (loading && active !== "create" && active !== "purchased") {
      return (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    switch (active) {
      case "overview":
        return <Overview ideas={ideas} />
      case "my-ideas":
        return <MyIdeas ideas={ideas} onSubmit={handleSubmit} onDelete={handleDelete} />
      case "create":
        return (
          <CreateIdea
            accessToken={accessToken}
            onCreated={() => { fetchIdeas(); setActive("my-ideas") }}
          />
        )
      case "purchased":
        return <PurchasedIdeas />
      case "support":
        return (
          <div className="h-[calc(100vh-200px)]">
             <ChatModule user={user ? { ...user, role: "MEMBER" } : null} />
          </div>
        )
      default:
        return <Overview ideas={ideas} />
    }
  }

  return (
    <div className="relative min-h-screen bg-muted dark:bg-gradient-to-br dark:from-secondary dark:via-secondary/90 dark:to-primary/20 transition-colors duration-500">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 dark:bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 dark:bg-primary/8 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <Sidebar
        active={active}
        onNavigate={setActive}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        user={user}
      />
      <div className="lg:pl-64">
        <Topbar active={active} onMenuOpen={() => setSidebarOpen(true)} />
        <main className="relative z-10 p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}