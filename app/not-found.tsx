"use client"

import Link from "next/link"
import { ArrowLeft, Home, Search, Leaf, Compass, Map } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-32 text-center relative overflow-hidden">
            {/* Background layered elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-primary/5 blur-[150px]" />
                <div className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-primary/5 blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
                     style={{
                         backgroundImage: `linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)`,
                         backgroundSize: "80px 80px",
                         width: "200%",
                         height: "200%"
                     }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Visual Icon */}
                <div className="mb-8 relative">
                    <div className="absolute -inset-8 animate-pulse rounded-full bg-primary/10 blur-2xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-secondary text-primary shadow-2xl shadow-primary/20 transition-all hover:scale-110">
                        <Compass className="h-12 w-12 animate-spin-slow rotate-45" />
                    </div>
                    <Leaf className="absolute -bottom-2 -right-2 h-10 w-10 text-primary drop-shadow-lg" />
                </div>

                {/* Main Text */}
                <div className="mb-6 space-y-2">
                    <h1 className="text-9xl font-black tracking-tighter text-foreground selection:bg-primary selection:text-white sm:text-[12rem]">
                        4<span className="text-primary italic">0</span>4
                    </h1>
                    <h2 className="text-2xl font-bold text-foreground sm:text-4xl">
                        Lost in the <span className="text-primary">Eco-System?</span>
                    </h2>
                    <p className="mx-auto max-w-md text-base text-muted-foreground font-light leading-relaxed">
                        It looks like this path hasn't been cultivated yet. Don't worry, even the best explorers take a wrong turn sometimes.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-2xl bg-primary px-8 py-7 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all hover:bg-primary/95"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Return Home
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="group rounded-2xl border-primary/20 bg-card px-8 py-7 text-lg font-bold text-foreground hover:bg-muted hover:border-primary/40 transition-all hover:scale-[1.02]"
                        onClick={() => window.history.back()}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                            Go Back
                        </span>
                    </Button>
                </div>

                {/* Quick Map */}
                <div className="mt-16 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        <Map className="h-4 w-4" />
                        Quick Navigation
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
                        <Link href="/ideas" className="transition-colors hover:text-primary">Featured Ideas</Link>
                        <Link href="/community" className="transition-colors hover:text-primary">Community</Link>
                        <Link href="/help" className="transition-colors hover:text-primary">Help Center</Link>
                        <Link href="/about" className="transition-colors hover:text-primary">Our Mission</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
