import Link from "next/link"
import { 
    Leaf, 
    Target, 
    Zap, 
    Users, 
    ShieldCheck, 
    Globe, 
    ArrowRight,
    MessageSquare,
    Lightbulb,
    TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroFadeIn from "@/components/Hero/HeroFadeIn"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 py-24 lg:py-32">
                {/* Radial glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-green-400/10 blur-[120px]" />
                    <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
                </div>
                
                <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <HeroFadeIn>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/15 px-4 py-2">
                            <Leaf className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium tracking-wide text-green-300 uppercase">
                                Our Mission
                            </span>
                        </div>
                        <h1 className="mb-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Empowering Communities to <br className="hidden lg:block" /> 
                            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                Shape a Sustainable Future
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-green-100/70 sm:text-xl">
                            EcoSpark Hub (GreenVaya) is more than just a portal; it&apos;s a shared mission to move the needle on climate change through community-led innovation.
                        </p>
                    </HeroFadeIn>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
                        <div className="flex flex-col justify-center rounded-3xl border border-green-100 bg-green-50/30 p-8 lg:p-12">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-lg shadow-green-600/20">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="mb-4 text-3xl font-black text-gray-900 lg:text-4xl">Our Mission</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                To provide an open, transparent platform where every individual can share, discuss, and implement green ideas. We aim to bridge the gap between abstract concepts and real-world environmental impact by crowdsourcing wisdom and community support.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center rounded-3xl border border-emerald-100 bg-emerald-50/30 p-8 lg:p-12">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="mb-4 text-3xl font-black text-gray-900 lg:text-4xl">Our Vision</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                We envision a world where sustainability is driven from the ground up. Our goal is to host a global library of validated, community-vetted solutions for solar power, zero-waste, and efficient transportation that anyone, anywhere can adopt.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-black text-gray-900 lg:text-4xl">How It Works</h2>
                        <p className="mx-auto max-w-xl text-gray-500">Creating change is easy when you have a community behind you.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: "01",
                                title: "Join",
                                desc: "Register as a member and explore thousands of green ideas already being discussed.",
                                icon: Users
                            },
                            {
                                step: "02",
                                title: "Ideate",
                                desc: "Share your own projects—from simple recycling hacks to complex renewable energy setups.",
                                icon: Lightbulb
                            },
                            {
                                step: "03",
                                title: "Discuss",
                                desc: "Empower others through nested comments and voting. Help turn good ideas into great ones.",
                                icon: MessageSquare
                            },
                            {
                                step: "04",
                                title: "Impact",
                                desc: "Highest voted ideas gain maximum visibility and help community members implement them.",
                                icon: TrendingUp
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative flex flex-col items-center text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-green-400/50">
                                    <item.icon className="h-8 w-8 text-green-600" />
                                </div>
                                <span className="mb-2 text-xs font-black tracking-widest text-green-600/40 uppercase">{item.step}</span>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-4xl font-black text-gray-900 lg:text-5xl">Values That <br />Drive Us</h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">
                                At GreenVaya, we believe that the tools for a sustainable future should be accessible to all. Our platform is built on four non-negotiable principles.
                            </p>
                            <Link href="/ideas">
                                <Button className="bg-green-600 hover:bg-green-700 h-14 px-8 rounded-2xl text-base font-bold shadow-lg shadow-green-600/20">
                                    Explore the Ideas <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {[
                                { title: "Transparency", icon: ShieldCheck, color: "text-blue-600 bg-blue-50" },
                                { title: "Innovation", icon: Zap, color: "text-yellow-600 bg-yellow-50" },
                                { title: "Inclusion", icon: Users, color: "text-purple-600 bg-purple-50" },
                                { title: "Integrity", icon: Leaf, color: "text-green-600 bg-green-50" }
                            ].map((val, i) => (
                                <div key={i} className="flex flex-col items-start gap-4 rounded-3xl border border-gray-100 bg-white p-6 transition-all hover:border-green-100 hover:bg-green-50/20">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${val.color}`}>
                                        <val.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">{val.title}</h4>
                                    <p className="text-sm text-gray-500">Committed to maintaining the highest standards in every project shared.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-4 mb-20 lg:mx-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-950 px-8 py-20 text-center lg:py-28">
                    <div className="absolute top-0 right-0 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                    
                    <HeroFadeIn className="relative z-10 flex flex-col items-center">
                        <h2 className="mb-6 text-4xl font-black text-white lg:text-5xl">Ready to Spark Change?</h2>
                        <p className="mb-10 max-w-xl text-lg text-green-100/60 font-light">
                            Join eco-innovators from across the country and share your ideas for a greener Bangladesh and a sustainable planet.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link href="/signup">
                                <Button className="bg-green-500 hover:bg-green-400 text-green-950 h-14 px-10 rounded-2xl text-base font-bold shadow-xl shadow-green-500/20">
                                    Sign Up Now
                                </Button>
                            </Link>
                            <Link href="/ideas">
                                <Button variant="outline" className="h-14 px-10 rounded-2xl text-base font-bold border-green-500/30 text-green-100 hover:bg-green-500/10 transition-colors">
                                    View Live Projects
                                </Button>
                            </Link>
                        </div>
                    </HeroFadeIn>
                </div>
            </section>
        </div>
    )
}
