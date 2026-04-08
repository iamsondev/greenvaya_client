"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, FileEdit, Send, Loader2, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/api-config"

interface Category {
    id: string
    name: string
}

interface Props {
    accessToken: string
    onCreated: () => void
    isModal?: boolean
}

const inputCls = "w-full rounded-xl border border-border dark:border-border bg-muted dark:bg-muted px-4 py-3 text-sm text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/30 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none dark:[&>option]:bg-background dark:[&>option]:text-white"
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/70"

export default function CreateIdea({ accessToken, onCreated, isModal = false }: Props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [form, setForm] = useState({
        title: "",
        problemStatement: "",
        proposedSolution: "",
        description: "",
        categoryId: "",
        isPaid: false,
        price: 0,
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageUploading, setImageUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then((r) => r.json())
            .then((d) => setCategories(d.data ?? []))
            .catch(() => { })
    }, [])

    const setField = (k: string, v: unknown) =>
        setForm((p) => ({ ...p, [k]: v }))

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        )
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
        )
        const data = await res.json()
        return data.secure_url
    }

    const handleSave = async (submitForReview: boolean) => {
        if (
            !form.title ||
            !form.categoryId ||
            !form.problemStatement ||
            !form.proposedSolution ||
            !form.description
        ) {
            setError("Please fill in all required fields.")
            return
        }
        setError("")
        setLoading(true)

        try {
            let imageUrl = ""
            if (imageFile) {
                setImageUploading(true)
                imageUrl = await uploadToCloudinary(imageFile)
                setImageUploading(false)
            }

            const body = {
                title: form.title,
                problemStatement: form.problemStatement,
                proposedSolution: form.proposedSolution,
                description: form.description,
                categoryId: form.categoryId,
                isPaid: form.isPaid,
                price: form.isPaid ? form.price : 0,
                images: imageUrl ? [imageUrl] : [],
                status: "DRAFT",
            }

            const res = await fetch(
                `${API_URL}/ideas`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(body),
                }
            )
            const data = await res.json()
            if (!res.ok) throw new Error(data.message ?? "Failed to create idea")

            if (submitForReview) {
                await fetch(
                    `${API_URL}/ideas/${data.data.id}/submit`,
                    {
                        method: "PATCH",
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                )
            }

            setSuccess(
                submitForReview ? "Idea submitted for review!" : "Idea saved as draft!"
            )
            
            if (!isModal) {
              setForm({
                  title: "",
                  problemStatement: "",
                  proposedSolution: "",
                  description: "",
                  categoryId: "",
                  isPaid: false,
                  price: 0,
              })
              setImageFile(null)
              setImagePreview(null)
            }
            
            onCreated()
            setTimeout(() => setSuccess(""), 3000)
        } catch (e: unknown) {
            setImageUploading(false)
            setError(e instanceof Error ? e.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={isModal ? "p-1" : "space-y-6"}>
            {!isModal && (
              <div>
                  <h2 className="text-2xl font-black text-foreground dark:text-white">Create New Idea</h2>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">
                      Share your sustainability idea with the community
                  </p>
              </div>
            )}

            <div className={`space-y-5 rounded-2xl border border-border ${isModal ? "bg-transparent" : "bg-card shadow-xl shadow-primary/5"} p-6 backdrop-blur-sm`}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className={labelCls}>Title *</label>
                        <input
                            className={inputCls}
                            placeholder="e.g. Solar Powered Street Lights"
                            value={form.title}
                            onChange={(e) => setField("title", e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className={labelCls}>Category *</label>
                        <select
                            className={inputCls + " cursor-pointer"}
                            value={form.categoryId}
                            onChange={(e) => setField("categoryId", e.target.value)}
                        >
                            <option value="" className="dark:bg-background">
                                Select a category
                            </option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id} className="dark:bg-background">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelCls}>Image</label>
                        <div className="flex items-center gap-4">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-16 w-16 rounded-xl object-cover border border-white/10"
                                />
                            )}
                            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground hover:bg-muted/80 transition-all">
                                <ImagePlus className="h-4 w-4" />
                                {imageFile ? imageFile.name : "Upload Image"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="md:col-span-2">
                        <label className={labelCls}>Problem Statement *</label>
                        <textarea
                            className={inputCls + " min-h-[80px] resize-none"}
                            placeholder="What problem does this idea solve?"
                            value={form.problemStatement}
                            onChange={(e) => setField("problemStatement", e.target.value)}
                        />
                    </div>

                    {/* Proposed Solution */}
                    <div className="md:col-span-2">
                        <label className={labelCls}>Proposed Solution *</label>
                        <textarea
                            className={inputCls + " min-h-[80px] resize-none"}
                            placeholder="How do you propose to solve it?"
                            value={form.proposedSolution}
                            onChange={(e) => setField("proposedSolution", e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className={labelCls}>Full Description *</label>
                        <textarea
                            className={inputCls + " min-h-[120px] resize-none"}
                            placeholder="Detailed description of your idea..."
                            value={form.description}
                            onChange={(e) => setField("description", e.target.value)}
                        />
                    </div>
                </div>

                {/* Paid toggle */}
                <div className="flex items-center justify-between rounded-xl border border-border dark:border-border bg-muted/50 dark:bg-muted px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold text-foreground dark:text-white">
                            Mark as Paid Idea
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-green-200/40">
                            Other members must pay to view this idea
                        </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={form.isPaid}
                            onChange={(e) => setField("isPaid", e.target.checked)}
                        />
                        <div className="peer h-6 w-11 rounded-full border border-border dark:border-border bg-gray-200 dark:bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
                    </label>
                </div>

                {form.isPaid && (
                    <div>
                        <label className={labelCls}>Price (BDT) *</label>
                        <input
                            type="number"
                            min={0}
                            className={inputCls}
                            placeholder="500"
                            value={isNaN(form.price) ? "" : form.price}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value)
                                setField("price", isNaN(val) ? 0 : val)
                            }}
                        />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                        <CheckCircle className="h-4 w-4 shrink-0" />
                        {success}
                    </div>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button
                        onClick={() => handleSave(false)}
                        disabled={loading || imageUploading}
                        className="flex-1 rounded-xl border border-border dark:border-border bg-muted dark:bg-muted px-6 py-6 text-sm font-semibold text-gray-700 dark:text-green-200 transition-all hover:bg-muted dark:hover:bg-white/10 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <FileEdit className="h-4 w-4" />
                        )}
                        Save as Draft
                    </Button>
                    <Button
                        onClick={() => handleSave(true)}
                        disabled={loading || imageUploading}
                        className="flex-1 rounded-xl bg-primary px-6 py-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-50 h-auto"
                    >
                        {loading || imageUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                        {imageUploading ? "Uploading..." : "Submit for Review"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
