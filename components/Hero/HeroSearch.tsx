"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (category) params.set("category", category)
    window.location.href = `/ideas?${params.toString()}`
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md sm:flex-row">
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/10 px-4 py-1">
        <Search className="h-4 w-4 shrink-0 text-green-300" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search sustainability ideas..."
          className="border-0 bg-transparent text-sm text-white placeholder:text-green-300/60 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full rounded-xl border-0 bg-white/10 text-sm text-white focus:ring-0 sm:w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="energy">⚡ Energy</SelectItem>
          <SelectItem value="waste">♻️ Waste</SelectItem>
          <SelectItem value="transportation">🚗 Transport</SelectItem>
          <SelectItem value="nature">🌿 Nature</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleSearch}
        className="rounded-xl bg-green-500 px-6 font-bold text-green-950 shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] hover:bg-green-400 hover:shadow-green-400/40"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  )
}
