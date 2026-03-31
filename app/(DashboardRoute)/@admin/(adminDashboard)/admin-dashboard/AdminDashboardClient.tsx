"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import AdminSidebar from "./AdminSidebar"
import AdminTopbar from "./AdminTopbar"
import AdminOverview from "./AdminOverview"

import IdeasManagement from "./IdeasManagement"
import MembersManagement from "./MembersManagement"

interface Props {
  user: { id?: string; name: string; email: string; role: string } | null
  accessToken: string
}

export default function AdminDashboardClient({ user, accessToken }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const active = searchParams.get("tab") || "overview"

  const setActive = (tab: string) => {
    router.push(`${pathname}?tab=${tab}`)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderSection = () => {
    switch (active) {
      case "overview":
        return <AdminOverview accessToken={accessToken} />
      case "members":
        return <MembersManagement accessToken={accessToken} />
      case "ideas":
        return <IdeasManagement accessToken={accessToken} />
      default:
        return <AdminOverview accessToken={accessToken} />
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <AdminSidebar
        active={active}
        onNavigate={setActive}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        user={user}
      />
      <div className="lg:pl-64">
        <AdminTopbar active={active} onMenuOpen={() => setSidebarOpen(true)} />
        <main className="relative z-10 p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
