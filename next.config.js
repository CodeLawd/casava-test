/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    LANDA_HOME: process.env.LANDA_HOME,
    LANDA_CAMPUS: process.env.LANDA_CAMPUS,
    TL_DOMAIN: process.env.TL_DOMAIN,
    CAPTCHA_KEY: process.env.CAPTCHA_KEY,
  },
};

module.exports = nextConfig;
