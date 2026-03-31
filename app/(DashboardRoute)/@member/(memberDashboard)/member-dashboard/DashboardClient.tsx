"use client"

import { useState, useCallback } from "react"
import { Loader2 } from "lucide-react"

import MyIdeas from "./MyIdeas"

import PurchasedIdeas from "./PurchasedIdea"
import { useEffect } from "react"
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
  const [active, setActive] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIdeas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/api/v1/ideas?myIdeas=true&limit=100`, {
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
    await fetch(`${BASE}/api/v1/ideas/${id}/submit`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    await fetchIdeas()
  }

  const handleDelete = async (id: string) => {
    await fetch(`${BASE}/api/v1/ideas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    await fetchIdeas()
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