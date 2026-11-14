"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
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
  { top: "12%", left: "6%", size: 24, delay: 0 },
  { top: "22%", left: "88%", size: 18, delay: 0.5 },
  { top: "58%", left: "9%", size: 22, delay: 1 },
  { top: "72%", left: "86%", size: 16, delay: 0.3 },
]

const categories = [
  { label: "Energy", icon: Zap },
  { label: "Waste", icon: Recycle },
  { label: "Transport", icon: Car },
  { label: "Nature", icon: Leaf },
]

export default function Banner() {
  const [current, setCurrent] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const next = useCallback(() => {
    setCurrent((s) => (s + 1) % slides.length)
  }, [])
  
  const prev = () => {
    setCurrent((s) => (s === 0 ? slides.length - 1 : s - 1))
  }

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  // GSAP: Floating leaves and ambient animation
  useEffect(() => {
    if (!bannerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".banner-floating-leaf").forEach((leaf, i) => {
        gsap.to(leaf, {
          y: -28,
          x: i % 2 === 0 ? 18 : -18,
          rotation: i % 2 === 0 ? 15 : -15,
          duration: 3.5 + i * 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, bannerRef)

    return () => ctx.revert()
  }, [])

  // GSAP: Smooth mouse-follow parallax for ambient glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current || !bannerRef.current) return
    const rect = bannerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(glowRef.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  const slide = slides[current]

  return (
    <section 
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image Container with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={slide.image}
            src={slide.image} 
            alt={slide.badge}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full w-full object-cover brightness-[0.62]" 
          />
        </AnimatePresence>

        {/* Advanced Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Dynamic Radiant Glow - animated smoothly with GSAP */}
        <div 
          ref={glowRef}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-primary/15 blur-[160px]" 
        />
      </div>

      {/* GSAP Floating Leaves */}
      {floatingLeaves.map((leaf, i) => (
        <div
          key={i}
          className="banner-floating-leaf pointer-events-none absolute z-[2] opacity-30 select-none"
          style={{
            top: leaf.top,
            left: leaf.left,
          }}
        >
          <Leaf
            style={{ width: leaf.size, height: leaf.size }}
            className="text-primary/70"
          />
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Framer Motion Animated Slide Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={current} 
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="group relative mb-8 rounded-[2rem] border border-white/10 bg-black/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md"
            >
              {/* Animated Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/20 px-6 py-2 shadow-xl shadow-primary/10"
              >
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
                  {slide.badge}
                </span>
              </motion.div>

              <h1 
                className="mb-6 text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-7xl lg:text-8xl"
                style={{ textShadow: "0 10px 25px rgba(0,0,0,0.85)" }}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />

              <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/90 sm:text-xl drop-shadow-lg">
                {slide.desc}
              </p>

              {/* Subtle glow border */}
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 to-transparent opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-700" />
            </motion.div>
          </AnimatePresence>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative -mt-16 mx-auto mb-12 max-w-2xl z-20"
          >
             <HeroSearch />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-primary px-12 py-8 text-lg font-black text-primary-foreground shadow-2xl shadow-primary/40 transition-all hover:scale-[1.04] hover:bg-primary hover:shadow-primary/60 active:scale-95"
            >
              <Link href="/ideas" className="flex items-center gap-3">
                Explore The Future
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
            <SubmitIdeaCTA />
          </motion.div>

          {/* Feature categories pills */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/ideas?category=${cat.label.toLowerCase()}`}
                className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-black tracking-widest text-white/60 uppercase backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
              >
                <cat.icon className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                {cat.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex -translate-y-1/2 justify-between px-6 pointer-events-none">
        <button 
          onClick={prev}
          aria-label="Previous Slide"
          className="pointer-events-auto group h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-2xl transition-all hover:bg-primary hover:border-primary hover:scale-110 active:scale-90"
        >
          <ChevronLeft className="h-7 w-7 transition-transform group-hover:-translate-x-1" />
        </button>
        <button 
          onClick={next}
          aria-label="Next Slide"
          className="pointer-events-auto group h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-2xl transition-all hover:bg-primary hover:border-primary hover:scale-110 active:scale-90"
        >
          <ChevronRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`group relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${current === i ? "w-14 bg-primary shadow-lg shadow-primary/50" : "w-4 bg-white/20 hover:bg-white/40 hover:w-6"}`}
          />
        ))}
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <div className="w-5 h-9 border-2 border-primary/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-2.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
