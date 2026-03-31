import Banner from "./home/Banner"
import FeaturedIdeas from "./home/FeaturedIdeas"
import Testimonials from "./home/Testimonials"
import Newsletter from "./home/Newsletter"


export default async function CommonRoutePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ideas?limit=6&sortBy=votes`,
    { next: { revalidate: 300 } }
  )
  const data = await res.json()

  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    { next: { revalidate: 3600 } }
  )
  const categoriesData = await categoriesRes.json()

  return (
    <div className="pt-16">
      <Banner />
      <FeaturedIdeas
        ideas={data?.data || []}
        categories={categoriesData?.data || []}
      />
      <Testimonials ideas={data?.data || []} />
      <Newsletter />
    </div>
  )
}