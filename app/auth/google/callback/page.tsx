"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { jwtDecode } from "jwt-decode"
import { Loader2, Sparkles } from "lucide-react"

function GoogleCallbackContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setAuth } = useAuthStore()

    useEffect(() => {
        const token = searchParams.get("token")

        if (token) {
            try {
                // Decode token to get user info
                const user: any = jwtDecode(token)
                
                // Save to store
                setAuth(user, token)

                // Redirect based on role
                if (user.role === "ADMIN") {
                    router.push("/admin-dashboard")
                } else if (user.role === "MODERATOR") {
                    router.push("/moderator-dashboard")
                } else {
                    router.push("/member-dashboard")
                }
            } catch (error) {
                console.error("Failed to decode token:", error)
                router.push("/login?error=auth_failed")
            }
        } else {
            router.push("/login?error=no_token")
        }
    }, [searchParams, setAuth, router])

    return (
        <div className="min-h-screen bg-muted dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative flex flex-col items-center gap-6">
                    <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 animate-bounce">
                        <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-foreground dark:text-white tracking-tight">Authenticating with Google</h2>
                        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            Establishing neural connection...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-muted dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
            </div>
        }>
            <GoogleCallbackContent />
        </Suspense>
    )
}
