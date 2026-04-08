"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Zap,
  Recycle,
  Car,
  ChevronLeft,
  ChevronRight,
  Target,
  Globe,
  Waves,
} from "lucide-react"
import HeroSearch from "@/components/Hero/HeroSearch"
import SubmitIdeaCTA from "./SubmitIdeaCTA"

const slides = [
  {
    badge: "The Purity of Nature",
    title: "Eco-Innovation <span class='text-primary italic'>Starts</span> with a Seed",
    desc: "Discover how tiny sustainable changes can lead to a global environmental revolution. Join our green movement today.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590768/pexels-quang-nguyen-vinh-222549-6876534_lamqvw.jpg",
    icon: Leaf,
  },
  {
    badge: "Infinite Possibilities",
    title: "Sustainable <span class='text-primary italic'>Future</span> Beyond Boundaries",
    desc: "Exploring the next frontier of green technology and cosmic energy blueprints. Our vision for the next century starts now.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590768/pexels-eclipse-chasers-716719984-30805406_wcj237.jpg",
    icon: Target,
  },
  {
    badge: "Clean Energy Revolution",
    title: "Harness the <span class='text-primary italic'>Power</span> of the Sun",
    desc: "Implementing residential solar solutions that empower communities and reduce carbon footprints worldwide.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590765/pexels-kindelmedia-9800030_md9ldl.jpg",
    icon: Zap,
  },
  {
    badge: "Pristine Environments",
    title: "Protect Our <span class='text-primary italic'>Shared</span> Natural Heritage",
    desc: "From mountain peaks to deep oceans, collaborate with global conservationists to preserve the beauty of our planet.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590765/pexels-pixabay-414905_agzeg0.jpg",
    icon: Waves,
  },
  {
    badge: "The Heart of the Forest",
    title: "Breathing <span class='text-primary italic'>Life</span> into Our Ecosystems",
    desc: "Rewilding forests to restore biodiversity and create a balanced, thriving natural world for future generations.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590762/pexels-pixabay-60013_fqn291.jpg",
    icon: Leaf,
  },
  {
    badge: "United for Change",
    title: "Community <span class='text-primary italic'>Action</span> for Tomorrow",
    desc: "Connecting eco-innovators and enthusiasts to build sustainable urban communities and smarter green cities.",
    image: "https://res.cloudinary.com/dopurvmlr/image/upload/v1775590764/pexels-jonathan-david-1312107-32146752_dgquy9.jpg",
    icon: Globe,
  }
]

const floatingLeaves = [
  { top: "10%", left: "5%", size: 24, delay: 0, duration: 6 },
  { top: "20%", left: "90%", size: 16, delay: 1, duration: 8 },
  { top: "60%", left: "8%", size: 20, delay: 2, duration: 7 },
  { top: "75%", left: "85%", size: 14, delay: 0.5, duration: 9 },
]

const categories = [
  { label: "Energy", icon: Zap },
  { label: "Waste", icon: Recycle },
  { label: "Transport", icon: Car },
  { label: "Nature", icon: Leaf },
]

export default function Banner() {
  const [current, setCurrent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const next = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
        setCurrent((s) => (s + 1) % slides.length)
        setIsLoading(false)
    }, 400)
  }, [])
  
  const prev = () => {
    setIsLoading(true)
    setTimeout(() => {
        setCurrent((s) => (s === 0 ? slides.length - 1 : s - 1))
        setIsLoading(false)
    }, 400)
  }

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden bg-black transition-all duration-1000">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={slide.image} 
          alt={slide.badge}
          className={`h-full w-full object-cover transition-all duration-1000 scale-[1.02] brightness-[0.65] ${isLoading ? "blur-xl" : "blur-0"}`} 
        />
        {/* Advanced Overlays - More Transparent for Clarity */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Dynamic Radiant Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px] opacity-40" />
      </div>

      {/* Floating Elements */}
      {floatingLeaves.map((leaf, i) => (
        <div
          key={i}
          className="pointer-events-none absolute z-[2] opacity-20"
          style={{
            top: leaf.top,
            left: leaf.left,
            animation: `float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite alternate`,
          }}
        >
          <Leaf
            style={{ width: leaf.size, height: leaf.size }}
            className="text-primary/60"
          />
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Glass Card Container for Headlines - More Subtle and Compact */}
          <div 
            key={current} 
            className="group relative mb-8 rounded-[2rem] border border-white/10 bg-black/20 p-8 shadow-2xl backdrop-blur-md transition-all duration-700 animate-in fade-in zoom-in-95"
          >
            {/* Animated Badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/20 px-6 py-2 shadow-xl shadow-primary/5">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
                {slide.badge}
              </span>
            </div>

            <h1 
              className="mb-6 text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-7xl lg:text-8xl"
              style={{ textShadow: "0 10px 20px rgba(0,0,0,0.8)" }}
              dangerouslySetInnerHTML={{ __html: slide.title }}
            />

            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white sm:text-xl drop-shadow-lg">
              {slide.desc}
            </p>

            {/* Subtle glow border */}
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Search Bar - Positioned specifically */}
          <div className="relative -mt-16 mx-auto mb-12 max-w-2xl z-20 transition-transform hover:scale-[1.01]">
             <HeroSearch />
          </div>

          <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-primary px-12 py-8 text-lg font-black text-primary-foreground shadow-2xl shadow-primary/40 transition-all hover:scale-[1.05] hover:bg-primary hover:shadow-primary/60 active:scale-95"
            >
              <Link href="/ideas" className="flex items-center gap-3">
                Explore The Future
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
            <SubmitIdeaCTA />
          </div>

          {/* Feature categories with better spacing */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/ideas?category=${cat.label.toLowerCase()}`}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-black tracking-widest text-white/40 uppercase backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-white/10 hover:text-white"
              >
                <cat.icon className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Refined Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex -translate-y-1/2 justify-between px-6 pointer-events-none">
        <button 
          onClick={prev}
          disabled={isLoading}
          className="pointer-events-auto group h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-2xl transition-all hover:bg-primary hover:border-primary hover:scale-110 active:scale-90 disabled:opacity-50"
        >
          <ChevronLeft className="h-7 w-7 transition-transform group-hover:-translate-x-1" />
        </button>
        <button 
          onClick={next}
          disabled={isLoading}
          className="pointer-events-auto group h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-2xl transition-all hover:bg-primary hover:border-primary hover:scale-110 active:scale-90 disabled:opacity-50"
        >
          <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Modern Slice Indicators */}
      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            disabled={isLoading}
            className={`group relative h-1 transition-all duration-500 overflow-hidden ${current === i ? "w-16 bg-primary" : "w-4 bg-white/20 hover:bg-white/40 hover:w-6"}`}
          >
             {current === i && <div className="absolute inset-0 bg-white/40 animate-slide-progress" />}
          </button>
        ))}
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-40">
        <div className="w-6 h-10 border-2 border-primary/20 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce-slow" />
        </div>
      </div>

      {/* Float & Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-30px) rotate(15deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes slide-progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite ease-in-out; }
        .animate-slide-progress { animation: slide-progress 8s linear forwards; }
      ` }} />
    </section>
  )
}
