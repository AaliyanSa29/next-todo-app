// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//         port: "",
//         pathname: "/images/**",
//       },
//     ],
//     domains: ["cdn.sanity.io"],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors (JS project)
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during build
  },
};

export default nextConfig;
