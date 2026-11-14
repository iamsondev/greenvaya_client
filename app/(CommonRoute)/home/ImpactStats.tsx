"use client"

import { Globe, Users, Lightbulb, CheckCircle2, Target, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { value: "1,240+", label: "Ideas Shared", icon: Lightbulb, color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "8.5k+", label: "Eco-Innovators", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { value: "32,000+", label: "Community Votes", icon: Globe, color: "text-accent-foreground", bg: "bg-accent/10" },
  { value: "12m+", label: "Global Reach", icon: Sparkles, color: "text-indigo-500", bg: "bg-indigo-500/10" },
]

export default function ImpactStats() {
  return (
    <section className="bg-background py-24 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:max-w-md"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Live Platform Stats
                </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-6">
                Real Numbers, <span className="text-primary italic">Real Impact</span>
            </h2>
            <p className="text-muted-foreground dark:text-zinc-300 text-lg leading-relaxed mb-8">
                Every action on GreenVaya contributes to a larger goal of global sustainability and environmental restoration.
            </p>
            <div className="flex flex-col gap-4">
                {[
                    "Verified experts and authors",
                    "Secure platform for collaboration",
                    "Direct feedback from community",
                ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3 text-sm font-bold text-foreground"
                    >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        {item}
                    </motion.div>
                ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-2xl">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all text-center group"
              >
                <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-foreground mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground dark:text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
