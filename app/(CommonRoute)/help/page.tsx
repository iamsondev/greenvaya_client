import { HelpCircle, Search, MessageSquare, BookOpen, Layers, ShieldCheck, Heart, PhoneCall, ChevronRight, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HelpPage() {
    const categories = [
        { icon: BookOpen, title: "Getting Started", desc: "Learn the basics of using our platform effectively." },
        { icon: ShieldCheck, title: "Account & Security", desc: "Manage your profile, password, and privacy." },
        { icon: Layers, title: "Ideas & Voting", desc: "How to share and support the best sustainable visions." },
        { icon: Heart, title: "Donations & Funding", desc: "Everything about contributing and receiving funds." },
    ]

    return (
        <div className="pt-24 pb-20 min-h-screen bg-muted/20 dark:bg-zinc-950 transition-colors duration-500">
            {/* Search Hero */}
            <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 px-4 py-24 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        How can we <span className="text-primary italic">help you</span> today?
                    </h1>
                     <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-green-300/40" />
                        <Input className="h-16 bg-white/10 border-white/20 text-white pl-14 pr-4 rounded-3xl placeholder:text-green-100/30 text-lg font-bold backdrop-blur-xl focus:ring-primary/40 focus:border-primary/40" placeholder="Search for answers..." />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-10">
                {/* Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    {categories.map((cat, i) => (
                        <div key={i} className="p-8 rounded-[2rem] border border-border bg-white dark:bg-zinc-900 shadow-xl transition-all hover:-translate-y-2 group cursor-pointer">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <cat.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-black mb-2">{cat.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-primary group-hover:gap-4 transition-all">
                                <span>Browse category</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Style List */}
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-2 mb-10">
                        <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Find quick answers to common support requests.</p>
                    </div>

                    {[
                        { q: "Is GreenVaya free for everyone?", a: "Joining the community and voting is completely free. Some premium ideas require a small fee to see full details as part of innovator support." },
                        { q: "How can I fund an idea?", a: "Once an idea is verified, you can contribute directly through our secure payment gateway (powered by SSL Commerz)." },
                        { q: "What is 'Vaya Verified'?", a: "Vaya Verified is our guarantee that a project has been screened for environmental impact and feasibility by our team." }
                    ].map((faq, idx) => (
                        <div key={idx} className="p-8 rounded-3xl border border-border bg-muted/30 space-y-4 hover:border-primary/30 transition-all">
                             <h4 className="text-xl font-bold flex gap-4">
                                <HelpCircle className="h-6 w-6 text-primary shrink-0" />
                                {faq.q}
                             </h4>
                             <p className="text-muted-foreground text-sm leading-relaxed pl-10">
                                {faq.a}
                             </p>
                        </div>
                    ))}
                </div>

                {/* Direct Contact Button */}
                <div className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 text-white text-center shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight">Still seeking answers?</h2>
                        <p className="text-green-100/70 text-lg max-w-xl mx-auto">Our human support team is standing by to assist with any unique challenges you might be facing.</p>
                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            <button className="h-16 px-10 bg-white text-green-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
                                <PhoneCall className="h-5 w-5" />
                                Live Support
                            </button>
                            <button className="h-16 px-10 bg-green-800/40 border border-white/20 text-white font-black rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-3">
                                <MessageCircle className="h-5 w-5" />
                                Drop a message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
