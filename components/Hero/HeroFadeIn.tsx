"use client"

import { useEffect, useState, ReactNode } from "react"

interface HeroFadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function HeroFadeIn({
  children,
  delay = 0,
  className = "",
}: HeroFadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 + delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
