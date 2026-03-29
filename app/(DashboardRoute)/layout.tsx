

export default function DashboardLayout({

    admin,
    member,
}: {

    admin: React.ReactNode
    member: React.ReactNode
}) {
    const role = "admin" as "admin" | "member"
    return (
        <div>
            {role === "admin" && admin}
            {role === "member" && member}
        </div>
    )
}
