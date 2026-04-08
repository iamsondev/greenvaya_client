"use client"

import { UserPlus, Lightbulb, ThumbsUp, Leaf, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Join the Movement",
    desc: "Create your professional eco-profile and connect with thousands of global innovators.",
    icon: UserPlus,
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Share Your Vision",
    desc: "Submit your sustainability ideas with detailed blueprints, images, and impact goals.",
    icon: Lightbulb,
    color: "from-amber-400 to-orange-600",
  },
  {
    title: "Gather Momentum",
    desc: "The community votes and discusses your idea. Top ideas gain global visibility.",
    icon: ThumbsUp,
    color: "from-primary to-emerald-600",
  },
  {
    title: "Create Real Impact",
    desc: "Connect with partners for funding or implementation. Turn your idea into reality.",
    icon: Leaf,
    color: "from-emerald-400 to-teal-600",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-muted py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
            How <span className="text-primary italic">GreenVaya</span> Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey from a simple spark of inspiration to a global environmental solution in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="absolute top-1/4 left-full hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-primary/30 to-transparent lg:block z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${step.color} shadow-2xl shadow-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <step.icon className="h-10 w-10 text-white" />
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border text-xs font-black text-foreground shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="mb-4 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <div className="text-[20rem] font-black italic">PROCESS</div>
      </div>
    </section>
  )
}
