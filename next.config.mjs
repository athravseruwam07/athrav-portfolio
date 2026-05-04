// Static-export config (Vercel or GitHub Pages)
const isGithub = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.REPO_NAME || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithub && repoName ? `/${repoName}` : undefined,
  assetPrefix: isGithub && repoName ? `/${repoName}/` : undefined,
};

export default nextConfig;
