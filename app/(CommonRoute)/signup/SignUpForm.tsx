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
            <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30">
                        <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">
                        Account Created!
                    </h2>
                    <p className="text-green-200/60 text-sm">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[10%] -right-[10%] h-[45%] w-[45%] rounded-full bg-green-500/5 dark:bg-green-500/10 blur-[130px]" />
                <div className="absolute -bottom-[10%] -left-[10%] h-[45%] w-[45%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px]" />
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
                                Create Account
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-200/60">
                                Join the{" "}
                                <span className="text-green-600 dark:text-green-400 font-semibold">GreenVaya</span>{" "}
                                community
                            </p>
                        </div>
                    </div>

                    {/* Server Error */}
                    {serverError && (
                        <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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
                                            <User className="h-8 w-8 text-green-400/50" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-green-600 dark:bg-green-500 shadow-md hover:bg-green-700 dark:hover:bg-green-400 transition-colors">
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
                                    placeholder="John Doe"
                                    className="border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/8 pl-10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-300/30 focus-visible:border-green-400 focus-visible:ring-green-400/20 rounded-xl"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-400">{errors.name.message}</p>
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
                                    className="border-white/10 bg-white/8 pl-10 pr-10 text-white placeholder:text-green-300/30 focus-visible:border-green-400 focus-visible:ring-green-400/20 rounded-xl"
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
                                    className="border-white/10 bg-white/8 pl-10 pr-10 text-white placeholder:text-green-300/30 focus-visible:border-green-400 focus-visible:ring-green-400/20 rounded-xl"
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
                                <p className="text-xs text-red-400">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting || imageUploading}
                            className="mt-2 w-full rounded-xl bg-green-600 dark:bg-green-500 py-5 font-bold text-white dark:text-green-950 shadow-lg shadow-green-600/20 dark:shadow-green-500/30 hover:bg-green-700 dark:hover:bg-green-400 hover:shadow-green-700/30 dark:hover:shadow-green-400/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                        <span className="text-xs text-gray-400 dark:text-green-300/40 font-medium">or</span>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 dark:text-green-200/50">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-green-600 dark:text-green-400 hover:underline transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Bottom text */}
                <p className="mt-6 text-center text-xs text-gray-400 dark:text-green-300/30">
                    By creating an account, you agree to our{" "}
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