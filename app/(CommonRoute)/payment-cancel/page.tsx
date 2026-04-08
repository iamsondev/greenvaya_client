import Link from "next/link"
import { XCircle } from "lucide-react"

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20 border border-destructive/30">
                    <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">
                    Payment Cancelled
                </h2>
                <p className="text-green-200/60 text-sm mb-6">
                    Your payment was cancelled. No charges were made.
                </p>
                <Link
                    href="/ideas"
                    className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary transition-all"
                >
                    Back to Ideas
                </Link>
            </div>
        </div>
    )
}