"use client"

import { useAuthStore } from "@/store/authStore"
import DashboardClient from "./(memberDashboard)/member-dashboard/DashboardClient"

export default function MemberDashboard() {
    const { user, accessToken } = useAuthStore()

    // Show nothing or a loading state while auth initializes if needed
    if (!accessToken) return null

    const dashboardUser = user ? {
        id: user.id || "",
        name: user.name || "Member",
        email: user.email || "",
        profileImage: user.profileImage
    } : null;

    return <DashboardClient user={dashboardUser} accessToken={accessToken} />
}