import IdeasClient from "./_component/IdeasClient"
import { API_URL } from "@/lib/api-config"

interface SearchParams {
    page?: string
    sort?: string
    category?: string
    status?: string
    q?: string
    authorId?: string
}

export default async function IdeasPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const params = await searchParams
    const page = params.page || "1"
    const sort = params.sort || "recent"
    const category = params.category || ""
    const q = params.q || ""
    const status = params.status || ""
    const authorId = params.authorId || ""

    const queryParams = new URLSearchParams()
    queryParams.set("page", page)
    queryParams.set("limit", "12")
    if (q) queryParams.set("searchTerm", q)
    if (category) queryParams.set("category", category)
    if (status === "free") queryParams.set("isPaid", "false")
    if (status === "paid") queryParams.set("isPaid", "true")
    if (authorId) queryParams.set("authorId", authorId)

    if (sort === "top") queryParams.set("sortBy", "votes")
    if (sort === "commented") queryParams.set("sortBy", "comments")
    if (sort === "recent") queryParams.set("sortBy", "createdAt")

    // Parallel independent fetch with error handling & revalidation
    const [ideasData, categoriesData] = await Promise.all([
        fetch(`${API_URL}/ideas?${queryParams.toString()}`, {
            next: { revalidate: 60 },
        })
            .then(async (res) => {
                if (!res.ok) return null
                return res.json()
            })
            .catch(() => null),

        fetch(`${API_URL}/categories`, {
            next: { revalidate: 3600 },
        })
            .then(async (res) => {
                if (!res.ok) return null
                return res.json()
            })
            .catch(() => null),
    ])

    return (
        <IdeasClient
            ideas={ideasData?.data || []}
            meta={ideasData?.meta || { page: 1, limit: 12, total: 0, totalPage: 1 }}
            categories={categoriesData?.data || []}
            currentPage={Number(page)}
            currentSort={sort}
            currentCategory={category}
            currentSearch={q}
            currentStatus={status}
        />
    )
}
