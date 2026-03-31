"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
    User, 
    Mail, 
    Shield, 
    Calendar, 
    Edit3, 
    Camera, 
    TrendingUp, 
    MessageSquare, 
    Lightbulb,
    Loader2,
    CheckCircle,
    AlertCircle
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import HeroFadeIn from "@/components/Hero/HeroFadeIn"
import { API_URL } from "@/lib/api-config"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

interface UserProfile {
    id: string
    name: string
    email: string
    role: string
    profileImage: string
    createdAt: string
    _count?: {
        ideas: number
        votes: number
        comments: number
    }
}

export default function ProfilePage() {
    const { user, accessToken } = useAuthStore()
    const router = useRouter()
    
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [editForm, setEditForm] = useState({ name: "", profileImage: "" })
    const [updating, setUpdating] = useState(false)
    const [msg, setMsg] = useState({ type: "", text: "" })
    const [openEdit, setOpenEdit] = useState(false)

    useEffect(() => {
        if (!accessToken) {
            router.push("/login")
            return
        }

        fetch(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProfile(data.data)
                    setEditForm({ name: data.data.name, profileImage: data.data.profileImage || "" })
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [accessToken, router])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setUpdating(true)
        setMsg({ type: "", text: "" })

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(editForm)
            })
            const data = await res.json()
            if (data.success) {
                setProfile(data.data)
                setMsg({ type: "success", text: "Profile updated successfully!" })
                setTimeout(() => setOpenEdit(false), 1500)
            } else {
                setMsg({ type: "error", text: data.message || "Failed to update" })
            }
        } catch (err) {
            setMsg({ type: "error", text: "Something went wrong" })
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-green-950">
                <Loader2 className="h-12 w-12 animate-spin text-green-500" />
                <p className="mt-4 text-green-200/50">Loading profile...</p>
            </div>
        )
    }

    if (!profile) return null

    return (
        <div className="min-h-screen bg-white">
            {/* Profile Hero / Cover */}
            <section className="relative h-64 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 lg:h-80">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-green-400 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
                </div>
            </section>

            {/* Profile Info Section */}
            <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="-mt-20 lg:-mt-24">
                    <HeroFadeIn>
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="h-40 w-40 overflow-hidden rounded-[2.5rem] border-4 border-white bg-green-100 shadow-2xl lg:h-48 lg:w-48">
                                    {profile.profileImage ? (
                                        <img src={profile.profileImage} alt={profile.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-5xl font-black text-green-700">
                                            {profile.name[0]}
                                        </div>
                                    )}
                                </div>
                                <button className="absolute bottom-2 right-2 rounded-2xl bg-white p-2.5 text-gray-700 shadow-lg ring-1 ring-gray-100 transition-colors hover:bg-gray-50">
                                    <Camera className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 pb-4 text-center sm:text-left">
                                <h1 className="text-4xl font-black tracking-tight text-gray-900 lg:text-5xl">{profile.name}</h1>
                                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500 sm:justify-start">
                                    <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-green-600" /> {profile.email}</span>
                                    <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-green-600" /> {profile.role}</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-green-600" /> Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div className="pb-4">
                                <Sheet open={openEdit} onOpenChange={setOpenEdit}>
                                    <SheetTrigger asChild>
                                        <Button className="h-12 w-full rounded-2xl bg-green-600 px-6 font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 sm:w-auto">
                                            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-full sm:max-w-md border-white/10 bg-green-950 p-0">
                                         <div className="h-full bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 p-8">
                                            <SheetHeader className="mb-8">
                                                <SheetTitle className="text-2xl font-black text-white">Edit Profile</SheetTitle>
                                                <SheetDescription className="text-green-200/60 font-light">
                                                    Keep your account information up to date.
                                                </SheetDescription>
                                            </SheetHeader>

                                            <form onSubmit={handleUpdate} className="space-y-6">
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-green-200/50">Full Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/20 outline-none focus:border-green-400/50"
                                                        value={editForm.name}
                                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-green-200/50">Profile Image URL</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/20 outline-none focus:border-green-400/50"
                                                        placeholder="https://..."
                                                        value={editForm.profileImage}
                                                        onChange={e => setEditForm({ ...editForm, profileImage: e.target.value })}
                                                    />
                                                </div>

                                                {msg.text && (
                                                    <div className={`flex items-center gap-3 rounded-2xl border p-4 text-sm ${
                                                        msg.type === "success" ? "border-green-400/20 bg-green-400/10 text-green-400" : "border-red-400/20 bg-red-400/10 text-red-400"
                                                    }`}>
                                                        {msg.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                                        {msg.text}
                                                    </div>
                                                )}

                                                <Button 
                                                    disabled={updating}
                                                    className="h-14 w-full rounded-2xl bg-green-500 font-black text-green-950 shadow-xl shadow-green-500/20 hover:bg-green-400 disabled:opacity-50"
                                                >
                                                    {updating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
                                                </Button>
                                            </form>
                                         </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </HeroFadeIn>
                </div>

                {/* Account Statistics */}
                <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { label: "Ideas Shared", value: profile._count?.ideas || 0, icon: Lightbulb, color: "text-blue-600 bg-blue-50" },
                        { label: "Community Votes", value: profile._count?.votes || 0, icon: TrendingUp, color: "text-green-600 bg-green-50" },
                        { label: "Total Comments", value: profile._count?.comments || 0, icon: MessageSquare, color: "text-purple-600 bg-purple-50" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center rounded-[2rem] border border-gray-100 bg-gray-50/50 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-green-900/5">
                            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color} shadow-sm`}>
                                <stat.icon className="h-7 w-7" />
                            </div>
                            <span className="text-3xl font-black text-gray-900">{stat.value}</span>
                            <span className="mt-1 text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </section>

                {/* Additional Content / Recent Activity */}
                <section className="mt-16 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm lg:p-12">
                    <h2 className="mb-6 text-2xl font-black text-gray-900">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                                <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                                <div>
                                    <p className="text-base text-gray-700">You voted for <span className="font-bold text-gray-900 text-green-700">"Solar Powered Community Hub"</span></p>
                                    <span className="text-xs text-gray-400 font-medium">2 days ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
