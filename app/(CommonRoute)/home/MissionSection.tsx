"use client"

import { Heart, Globe, Leaf, Compass } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-secondary text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-10 left-10"><Globe className="h-64 w-64 rotate-12" /></div>
          <div className="absolute bottom-10 right-10"><Heart className="h-64 w-64 -rotate-12" /></div>
      </div>
      
      <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
        <div className="mb-12 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                <Leaf className="h-10 w-10 text-primary" />
            </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
            Our mission is to <span className="text-primary italic">democratize</span> environmental innovation for a thriving planet.
        </h2>
        <p className="text-xl text-primary-foreground/70 font-light max-w-2xl mx-auto leading-relaxed italic">
            "GreenVaya was built on the belief that a single great idea, supported by a global community, has the power to change the course of our natural history."
        </p>
        <div className="mt-12 flex flex-col items-center">
            <div className="h-px w-24 bg-primary/40 mb-6" />
            <div className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                Est. 2024 • GreenVaya Labs
            </div>
        </div>
      </div>
    </section>
  )
}
