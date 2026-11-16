import { Suspense } from "react"
import dynamic from "next/dynamic"
import Banner from "./home/Banner"
import FeaturedIdeas from "./home/FeaturedIdeas"
import Sponsors from "./home/Sponsors"
import HowItWorks from "./home/HowItWorks"
import ImpactStats from "./home/ImpactStats"
import CategoriesSection from "./home/CategoriesSection"
import { API_URL } from "@/lib/api-config"
import IdeaCardSkeleton from "@/components/shared/IdeaCardSkeleton"

// Lazy-load below-the-fold sections with SSR kept on (seo unaffected)
const WhyChooseUs = dynamic(() => import("./home/WhyChooseUs"), { ssr: true })
const Testimonials = dynamic(() => import("./home/Testimonials"), { ssr: true })
const MissionSection = dynamic(() => import("./home/MissionSection"), { ssr: true })
const Newsletter = dynamic(() => import("./home/Newsletter"), { ssr: true })

function FeaturedIdeasSkeleton() {
  return (
    <div className="py-20 lg:py-28 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <IdeaCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="h-48 w-full max-w-7xl mx-4 rounded-3xl bg-muted/30 animate-pulse" />
    </div>
  )
}

export default async function CommonRoutePage() {
  // Parallel independent fetch with error-handling fallback & revalidation
  const [ideasData, categoriesData] = await Promise.all([
    fetch(`${API_URL}/ideas?limit=6&sortBy=votes`, {
      next: { revalidate: 60 },
    })
      .then(async (res) => {
        if (!res.ok) return null
        return res.json()
      })
      .catch(() => null),

    fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 },
    })
      .then(async (res) => {
        if (!res.ok) return null
        return res.json()
      })
      .catch(() => null),
  ])

  const ideas = ideasData?.data || []
  const categories = categoriesData?.data || []

  return (
    <div className="pt-16">
      <Banner />
      <Sponsors />
      <HowItWorks />

      <Suspense fallback={<FeaturedIdeasSkeleton />}>
        <FeaturedIdeas
          ideas={ideas}
          categories={categories}
        />
      </Suspense>

      <ImpactStats />
      <CategoriesSection />
      <WhyChooseUs />

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials ideas={ideas} />
      </Suspense>

      <MissionSection />
      <Newsletter />
    </div>
  )
}
