import { Leaf, Target, Heart, Award, Users, Globe } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-900 to-emerald-900">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                </div>
                <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 mb-6">
                        <Leaf className="h-4 w-4 text-green-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-green-300">Innovating Sustainability</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        We are <span className="text-primary italic">GreenVaya</span>
                    </h1>
                    <p className="text-green-100/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        Dedicated to bridging the gap between revolutionary sustainable ideas and the capital needed to bring them to life.
                    </p>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[50%] bg-primary/20 blur-[150px] rounded-full" />
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-foreground">Our Noble Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            GreenVaya is a pioneering community platform where thinkers meet doers. We empower environmental innovators to share their visions, gain community support, and secure the funding required to make a global impact.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold">Goal Oriented</h4>
                                    <p className="text-xs text-muted-foreground">Focusing on measurable impact.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-100/10 flex items-center justify-center">
                                    <Globe className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold">Global Reach</h4>
                                    <p className="text-xs text-muted-foreground">Empowering every corner of Earth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <img 
                            src="https://res.cloudinary.com/dopurvmlr/image/upload/v1775590768/pexels-quang-nguyen-vinh-222549-6876534_lamqvw.jpg" 
                            alt="Sustainability" 
                            className="rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 border border-border p-6 rounded-3xl shadow-xl max-w-[240px]">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="h-5 w-5 text-accent" />
                                <span className="font-black text-sm uppercase tracking-wider">Vaya Verified</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Every idea goes through our rigorous ecosystem screening process.</p>
                        </div>
                    </div>
                </div>

                {/* Team & Values */}
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl font-black mb-4">Values that Drive Us</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">Behind every successful project on GreenVaya, there is a set of core beliefs that ensure our integrity.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {[
                        { icon: Heart, title: "Pure Integrity", desc: "We believe in honest, transparent support for all environmental projects." },
                        { icon: Users, title: "Inclusion", desc: "Sustainability is for everyone, regardless of background or financial status." },
                        { icon: Leaf, title: "Sustainability First", desc: "Every decision we make is evaluated by its long-term impact on our planet." }
                    ].map((val, i) => (
                        <div key={i} className="p-8 rounded-[2rem] border border-border bg-muted/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                             <div className="h-14 w-14 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center mb-6">
                                <val.icon className="h-7 w-7 text-primary" />
                             </div>
                             <h3 className="text-xl font-black mb-3">{val.title}</h3>
                             <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
