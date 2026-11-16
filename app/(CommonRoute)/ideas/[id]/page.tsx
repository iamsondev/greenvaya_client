import { notFound } from "next/navigation"
import IdeaDetailClient from "./IdeaDetailClient"
import { API_URL } from "@/lib/api-config"

export default async function IdeaDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    try {
        const res = await fetch(
            `${API_URL}/ideas/${id}`,
            {
                next: {
                    revalidate: 60,
                    tags: [`idea-${id}`],
                },
            }
        )

        if (!res.ok) notFound()

        const data = await res.json()
        const idea = data?.data

        if (!idea) notFound()

        return <IdeaDetailClient idea={idea} />
    } catch (error) {
        notFound()
    }
}
