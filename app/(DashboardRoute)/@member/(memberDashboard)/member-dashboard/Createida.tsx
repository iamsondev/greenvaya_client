"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, FileEdit, Send, Loader2 } from "lucide-react"

interface Category {
    id: string
    name: string
}

interface Props {
    accessToken: string
    onCreated: () => void
}

const BASE = process.env.NEXT_PUBLIC_API_URL

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-green-200/30 backdrop-blur-sm transition-all focus:border-green-400/50 focus:bg-white/8 focus:outline-none"
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-green-400/70"

export default function CreateIdea({ accessToken, onCreated }: Props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [form, setForm] = useState({
        title: "", problemStatement: "", proposedSolution: "",
        description: "", categoryId: "", isPaid: false, price: 0, images: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        fetch(`${BASE}/api/v1/categories`)
            .then(r => r.json())
            .then(d => setCategories(d.data ?? []))
            .catch(() => { })
    }, [])

    const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }))

    const handleSave = async (submitForReview: boolean) => {
        if (!form.title || !form.categoryId || !form.problemStatement || !form.proposedSolution) {
            setError("Please fill in all required fields.")
            return
        }
        setError("")
        setLoading(true)

        try {
            const body = {
                title: form.title,
                problemStatement: form.problemStatement,
                proposedSolution: form.proposedSolution,
                description: form.description,
                categoryId: form.categoryId,
                isPaid: form.isPaid,
                price: form.isPaid ? form.price : 0,
                images: form.images ? [form.images] : [],
                status: "DRAFT",
            }

            const res = await fetch(`${BASE}/api/v1/ideas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message ?? "Failed to create idea")

            if (submitForReview) {
                await fetch(`${BASE}/api/v1/ideas/${data.data.id}/submit`, {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
            }

            setSuccess(submitForReview ? "Idea submitted for review!" : "Idea saved as draft!")
            setForm({ title: "", problemStatement: "", proposedSolution: "", description: "", categoryId: "", isPaid: false, price: 0, images: "" })
            onCreated()
            setTimeout(() => setSuccess(""), 3000)
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-white">Create New Idea</h2>
                <p className="mt-1 text-sm text-green-200/50">Share your sustainability idea with the community</p>
            </div>

            <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="md:col-span-2">
                        <label className={labelCls}>Title *</label>
                        <input
                            className={inputCls}
                            placeholder="e.g. Solar Powered Street Lights"
                            value={form.title}
                            onChange={e => set("title", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={labelCls}>Category *</label>
                        <select
                            className={inputCls + " cursor-pointer"}
                            value={form.categoryId}
                            onChange={e => set("categoryId", e.target.value)}
                        >
                            <option value="" className="bg-green-950">Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id} className="bg-green-950">{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelCls}>Image URL</label>
                        <input
                            className={inputCls}
                            placeholder="https://example.com/image.jpg"
                            value={form.images}
                            onChange={e => set("images", e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelCls}>Problem Statement *</label>
                        <textarea
                            className={inputCls + " min-h-[80px] resize-none"}
                            placeholder="What problem does this idea solve?"
                            value={form.problemStatement}
                            onChange={e => set("problemStatement", e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelCls}>Proposed Solution *</label>
                        <textarea
                            className={inputCls + " min-h-[80px] resize-none"}
                            placeholder="How do you propose to solve it?"
                            value={form.proposedSolution}
                            onChange={e => set("proposedSolution", e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelCls}>Full Description</label>
                        <textarea
                            className={inputCls + " min-h-[120px] resize-none"}
                            placeholder="Detailed description of your idea..."
                            value={form.description}
                            onChange={e => set("description", e.target.value)}
                        />
                    </div>
                </div>

                {/* Paid toggle */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold text-white">Mark as Paid Idea</p>
                        <p className="text-xs text-green-200/40">Other members must pay to view this idea</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={form.isPaid}
                            onChange={e => set("isPaid", e.target.checked)}
                        />
                        <div className="peer h-6 w-11 rounded-full border border-white/10 bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500 peer-checked:after:translate-x-full" />
                    </label>
                </div>

                {form.isPaid && (
                    <div>
                        <label className={labelCls}>Price (USD) *</label>
                        <input
                            type="number" min={0} step={0.01}
                            className={inputCls}
                            placeholder="9.99"
                            value={form.price}
                            onChange={e => set("price", parseFloat(e.target.value))}
                        />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />{error}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-400">
                        <CheckCircle className="h-4 w-4 shrink-0" />{success}
                    </div>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                        onClick={() => handleSave(false)}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-green-200 transition-all hover:border-green-400/30 hover:bg-white/10 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileEdit className="h-4 w-4" />}
                        Save as Draft
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-green-950 shadow-lg shadow-green-500/25 transition-all hover:bg-green-400 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        Submit for Review
                    </button>
                </div>
            </div>
        </div>
    )
}