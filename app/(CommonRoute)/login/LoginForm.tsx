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
    ShieldCheck,
    User,
    UserCheck,
    Sparkles,
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
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const handleDemoLogin = (role: 'ADMIN' | 'MEMBER' | 'MODERATOR') => {
        if (role === 'ADMIN') {
            setValue('email', 'admin@gmail.com')
            setValue('password', 'admin1234')
        } else if (role === 'MODERATOR') {
            setValue('email', 'moderator@gmail.com')
            setValue('password', 'moderator123')
        } else {
            setValue('email', 'hikaru@gmail.com')
            setValue('password', 'password1234')
        }
    }

    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true)
        setServerError("")
        
        // Redirect to Backend Google Auth Endpoint
        // We use window.location.href because this is an external redirect to the backend
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://greenvaya-backend.vercel.app/api/v1";
        // Remove trailing / if any
        const baseUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
        
        window.location.href = `${baseUrl}/auth/google`;
    }

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
            } else if (user.role === "MODERATOR") {
                router.push("/moderator-dashboard")
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
        <div className="min-h-screen bg-muted dark:bg-zinc-950 flex items-center justify-center px-4 py-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="rounded-3xl border border-border dark:border-border bg-white dark:bg-muted p-8 shadow-2xl backdrop-blur-xl">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                            <Leaf className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-black text-foreground dark:text-white">
                                Welcome Back
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Sign in to your{" "}
                                <span className="text-primary font-semibold">GreenVaya</span>{" "}
                                account
                            </p>
                        </div>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium">
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
                                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="border-border dark:border-border bg-muted dark:bg-muted pl-10 text-foreground dark:text-white placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-green-200/80">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="border-border dark:border-border bg-muted dark:bg-muted pl-10 pr-10 text-foreground dark:text-white placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-primary transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 w-full rounded-xl bg-primary py-5 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        <div className="h-px flex-1 bg-muted dark:bg-muted" />
                        <span className="text-xs text-muted-foreground/40 font-medium">or</span>
                        <div className="h-px flex-1 bg-muted dark:bg-muted" />
                    </div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading || isSubmitting}
                            className="w-full rounded-xl border-border bg-card py-5 font-bold transition-all hover:bg-muted relative overflow-hidden group"
                        >
                            {isGoogleLoading ? (
                                <div className="flex items-center gap-2">
                                     <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                     Authenticating...
                                </div>
                            ) : (
                                <>
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </div>

                    {/* Quick Demo Logins */}
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Developer Sandbox</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('ADMIN')}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
                            >
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <div className="text-[10px] font-bold text-foreground">Admin Demo</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('MODERATOR')}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
                            >
                                <UserCheck className="h-4 w-4 text-primary" />
                                <div className="text-[10px] font-bold text-foreground">Mod Demo</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('MEMBER')}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
                            >
                                <User className="h-4 w-4 text-primary" />
                                <div className="text-[10px] font-bold text-foreground">Member Demo</div>
                            </button>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-8 pt-6 border-t border-muted text-center">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-primary hover:underline transition-colors"
                            >
                                Create one free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <p className="mt-6 text-center text-xs text-muted-foreground dark:text-green-300/30">
                    By signing in, you agree to our{" "}
                    <span className="text-primary/60 dark:text-green-400/60 hover:text-green-700 dark:hover:text-green-400 cursor-pointer hover:underline">
                        Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-primary/60 dark:text-green-400/60 hover:text-green-700 dark:hover:text-green-400 cursor-pointer hover:underline">
                        Privacy Policy
                    </span>
                </p>
            </div>
        </div>
    )
}
