import { cookies } from "next/headers";
import { API_URL } from "@/lib/api-config"

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
        try {
            const res = await fetch(
                `${API_URL}/auth/refresh-token`,
                {
                    method: "POST",
                    headers: { cookie: `refreshToken=${refreshToken}` },
                    cache: "no-store",
                }
            );

            if (res.ok) {
                const data = await res.json();
                console.log("refresh response:", data);
                const accessToken = data?.data?.accessToken;

                if (accessToken && typeof accessToken === "string") {
                    const parts = accessToken.split(".");
                    if (parts.length === 3) {
                        const payload = JSON.parse(
                            Buffer.from(parts[1], "base64").toString()
                        );
                        role = payload.role;
                        console.log("role:", role);
                    }
                }
            } else {
                console.error("Refresh token request failed with status:", res.status);
            }
        } catch (error) {
            console.error("Error during token refresh fetch:", error);
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