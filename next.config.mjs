/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"standalone",
    images : {
        remotePatterns : [
            {
                protocol :'https',
                hostname : "lh3.googleusercontent.com",
                port : ''
            }
        ]
    }
};

export default nextConfig;
