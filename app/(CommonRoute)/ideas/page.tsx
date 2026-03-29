import IdeasClient from "./_component/IdeasClient"

interface SearchParams {
    page?: string
    sort?: string
    category?: string
    status?: string
    q?: string
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

    const queryParams = new URLSearchParams()
    queryParams.set("page", page)
    queryParams.set("limit", "12")
    if (q) queryParams.set("search", q)
    if (category) queryParams.set("category", category)
    if (sort === "top") queryParams.set("sortBy", "votes")
    if (sort === "recent") queryParams.set("sortBy", "createdAt")

    const res = await fetch(
        `https://greenvaya-backend.vercel.app/api/v1/ideas?${queryParams.toString()}`,
        { cache: "no-store" }
    )
    const data = await res.json()

    const categoriesRes = await fetch(
        `https://greenvaya-backend.vercel.app/api/v1/categories`,
        { cache: "no-store" }
    )
    const categoriesData = await categoriesRes.json()

    return (
        <IdeasClient
            ideas={data?.data || []}
            meta={data?.meta || { page: 1, limit: 12, total: 0, totalPage: 1 }}
            categories={categoriesData?.data || []}
            currentPage={Number(page)}
            currentSort={sort}
            currentCategory={category}
            currentSearch={q}
        />
    )
}