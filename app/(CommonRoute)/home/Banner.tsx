"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion, useSpring } from "framer-motion"
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
  const shouldReduceMotion = useReducedMotion()

  // Smooth mouse-follow parallax for ambient glow (duration 0.8 / power2.out)
  const glowX = useSpring(0, { damping: 25, stiffness: 60 })
  const glowY = useSpring(0, { damping: 25, stiffness: 60 })

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !bannerRef.current) return
    const rect = bannerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    glowX.set(x * 0.18)
    glowY.set(y * 0.18)
  }

  const slide = slides[current]

  return (
    <LazyMotion features={domAnimation}>
      <section 
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Image Container with Smooth Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <m.div 
              key={slide.image}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.02 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full will-change-transform" 
            >
              <Image 
                src={slide.image} 
                alt={slide.badge}
                fill
                priority={current === 0}
                loading={current === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover brightness-[0.62]" 
              />
            </m.div>
          </AnimatePresence>

          {/* Advanced Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Dynamic Radiant Glow */}
          <m.div 
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-primary/15 blur-[160px] will-change-transform" 
          />
        </div>

        {/* Floating Leaves replacing gsap.to() */}
        {floatingLeaves.map((leaf, i) => (
          <m.div
            key={i}
            animate={shouldReduceMotion ? {} : {
              y: [-28, 0],
              x: i % 2 === 0 ? [18, 0] : [-18, 0],
              rotate: i % 2 === 0 ? [15, 0] : [-15, 0],
            }}
            transition={shouldReduceMotion ? {} : {
              duration: 3.5 + i * 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: leaf.delay,
            }}
            className="pointer-events-none absolute z-[2] opacity-30 select-none will-change-transform"
            style={{
              top: leaf.top,
              left: leaf.left,
            }}
          >
            <Leaf 
              style={{ width: leaf.size, height: leaf.size }} 
              className="text-primary/70" 
            />
          </m.div>
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
              <m.div
                key={current}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="group relative mb-8 rounded-[2rem] border border-white/10 bg-black/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md will-change-transform"
              >
                {/* Animated Badge */}
                <m.div
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/20 px-6 py-2 shadow-xl shadow-primary/10 will-change-transform"
                >
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
                    {slide.badge}
                  </span>
                </m.div>

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
              </m.div>
            </AnimatePresence>

            {/* Search Bar */}
            <m.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10 will-change-transform"
            >
              <HeroSearch />
            </m.div>

            {/* Quick Categories Bar */}
            <m.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 will-change-transform"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60 mr-1 sm:mr-2">Popular:</span>
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={`/ideas?category=${cat.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/20 hover:text-white hover:scale-105 active:scale-95"
                >
                  <cat.icon className="h-3.5 w-3.5 text-primary" />
                  {cat.label}
                </Link>
              ))}
            </m.div>

            {/* Submit Idea CTA */}
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="will-change-transform"
            >
              <SubmitIdeaCTA />
            </m.div>
          </div>
        </div>

        {/* Slide Navigation Controls */}
        <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 sm:flex">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/20 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:border-primary/50 hover:bg-primary/20 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </LazyMotion>
  )
}
