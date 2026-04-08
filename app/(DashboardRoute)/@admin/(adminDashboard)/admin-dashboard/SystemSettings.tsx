"use client"

import { useState } from "react"
import { Settings, Save, Lock, Globe, Bell, Palette, Database, ShieldCheck, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfigField {
    label: string
    value: string | boolean
    type: "text" | "email" | "password" | "select" | "switch"
    options?: string[]
}

interface ConfigSection {
    id: string
    title: string
    icon: any
    fields: ConfigField[]
}

export default function SystemSettings() {
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSave = () => {
        setSaving(true)
        setTimeout(() => {
            setSaving(false)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        }, 1500)
    }

    const sections: ConfigSection[] = [
        {
            id: "general",
            title: "General Config",
            icon: Globe,
            fields: [
                { label: "Platform Name", value: "GreenVaya Ecosystem", type: "text" },
                { label: "Contact Email", value: "support@greenvaya.com", type: "email" },
                { label: "Default Currency", value: "USD ($)", type: "select", options: ["USD", "EUR", "BDT"] },
            ]
        },
        {
            id: "moderation",
            title: "Moderation Engine",
            icon: ShieldCheck,
            fields: [
                { label: "Auto-approve Ideas", value: false, type: "switch" },
                { label: "Profanity Filter", value: true, type: "switch" },
                { label: "Strict Review Mode", value: true, type: "switch" },
            ]
        },
        {
            id: "notifications",
            title: "Notifications",
            icon: Bell,
            fields: [
                { label: "Email Digest", value: "Daily", type: "select", options: ["Instant", "Daily", "Weekly", "Off"] },
                { label: "Slack Webhook", value: "https://hooks.slack.com/services/...", type: "password" },
            ]
        }
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-foreground dark:text-white">Platform Settings</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-green-200/50">Global configuration and administration controls.</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="h-11 px-8 rounded-xl font-black bg-primary hover:bg-green-700 shadow-lg shadow-primary/20 gap-2 transition-all"
                >
                    {saving ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : success ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {saving ? "Saving Changes..." : success ? "Settings Saved" : "Save Changes"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar toggle could go here, but let's use a vertical list for now */}
                <div className="md:col-span-2 space-y-6">
                    {sections.map((section) => (
                        <div key={section.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/20">
                            <div className="border-b border-border bg-muted/30 px-6 py-4 flex items-center gap-3">
                                <section.icon className="h-5 w-5 text-primary" />
                                <h3 className="font-black text-foreground">{section.title}</h3>
                            </div>
                            <div className="p-6 space-y-5">
                                {section.fields.map((field, idx) => (
                                    <div key={idx} className="flex flex-col gap-1.5">
                                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                            {field.label}
                                        </label>
                                        {field.type === "switch" ? (
                                            <div className="flex items-center gap-3">
                                                <button className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${field.value ? 'bg-primary' : 'bg-muted'}`}>
                                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${field.value ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </button>
                                                <span className="text-sm font-medium text-foreground">{field.value ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        ) : field.type === "select" ? (
                                            <select className="h-10 w-full rounded-xl border border-border bg-muted/10 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                                {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                defaultValue={field.value as string}
                                                className="h-10 w-full rounded-xl border border-border bg-muted/10 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-3xl border border-border bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
                        <Palette className="h-8 w-8 text-indigo-500 mb-4" />
                        <h4 className="font-bold text-foreground mb-2">Visual Customization</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            Update the platform theme, logo, and brand colors to match your organization's identity.
                        </p>
                        <Button variant="outline" className="w-full rounded-xl border-indigo-200 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-50">
                            Theme Editor
                        </Button>
                    </div>

                    <div className="p-6 rounded-3xl border border-border bg-gradient-to-br from-orange-500/5 to-red-500/5">
                        <Database className="h-8 w-8 text-orange-500 mb-4" />
                        <h4 className="font-bold text-foreground mb-2">Maintenance Mode</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            Put the platform in read-only mode for scheduled database maintenance or updates.
                        </p>
                        <Button variant="outline" className="w-full rounded-xl border-orange-200 text-orange-700 dark:text-orange-300 font-bold hover:bg-orange-50">
                            Enter Maintenance
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
