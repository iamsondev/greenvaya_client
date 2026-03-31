"use client"

import { useState } from "react"
import { Mail, Sparkles, Send, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed! Look out for our next update.")
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 bg-white">
      <div className="relative mx-auto max-w-5xl rounded-[2.5rem] bg-green-950 p-8 shadow-2xl overflow-hidden sm:p-16">
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border-[32px] border-green-500/10" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[16px] border-emerald-500/10" />
          <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-green-400/5 blur-[80px]" />
          <div className="absolute top-10 right-10 h-20 w-20 opacity-20">
            <Leaf className="h-full w-full rotate-45 text-green-300" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium tracking-wide text-green-300">Stay in the Loop</span>
          </div>

          {/* Heading */}
          <h2 className="mb-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Healing</span> Idea
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed font-light text-green-100/70">
            Subscribe to our newsletter and receive curated sustainability ideas, top community picks, and platform announcements directly in your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400/60">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 text-sm text-white placeholder:text-green-300/40 focus:border-green-400 focus:ring-green-400/20 backdrop-blur-md"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-14 rounded-2xl bg-green-500 px-8 font-bold text-green-950 shadow-lg shadow-green-500/20 transition-all hover:scale-[1.03] hover:bg-green-400 hover:shadow-green-400/40 disabled:opacity-50"
            >
              <Send className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </form>

          {/* Guarantee */}
          <p className="mt-8 text-xs font-light tracking-wide text-green-200/40 uppercase">
             Join 8,500+ eco-innovators. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
