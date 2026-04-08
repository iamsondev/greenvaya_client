import { Skeleton } from "@/components/ui/skeleton"

export default function IdeaCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300">
      <Skeleton className="h-48 w-full rounded-b-none" />
      <div className="flex flex-1 flex-col p-5 gap-3">
        <Skeleton className="h-6 w-3/4 mb-1" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-4 flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3 w-20" />
        </div>
        <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-4">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
