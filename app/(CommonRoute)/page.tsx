import Banner from "./home/Banner"
import FeaturedIdeas from "./home/FeaturedIdeas"
import Testimonials from "./home/Testimonials"
import Newsletter from "./home/Newsletter"
import Sponsors from "./home/Sponsors"
import HowItWorks from "./home/HowItWorks"
import ImpactStats from "./home/ImpactStats"
import CategoriesSection from "./home/CategoriesSection"
import WhyChooseUs from "./home/WhyChooseUs"
import MissionSection from "./home/MissionSection"
import { API_URL } from "@/lib/api-config"


export default async function CommonRoutePage() {
  const res = await fetch(
    `${API_URL}/ideas?limit=6&sortBy=votes`,
    { next: { revalidate: 300 } }
  )
  const data = await res.json()

  const categoriesRes = await fetch(
    `${API_URL}/categories`,
    { next: { revalidate: 3600 } }
  )
  const categoriesData = await categoriesRes.json()

  return (
    <div className="pt-16">
      <Banner />
      <Sponsors />
      <HowItWorks />
      <FeaturedIdeas
        ideas={data?.data || []}
        categories={categoriesData?.data || []}
      />
      <ImpactStats />
      <CategoriesSection />
      <WhyChooseUs />
      <Testimonials ideas={data?.data || []} />
      <MissionSection />
      <Newsletter />
    </div>
  )
}