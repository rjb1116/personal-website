/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/rjb1116/**/*.png",
      },
    ],
  },
};
