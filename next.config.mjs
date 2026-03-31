/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'https://greenvaya-backend.vercel.app/api/v1/:path*',
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },
}

export default nextConfig
