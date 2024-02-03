/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BACKEND_URL : "http://74.208.221.72:8001/api"
    }
}

module.exports = nextConfig
