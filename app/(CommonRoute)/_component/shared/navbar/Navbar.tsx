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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Zustand থেকে আসছে
  const { user, logout } = useAuthStore()
  const isLoggedIn = !!user

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
          ? "border-b border-green-100 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 shadow-sm backdrop-blur-md"
          : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 shadow-md transition-colors group-hover:bg-green-700">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Green<span className="text-green-600">Vaya</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400"
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
                  href={user?.role === "ADMIN" ? "/admin-dashboard" : "/member-dashboard"}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400"
                >
                  Dashboard
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-green-50 dark:hover:bg-green-900/20">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <ChevronDown className="h-3 w-3 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={user?.role === "ADMIN" ? "/admin-dashboard" : "/member-dashboard"}
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600"
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
                  className="text-gray-600 hover:bg-green-50 hover:text-green-700"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-green-600 text-white shadow-sm hover:bg-green-700"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </>
            )}
            <div className="ml-2 border-l border-gray-200 dark:border-gray-800 pl-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="rounded-lg p-2 transition-colors hover:bg-green-50 dark:hover:bg-green-900/20">
                {open ? (
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0">
              <div className="flex h-full flex-col">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 p-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Green<span className="text-green-600">Vaya</span>
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-all",
                        pathname === link.href
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isLoggedIn && (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400"
                      >
                        My Profile
                      </Link>
                      <Link
                        href={user?.role === "ADMIN" ? "/admin-dashboard" : "/member-dashboard"}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400"
                      >
                        Dashboard
                      </Link>
                    </>
                  )}
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
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
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
                        className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-500"
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