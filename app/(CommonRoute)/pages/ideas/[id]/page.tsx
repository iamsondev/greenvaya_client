export default async function IdeaPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const data = await fetch(`https://greenvaya-backend.vercel.app/api/v1/ideas/${id}`)
    const idea = await data.json()
    console.log(idea)

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">{idea?.data?.title || "Idea Title"}</h1>
            <p className="mt-4 text-lg text-gray-700">{idea?.data?.description || "No description available."}</p>
        </div>
    )
}