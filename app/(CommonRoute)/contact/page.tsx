import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-muted/30 dark:bg-zinc-950 transition-colors duration-500">
            {/* Split layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Contact Info */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
                        <div>
                             <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
                                <MessageCircle className="h-4 w-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Get in touch</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
                                Let&apos;s Build the <span className="text-primary italic">Green Future</span> Together
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Reach out with questions, collaboration ideas, or support requests. We usually respond within 2 hours.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex gap-6 group">
                                <div className="h-14 w-14 shrink-0 rounded-2xl bg-white dark:bg-zinc-900 border border-border flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-sm uppercase tracking-wide text-muted-foreground/50">Email Support</h4>
                                    <p className="text-xl font-black">support@greenvaya.com</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="h-14 w-14 shrink-0 rounded-2xl bg-white dark:bg-zinc-900 border border-border flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-sm uppercase tracking-wide text-muted-foreground/50">Urgent Assistance</h4>
                                    <p className="text-xl font-black">+880 (017) 000-0000</p>
                                </div>
                            </div>
                             <div className="flex gap-6 group">
                                <div className="h-14 w-14 shrink-0 rounded-2xl bg-white dark:bg-zinc-900 border border-border flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-sm uppercase tracking-wide text-muted-foreground/50">Operational Hours</h4>
                                    <p className="text-xl font-black italic">Sat - Thu: 10:00 - 18:00 (GMT+6)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="relative animate-in fade-in slide-in-from-right-10 duration-700">
                        {/* Decorative glass elements */}
                        <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/20 blur-[60px] rounded-full z-0" />
                        <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-blue-500/10 blur-[60px] rounded-full z-0" />

                        <div className="relative z-10 bg-white dark:bg-zinc-900 border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 backdrop-blur-xl">
                             <h3 className="text-2xl font-black mb-8">Send Us a Direct Message</h3>
                             <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black uppercase text-muted-foreground">Your Name</label>
                                        <Input className="h-14 bg-muted/50 border-border focus:ring-primary/20 rounded-2xl p-4 text-sm font-bold" placeholder="E.g. Sondip Kumar" />
                                    </div>
                                    <div className="space-y-1.5">
                                         <label className="text-xs font-black uppercase text-muted-foreground">Email Address</label>
                                         <Input className="h-14 bg-muted/50 border-border focus:ring-primary/20 rounded-2xl p-4 text-sm font-bold" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase text-muted-foreground">Subject of interest</label>
                                    <Input className="h-14 bg-muted/50 border-border focus:ring-primary/20 rounded-2xl p-4 text-sm font-bold" placeholder="E.g. Investment, Partnership" />
                                </div>
                                <div className="space-y-1.5">
                                     <label className="text-xs font-black uppercase text-muted-foreground">Your Message</label>
                                     <textarea className="min-h-[160px] w-full bg-muted/50 border border-border rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tell us more about your ideas..." />
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-green-700 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-transform active:scale-95 flex items-center justify-center gap-4">
                                   Submit Message
                                   <Send className="h-5 w-5" />
                                </Button>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
