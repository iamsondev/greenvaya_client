import IdeaCardSkeleton from "@/components/shared/IdeaCardSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Banner Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <Skeleton className="h-[70vh] w-full rounded-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex flex-col items-center gap-4">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Ideas Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <IdeaCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
