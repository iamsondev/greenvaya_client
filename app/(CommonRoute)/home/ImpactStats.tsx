"use client"

import { Globe, Users, Lightbulb, CheckCircle2, Leaf, Target, Sparkles } from "lucide-react"

const stats = [
  { value: "1,240+", label: "Ideas Shared", icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "8.5k+", label: "Eco-Innovators", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { value: "32,000+", label: "Community Votes", icon: Globe, color: "text-accent-foreground", bg: "bg-accent/10" },
  { value: "12m+", label: "Global Reach", icon: Sparkles, color: "text-indigo-500", bg: "bg-indigo-500/10" },
]

export default function ImpactStats() {
  return (
    <section className="bg-background py-24 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:max-w-md">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Live Platform Stats
                </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-6">
                Real Numbers, <span className="text-primary italic">Real Impact</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Every action on GreenVaya contributes to a larger goal of global sustainability and environmental restoration.
            </p>
            <div className="flex flex-col gap-4">
                {[
                    "Verified experts and authors",
                    "Secure platform for collaboration",
                    "Direct feedback from community",
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {item}
                    </div>
                ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all text-center">
                <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black text-foreground mb-2">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
