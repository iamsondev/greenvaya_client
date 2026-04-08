"use client"

import { Users, Globe, MessageSquare, Shield, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              GreenVaya Global
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            Join Our <span className="text-primary italic">Community</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with eco-innovators, share ideas, and collaborate on projects that heal our planet. No placeholder, just real people making a real difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Global Forums",
              description: "Discuss the latest sustainability trends and get feedback on your ideas from experts worldwide.",
              icon: Globe,
              color: "text-blue-500",
            },
            {
              title: "Live Discussions",
              description: "Join weekly live sessions with environmental leaders and community members.",
              icon: MessageSquare,
              color: "text-primary",
            },
            {
              title: "Local Chapters",
              description: "Find and join local GreenVaya groups in your city to take action on the ground.",
              icon: Users,
              color: "text-accent-foreground",
            },
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted group-hover:bg-primary transition-colors">
                <item.icon className={`h-7 w-7 ${item.color} group-hover:text-primary-foreground`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2.5rem] bg-secondary p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Ready to contribute?</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Our community is growing fast. Join 10,000+ members and start your sustainable journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl bg-primary text-primary-foreground font-bold px-8">
                <Link href="/signup">Join Community</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold px-8">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
             <Shield className="h-64 w-64" />
          </div>
          <div className="absolute bottom-0 left-0 p-8 opacity-10 -rotate-12">
             <Heart className="h-64 w-64" />
          </div>
        </div>
      </div>
    </div>
  )
}
