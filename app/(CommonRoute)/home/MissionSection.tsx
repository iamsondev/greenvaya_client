"use client"

import { Heart, Globe, Leaf } from "lucide-react"
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion"

export default function MissionSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-32 overflow-hidden bg-secondary text-white">
        {/* Background patterns animated with Framer Motion / CSS */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
            <m.div 
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={shouldReduceMotion ? {} : {
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-10 -left-10 will-change-transform"
            >
              <Globe className="h-80 w-80 text-primary" />
            </m.div>
            <m.div 
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={shouldReduceMotion ? {} : {
                duration: 90,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-10 -right-10 will-change-transform"
            >
              <Heart className="h-80 w-80 text-primary" />
            </m.div>
        </div>
        
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <m.div 
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex justify-center will-change-transform"
          >
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-xl shadow-primary/20">
                  <Leaf className="h-10 w-10 text-primary" />
              </div>
          </m.div>
          
          <m.h2 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight will-change-transform"
          >
              Our mission is to <span className="text-primary italic">democratize</span> environmental innovation for a thriving planet.
          </m.h2>

          <m.p 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-secondary-foreground/90 font-light max-w-2xl mx-auto leading-relaxed italic will-change-transform"
          >
              &ldquo;GreenVaya was built on the belief that a single great idea, supported by a global community, has the power to change the course of our natural history.&rdquo;
          </m.p>

          <m.div 
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12 flex flex-col items-center"
          >
              <div className="h-px w-24 bg-primary/40 mb-6" />
              <div className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                  Est. 2024 • GreenVaya Labs
              </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
