/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable Gzip and Brotli compression for smaller transfer sizes
    compress: true,

    // Powered by header removal for security and micro-payload reduction
    poweredByHeader: false,

    images: {
        // Optimize format delivery: modern AVIF & WebP
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },

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
            // Long-term immutable caching for static chunks & compiled assets
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // Cache next/image optimized images
            {
                source: "/_next/image/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400, stale-while-revalidate=604800",
                    },
                ],
            },
            // Global HTTP headers for security, MIME protection and transport
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
}

export default nextConfig
