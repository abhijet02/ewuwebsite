import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "192.168.1.138",
//         // hostname: "localhost",
//         port: "4000",
//         pathname: "/uploads/**", // or "**" if you want to allow all paths
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  //reactStrictMode: true,
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/videos/[hash][ext][query]",
      },
    });
    return config;
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/utils/loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.ewubd.edu",
        pathname: "**",
      },
    ],
  },
};
export default nextConfig;
