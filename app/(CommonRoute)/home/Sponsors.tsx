"use client"

import { ShieldCheck, Zap, Globe, Leaf } from "lucide-react"
import { LazyMotion, domAnimation, m } from "framer-motion"

const partners = [
  { name: "EcoTrust", icon: ShieldCheck },
  { name: "NatureGov", icon: Leaf },
  { name: "GlobalClean", icon: Globe },
  { name: "PowerGrid", icon: Zap },
  { name: "BioSolutions", icon: Leaf },
  { name: "OceanBound", icon: Globe },
]

export default function Sponsors() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-background py-16 border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground dark:text-zinc-400 mb-10">
                  Pioneering Partners & Global Supporters
              </p>
              <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-50 hover:opacity-100 transition-opacity">
                  {partners.map((partner, i) => (
                      <m.div 
                        key={i} 
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 group cursor-pointer"
                      >
                          <partner.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                          <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tighter">
                              {partner.name}
                          </span>
                      </m.div>
                  ))}
              </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
