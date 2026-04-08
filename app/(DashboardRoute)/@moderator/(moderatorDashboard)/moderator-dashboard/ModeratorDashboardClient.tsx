"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import ModeratorSidebar from "./ModeratorSidebar"
import ModeratorTopbar from "./ModeratorTopbar"
import ModeratorOverview from "./ModeratorOverview"
import IdeasManagement from "./IdeasManagement"
import MembersManagement from "./MembersManagement"
import CategoryManagement from "./CategoryManagement"
import ChatModule from "@/components/shared/ChatModule"


// Member components for reuse
import MyIdeas from "@/app/(DashboardRoute)/@member/(memberDashboard)/member-dashboard/MyIdeas"
import PurchasedIdeas from "@/app/(DashboardRoute)/@member/(memberDashboard)/member-dashboard/PurchasedIdea"
import CreateIdea from "@/components/shared/CreateIdea"
import { API_URL } from "@/lib/api-config"
import { toast } from "sonner"

interface Props {
  user: { id?: string; name: string; email: string; role: string } | null
  accessToken: string
}

export default function ModeratorDashboardClient({ user, accessToken }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const active = searchParams.get("tab") || "overview"

  const setActive = (tab: string) => {
    router.push(`${pathname}?tab=${tab}`)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [ideas, setIdeas] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchIdeas = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/ideas?authorId=${user.id}&limit=100`, {
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
  }, [accessToken, user?.id])

  useEffect(() => {
    if (active === "my-ideas" || active === "overview") {
      fetchIdeas()
    }
  }, [fetchIdeas, active])

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
    switch (active) {
      case "overview":
        return <ModeratorOverview accessToken={accessToken} />
      case "members":
        return <MembersManagement accessToken={accessToken} />
      case "ideas":
        return <IdeasManagement accessToken={accessToken} />
      case "categories":
        return <CategoryManagement accessToken={accessToken} />
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
             <ChatModule user={user} />
          </div>
        )
      default:
        return <ModeratorOverview accessToken={accessToken} />
    }
  }


  return (
    <div className="relative min-h-screen bg-muted dark:bg-gradient-to-br dark:from-green-950 dark:via-green-900 dark:to-emerald-800 transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-600/5 dark:bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <ModeratorSidebar
        active={active}
        onNavigate={setActive}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        user={user}
      />
      <div className="lg:pl-64">
        <ModeratorTopbar active={active} onMenuOpen={() => setSidebarOpen(true)} />
        <main className="relative z-10 p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

