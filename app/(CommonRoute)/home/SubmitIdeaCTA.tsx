"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Leaf, Loader2 } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CreateIdea from "@/components/shared/CreateIdea"

export default function SubmitIdeaCTA() {
    const { user, accessToken } = useAuthStore()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen && !user) {
            router.push("/login")
            return
        }
        setOpen(newOpen)
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-green-400/40 px-8 py-6 text-base text-green-100 backdrop-blur-sm transition-all hover:scale-[1.03] hover:border-green-400 hover:bg-green-500/10"
                >
                    <Leaf className="h-5 w-5" />
                    Submit Your Idea
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="right" 
                className="w-full sm:max-w-xl border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-0 overflow-y-auto"
            >
                <div className="relative h-full min-h-screen bg-white dark:bg-gradient-to-br dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-6">
                     {/* Background effects inside the sheet */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/5 dark:bg-green-500/10 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl" />
                    </div>

                    <SheetHeader className="relative z-10 mb-6">
                        <SheetTitle className="text-2xl font-black text-gray-900 dark:text-white">Create New Idea</SheetTitle>
                        <SheetDescription className="text-gray-500 dark:text-green-200/60 font-light">
                            Share your sustainability idea with the community to make a real impact.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="relative z-10">
                        {accessToken ? (
                            <CreateIdea 
                                accessToken={accessToken} 
                                onCreated={() => {
                                    setOpen(false)
                                    router.refresh()
                                }} 
                                isModal={true}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Loader2 className="h-10 w-10 animate-spin text-green-500 mb-4" />
                                <p className="text-gray-500 dark:text-green-100/60">Redirecting to login...</p>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
