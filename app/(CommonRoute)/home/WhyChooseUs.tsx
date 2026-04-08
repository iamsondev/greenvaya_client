"use client"

import { ShieldCheck, Users, Zap, Award, CheckCircle, Sparkles } from "lucide-react"

const features = [
  {
    title: "Expert Verification",
    desc: "Every paid idea is thoroughly reviewed by our panel of sustainability experts before publication.",
    icon: ShieldCheck,
  },
  {
    title: "Global Community",
    desc: "Connect with thousands of environmentalists from 120+ countries sharing unique perspectives.",
    icon: Users,
  },
  {
    title: "Secure Transactions",
    desc: "Seamless and secure payment gateway for accessing high-value professional sustainability insights.",
    icon: Zap,
  },
  {
    title: "Impact Recognition",
    desc: "Receive badges and certifications for your contributions that matter to our planet's future.",
    icon: Award,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              The GreenVaya Edge
            </span>
          </div>
          <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
            Why Choose Our <span className="text-primary italic">Platform?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            We provide the most secure and professional space for sustainability innovation to thrive and scale globally.
          </p>
          <div className="space-y-4">
            {[
                "100% Reliable Blueprints",
                "Direct Author Support",
                "Community-Back Project Validation",
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {item}
                </div>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="mb-6 h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
