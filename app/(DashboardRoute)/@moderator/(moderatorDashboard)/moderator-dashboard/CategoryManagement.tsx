"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, Tag, Loader2, RefreshCw, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_URL } from "@/lib/api-config"
import { toast } from "sonner"

interface Category {
    id: string
    name: string
}

interface Props {
    accessToken: string
}

export default function CategoryManagement({ accessToken }: Props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [newCategory, setNewCategory] = useState("")

    const fetchCategories = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/categories`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store"
            })
            const data = await res.json()
            setCategories(data?.data || [])
        } catch (error) {
            toast.error("Failed to fetch categories")
        } finally {
            setLoading(false)
        }
    }, [accessToken])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCategory.trim()) return

        setAdding(true)
        try {
            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ name: newCategory })
            })

            if (!res.ok) throw new Error("Failed to add category")

            toast.success("Category added successfully")
            setNewCategory("")
            fetchCategories()
        } catch (error) {
            toast.error("Error adding category")
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-foreground dark:text-white">Category Taxonomy</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Manage the classification system for green ideas.</p>
                </div>
                <Button 
                    variant="outline" 
                    onClick={fetchCategories} 
                    className="gap-2 rounded-xl border-border bg-card font-bold hover:bg-muted"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Category Form */}
                <div className="lg:col-span-1">
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Plus className="h-5 w-5" />
                            </div>
                            <h3 className="font-black text-foreground">New Category</h3>
                        </div>
                        
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Name</label>
                                <Input 
                                    placeholder="e.g. Solar Energy" 
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="rounded-xl border-border bg-muted/20 focus-visible:ring-primary/20"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={adding || !newCategory.trim()} 
                                className="w-full h-11 rounded-xl bg-primary font-black shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Category"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Categories List */}
                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                        <div className="border-b border-border bg-muted/30 px-6 py-4 flex items-center gap-3">
                            <Layers className="h-5 w-5 text-primary" />
                            <h3 className="font-black text-foreground">Established Categories</h3>
                            <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black text-primary uppercase tracking-widest">
                                {categories.length} Total
                            </span>
                        </div>
                        
                        <div className="p-2">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
                                    <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">Synchronizing Database...</p>
                                </div>
                            ) : categories.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <Tag className="h-10 w-10 text-muted-foreground/20" />
                                    <p className="text-sm text-muted-foreground">No categories found. Start by creating one.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {categories.map((category) => (
                                        <div 
                                            key={category.id} 
                                            className="group flex items-center justify-between rounded-2xl border border-transparent bg-muted/10 px-4 py-3 transition-all hover:border-primary/20 hover:bg-muted/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-border">
                                                    <Tag className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-bold text-foreground">{category.name}</span>
                                            </div>
                                            {/* Delete option - backend doesn't show delete route but might exist or just hide for now */}
                                            {/* <button className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground/40 hover:text-destructive transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button> */}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
