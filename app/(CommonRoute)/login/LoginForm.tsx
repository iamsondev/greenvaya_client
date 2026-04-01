"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Eye,
    EyeOff,
    Leaf,
    LogIn,
    Mail,
    Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/authStore"
import axiosInstance from "@/lib/axios"
import { jwtDecode } from "jwt-decode"

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const router = useRouter()
    const { setAuth } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (formData: LoginFormData) => {
        setServerError("")
        try {
            const res = await axiosInstance.post("/auth/login", formData)
            const { accessToken, user: responseUser } = res.data.data;
            let user = responseUser;

            if (!user && accessToken) {
                user = jwtDecode(accessToken);
            }

            setAuth(user, accessToken)

            if (user.role === "ADMIN") {
                router.push("/admin-dashboard")
            } else {
                router.push("/member-dashboard")
            }
        } catch (err: any) {
            setServerError(
                err?.response?.data?.message || "Invalid email or password. Please try again."
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-green-500/5 dark:bg-green-500/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/30">
                            <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                                Welcome Back
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-200/60">
                                Sign in to your{" "}
                                <span className="text-green-600 dark:text-green-400 font-semibold">GreenVaya</span>{" "}
                                account
                            </p>
                        </div>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                            {serverError}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-green-200/80">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400/60" />
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/8 pl-10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-300/30 focus-visible:border-green-400 focus-visible:ring-green-400/20 rounded-xl"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-green-200/80">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400/60" />
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/8 pl-10 pr-10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-300/30 focus-visible:border-green-400 focus-visible:ring-green-400/20 rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400/60 hover:text-green-400 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 w-full rounded-xl bg-green-600 dark:bg-green-500 py-5 font-bold text-white dark:text-green-950 shadow-lg shadow-green-600/20 dark:shadow-green-500/30 hover:bg-green-700 dark:hover:bg-green-400 hover:shadow-green-700/30 dark:hover:shadow-green-400/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    Sign In
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                        <span className="text-xs text-gray-400 dark:text-green-300/40 font-medium">or</span>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-500 dark:text-green-200/50">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-green-600 dark:text-green-400 hover:underline transition-colors"
                        >
                            Create one free
                        </Link>
                    </p>
                </div>

                {/* Bottom text */}
                <p className="mt-6 text-center text-xs text-gray-400 dark:text-green-300/30">
                    By signing in, you agree to our{" "}
                    <span className="text-green-600/60 dark:text-green-400/60 hover:text-green-700 dark:hover:text-green-400 cursor-pointer hover:underline">
                        Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-green-600/60 dark:text-green-400/60 hover:text-green-700 dark:hover:text-green-400 cursor-pointer hover:underline">
                        Privacy Policy
                    </span>
                </p>
            </div>
        </div>
    )
}
