/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"],
  },
};
const required_env_vars = [
  "AUTH0_SECRET",
  "AUTH0_BASE_URL",
  "AUTH0_ISSUER_BASE_URL",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
  "HONEYCOMB_API_URL",
];

required_env_vars.forEach((envvar) => {
  if (process.env[envvar] === undefined) {
    console.log(`Environment variable ${envvar} is undefined`);
  }
  nextConfig.env[envvar] = process.env[envvar];
});

module.exports = nextConfig;
