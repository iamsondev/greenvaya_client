import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Zap,
  Recycle,
  Car,
} from "lucide-react"
import HeroSearch from "@/components/Hero/HeroSearch"
import HeroFadeIn from "@/components/Hero/HeroFadeIn"

const floatingLeaves = [
  { top: "10%", left: "5%", size: 24, delay: 0, duration: 6 },
  { top: "20%", left: "90%", size: 16, delay: 1, duration: 8 },
  { top: "60%", left: "8%", size: 20, delay: 2, duration: 7 },
  { top: "75%", left: "85%", size: 14, delay: 0.5, duration: 9 },
  { top: "40%", left: "95%", size: 18, delay: 1.5, duration: 6.5 },
  { top: "85%", left: "15%", size: 12, delay: 3, duration: 8.5 },
]

const categories = [
  { label: "Energy", icon: Zap, color: "text-yellow-600 bg-yellow-50" },
  { label: "Waste", icon: Recycle, color: "text-blue-600 bg-blue-50" },
  { label: "Transport", icon: Car, color: "text-purple-600 bg-purple-50" },
  { label: "Nature", icon: Leaf, color: "text-green-600 bg-green-50" },
]

export default function Banner() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-green-400/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-teal-400/10 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Leaves */}
      {floatingLeaves.map((leaf, i) => (
        <div
          key={i}
          className="pointer-events-none absolute opacity-20"
          style={{
            top: leaf.top,
            left: leaf.left,
            animation: `float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite alternate`,
          }}
        >
          <Leaf
            style={{ width: leaf.size, height: leaf.size }}
            className="text-green-300"
          />
        </div>
      ))}

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full border border-green-500/20" />
      <div className="absolute top-32 right-32 h-40 w-40 rounded-full border border-green-400/10" />
      <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full border border-emerald-500/15" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge & Headlines */}
          <HeroFadeIn>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/15 px-4 py-2">
              <Sparkles className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium tracking-wide text-green-300">
                Community-Powered Sustainability
              </span>
            </div>

            <h1 className="mb-6 text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Ideas That
              <span className="relative mx-4">
                <span className="relative z-10 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Heal
                </span>
                <span className="absolute right-0 -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-green-400 to-emerald-300" />
              </span>
              Our Planet
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-green-100/70 sm:text-xl">
              Join thousands of eco-innovators sharing bold sustainability ideas —
              from rooftop solar to zero-waste cities. Vote, discuss, and make
              real change happen.
            </p>
          </HeroFadeIn>

          {/* Search Bar */}
          <HeroFadeIn delay={200} className="mx-auto mb-10 max-w-2xl">
            <HeroSearch />
          </HeroFadeIn>

          {/* CTA Buttons */}
          <HeroFadeIn delay={400} className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-green-500 px-8 py-6 text-base font-bold text-green-950 shadow-lg shadow-green-500/30 transition-all hover:scale-[1.03] hover:bg-green-400 hover:shadow-green-400/50"
            >
              <Link href="/ideas" className="flex items-center gap-2">
                Explore Ideas
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-green-400/40 px-8 py-6 text-base text-green-100 backdrop-blur-sm transition-all hover:scale-[1.03] hover:border-green-400 hover:bg-green-500/10"
            >
              <Link
                href="/member/create-idea"
                className="flex items-center gap-2"
              >
                <Leaf className="h-5 w-5" />
                Submit Your Idea
              </Link>
            </Button>
          </HeroFadeIn>

          {/* Category Pills */}
          <HeroFadeIn delay={600} className="flex flex-wrap justify-center gap-3">
            <span className="mr-1 self-center text-sm font-medium text-green-400/60">
              Browse by:
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/ideas?category=${cat.label.toLowerCase()}`}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-green-100/80 backdrop-blur-sm transition-all duration-200 hover:border-green-400/40 hover:bg-green-500/20 hover:text-white"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </Link>
            ))}
          </HeroFadeIn>
        </div>

        {/* Bottom Stats Bar */}
        <HeroFadeIn delay={800} className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            { value: "1,240+", label: "Ideas Shared" },
            { value: "8,500+", label: "Community Members" },
            { value: "32,000+", label: "Votes Cast" },
            { value: "12", label: "Categories" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 px-6 py-5 text-center backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <div className="mb-1 text-2xl font-black text-green-400">
                {stat.value}
              </div>
              <div className="text-xs font-medium tracking-wide text-green-200/60 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </HeroFadeIn>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />

      {/* Float animation (CSS for Server Component) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(15deg);
          }
        }
      ` }} />
    </section>
  )
}
