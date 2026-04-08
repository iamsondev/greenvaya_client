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
    UserPlus,
    Mail,
    Lock,
    User,
    ImagePlus,
    CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axiosInstance from "@/lib/axios"

const signUpSchema = z
    .object({
        name: z
            .string()
            .min(1, "Name is required")
            .min(2, "Name must be at least 2 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageUploading, setImageUploading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        )

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
        )
        const data = await res.json()
        return data.secure_url
    }

    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true)
        setServerError("")
        
        // Redirect to Backend Google Auth Endpoint
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://greenvaya-backend.vercel.app/api/v1";
        const baseUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
        
        window.location.href = `${baseUrl}/auth/google`;
    }

    const onSubmit = async (formData: SignUpFormData) => {
        setServerError("")
        try {
            let profileImage = ""

            if (imageFile) {
                setImageUploading(true)
                profileImage = await uploadToCloudinary(imageFile)
                setImageUploading(false)
            }

            await axiosInstance.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                profileImage,
            })

            setSuccess(true)
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        } catch (err: any) {
            setImageUploading(false)
            setServerError(
                err?.response?.data?.message || "Registration failed. Please try again."
            )
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                        <CheckCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-black text-foreground mb-2">
                        Account Created!
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted dark:bg-zinc-950 flex items-center justify-center px-4 py-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[10%] -right-[10%] h-[45%] w-[45%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[130px]" />
                <div className="absolute -bottom-[10%] -left-[10%] h-[45%] w-[45%] rounded-full bg-primary/5 dark:bg-primary/10 blur-[130px]" />
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
                                Create Account
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Join the{" "}
                                <span className="text-primary font-semibold">GreenVaya</span>{" "}
                                community
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
                        {/* Profile Image Upload */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white/20 bg-white/10">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <User className="h-8 w-8 text-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary dark:bg-primary shadow-md hover:bg-green-700 dark:hover:bg-primary transition-colors">
                                    <ImagePlus className="h-3.5 w-3.5 text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-green-300/40">
                                Upload profile picture (optional)
                            </p>
                        </div>

                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-green-200/80">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400/60" />
                                <Input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Your Full Name"
                                    className="border-border dark:border-border bg-muted dark:bg-muted pl-10 text-foreground dark:text-white placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>

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
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400/60" />
                                <Input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="border-border dark:border-border bg-muted dark:bg-muted pl-10 pr-10 text-foreground dark:text-white placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl"
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
                                <p className="text-xs text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-green-200/80">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400/60" />
                                <Input
                                    {...register("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="border-border dark:border-border bg-muted dark:bg-muted pl-10 pr-10 text-foreground dark:text-white placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400/60 hover:text-green-400 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting || imageUploading}
                            className="mt-2 w-full rounded-xl bg-primary dark:bg-primary py-5 font-bold text-white dark:text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting || imageUploading ? (
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
                                    {imageUploading ? "Uploading image..." : "Creating account..."}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    Create Account
                                </span>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-muted dark:bg-muted" />
                        <span className="text-xs text-muted-foreground dark:text-green-300/40 font-medium">or</span>
                        <div className="h-px flex-1 bg-muted dark:bg-muted" />
                    </div>

                    {/* Social Signup */}
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
                                    Sign up with Google
                                </>
                            )}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-muted text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-primary dark:text-green-400 hover:underline transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom text */}
                <p className="mt-6 text-center text-xs text-muted-foreground dark:text-green-300/30">
                    By creating an account, you agree to our{" "}
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