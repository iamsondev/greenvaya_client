import { notFound } from "next/navigation"
import IdeaDetailClient from "./IdeaDetailClient"

export default async function IdeaDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`,
        { cache: "no-store" }
    )

    if (!res.ok) notFound()

    const data = await res.json()
    const idea = data?.data

    if (!idea) notFound()

    return <IdeaDetailClient idea={idea} />
}