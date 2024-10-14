/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secure.epayco.co", // No protocol here
        port: "",
        pathname: "/img/standard/**", // Correct the pathname
      },
      {
        protocol: "https",
        hostname: "flagcdn.com", // No protocol here
        port: "",
        pathname: "/**", // Correct the pathname
      },
    ],
  },
  eslint: {},
};

export default nextConfig;
