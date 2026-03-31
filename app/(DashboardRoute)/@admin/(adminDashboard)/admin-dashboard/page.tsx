import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminDashboardClient from "./AdminDashboardClient"
import { API_URL } from "@/lib/api-config"

export default async function AdminDashboardPage() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value

    if (!refreshToken) {
        redirect("/login")
    }

    const res = await fetch(
        `${API_URL}/auth/refresh-token`,
        {
            method: "POST",
            headers: { cookie: `refreshToken=${refreshToken}` },
            cache: "no-store",
        }
    )

    const data = await res.json()
    const accessToken = data?.data?.accessToken

    if (!accessToken) {
        redirect("/login")
    }

    const payload = JSON.parse(
        Buffer.from(accessToken.split(".")[1], "base64").toString()
    )

    if (payload.role !== "ADMIN") {
        redirect("/member-dashboard")
    }

    const user = {
        id: payload.id as string,
        name: (payload.name as string) || "Admin",
        email: payload.email as string,
        role: payload.role as string,
    }

    return <AdminDashboardClient user={user} accessToken={accessToken} />
}
