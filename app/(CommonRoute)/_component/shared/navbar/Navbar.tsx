"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Leaf, ChevronDown, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"
import { ModeToggle } from "@/components/shared/ModeToggle"

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
]

const memberLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Help Center", href: "/help" },
]

const adminLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "System Logs", href: "/admin-dashboard?tab=logs" },
  { label: "Settings", href: "/admin-dashboard?tab=settings" },
]

const moderatorLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "System Stats", href: "/moderator-dashboard?tab=overview" },
  { label: "Green Support", href: "/moderator-dashboard?tab=support" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Zustand থেকে আসছে
  const { user, logout } = useAuthStore()
  const isLoggedIn = !!user

  const links = !isLoggedIn
    ? publicLinks
    : user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "MODERATOR"
        ? moderatorLinks
        : memberLinks

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-green-100 dark:border-border bg-white/95 dark:bg-gray-950/95 shadow-sm backdrop-blur-md"
          : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/90">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground dark:text-white">
              Green<span className="text-primary">Vaya</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                <Link
                  href={user?.role === "ADMIN" ? "/admin-dashboard" : user?.role === "MODERATOR" ? "/moderator-dashboard" : "/member-dashboard"}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
                >
                  Dashboard
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-primary/5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white overflow-hidden shadow-sm">
                        {user?.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name || 'User'}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
                        )}
                      </div>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={user?.role === "ADMIN" ? "/admin-dashboard" : user?.role === "MODERATOR" ? "/moderator-dashboard" : "/member-dashboard"}
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </>
            )}
            <div className="ml-2 border-l border-border dark:border-gray-800 pl-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="rounded-lg p-2 transition-colors hover:bg-accent/10">
                {open ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0">
              <div className="flex h-full flex-col">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 p-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-foreground dark:text-white">
                    Green<span className="text-primary">Vaya</span>
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-all",
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}


                </nav>

                {/* Mobile Auth Buttons */}
                <div className="border-t border-gray-100 dark:border-zinc-800 p-4">
                  {isLoggedIn ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                      className="w-full border-red-200 text-destructive hover:bg-red-50"
                    >
                      Logout
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link
                          href="/login"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2"
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/95"
                      >
                        <Link
                          href="/signup"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2"
                        >
                          <UserPlus className="h-4 w-4" />
                          Register
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}