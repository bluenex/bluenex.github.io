/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
    /** @see https://stackoverflow.com/a/70047180/4010864 */
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
