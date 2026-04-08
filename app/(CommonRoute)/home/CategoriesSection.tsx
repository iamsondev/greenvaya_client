"use client"

import { Zap, Recycle, Car, Leaf, Waves, Sun, ArrowRight } from "lucide-react"
import Link from "next/link"

const categoryItems = [
  { name: "Clean Energy", icon: Sun, count: 420, desc: "Solar, wind, and innovative power solutions." },
  { name: "Zero Waste", icon: Recycle, count: 280, desc: "Recycling, circular economy, and reduction." },
  { name: "Blue Planet", icon: Waves, count: 195, desc: "Ocean cleaning and fresh water conservation." },
  { name: "Eco-Transport", icon: Car, count: 140, desc: "Electric vehicles and green public transit." },
  { name: "Biodiversity", icon: Leaf, count: 310, desc: "Reforestation and rewilding projects." },
  { name: "Renewables", icon: Zap, count: 215, desc: "Alternative fuel and energy efficiency." },
]

export default function CategoriesSection() {
  return (
    <section className="bg-muted py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                Browse by <span className="text-primary italic">Category</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
                Explore a wide range of sustainability sectors and find the ideas that matter most to you.
            </p>
          </div>
          <Link href="/ideas" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
            View All Categories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryItems.map((cat, i) => (
            <Link 
              key={i} 
              href={`/ideas?category=${cat.name.split(' ').pop()}`}
              className="group p-10 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary transition-colors">
                  <cat.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{cat.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{cat.desc}</p>
                <div className="text-xs font-bold text-primary-foreground/30 group-hover:text-primary transition-colors uppercase tracking-widest">
                  {cat.count} Ideas Shared
                </div>
              </div>
              
              {/* Background accent */}
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                <cat.icon className="h-24 w-24 rotate-12" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
