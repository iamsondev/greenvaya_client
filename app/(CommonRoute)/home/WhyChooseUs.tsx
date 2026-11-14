"use client"

import { ShieldCheck, Users, Zap, Award, CheckCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

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
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              The GreenVaya Edge
            </span>
          </div>
          <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
            Why Choose Our <span className="text-primary italic">Platform?</span>
          </h2>
          <p className="text-muted-foreground dark:text-zinc-300 text-lg mb-10 leading-relaxed">
            We provide the most secure and professional space for sustainability innovation to thrive and scale globally.
          </p>
          <div className="space-y-4">
            {[
                "100% Reliable Blueprints",
                "Direct Author Support",
                "Community-Backed Project Validation",
            ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-sm font-bold text-foreground"
                >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    {item}
                </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-10 rounded-[2.5rem] border border-border bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all group"
            >
              <div className="mb-6 h-12 w-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground dark:text-zinc-300 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
