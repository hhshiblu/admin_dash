// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["https://rajdhola-com-admin-desh.onrender.com/"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
        port: "**",
      },
    ],
  },
};

// module.exports = nextConfig;
