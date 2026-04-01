"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import axiosInstance from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"

function PaymentSuccessContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const sessionId = searchParams.get("session_id")
    const { accessToken } = useAuthStore()

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [hydrated, setHydrated] = useState(false)
    const verificationAttempted = useRef(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    useEffect(() => {
        if (!sessionId) {
            setStatus("error")
            return
        }

        // Wait for token hydration from local storage
        if (!hydrated) return
        if (!accessToken) return
        
        // Prevent strict-mode double firing
        if (verificationAttempted.current) return
        verificationAttempted.current = true

        const verify = async () => {
            try {
                await axiosInstance.get(`/payments/verify?session_id=${sessionId}`)
                setStatus("success")
            } catch (err) {
                setStatus("error")
                console.error("Payment verification failed:", err)
            }
        }

        verify()
    }, [sessionId, hydrated, accessToken])

    // Loading
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <Loader2 className="mx-auto mb-6 h-16 w-16 animate-spin text-green-500" />
                    <h1 className="mb-2 text-2xl font-black text-gray-900">Verifying Payment...</h1>
                    <p className="text-sm text-gray-500">Please wait while we confirm your payment.</p>
                </div>
            </div>
        )
    }

    // Error
    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <XCircle className="mx-auto mb-6 h-16 w-16 text-red-500" />
                    <h1 className="mb-2 text-2xl font-black text-gray-900">Verification Failed</h1>
                    <p className="mb-8 text-sm text-gray-500">
                        Something went wrong. Please contact support.
                    </p>
                    <Link
                        href="/ideas"
                        className="rounded-xl bg-gray-900 px-6 py-3 font-bold text-white hover:bg-gray-800 transition-colors"
                    >
                        Browse Ideas
                    </Link>
                </div>
            </div>
        )
    }

    // Success
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
                <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
                <h1 className="mb-2 text-2xl font-black text-gray-900">Payment Successful!</h1>
                <p className="mb-8 text-sm text-gray-500">
                    Thank you for your purchase. You can now access your unlocked idea.
                </p>
                <div className="flex flex-col gap-3">
                    <Link
                        href="/member-dashboard"
                        className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/ideas"
                        className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Browse More Ideas
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                        <Loader2 className="mx-auto mb-6 h-16 w-16 animate-spin text-green-500" />
                        <h1 className="mb-2 text-2xl font-black text-gray-900">Initialing...</h1>
                        <p className="text-sm text-gray-500">Preparing payment verification.</p>
                    </div>
                </div>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    )
}