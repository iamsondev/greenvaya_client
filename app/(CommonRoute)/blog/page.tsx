import Link from "next/link"
import {
    Clock,
    User,
    ArrowRight,
    Search,
    Leaf,
    Zap,
    Droplets,
    Recycle,
    Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroFadeIn from "@/components/Hero/HeroFadeIn"
import Newsletter from "../home/Newsletter"

const blogPosts = [
    {
        id: "1",
        title: "The Future of Solar Energy in Urban Cities",
        excerpt: "How skyscraper windows are being transformed into transparent solar panels to power the cities of tomorrow.",
        category: "Energy",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=2070&auto=format&fit=crop",
        date: "Mar 28, 2026",
        readTime: "6 min read",
        author: { name: "Sarah Green", avatar: "S" }
    },
    {
        id: "2",
        title: "Zero Waste Living: A Beginner's Guide",
        excerpt: "Small changes in your daily routine that can lead to a massive reduction in plastic consumption and waste.",
        category: "Waste",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
        date: "Mar 25, 2026",
        readTime: "8 min read",
        author: { name: "David Chen", avatar: "D" }
    },
    {
        id: "3",
        title: "Hydroponics: Gardening Without Soil",
        excerpt: "Why hydroponic systems are the key to sustainable urban farming and food security in crowded spaces.",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974&auto=format&fit=crop",
        date: "Mar 22, 2026",
        readTime: "5 min read",
        author: { name: "Elena Rivers", avatar: "E" }
    },
    {
        id: "4",
        title: "Is Your Wardrobe Killing the Planet?",
        excerpt: "The truth about fast fashion and how to build a sustainable, eco-friendly wardrobe that lasts for decades.",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
        date: "Mar 18, 2026",
        readTime: "7 min read",
        author: { name: "Marcus Thorne", avatar: "M" }
    },
    {
        id: "5",
        title: "The Impact of E-Bikes on Commuting",
        excerpt: "How electric bicycles are replacing cars for short-distance travel and reducing urban carbon footprints.",
        category: "Transport",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77891?q=80&w=2070&auto=format&fit=crop",
        date: "Mar 14, 2026",
        readTime: "4 min read",
        author: { name: "Alex Jordan", avatar: "A" }
    },
    {
        id: "6",
        title: "Composting: Turning Kitchen Scraps to Gold",
        excerpt: "A simple guide to starting your first compost bin at home, even if you live in a small apartment.",
        category: "Waste",
        image: "https://images.unsplash.com/photo-1591717399232-c960fef34ba0?q=80&w=2071&auto=format&fit=crop",
        date: "Mar 10, 2026",
        readTime: "6 min read",
        author: { name: "Julia Moss", avatar: "J" }
    }
]

const categories = [
    { name: "All", count: 24 },
    { name: "Energy", count: 8, icon: Zap },
    { name: "Waste", count: 6, icon: Recycle },
    { name: "Nature", count: 5, icon: Leaf },
    { name: "Water", count: 3, icon: Droplets },
    { name: "Transport", count: 2, icon: Clock }
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Page Header / Hero */}
            <header className="relative bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 pt-32 pb-20 overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-400/10 blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <HeroFadeIn>
                        <div className="text-center">
                            <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
                                GreenVaya <span className="text-green-400">Insights</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-green-100/70 font-light leading-relaxed">
                                Join the movement. Get the latest news, expert guides, and community stories about sustainability and green innovation.
                            </p>

                            {/* Search Bar in Hero */}
                            <div className="mx-auto mt-10 max-w-xl">
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 h-5 w-5 text-green-200/40" />
                                    <input
                                        type="text"
                                        placeholder="Search articles, topics..."
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-green-200/30 outline-none focus:border-green-400/50 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </HeroFadeIn>
                </div>
            </header>

            {/* Category Pills & Filters */}
            <section className="sticky top-16 z-20 bg-white/80 border-b border-gray-100 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat.name === "All"
                                        ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                                        : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
                                    }`}
                            >
                                {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
                                {cat.name}
                                <span className="opacity-40 text-[10px] ml-1">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Blog Post Grid */}
            <main className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Featured Article (Top Grid) */}
                    <Link href={`/blog/${blogPosts[0].id}`} className="group mb-16 block rounded-[2.5rem] overflow-hidden border border-gray-100 bg-gray-50/50 p-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-green-900/5">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] lg:aspect-auto h-full min-h-[300px]">
                                <img
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="rounded-full bg-green-600/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                                        Featured
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center p-6 lg:p-12">
                                <span className="mb-4 text-xs font-black uppercase tracking-widest text-green-600">{blogPosts[0].category}</span>
                                <h2 className="mb-6 text-3xl font-black text-gray-900 lg:text-5xl lg:leading-[1.1]">{blogPosts[0].title}</h2>
                                <p className="mb-8 text-lg font-light leading-relaxed text-gray-500">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold border border-green-200">
                                        {blogPosts[0].author.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">{blogPosts[0].author.name}</span>
                                        <span className="text-[10px] text-gray-400">{blogPosts[0].date} · {blogPosts[0].readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Secondary Posts Grid */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.slice(1).map((post, i) => (
                            <Link href={`/blog/${post.id}`} key={i} className="group relative flex flex-col items-start transition-all duration-300">
                                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-lg lg:aspect-[1.5/1]">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-900 backdrop-blur-md">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col px-1">
                                    <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                        <span>·</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                                    </div>
                                    <h3 className="mb-4 text-xl font-black text-gray-900 transition-colors group-hover:text-green-600">
                                        {post.title}
                                    </h3>
                                    <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-gray-500 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 border border-gray-200">
                                            {post.author.avatar}
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">{post.author.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="mt-20 flex justify-center">
                        <Button variant="outline" className="h-14 px-10 rounded-2xl border-green-100 text-green-700 hover:bg-green-50 text-base font-bold">
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </main>

            <Newsletter />
        </div>
    )
}
