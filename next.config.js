/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rajdhola.s3.amazonaws.com",
        port: "**",
        pathname: "**",
      },
    ],
  },
};
