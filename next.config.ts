/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hwchamber.co.uk',
        port: '', // Kosong untuk port default HTTPS (443)
        pathname: '/**', // Izinkan semua path
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '', // Kosong untuk port default HTTPS (443)
        pathname: '/**', // Izinkan semua path
      },
      {
        protocol: 'http', // Tambahkan protocol untuk localhost
        hostname: 'localhost',
        port: '5000', // Sesuaikan dengan port backend kamu
        pathname: '/upload/**', // Sesuaikan dengan path gambar, misalnya /upload
      },
    ],
  },
};

export default nextConfig;