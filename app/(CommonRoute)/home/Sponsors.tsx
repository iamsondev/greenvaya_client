"use client"

import { ShieldCheck, Zap, Globe, Leaf } from "lucide-react"

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
    <section className="bg-background py-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 mb-10">
                Pioneering Partners & Global Supporters
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 hover:opacity-100 transition-opacity">
                {partners.map((partner, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                        <partner.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tighter">
                            {partner.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}
