"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"

// Custom SVG Social Icons for better compatibility and premium look
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
)

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-background pt-20 pb-10 text-muted-foreground transition-colors duration-500 border-t border-border">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px]" />
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-primary/0 dark:bg-primary/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all group-hover:bg-primary/90">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tight text-foreground">
                Green<span className="text-primary">Vaya</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground font-light">
              Empowering communities to share, discuss, and implement sustainable ideas for a greener, healthier planet. Join the eco-innovation movement today.
            </p>

            {/* Social Icons - Now using perfect match SVGs */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://www.linkedin.com/in/sondip-kumar-8637b9179/", icon: LinkedInIcon, label: "LinkedIn" },
                { href: "https://www.facebook.com/sondip.kumar.750", icon: FacebookIcon, label: "Facebook" },
                { href: "https://github.com/iamsondev", icon: GithubIcon, label: "GitHub" },
                { href: "https://x.com/SonDIPX", icon: XIcon, label: "X" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground shadow-sm border border-border hover:border-primary/30 group"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "Ideas", path: "/ideas" },
                { name: "About Us", path: "/about" },
                { name: "Community", path: "/community" },
                { name: "Help Center", path: "/help" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm transition-colors text-muted-foreground hover:text-primary font-medium italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Support & Legal</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Contact Us", path: "/help" },
                { name: "Terms of Use", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Cookie Policy", path: "/cookies" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm transition-colors text-muted-foreground hover:text-primary font-medium italic">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Get in Touch</h3>
            <ul className="flex flex-col gap-6">
              <li className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Email Support</span>
                  <span className="text-sm font-bold text-foreground">sondipkumarsk@gmail.com</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Help Line</span>
                  <span className="text-sm font-bold text-foreground">+880 1774032681</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs font-medium text-muted-foreground/60 italic">
              © {currentYear} GreenVaya. All rights reserved. Built with passion for a greener world.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
