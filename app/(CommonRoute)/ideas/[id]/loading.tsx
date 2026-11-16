import { Skeleton } from "@/components/ui/skeleton"

export default function IdeaDetailLoading() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            {/* Header Hero Skeleton */}
            <div className="border-b border-border bg-muted/30 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <Skeleton className="h-5 w-24 mb-6 rounded-full" />
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    
                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/60">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                        </div>
                        <div className="flex gap-4 sm:ml-auto">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-72 w-full rounded-2xl" />
                        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                            <Skeleton className="h-6 w-36" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                            <Skeleton className="h-5 w-28" />
                            <div className="flex gap-3">
                                <Skeleton className="h-12 flex-1 rounded-xl" />
                                <Skeleton className="h-12 flex-1 rounded-xl" />
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
