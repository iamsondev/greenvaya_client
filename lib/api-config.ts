export const API_URL = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_API_PROXY_URL || "/api/v1")
  : (process.env.NEXT_PUBLIC_API_URL || "https://greenvaya-backend.vercel.app/api/v1");
