import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/products/continuous-cast-rod",
        destination: "/products/copper-upcast-rod",
        permanent: true,
      },
      {
        source: "/:locale(ar|zh|es)/products/continuous-cast-rod",
        destination: "/:locale/products/copper-upcast-rod",
        permanent: true,
      },
      {
        source: "/products/copper-nuggets",
        destination: "/products/phosphorous-copper-nuggets",
        permanent: true,
      },
      {
        source: "/:locale(ar|zh|es)/products/copper-nuggets",
        destination: "/:locale/products/phosphorous-copper-nuggets",
        permanent: true,
      },
      {
        source: "/products/copper-wires-rods",
        destination: "/products/bare-copper-wire",
        permanent: true,
      },
      {
        source: "/:locale(ar|zh|es)/products/copper-wires-rods",
        destination: "/:locale/products/bare-copper-wire",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
