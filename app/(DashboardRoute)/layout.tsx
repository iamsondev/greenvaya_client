import { cookies } from "next/headers";

export default async function DashboardLayout({
    admin,
    member,
}: {
    admin: React.ReactNode
    member: React.ReactNode
}) {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;
    console.log("refreshToken:", refreshToken);

    let role = null;

    if (refreshToken) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            {
                method: "POST",
                headers: { cookie: `refreshToken=${refreshToken}` },
                cache: "no-store",
            }
        );
        const data = await res.json();
        console.log("refresh response:", data);
        const accessToken = data?.data?.accessToken;

        if (accessToken) {
            const payload = JSON.parse(
                Buffer.from(accessToken.split(".")[1], "base64").toString()
            );
            role = payload.role;
            console.log("role:", role);
        }
    }

    if (!role) {
        return null;
    }

    return (
        <div>
            {role === "ADMIN" && admin}
            {role === "MEMBER" && member}
        </div>
    )
}