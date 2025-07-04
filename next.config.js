/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bvhfjfpsedkfqvmxwvfr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // 다른 이미지 호스트가 필요한 경우 여기에 추가
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // 기타 Next.js 설정
  // Turbopack 설정 (Next.js 15에서 안정화)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = nextConfig