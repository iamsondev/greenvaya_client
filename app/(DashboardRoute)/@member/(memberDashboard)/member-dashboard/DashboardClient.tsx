"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import MyIdeas from "./MyIdeas"
import PurchasedIdeas from "./PurchasedIdea"
import Overview from "./Overview"
import CreateIdea from "./Createida"
import Sidebar from "./Slidebar"
import Topbar from "./Topbar"

const BASE = process.env.NEXT_PUBLIC_API_URL

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
  user: { name: string; email: string } | null
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
      const res = await fetch(`${BASE}/ideas?myIdeas=true&limit=100`, {
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
      const res = await fetch(`${BASE}/ideas/${id}/submit`, {
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
      const res = await fetch(`${BASE}/ideas/${id}`, {
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
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
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
      default:
        return <Overview ideas={ideas} />
    }
  }

  return (
    <>
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
    </>
  )
}