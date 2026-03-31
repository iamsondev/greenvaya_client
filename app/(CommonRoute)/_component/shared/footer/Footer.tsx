"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Globe, Send, Share2, MessageCircle, Camera } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-green-950 pt-20 pb-10 text-green-50/90">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-green-500/10 blur-[100px]" />
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-emerald-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 shadow-lg shadow-green-600/20 transition-colors group-hover:bg-green-700">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Green<span className="text-green-500">Vaya</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-green-100/60 font-light">
              Empowering communities to share, discuss, and implement sustainable ideas for a greener, healthier planet. Join the eco-innovation movement today.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Send, Camera, Share2, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-green-500 hover:text-green-950 shadow-sm border border-white/5 hover:border-green-400/30">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-green-400">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "Ideas", path: "/ideas" },
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Login", path: "/login" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm transition-colors hover:text-green-400 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-green-400">Support & Legal</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "FAQ", path: "/faq" },
                { name: "Contact Us", path: "/contact" },
                { name: "Terms of Use", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Cookie Policy", path: "/cookies" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm transition-colors hover:text-green-400 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-green-400">Get in Touch</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-green-400">
                  <MapPin className="h-3 w-3" />
                </div>
                <div className="text-sm leading-relaxed text-green-100/60 font-light">
                  123 Green Innovation Way,<br />
                  Sustainability District, CA 94103
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-green-400">
                  <Phone className="h-3 w-3" />
                </div>
                <span className="text-sm font-light text-green-100/60">+1 (555) 000-GREEN</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-green-400">
                  <Mail className="h-3 w-3" />
                </div>
                <span className="text-sm font-light text-green-100/60">hello@ecospark.hub</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs font-light text-green-100/30">
              © {currentYear} EcoSpark Hub. All rights reserved. Built for community-powered world healing.
            </p>
            <div className="flex items-center gap-6 text-xs font-light text-green-100/30">
              <Link href="/terms" className="hover:text-green-400 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-green-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
